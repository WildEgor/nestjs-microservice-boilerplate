import { Global, Module } from '@nestjs/common';
import * as NestConfig from '@nestjs/config';
import { ConfigService } from '@wildegor/common.nodepack.boilerplate/modules/src/shared';
import { EventBusConfig } from '@config/event-bus.config';
import { LoggerConfig } from '@config/logger.config';
import { MongoConfig } from '@config/mongo.config';
import { AppConfig } from './app.config';

@Global()
@Module({
  imports: [
    NestConfig.ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local', '.env.example'],
    }),
  ],
  providers: [
    NestConfig.ConfigService,
    ConfigService,
    AppConfig,
    LoggerConfig,
    MongoConfig,
    EventBusConfig,
  ],
  exports: [
    AppConfig,
    LoggerConfig,
    MongoConfig,
    EventBusConfig,
  ],
})
export class ConfigModule {}
