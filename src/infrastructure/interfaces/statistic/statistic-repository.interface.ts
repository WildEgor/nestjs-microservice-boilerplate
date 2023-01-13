import { IRepositoryPort } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { QueryOptions, SaveOptions } from 'mongoose';
import { StatisticDomain } from '@src/infrastructure/domain/statistic-domain';
import { IStatisticDocument } from '@src/infrastructure/interfaces/schemas/statistic.interface';

export interface IStatisticFilter {
  ip: string;
}

export interface IStatisticRepository extends IRepositoryPort<
IStatisticDocument,
StatisticDomain,
IStatisticFilter,
SaveOptions,
QueryOptions> {
}
