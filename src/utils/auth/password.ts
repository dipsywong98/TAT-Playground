import { User } from '../../models/user';
import { UserRepository } from '../../repositories';
import { getCustomRepository } from 'typeorm';
import { getUserRepo } from '../../repositories/';

const dictionary: { [key: string]: string } = {
  admin: 'admin',
  student: 'student',
};

// export const passwordAuth = async (
//   username: string,
//   password: string
// ): Promise<boolean> => {
//   return dictionary[username] === password;
// };

export const passwordAuth = async (
  username: string,
  password: string
): Promise<User | undefined> => {
  return getUserRepo().findByUsernamePassword(username, password);
};
