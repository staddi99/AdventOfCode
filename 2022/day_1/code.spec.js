import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(24000);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(69795);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(45000);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(208437);
  });
});
