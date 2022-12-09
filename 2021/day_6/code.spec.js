import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(5934);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(349549);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(26984457539);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1589590444365);
  });
});
