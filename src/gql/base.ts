import { gql } from 'apollo-server';

const echo = (_: any, { message }: { message: String }): String => message;

export const base = {
  typeDef: gql`
    type Query {
      echo(message: String!): String!
    }

    type Mutation {
      echo(message: String!): String!
    }
  `,
  resolver: {
    Query: {
      echo,
    },
    Mutation: {
      echo,
    },
  },
};
