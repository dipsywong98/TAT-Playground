import { getUserRepo as actual } from '../../src/repositories/';
import { getUserRepo as mock } from '../../src/repositories/__mocks__/';
import { createConnection } from 'typeorm';
import ORMConfig from '../../src/config/orm';

beforeAll(async (done) => {
  await createConnection(ORMConfig);
  done();
});

for (const [name, getter] of Object.entries({ actual, mock })) {
  describe(`${name} UserRepository`, () => {
    describe('findByUsernamePassword', () => {
      it('should return the user if username password pair exists', async (done) => {
        const repo = getter();
        const user = await repo.findByUsernamePassword('admin', 'admin');
        expect(user && user.username).toBe('admin');
        done();
      });

      it('should return undefined if username password pair not exist', async (done) => {
        const repo = getter();
        const user = await repo.findByUsernamePassword(
          'random guy',
          'dont have password',
        );
        expect(user).toBe(undefined);
        done();
      });
    });
  });
}
