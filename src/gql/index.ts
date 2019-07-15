import { gql } from 'apollo-server';

// import { IResolvers } from 'apollo-server';

const base = {
  typeDef: gql`
    type Query {
      hi: String!
    }
  `,
  resolver: {},
};

const modules = [base, require('./ping'), require('./ping2')];

// export const resolvers:IResolvers = modules.map(m => m.resolver).filter(res => !!res);
export const typeDefs = modules.map(m => m.typeDef).filter(res => !!res);

export const resolvers = modules.reduce(
  (prev, { resolver }) => Object.assign(prev, resolver),
  {}
);

// import { resolver, typeDef } from './ping';

// export const resolvers = resolver;

// export const typeDefs = [typeDef];
