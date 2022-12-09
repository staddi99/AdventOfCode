import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(12521);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(18300);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(44169);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(50190);
  });
});
