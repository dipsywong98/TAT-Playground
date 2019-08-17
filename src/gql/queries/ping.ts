import { gql, IResolvers } from 'apollo-server';

export const typeDef = gql`
  extend type Query {
    ping: String!
  }
`;

export const resolver: IResolvers = {
  Query: {
    ping: (_: any, __: any, { username }): string => {
      return username;
    },
  },
};
