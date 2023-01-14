import { Inject } from '@nestjs/common';
import { QueryHandler } from '@nestjs/cqrs';
import { HealthCheckResult, HealthCheckService } from '@nestjs/terminus';
import {
  ILoggerPort, IServiceVoidData, QueryHandlerBase,
  ServiceResponseDtoBase, ServiceResponseFactory,
} from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { InjectTokens } from '@src/infrastructure/types/inject-tokens';
import { HealthCheckQuery } from './health-check.query';

@QueryHandler(HealthCheckQuery)
export class HealthCheckQueryCase extends QueryHandlerBase {

  constructor(
    @Inject(InjectTokens.Logger)
    private readonly _logger: ILoggerPort,
    private readonly _healthCheckService: HealthCheckService,
  ) {
    super();
  }

  public async handle(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,no-unused-vars
    query: HealthCheckQuery,
  ): Promise<ServiceResponseDtoBase<HealthCheckResult | IServiceVoidData>> {
    try {
      const result = await this._healthCheckService.check([]);
      return ServiceResponseFactory.ok(result);
    }
    catch (error) {
      this._logger.error(error);
    }

    return ServiceResponseFactory.internalError();
  }

}
