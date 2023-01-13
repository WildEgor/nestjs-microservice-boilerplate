import { Inject, Injectable } from '@nestjs/common';
import { ILoggerPort } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { AppConfig } from '@config/app.config';
import { CodeGenerator } from '@shared/utils/code-generator.utils';
import { TemplateBuilder } from '@shared/utils/template-builder.utils';
import { InjectTokens } from '@src/infrastructure/types/inject-tokens';
import { NotificationNames } from '@src/infrastructure/types/notification-names';

@Injectable()
export class EmailNotifier {

  private readonly _appConfig: AppConfig;
  private readonly _logger: ILoggerPort;

  constructor(
  @Inject(InjectTokens.Logger)
    logger: ILoggerPort,
    appConfig: AppConfig,
  ) {
    this._logger = logger;
    this._appConfig = appConfig;
  }

  public async sendNotification(email: string): Promise<string> {
    const code = String(CodeGenerator.generate(6));
    this._logger.debug(`Send dummy data ${code} to ${email}`);
    const message = await TemplateBuilder.build(NotificationNames.SIMPLE, {
      code,
    });
    this._logger.debug(message);
    return code;
  }

}
