import { foo } from './repositories/foo';
export const hello = () => {
  return foo.bar();
};
