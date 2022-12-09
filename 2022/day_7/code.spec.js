import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(95437);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(1084134);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(24933642);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(6183184);
  });
});
