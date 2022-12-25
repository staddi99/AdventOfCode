import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(54);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(142497);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(4);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(301);
  });
});
