import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(79);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(467);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(3621);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(12226);
  });
});
