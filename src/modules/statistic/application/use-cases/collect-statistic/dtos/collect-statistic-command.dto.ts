import {
  CollectStatisticInput,
} from '@modules/statistic/application/use-cases/collect-statistic/dtos/collect-statistic.dto';
import { IIpData } from '@src/infrastructure/interfaces/statistic/ip-data.interface';

export class CollectStatisticCommandDto extends CollectStatisticInput {

  ipData: IIpData;

}
