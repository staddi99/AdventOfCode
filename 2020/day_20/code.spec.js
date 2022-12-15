import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(20899048083289);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(2699020245973);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(273);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(2012);
  });
});
