import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(240);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(131469);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(4455);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(96951);
  });
});
