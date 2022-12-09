import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(739785);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(903630);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(444356092776315);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(303121579983974);
  });
});
