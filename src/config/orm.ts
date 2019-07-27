import { ConnectionOptions } from 'typeorm';
import { User } from '../entities/user';

export const ormConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'zinc',
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
};
