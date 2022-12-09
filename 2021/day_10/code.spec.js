import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(26397);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(215229);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(288957);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1105996483);
  });
});
