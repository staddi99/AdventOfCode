import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(4512);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(89001);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(1924);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(7296);
  });
});
