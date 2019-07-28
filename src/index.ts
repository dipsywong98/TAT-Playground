import { server } from './gql';
import { createConnection, Connection, getConnection } from 'typeorm';
import ORMConfig from './config/orm';
import { main } from './main';

// /index.ts does not support HMR, dont try to debug this
// it is expected that if this file changes, there will be either database connection error or apollo addr in use error

let dbConnection: Connection | null = null;

const bootstrap = async () => {
  await stop();
  try {
    dbConnection = await createConnection(ORMConfig);
  } catch (e) {
    dbConnection = await getConnection('default');
  }
  console.log('db connected');
  const { url } = await server.listen();
  console.log(`Apollo Server ready at ${url}. `);

  main();
};

const stop = async () => {
  const closePromises: Promise<any>[] = [];
  try {
    closePromises.push(server.stop());
  } catch (error) {
    console.log('stop apollo server with error: ', error);
  }
  await Promise.all(closePromises);
};

console.log('attempt to open');

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    console.log('hot module disposed');
    stop();
  });
} else {
  console.log('not hot');
}

bootstrap();
