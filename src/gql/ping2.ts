import { gql, IResolvers } from 'apollo-server';
import { DocumentNode } from 'graphql';

export const typeDef = gql`
  extend type Query {
    ping2: String!
  }
`;

export const resolver: IResolvers = {
  Query: {
    ping2: (): string => {
      return 'pong2';
    },
  },
};
