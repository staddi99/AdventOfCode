import { partOne, partTwo } from './code';

global.structuredClone = (val) => JSON.parse(JSON.stringify(val))

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(136);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(112046);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(64);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(104619);
  });
});
