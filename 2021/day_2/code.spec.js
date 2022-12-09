import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(150);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(2187380);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(900);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2086357770);
  });
});
