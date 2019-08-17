import { gql, IResolvers } from 'apollo-server';
import { GqlError } from '../gql-error';
import user from '../../repositories/user';

export const typeDef = gql`
  extend type Mutation {
    login(username: String!, password: String!): String!
  }
`;

export const login = async (
  _: any,
  { username, password }: { username: string; password: string },
): Promise<string> => {
  if (await user.findOneByUsernamePassword(username, password)) {
    return 'pong ' + username + ' ' + password;
  } else {
    throw new GqlError('invalid login username or password');
    return '';
  }
};

export const resolver: IResolvers = {
  Mutation: {
    login,
  },
};
