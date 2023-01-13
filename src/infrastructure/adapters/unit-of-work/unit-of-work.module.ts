import { Global, Module } from '@nestjs/common';
import { ILoggerPort } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { InjectTokens } from 'src/infrastructure/types/inject-tokens';
import { UnitOfWork } from './unit-of-work';

@Global()
@Module({
  providers: [
    {
      provide: InjectTokens.AppUnitOfWork,
      useFactory: (logger: ILoggerPort) => new UnitOfWork(logger),
      inject: [InjectTokens.Logger],
    },
  ],
  exports: [
    {
      provide: InjectTokens.AppUnitOfWork,
      useFactory: (logger: ILoggerPort) => new UnitOfWork(logger),
      inject: [InjectTokens.Logger],
    },
  ],
})
export class UnitOfWorkModule {}
