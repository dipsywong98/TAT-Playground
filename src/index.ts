import { server } from './gql';
import { createConnection, Connection, getConnection } from 'typeorm';
import ORMConfig from './config/orm';
import { main } from './main';
import createLogger from './logger';
const logger = createLogger('index');

// /index.ts does not support HMR, dont try to debug this
// it is expected that if this file changes, there will be either database connection error or apollo addr in use error

const bootstrap = async () => {
  await stop();
  logger.info(`environment: ${process.env.NODE_ENV}`);
  try {
    await createConnection(ORMConfig);
  } catch (e) {
    await getConnection('default');
  }
  logger.info('Database connected');
  const { url } = await server.listen();
  logger.info(`Apollo Server ready at ${url}. `);

  main();
};

const stop = async () => {
  const closePromises: Array<Promise<any>> = [];
  try {
    closePromises.push(server.stop());
  } catch (error) {
    logger.error('stop apollo server with error: ', error);
  }
  await Promise.all(closePromises);
};

logger.info('attempt to open');

if (module.hot) {
  module.hot.accept();
  module.hot.dispose(() => {
    logger.info('hot module disposed');
    stop();
  });
} else {
  logger.info('not hot');
}

bootstrap();
