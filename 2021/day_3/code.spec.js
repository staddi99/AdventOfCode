import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(198);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(2648450);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(230);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2845944);
  });
});
