import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe('2=-1=0');
  });

  it('should solve own input', () => {
    expect(partOne()).toBe('2=0-2-1-0=20-01-2-20');
  });
});
