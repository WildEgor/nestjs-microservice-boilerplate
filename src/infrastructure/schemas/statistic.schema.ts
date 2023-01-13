import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IStatisticSchema } from '@src/infrastructure/interfaces/schemas/statistic.interface';
import { BaseMongoModel } from '@src/infrastructure/schemas/common.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  id: true,
  toJSON: {
    getters: true,
    virtuals: true,
  },
  toObject: {
    getters: true,
    virtuals: true,
  },
})
export class StatisticOrmModel extends BaseMongoModel implements IStatisticSchema {

  @Prop()
    ip: string;

}

export type StatisticDocument = StatisticOrmModel & Document;

export const StatisticSchema = SchemaFactory.createForClass(StatisticOrmModel);
