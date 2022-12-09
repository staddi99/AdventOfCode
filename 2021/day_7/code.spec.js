import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(37);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(342641);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(168);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(93006301);
  });
});
