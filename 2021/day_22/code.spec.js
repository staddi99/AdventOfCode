import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(590784);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(607573);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(2758514936282235);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1267133912086024);
  });
});
