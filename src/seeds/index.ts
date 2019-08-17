import userSeed from './user.seed';
import { Repository } from 'typeorm';
import user from '../repositories/user';

export const classSeeder = (
  repoGetter: () => Repository<any>,
  seeds: Array<{ [key: string]: any }>,
) => {
  return Promise.all(
    seeds.map(
      (attr): Promise<any> => {
        const object = repoGetter().create(attr);
        return repoGetter().save(object);
      },
    ),
  ).then(() => {
    // tslint:disable-next-line: no-console
    console.log(`Done seeding ${repoGetter().constructor.name}`);
  });
};

export const classUnseeder = (repoGetter: () => Repository<any>) => {
  return repoGetter()
    .clear()
    .then(() => {
      // tslint:disable-next-line: no-console
      console.log(`Done unseeding ${repoGetter().constructor.name}`);
    });
};

export const seed = async () => {
  await classSeeder(user.getRepo, userSeed);
};

export const unseed = async () => {
  await classUnseeder(user.getRepo);
};

export { userSeed };
