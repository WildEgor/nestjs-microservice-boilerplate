import { Inject, Injectable } from '@nestjs/common';
import { ILoggerPort } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { InjectTokens } from '@src/infrastructure/types/inject-tokens';

@Injectable()
export class ReportService {

  constructor(
    @Inject(InjectTokens.Logger)
    private readonly _logger: ILoggerPort,
    // eslint-disable-next-line no-empty-function
  ) {}

  public generateReport(): void {
    this._logger.log('Report process...');
  }

}
