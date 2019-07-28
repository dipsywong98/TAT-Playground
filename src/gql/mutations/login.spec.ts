import { login } from './login';

jest.mock('../../repositories/user-repository');
jest.mock('../../models/user');

describe('mutation/login', () => {
  it('should return access tocket and give it to redis if user have usename and password are in database', async done => {
    const actual = await login(undefined, {
      username: 'admin',
      password: 'admin',
    });
    console.log(actual);
    expect(actual).toBeTruthy();
    done();
  });
});
