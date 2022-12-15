import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(10);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(373);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(2208);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(3917);
  });
});
