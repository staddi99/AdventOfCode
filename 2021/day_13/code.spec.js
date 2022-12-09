import { partOne, partTwo } from './code';

describe('part 1', () => {
  it('should solve sample input', () => {
    expect(partOne(true)).toBe(17);
  });

  it('should solve own input', () => {
    expect(partOne()).toBe(706);
  });
});

describe('part 2', () => {
  it('should solve sample input', () => {
    expect(partTwo(true)).toContain(`
█████
█   █
█   █
█   █
█████`);
  });

  it('should solve own input', () => {
    expect(partTwo()).toContain(`
█    ███  ████   ██ ███    ██ ████ █  █
█    █  █ █       █ █  █    █ █    █  █
█    █  █ ███     █ ███     █ ███  ████
█    ███  █       █ █  █    █ █    █  █
█    █ █  █    █  █ █  █ █  █ █    █  █
████ █  █ █     ██  ███   ██  ████ █  █`);
  });
});
