import { Injectable } from '@nestjs/common';
import { OrmEntityProps, OrmMapper } from '@wildegor/common.nodepack.boilerplate/modules/src/core';
import { StatisticDomain } from '@src/infrastructure/domain/statistic-domain';
import { IStatistic } from '@src/infrastructure/interfaces/schemas/statistic.interface';
import { StatisticOrmModel } from '@src/infrastructure/schemas/statistic.schema';

@Injectable()
export class StatisticOrmMapper extends OrmMapper<StatisticDomain, StatisticOrmModel> {

  protected toOrm(entity: IStatistic): OrmEntityProps<StatisticOrmModel> {
    if (!entity) {
      return null;
    }
    const props = StatisticDomain.transform(entity);
    return {
      ip: props.ip,
      is_deleted: props.isDeleted,
      deleted_at: props.deletedAt,
    };
  }

  protected toDomain(ormEntity: StatisticOrmModel): StatisticDomain {
    if (!ormEntity) {
      return null;
    }
    const id = ormEntity.id;
    const props: IStatistic = {
      ip: ormEntity.ip,
      isDeleted: ormEntity.isDeleted,
      deletedAt: ormEntity.deleted_at,
      createdAt: ormEntity.createdAt,
      updatedAt: ormEntity.updatedAt,
    };
    return StatisticDomain.transform({
      id,
      ...props,
    });
  }

}
