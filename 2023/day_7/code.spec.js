import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(6440);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(252656917);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(5905);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(253499763);
  });
});
