import user from './user';
import { createConnection } from 'typeorm';

import ORMConfig from '../config/orm';

beforeAll(async (done) => {
  await createConnection(ORMConfig);
  await user.getUserRepo().clear();
  await user.getUserRepo().save([
    {
      username: 'admin',
      password: 'admin',
    },
    {
      username: 'student',
      password: 'student',
    },
  ]);
  done();
});

describe('user repository', () => {
  describe('by username and password', () => {
    it('exist', async (done) => {
      expect(await user.userByUsernamePassword('admin', 'admin')).toBeTruthy();
      done();
    });
    it('not exist', async (done) => {
      expect(await user.userByUsernamePassword('admin', 'xxx')).toBeFalsy();
      done();
    });
  });
});
