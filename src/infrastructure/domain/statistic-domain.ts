import { AggregateRoot } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { IReqStatisticCreateAttr, IStatistic } from '@src/infrastructure/interfaces/schemas/statistic.interface';

export class StatisticDomain extends AggregateRoot<IStatistic> {

  public readonly id = this.props.id;
  public isDeleted = this.props.isDeleted;
  public deletedAt = this.props.deletedAt;
  public createdAt = this.props.createdAt;
  public updatedAt = this.props.updatedAt;

  public get ip(): string {
    return this.props.ip;
  }

  public set ip(value: string) {
    this.props.ip = value;
  }

  public static create(props: IReqStatisticCreateAttr): StatisticDomain {
    return new StatisticDomain({
      ...props,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  public static transform(props: IStatistic): StatisticDomain {
    return new StatisticDomain(props);
  }

  public get location() {
    return '';
  }

}
