import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(86);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(3962);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(22);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1844);
  });
});
