import { partOne, partTwo } from './code';

describe('part 1', () => {
  /* it('should solve sample input', () => {
    expect(partOne(true)).toBe(3500);
  }); */

  it('should solve own input', () => {
    expect(partOne()).toBe(3166704);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe();
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(8018);
  });
});
