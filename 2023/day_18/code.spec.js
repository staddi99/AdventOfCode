import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(62);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(40714);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(952408144115);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(129849166997110);
  });
});
