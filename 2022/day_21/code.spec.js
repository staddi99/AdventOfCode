import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(152);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(62386792426088);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(301);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(3876027196185);
  });
});
