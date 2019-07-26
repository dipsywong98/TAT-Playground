import { ApolloServer, PubSub } from 'apollo-server';
import { base } from './base';
import { formatError } from './format-error';

const modules = [
  base,
  require('./queries/ping'),
  require('./queries/ping2'),
  require('./mutations/login'),
];

// export const resolvers:IResolvers = modules.map(m => m.resolver).filter(res => !!res);
const typeDefs = modules.map(m => m.typeDef).filter(res => !!res);

const resolvers = modules.reduce((prev, { resolver }) => {
  Object.keys(resolver).forEach(key => {
    Object.keys(resolver[key]).forEach(method => {
      if (!(key in prev)) {
        prev[key] = { [method]: resolver[key][method] };
      } else {
        prev[key][method] = resolver[key][method];
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
