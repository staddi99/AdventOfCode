import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(1588);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(2509);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(2188189693529);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2827627697643);
  });
});
