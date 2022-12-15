import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(220);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(2263);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(19208);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(396857386627072);
  });
});
