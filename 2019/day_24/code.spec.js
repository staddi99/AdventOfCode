import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(2129920);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(18400817);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(99);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1944);
  });
});
