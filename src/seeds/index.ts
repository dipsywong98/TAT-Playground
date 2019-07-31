import userSeed from './user.seed';
import { createConnection, Repository } from 'typeorm';
import { getUserRepo } from '../repositories';

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
  );
};

export const classUnseeder = (repoGetter: () => Repository<any>) => {
  return repoGetter().clear();
};

export const seed = async () => {
  await classSeeder(getUserRepo, userSeed);
};

export const unseed = async () => {
  await classUnseeder(getUserRepo);
};

export { userSeed };
