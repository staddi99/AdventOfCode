import { partOne, partTwo } from './code';

describe('part 1', () => {
  it.skip('should solve sample input', () => {
    expect(partOne(true)).toBe(110);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(4114);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(20);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(970);
  });
});
