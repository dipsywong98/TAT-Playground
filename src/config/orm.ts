import { ConnectionOptions, EntitySchema } from 'typeorm';
import { User } from '../models/user';

declare var process: {
  env: {
    NODE_ENV: 'production' | 'development' | 'test';
  };
};

const entities: any = [User];

const production: ConnectionOptions = {
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

const development: ConnectionOptions = {
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

const ORMConfig = { production, development, test }[process.env.NODE_ENV];
export = ORMConfig;
