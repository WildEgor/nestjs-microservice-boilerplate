import { CommandBus } from '@nestjs/cqrs';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IServiceVoidData, ResultFactory } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import {
  CollectStatisticCommand,
} from '@modules/statistic/application/use-cases/collect-statistic/collect-statistic.command';
import {
  CollectStatisticInput,
} from '@modules/statistic/application/use-cases/collect-statistic/dtos/collect-statistic.dto';
import { ExtractIpData } from '@shared/decorators/extract-ip-data.decorator';
import { SuccessResDto } from '@src/infrastructure/dtos/common/success-res.dto';
import { IIpData } from '@src/infrastructure/interfaces/statistic/ip-data.interface';

@Resolver()
// @UseInterceptors(LoggerInterceptor)
export class StatisticResolver {

  constructor(
    // private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
    // eslint-disable-next-line no-empty-function
  ) {
  }

  @Mutation(() => SuccessResDto, {
    name: 'collectStatistic',
    description: 'Collect user ip data',
  })
  public async collectStatistic(
    @Args('input') dto: CollectStatisticInput,
      @ExtractIpData() ipData: IIpData,
  ): Promise<IServiceVoidData> {
    await this._commandBus.execute(new CollectStatisticCommand({
      ipData,
      word: dto.word,
    }));
    return ResultFactory.voidOk().data;
  }

}
