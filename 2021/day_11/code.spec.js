import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(1656);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(1675);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(195);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(515);
  });
});
