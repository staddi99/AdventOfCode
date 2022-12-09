import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(27);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(5218);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(3080);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(15527);
  });
});
