import { getRepository } from 'typeorm';
import { User } from '../models/user';

const repo = () => getRepository(User);
const findOneByUsernamePassword = (username: string, password: string) => {
  return repo().findOne({ username, password });
};

export default { findOneByUsernamePassword, getRepo: repo };
