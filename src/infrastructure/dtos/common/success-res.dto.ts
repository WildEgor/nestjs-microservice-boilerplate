import { Field, ObjectType } from '@nestjs/graphql';
import { IServiceVoidData } from '@wildegor/common.nodepack.boilerplate/modules/src/core/microservices';

@ObjectType()
export class SuccessResDto implements IServiceVoidData {

  @Field()
    message: string;

  @Field()
    status: boolean;

}
