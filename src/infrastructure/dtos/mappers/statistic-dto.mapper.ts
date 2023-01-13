import { StatisticDomain } from '@src/infrastructure/domain/statistic-domain';
import { ISimpleStatistic } from '@src/infrastructure/interfaces/statistic/simple-statistic.interface';

export class StatisticDtoMapper {

  public static fromDomainToSimpleStatisticDTO(domain: StatisticDomain): ISimpleStatistic | null {
    if (!domain) {
      return null;
    }
    return {
      ip: domain.ip,
      location: domain.location,
    };
  }

}
