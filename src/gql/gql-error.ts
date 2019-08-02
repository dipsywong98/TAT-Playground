export class GqlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'GqlError';
  }
}
