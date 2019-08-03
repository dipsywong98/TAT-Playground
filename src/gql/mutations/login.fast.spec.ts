import { login } from './login';
import user from 'src/repositories/user';
import { User } from 'src/models';
import { promise } from 'src/utils';
user.userByUsernamePassword = jest.fn().mockReturnValue(promise(new User()));
describe('mutation/login', () => {
  it('demo how to mock a function', async (done) => {
    const actual = await login(undefined, {
      username: 'admin',
      password: 'admin',
    });
    expect(actual).toBeTruthy();
    done();
  });
});
