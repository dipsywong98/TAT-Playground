process.env.NODE_ENV = process.env.NODE_ENV || 'test';
import { createConnection } from 'typeorm';
import ORMConfig from '../src/config/orm';
import { seed, unseed } from '../src/seeds';
import { execSync } from 'child_process';
const jest = require('jest');

const main = async () => {
  console.log('main');
  await createConnection(ORMConfig);
  console.log('created connection');
  await beforeTest();
  console.log('done seeding');
  await doTest();
  console.log('done test');
  await afterTest();
  console.log('cleared db');
  process.exit(0);
};

const beforeTest = async () => {
  await seed();
};

const doTest = async () => {
  try {
    execSync('npm run test', { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
};

const afterTest = async () => {
  await unseed();
};

main();
