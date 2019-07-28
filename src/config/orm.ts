import { ConnectionOptions, EntitySchema } from 'typeorm';
import { User } from '../models/user';

declare var process: {
  env: {
    NODE_ENV: 'prod' | 'dev' | 'test';
  };
};

const entities: any = [User];

const prod: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'zinc',
  synchronize: true,
  logging: false,
  entities,
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

const dev: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'zinc-dev',
  synchronize: true,
  logging: false,
  entities,
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

const test: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'zinc-test',
  synchronize: true,
  logging: false,
  entities,
  migrations: ['src/migrations/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};

const ORMConfig = { prod, dev, test }[process.env.NODE_ENV];
export = ORMConfig;
