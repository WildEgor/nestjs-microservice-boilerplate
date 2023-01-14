import { Inject, Injectable } from '@nestjs/common';
import { ILoggerPort } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { InjectTokens } from 'src/infrastructure/types/inject-tokens';
import { IAppUnitOfWork } from '../../interfaces/uow/app-unit-of-work.interface';
import { MockUnitOfWork } from './mock-unit-of-work';

@Injectable()
export class UnitOfWork extends MockUnitOfWork implements IAppUnitOfWork {

  private _logger: ILoggerPort;

  constructor(
    @Inject(InjectTokens.Logger)
    private readonly myLogger: ILoggerPort,
  ) {
    super();
    this._logger = myLogger;
  }

}
