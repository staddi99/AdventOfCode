import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(13632);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(53660285675207);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(23340);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(141993988282687);
  });
});
