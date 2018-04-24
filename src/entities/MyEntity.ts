import { ObjectType, Field } from 'type-graphql';

@ObjectType()
export class MyEntity {
  @Field() id: number;
}
