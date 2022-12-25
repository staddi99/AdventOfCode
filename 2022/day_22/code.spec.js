import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(6032);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(65368);
  });
});

describe('part 2', () => {
  it.skip('should solve sample input', () => {
    expect(partTwo(true)).toBe(5031);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(156166);
  });
});
