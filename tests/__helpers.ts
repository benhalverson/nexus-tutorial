import { ServerInfo } from 'apollo-server';
import getPort, { makeRange } from 'get-port';
import { GraphQLClient } from 'graphql-request';

import { server } from '../api/server';

type TestContxt = {
  client: GraphQLClient;
};

export function createTestContext(): TestContxt {
  let ctx = {} as TestContxt;
  const graphqlCtx = graphqlTestContext();

  beforeEach(async () => {
    const client = await graphqlCtx.before();
    Object.assign(ctx, { client });
  });

  afterEach(async () => {
    await graphqlCtx.after();
  });
  return ctx;
}

export function graphqlTestContext() {
  let serverInstance: ServerInfo | null = null;
  return {
    async before() {
      const port = await getPort({ port: makeRange(4000, 6000) });
      serverInstance = await server.listen({ port });

      return new GraphQLClient(`http://localhost:${port}`);
    },
    async after() {
      serverInstance?.server.close();
    },
  };
}
