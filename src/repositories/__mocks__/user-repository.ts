// import { UserRepository } from '../user-repository';
import { User } from '../../models/user';

class MockUserRepository {
  dictionary: { [key: string]: string } = {
    admin: 'admin',
    student: 'student',
  };
  async findByUsernamePassword(username: string, password: string) {
    console.log('mocked called');
    if (this.dictionary[username] === password) {
      const user = new User();
      user.username = username;
      user.password = password;
      return user;
    } else {
      return undefined;
    }
  }
}

export const getUserRepo = () => new MockUserRepository();
