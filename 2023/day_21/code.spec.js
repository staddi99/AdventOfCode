import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(16);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(3660);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(16733044);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(605492675373144);
  });
});
