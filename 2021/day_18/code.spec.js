import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(4140);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(3981);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(3993);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(4687);
  });
});
