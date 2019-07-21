import { gql } from 'apollo-server';

// import { IResolvers } from 'apollo-server';

const echo = (
  _: any,
  { message }: { message: String },
  ___: any,
  ____: any
): String => message;

const base = {
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
      echo
    },
    Mutation: {
      echo
    },
  },
};

const modules = [base, require('./ping'), require('./ping2')];

// export const resolvers:IResolvers = modules.map(m => m.resolver).filter(res => !!res);
export const typeDefs = modules.map(m => m.typeDef).filter(res => !!res);

export const resolvers = modules.reduce((prev, { resolver }) => {
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
