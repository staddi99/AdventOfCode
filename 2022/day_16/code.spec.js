import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(1651);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(1376);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(1707);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1933);
  });
});
