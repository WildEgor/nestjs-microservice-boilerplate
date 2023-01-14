import { EventBus } from '@goparrot/pubsub-event-bus';
import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import {
  ILoggerPort,
  ServiceResponseDtoBase, ServiceResponseFactory,
  UseCaseBase,
} from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import {
  CollectStatisticCommand,
} from '@modules/statistic/application/use-cases/collect-statistic/collect-statistic.command';
import { ICollectStatisticReq } from '@src/infrastructure/interfaces/statistic/collect-statistic-req.interface';
import { IAppUnitOfWork } from '@src/infrastructure/interfaces/uow/app-unit-of-work.interface';
import { InjectTokens } from '@src/infrastructure/types/inject-tokens';

@CommandHandler(CollectStatisticCommand)
export class CollectStatisticUseCase extends UseCaseBase<ICollectStatisticReq, Error> {

  constructor(
    private readonly _eventBus: EventBus,
    @Inject(InjectTokens.AppUnitOfWork)
    protected readonly _unitOfWork: IAppUnitOfWork,
    @Inject(InjectTokens.Logger)
    private readonly _logger: ILoggerPort,
  ) {
    super(_unitOfWork);
  }

  public async handle(
    command: CollectStatisticCommand,
  ): Promise<ServiceResponseDtoBase<any>> {
    await Promise.resolve(command);
    return ServiceResponseFactory.ok({
      ip: '',
    });
  }

}
