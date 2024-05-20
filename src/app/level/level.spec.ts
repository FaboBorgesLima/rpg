import { Level } from './level';

describe('Level', () => {
  it('should create an instance', () => {
    expect(new Level(0)).toBeTruthy();
  });
  it('should up', () => {
    const level = new Level(0);

    expect(level.getLevelAmount()).toBe(1);

    level.setXp(1000);

    expect(level.getLevelAmount()).toBe(2);

    level.setXp(2100);

    expect(level.getLevelAmount()).toBe(3);
  });
});
