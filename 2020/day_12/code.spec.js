import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(25);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(319);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(286);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(50157);
  });
});
