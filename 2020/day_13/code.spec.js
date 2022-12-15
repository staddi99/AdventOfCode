import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(295);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(171);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(1068781);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(539746751134958);
  });
});
