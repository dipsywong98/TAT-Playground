import createLogger from '../logger';
const logger = createLogger('gql');

export const formatError = (error: any) => {
  if (error.extensions.exception.name === 'GqlError') {
    return error.message;
  } else {
    logger.error(JSON.stringify(error, null, 2));
    return 'Unexpected Internal Error';
  }
};
