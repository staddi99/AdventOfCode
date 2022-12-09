import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(8);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(984);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(54);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1015320896946);
  });
});
