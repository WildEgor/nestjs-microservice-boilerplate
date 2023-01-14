import { Injectable } from '@nestjs/common';
import { ConfigService } from '@wildegor/common.nodepack.boilerplate/modules/src/shared';
import { IEventBusConfig } from '@src/infrastructure/interfaces/configs/event-bus-config.interface';

@Injectable()
export class EventBusConfig implements IEventBusConfig {

  public readonly hostname: string;
  public readonly password: string;
  public readonly port: number;
  public readonly username: string;

  public readonly connections: string[] = [];

  constructor(configService: ConfigService) {
    this.hostname = configService.getString('AMQP_HOST');
    this.port = configService.getNumber('AMQP_PORT');
    this.username = configService.getString('AMQP_USERNAME');
    this.password = configService.getString('AMQP_PASSWORD');
    this.connections.push(`amqp://${this.username}:${this.password}@${this.hostname}:${this.port}`);
  }

  public createOptions(): IEventBusConfig {
    return {
      connections: [],
    };
  }

}
