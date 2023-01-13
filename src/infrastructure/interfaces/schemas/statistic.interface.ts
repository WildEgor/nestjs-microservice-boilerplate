import { IModelBase } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';
import { IDefaultDocument } from '@src/infrastructure/interfaces/schemas/default-document.interface';

export interface IReqStatisticCreateAttr {
  ip: string;
}

export interface IIPStatistic {
  country: string;
}

export interface IStatistic extends IModelBase<string>, IReqStatisticCreateAttr {
  statistic?: IIPStatistic;
}

export interface IStatisticSchema {
  ip: string;
}

export interface IStatisticDocument extends IDefaultDocument, IStatisticSchema {}
