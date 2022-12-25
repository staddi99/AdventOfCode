import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(33);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(1719);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(3348);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(19530);
  });
});
