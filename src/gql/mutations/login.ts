import { gql, IResolvers } from 'apollo-server';
import { passwordAuth } from '../../utils/auth/password';
import { GqlError } from '../gql-error';

export const typeDef = gql`
  extend type Mutation {
    login(username: String!, password: String!): String!
  }
`;

export const resolver: IResolvers = {
  Mutation: {
    login: async (
      _,
      { username, password }: { username: string; password: string }
    ): Promise<string> => {
      if (await passwordAuth(username, password)) {
        return 'pong ' + username + ' ' + password;
      } else {
        throw new GqlError('invalid login username or password');
      }
    },
  },
};
