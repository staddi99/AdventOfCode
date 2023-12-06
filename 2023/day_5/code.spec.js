import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(35);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(551761867);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(46);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(57451709);
  });
});
