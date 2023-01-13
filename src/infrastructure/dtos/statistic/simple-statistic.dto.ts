import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SimpleStatisticDto {

  @Field()
    ip: string;

}
