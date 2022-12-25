import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)[0]).toBe(41);
  });

  it('should solve own input', () => {
    expect(partOne()[0]).toBe(303);
  });
});

describe('part 2', () => {
  it.skip('should solve sample input', () => {
    expect(partTwo(true)).toBe(802);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(408);
  });
});
