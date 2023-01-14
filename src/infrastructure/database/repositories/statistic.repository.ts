import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MongoBaseRepository } from '@wildegor/common.nodepack.boilerplate/modules/src/core';
import { FilterQuery, Model, QueryOptions, SaveOptions } from 'mongoose';
import { StatisticOrmMapper } from '@src/infrastructure/database/mappers/statistic.mapper';
import { StatisticDomain } from '@src/infrastructure/domain/statistic-domain';
import { IStatisticDocument } from '@src/infrastructure/interfaces/schemas/statistic.interface';
import {
  IStatisticFilter,
  IStatisticRepository,
} from '@src/infrastructure/interfaces/statistic/statistic-repository.interface';
import { StatisticOrmModel } from '@src/infrastructure/schemas/statistic.schema';
import { SchemaNames } from '@src/infrastructure/types/schema-names';

@Injectable()
export class StatisticRepository
  extends MongoBaseRepository<
  StatisticOrmModel,
  StatisticDomain,
  IStatisticFilter,
  SaveOptions,
  QueryOptions
  >
  implements IStatisticRepository {

  constructor(
  @InjectModel(SchemaNames.STATISTIC)
    model: Model<IStatisticDocument>,
    mapper: StatisticOrmMapper,
  ) {
    super(model, mapper);
  }

  protected prepareFilter(
    query: Partial<IStatisticFilter>,
  ): FilterQuery<IStatisticDocument> {
    const filter: FilterQuery<IStatisticDocument> = {};

    if (query?.ip) {
      Object.assign(filter, {
        ip: {
          $eq: filter.ip,
        },
      });
    }

    return filter;
  }

}
