import { Resolver, Arg, Query } from 'type-graphql';
import { CursorScalar, Cursor } from '../scalars/Cursor';
import { MyEntity } from '../entities/MyEntity';

@Resolver(MyEntity)
export class MyResolver {
  @Query(returns => MyEntity)
  myQuery(
    @Arg('cursor', type => CursorScalar, { nullable: true })
    cursor: Cursor,
  ): MyEntity {
    console.log(cursor);
    return { id: 1 };
  }
}
