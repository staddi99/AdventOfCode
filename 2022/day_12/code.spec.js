import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(31);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(408);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(29);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(399);
  });
});
