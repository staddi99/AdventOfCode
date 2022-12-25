import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve own input', () => {
    expect(partOne()).toBe(4096);
  });
});

describe('part 2', () => {
  it('should solve own input', () => {
    expect(partTwo()).toBe(78613970589919);
  });
});
