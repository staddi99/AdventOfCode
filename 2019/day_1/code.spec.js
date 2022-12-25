import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(33583);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(3269199);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(50346);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(4900909);
  });
});
