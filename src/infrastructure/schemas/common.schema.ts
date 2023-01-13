import { Prop } from '@nestjs/mongoose';
import { MongooseModelBase } from '@wildegor/common.nodepack.boilerplate/modules/src/core';

export class BaseMongoModel extends MongooseModelBase {

  @Prop({ default: false })
    is_deleted: boolean;

  @Prop({ default: null })
    deleted_at: Date;

}
