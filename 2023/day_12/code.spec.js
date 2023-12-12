import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(21);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(8075);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(525152);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(4232520187524);
  });
});
