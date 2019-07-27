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
```

set the API key in `.env` to control who can access the server

## Manage the entities of typeorm

1. create the model file in `src/entities`, currently is using the Active Record strategy,
   such that each time you don't need to get repository before doing query or editing single entity

you may compare active record and data mapper (without/ with seperated repository) [here](https://github.com/typeorm/typeorm/blob/master/docs/active-record-data-mapper.md)

```ts
// src/entities/user.ts
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  static findByName(firstName: string, lastName: string) {
    return this.createQueryBuilder('user')
      .where('user.firstName = :firstName', { firstName })
      .andWhere('user.lastName = :lastName', { lastName })
      .getMany();
  }
}
```

2. Manually add the model to `entities` field of `src/config/orm` , since typeorm does not support HMR
   well that, you need to specify the entities manually or else typescript syntax will collapse

```ts
import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/user';

export const ormConfig: ConnectionOptions = {
  //...
  entities: [User],
  //...
};
```

3. Use the models in your code

```ts
import { User } from '../entities/user';

// example how to save AR entity
const user = new User();
user.firstName = 'Timber';
user.lastName = 'Saw';
user.isActive = true;
await user.save();

// example how to remove AR entity
await user.remove();

// example how to load AR entities
const users = await User.find({ skip: 2, take: 5 });
const newUsers = await User.find({ isActive: true });
const timber = await User.findOne({ firstName: 'Timber', lastName: 'Saw' });

// the use of static custom query method
const byCustomQuery = await User.findByName('Hello', 'World');
```
