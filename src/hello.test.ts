import { foo } from './repositories/foo';
import { hello } from './hello';

describe('hello world', () => {
  it('should return bar if not mocked', () => {
    expect(hello()).toBe('bar');
  });

  it('should return mocked if mocked', () => {
    const mock = jest.spyOn(foo, 'bar');
    mock.mockReturnValueOnce('mocked');
    expect(hello()).toBe('mocked');
  });
});
