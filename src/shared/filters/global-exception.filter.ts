import { ArgumentsHost, Catch, ContextType, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';
import { RpcException } from '@nestjs/microservices';
import { ILoggerPort, ServiceException } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { GraphQLResolveInfo } from 'graphql/type';
import { EMPTY } from 'rxjs';
import { IAppConfig } from '@src/infrastructure/interfaces/configs/app-config.interface';

export type Exceptions = HttpException | ServiceException | RpcException;

@Catch()
export class GlobalExceptionsFilter implements GqlExceptionFilter {

  private readonly _appConfig: IAppConfig;
  private readonly _logger: ILoggerPort;

  constructor(appConfig: IAppConfig) {
    this._appConfig = appConfig;
    this._logger = new Logger(GlobalExceptionsFilter.name);
  }

  catch(exception: Exceptions, host: ArgumentsHost) {
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;

    const payload = {
      message: exception?.message,
      errorCode: 'UNKNOWN_ERROR_CODE',
      serviceName: this._appConfig.name,
    };

    // TODO: refactor
    if (this.isHttpException(exception)) {
      const httpResponse = exception.getResponse() as HttpException;
      payload.message = httpResponse.message;
      statusCode = exception.getStatus();
    }
    else if (this.isServiceException(exception)) {
      payload.message = exception.toResponse().data.message;
      payload.errorCode = exception.toResponse().data.errorCode;
      statusCode
        = exception.toResponse()?.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    }

    if (this._appConfig.isProduction) {
      payload.message
        = 'Internal server error. Please contact with developers and try again later.';
    }
    else {
      payload.message = JSON.stringify(exception?.stack.toString());
      this._logger.error(exception?.stack);
    }

    if (host.getType<ContextType | 'graphql'>() === 'http') {
      const response = host.switchToHttp().getResponse();
      const request = host.switchToHttp().getRequest();
      response.status(statusCode).send({
        data: payload,
        isOk: false,
      });
      Logger.error(
        `${request.method} ${request.url}`,
        JSON.stringify(payload),
        'ExceptionFilter - HTTP Error',
      );
      return EMPTY;
    }

    const gqlHost = GqlArgumentsHost.create(host);
    const info = gqlHost.getInfo<GraphQLResolveInfo>();
    this._logger.error(
      `${info.parentType} ${info.fieldName}`,
      JSON.stringify({
        ...payload,
        type: info.parentType,
        field: info.fieldName,
      }),
      'ExceptionFilter - GQL Error',
    );

    throw exception;
  }

  private isHttpException(err: Exceptions): err is HttpException {
    return err instanceof HttpException;
  }

  private isServiceException(err: Exceptions): err is ServiceException {
    return err instanceof ServiceException;
  }

}
