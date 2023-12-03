import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(4361);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(556057);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(467835);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(82824352);
  });
});
