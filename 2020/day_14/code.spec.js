import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(165);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(15514035145260);
  });
});

describe('part 2', () => {
  /* it('should solve sample input', () => {
    expect(partTwo(true)).toBe(208);
  }); */

  it('should solve own input', () => {
    expect(partTwo()).toBe(3926790061594);
  });
});
