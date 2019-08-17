# Playground - TAT

> Apollo with TypeORM = At = Astatine

## Getting start

```sh
npm i         # install all dependencies

npm run watch # start webpack HMR watcher
npm run dev   # start development server
npm run both  # concurrently run both of above

npm run build # build production server
npm run start # start production server

npm run lint  # project linting
npm run test  # project testing
npm run test:fast  # fast test only

# seeding
npm run seed:<env>
npm run unseed:<env>
npm run reseed:<env>
```

set the API key in `.env` to control who can access the server

## Manage the entities of typeorm

1. create the model file in `src/models`, currently is using the prepository strategy,
   such that construction of entity does not require a database connection to speed up testing

you may compare active record and data mapper (without/ with seperated repository) [here](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)

```ts
// src/models/user.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;
}
```

2. Manually add the model to `entities` field of `src/config/orm` , since typeorm does not support HMR
   well that, you need to specify the entities manually or else typescript syntax will collapse

```ts
import { ConnectionOptions } from 'typeorm';
import { User } from '../models/user';

export const ormConfig: ConnectionOptions = {
  //...
  entities: [User],
  //...
};
```

3. Define some methods for user repositories

```ts
import { getRepository } from 'typeorm';
import { User } from '../models/user';

const repo = () => getRepository(User);
const findOneByUsernamePassword = (username: string, password: string) => {
  return repo().findOne({ username, password });
};

export default { findOneByUsernamePassword, getRepo: repo };
```

4. Use the models in your code

```ts
import { User } from '../models/user';
import userRepo from '../repositories/user';

// example how to save AR entity
const user = new User();
user.firstName = 'Timber';
user.lastName = 'Saw';
user.isActive = true;
await userRepo.getRepo().save(user);
await userRepo.findOneByUsernamePassword('user', 'password');
```

5. Mock the output of helper in test

```ts
// login.fast.spec.ts
import { login } from './login';
import user from 'src/repositories/user';
import { User } from 'src/models';
import { promise } from 'src/utils';
user.findOneByUsernamePassword = jest.fn().mockReturnValue(promise(new User()));
describe('mutation/login', () => {
  it('demo how to mock a function', async done => {
    const actual = await login(undefined, {
      username: 'admin',
      password: 'admin',
    });
    expect(actual).toBeTruthy();
    done();
  });
});
```
