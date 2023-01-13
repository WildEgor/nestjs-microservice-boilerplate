import { Injectable } from '@nestjs/common';
import { ILoggerClientOptions, ILoggerConfigFactory } from '@wildegor/common.nodepack.boilerplate/modules/src/adapters';
import { ConfigService } from '@wildegor/common.nodepack.boilerplate/modules/src/shared';

@Injectable()
export class LoggerConfig implements ILoggerConfigFactory {

  public readonly hostname: string;
  public readonly password: string;
  public readonly port: number;
  public readonly queueLogs: string;
  public readonly username: string;
  public readonly service: string;

  constructor(configService: ConfigService) {
    this.hostname = configService.getString('AMQP_HOST');
    this.port = configService.getNumber('AMQP_PORT');
    this.username = configService.getString('AMQP_USERNAME');
    this.password = configService.getString('AMQP_PASSWORD');
    this.queueLogs = configService.getString('LOGGER_QUEUE_LOGS');
    this.service = configService.getString('APP_NAME');
  }

  createLoggerConfig(): Promise<ILoggerClientOptions> | ILoggerClientOptions {
    return {
      hostname: this.hostname,
      port: this.port,
      password: this.password,
      username: this.username,
      queueLogs: this.queueLogs,
      service: this.service,
    };
  }

}
