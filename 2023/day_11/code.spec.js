import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(374);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(9608724);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(82000210);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(904633799472);
  });
});
