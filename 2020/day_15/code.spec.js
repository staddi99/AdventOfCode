import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(436);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(1259);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(175594);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(689);
  });
});
