import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(45);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(4186);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(112);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2709);
  });
});
