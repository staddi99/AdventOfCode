import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(3068);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(3141);
  });
});

describe('part 2', () => {
  /* it('should solve sample input', () => {
    expect(partTwo(true)).toBe(1514285714288);
  }); */

  it('should solve own input', () => {
    expect(partTwo()).toBe(1561739130391);
  });
});
