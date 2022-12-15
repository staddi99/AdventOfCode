import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(11);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(6878);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(6);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(3464);
  });
});
