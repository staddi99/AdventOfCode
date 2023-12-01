import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(142);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(54916);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(281);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(54728);
  });
});
