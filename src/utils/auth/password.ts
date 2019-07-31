import { User } from '../../models/user';
import { getUserRepo } from '../../repositories/';

export const passwordAuth = async (
  username: string,
  password: string,
): Promise<User | undefined> => {
  return getUserRepo().findByUsernamePassword(username, password);
};
