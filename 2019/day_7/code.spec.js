import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(45730);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(45730);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(5406484);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(5406484);
  });
});
