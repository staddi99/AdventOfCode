import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(5);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(2282);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe('mxmxvkd,sqjhc,fvjkl');
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe('vrzkz,zjsh,hphcb,mbdksj,vzzxl,ctmzsr,rkzqs,zmhnj');
  });
});
