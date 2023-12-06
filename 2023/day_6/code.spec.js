import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(288);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(4403592);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(71503);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(38017587);
  });
});
