import { ApolloServer, PubSub } from 'apollo-server';

import { resolvers, typeDefs } from './gql';

const pubsub = new PubSub();
const server = new ApolloServer({ resolvers, typeDefs, context: { pubsub } });

server.listen().then(({ url }) => console.log(`Server ready at ${url}. `));

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    console.log('Module disposed. ');
    server.stop();
  });
}
