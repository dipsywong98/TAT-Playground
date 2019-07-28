import { gql, IResolvers } from 'apollo-server';
import { passwordAuth } from '../../utils/auth/password';
import { GqlError } from '../gql-error';
import { getUserRepo } from '../../repositories';

export const typeDef = gql`
  extend type Mutation {
    login(username: String!, password: String!): String!
  }
`;

export const login = async (
  _: any,
  { username, password }: { username: string; password: string }
): Promise<string> => {
  if (await getUserRepo().findByUsernamePassword(username, password)) {
    return 'pong ' + username + ' ' + password;
  } else {
    throw new GqlError('invalid login username or password');
  }
};

export const resolver: IResolvers = {
  Mutation: {
    login,
  },
};
