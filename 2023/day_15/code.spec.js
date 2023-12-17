import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(1320);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(505379);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(145);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(263211);
  });
});
