import { Injectable } from '@nestjs/common';
import { ConfigService } from '@wildegor/common.nodepack.boilerplate/modules/src/shared';
import { v4 as uuidv4 } from 'uuid';
import { IAppConfig } from '../interfaces/configs/app-config.interface';

@Injectable()
export class AppConfig implements IAppConfig {

  public readonly name: string;
  public readonly port: number;
  public readonly isProduction: boolean;
  public readonly gRPCPort: number;
  public readonly sha: string;

  constructor(configService: ConfigService) {
    this.name = configService.getString('APP_NAME');
    this.port = configService.getNumber('APP_PORT');
    this.isProduction = configService.getBoolean('APP_PRODUCTION');
    this.gRPCPort = configService.getNumber('GRPC_PORT');
  }

  public get now(): Date {
    return new Date();
  }

  public get uuid(): string {
    return uuidv4();
  }

}
