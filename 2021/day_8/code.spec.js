import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(26);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(512);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(61229);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(1091165);
  });
});
