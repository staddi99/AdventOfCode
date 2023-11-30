import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(54321);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(45730);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(139629729);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(5406484);
  });
});
