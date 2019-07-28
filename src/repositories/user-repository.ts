import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { User } from '../models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByUsernamePassword(username: string, password: string) {
    return this.findOne({ username, password });
  }
}

export const getUserRepo = () => getCustomRepository(UserRepository);
