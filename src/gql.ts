import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    testMessage: String!
  }
`;

export const resolvers = {
  Query: {
    testMessage: (): string => {
      return 'Hello Kitty!';
    },
  },
};

export default { typeDefs, resolvers };
