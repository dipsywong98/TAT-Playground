import { ApolloServer, PubSub } from 'apollo-server';
import { base } from './base';
import { formatError } from './format-error';
import createLogger from '../logger';
const logger = createLogger('gql');

// tslint:disable: no-var-requires
const modules = [
  base,
  require('./queries/ping'),
  require('./queries/ping2'),
  require('./mutations/login'),
];

const typeDefs = modules.map((m) => m.typeDef).filter((res) => !!res);

const withLogger = (
  signature: string,
  operation: string,
  resolver: (...params: any) => Promise<any>,
) => async (...params: any) => {
  if (operation !== 'login') {
    logger.info(
      `[${signature}:${operation}] payload: ${JSON.stringify(params[1])}`,
    );
  } else {
    logger.info(
      `[${signature}:${operation}] user '${
        params[1].username
      }' attempt to login`,
    );
  }
  const response = await resolver(...params);
  if (operation !== 'login') {
    logger.info(response);
  } else {
    logger.info(`${params[1].username} login success`);
  }
  return response;
};

const resolvers = modules.reduce((prev, { resolver }) => {
  Object.keys(resolver).forEach((key) => {
    Object.keys(resolver[key]).forEach((operation) => {
      const fn = withLogger(key, operation, resolver[key][operation]);
      if (!(key in prev)) {
        prev[key] = { [operation]: fn };
      } else {
        prev[key][operation] = fn;
      }
    });
  });
  return prev;
}, {});

const pubsub = new PubSub();
export const server = new ApolloServer({
  resolvers,
  typeDefs,
  context: { pubsub },
  formatError,
});
