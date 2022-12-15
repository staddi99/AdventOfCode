import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(14897079);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(8329514);
  });
});
