import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(514579);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(928896);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(241861950);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(295668576);
  });
});
