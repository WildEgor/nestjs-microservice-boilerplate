import { Injectable } from '@nestjs/common';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import { ConfigService } from '@wildegor/common.nodepack.boilerplate/modules/src/shared';

@Injectable()
export class MongoConfig implements MongooseOptionsFactory {

  private readonly username: string;
  private readonly password: string;
  private readonly host: string;
  private readonly port: string;
  private readonly dbName: string;
  private readonly timeout: number;

  constructor(configService: ConfigService) {
    this.username = configService.getString('MONGODB_USERNAME');
    this.password = configService.getString('MONGODB_PASSWORD');
    this.host = configService.getString('MONGODB_HOST');
    this.port = configService.getString('MONGODB_PORT');
    this.dbName = configService.getString('MONGODB_DB');
    this.timeout = configService.getNumber('MONGODB_TIMEOUT');
  }

  public createMongooseOptions(): MongooseModuleOptions {
    return {
      user: this.username,
      pass: this.password,
      uri: `mongodb://${this.host}:${this.port}`,
      dbName: this.dbName,
      directConnection: true,
      keepAlive: true,
      autoIndex: true,
      connectTimeoutMS: this.timeout,
      serverSelectionTimeoutMS: this.timeout,
    };
  }

}
