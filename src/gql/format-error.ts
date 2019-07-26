export const formatError = (error: any) => {
  if (error.name === 'GraphQLError') {
    return error.message;
  } else {
    return error;
  }
};
