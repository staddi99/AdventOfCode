import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(127);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(22477624);
  });
});

describe('part 2', () => {
  it.skip('should solve sample input', () => {
    expect(partTwo(true)).toBe(62);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2980044);
  });
});
