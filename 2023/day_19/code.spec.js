import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(19114);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(402185);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(167409079868000);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(130291480568730);
  });
});
