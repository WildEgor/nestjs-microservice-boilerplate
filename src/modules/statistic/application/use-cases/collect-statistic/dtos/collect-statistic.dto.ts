import { Field, InputType } from '@nestjs/graphql';
import { ICollectStatisticReq } from '@src/infrastructure/interfaces/statistic/collect-statistic-req.interface';

@InputType()
export class CollectStatisticInput implements ICollectStatisticReq {

  @Field({ description: 'Something' })
    word!: string;

}
