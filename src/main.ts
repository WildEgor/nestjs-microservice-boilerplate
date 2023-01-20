import { join } from 'path';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ILoggerPort } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { ResponseTimeInterceptor } from '@wildegor/common.nodepack.boilerplate/modules/src/shared';
import * as compression from 'compression';
import helmet from 'helmet';
import * as mongoose from 'mongoose';
import { AppConfig } from '@config/app.config';
import { GlobalExceptionsFilter } from '@shared/filters/global-exception.filter';
import { IAppConfig } from '@src/infrastructure/interfaces/configs/app-config.interface';
import { AppModule } from './app.module';

const bootstrap = async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      trustProxy: true,
      bodyLimit: 10048576,
    }),
  );
  const appConfig: IAppConfig = app.get(AppConfig);
  const logger: ILoggerPort = new Logger(appConfig.name);
  try {
    app.enableShutdownHooks();
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new GlobalExceptionsFilter(appConfig));
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalInterceptors(new ResponseTimeInterceptor());

    if (!appConfig.isProduction) {
      mongoose.set('debug', true);

      const config = new DocumentBuilder()
        .setTitle('X - Y microservice')
        .setDescription('A part of service X')
        .setVersion('1.0')
        .addTag('doc.json')
        .addBearerAuth(
          {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
            name: 'JWT Authorization',
            description: 'Enter JWT access token for authorized requests.',
            in: 'header',
          },
          'JWT Token',
        )
        .build();
      const document = SwaggerModule.createDocument(app, config, {
        ignoreGlobalPrefix: false,
      });
      SwaggerModule.setup('/api/docs', app, document);
    }
    else {
      app.use(helmet());
      app.use(compression());
      app.use((_req, res, next) => {
        res.removeHeader('X-Powered-By');
        next();
      });
    }

    await app.connectMicroservice<MicroserviceOptions>(
      {
        transport: Transport.GRPC,
        options: {
          package: 'grpc.services.v1',
          protoPath: join(process.cwd(), 'proto', 'services.proto'),
          url: `127.0.0.1:${appConfig.gRPCPort}`,
        },
      },
      {
        inheritAppConfig: true,
      },
    );

    await app.startAllMicroservices();

    await app.listen(appConfig.port, '0.0.0.0', () => {
      const baseUrl = process.platform === 'win32' ? 'http://localhost' : 'http://127.0.0.1';
      logger.debug(`Service (HTTP) available at ${baseUrl}:${appConfig.port}`);
      logger.debug(`Service (GRPC) available at ${baseUrl}:${appConfig.gRPCPort}`);
      logger.debug(`Service (GQL) available at ${baseUrl}:${appConfig.port}/graphql`);
      logger.debug(`Swagger available at ${baseUrl}:${appConfig.port}/api/docs`);
      logger.debug(`GraphiQL available at ${baseUrl}:${appConfig.port}/graphiql`);
    });
  }
  catch (e) {
    logger.error(e);
    process.exit();
  }
};
bootstrap().catch((e) => {
  throw e;
});
