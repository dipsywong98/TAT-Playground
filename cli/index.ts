process.env.NODE_ENV = process.env.NODE_ENV || 'test';
import { createConnection } from 'typeorm';
import ORMConfig from '../src/config/orm';
import { seed, unseed } from '../src/seeds';
import { execSync } from 'child_process';

type fn = () => Promise<any>;

const main = async (argv: string[], seeder: fn, unseeder: fn, tester: fn) => {
  console.log(process.env.NODE_ENV);
  await createConnection(ORMConfig);
  console.log('created connection');

  if (argv[2] === 'test') {
    await unseeder();
    await seeder();
    await tester();
  } else if (argv[2] === 'seed') {
    await seeder();
  } else if (argv[2] === 'unseed') {
    await unseeder();
  } else if (argv[2] === 'reseed') {
    await unseeder();
    await seeder();
  } else {
    console.log('unknown option ' + argv[2]);
    process.exit(1);
  }
  process.exit(0);
};

const test = async () => {
  try {
    execSync('npm run test', { stdio: 'inherit' });
  } catch (e) {
    process.exit(1);
  }
};

main(process.argv, seed, unseed, test);
