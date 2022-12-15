import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(112);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(424);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(848);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2460);
  });
});
