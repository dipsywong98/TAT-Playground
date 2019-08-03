import { getRepository } from 'typeorm';
import { User } from '../models/user';

const repo = () => getRepository(User);
const userByUsernamePassword = (username: string, password: string) => {
  return repo().findOne({ username, password });
};

export default { userByUsernamePassword, getUserRepo: repo };
