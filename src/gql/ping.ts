import { gql, IResolvers } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDef = gql`
  extend type Query {
    ping: String!
  }
`;

export const resolver: IResolvers = {
  Query: {
    ping: (): string => {
      return 'pong';
    },
  },
};
