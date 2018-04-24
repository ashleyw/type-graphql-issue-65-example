import { GraphQLScalarType, Kind } from 'graphql';

export interface CursorID {
  id: number | string;
}

export interface CursorPaged {
  skip: number;
}

export type Cursor = CursorID | CursorPaged;

export const CursorScalar = new GraphQLScalarType({
  name: 'CursorScalar',
  description: 'Pagination cursor',

  parseValue(value: string): Cursor {
    return <Cursor>JSON.parse(Buffer.from(value, 'base64').toString('ascii'));
  },

  serialize(value: Cursor) {
    return Buffer.from(JSON.stringify(value)).toString('base64');
  },

  parseLiteral(ast): Cursor | null {
    if (ast.kind === Kind.STRING) {
      return <Cursor>JSON.parse(Buffer.from(ast.value, 'base64').toString('ascii'));
    }
    return null;
  },
});
