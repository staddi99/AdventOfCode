import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(14645);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(10944);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(4686774924);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(484244804958744);
  });
});
