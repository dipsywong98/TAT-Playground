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
