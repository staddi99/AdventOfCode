import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(67384529);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(49725386);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toBe(149245887792);
  });

  it('should solve own input', () => {
    expect(partTwo()).toBe(538935646702);
  });
});
