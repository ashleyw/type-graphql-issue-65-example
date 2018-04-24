import 'reflect-metadata';

import { GraphQLServer } from 'graphql-yoga';

import { Container } from 'typedi';
import * as TypeGraphQL from 'type-graphql';
import { GraphQLSchema } from 'graphql';
// import { Cursor, CursorScalar } from './scalars/Cursor';

// register 3rd party IOC container
TypeGraphQL.useContainer(Container);

const yogaOptions = {
  playground: <false | string>(process.env.ENV === 'production' ? false : '/'),
  formatError: TypeGraphQL.formatArgumentValidationError,
  port: process.env.PORT || 4000,
};

async function bootstrap() {
  const schema = <GraphQLSchema>await TypeGraphQL.buildSchema({
    resolvers: [`${__dirname}/resolvers/**/*.ts`],
    // scalarsMap: [{ type: Object, scalar: CursorScalar }],
  });

  const server = new GraphQLServer({ schema });
  const httpServer = await server.start(yogaOptions, () =>
    console.log('Server is running on localhost:4000'),
  );

  httpServer.timeout = 3600 * 1000; // 1 hour
  httpServer.keepAliveTimeout = 300; // 5 minutes
}

bootstrap();
