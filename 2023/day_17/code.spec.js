import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(102);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(866);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(71);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1010);
  });
});
