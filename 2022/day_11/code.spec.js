import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(10605);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(110264);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(2713310158);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(23612457316);
  });
});
