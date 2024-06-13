import { MobClass } from './mob-class';

describe('Mob', () => {
  it('should create an instance', () => {
    expect(MobClass.getDefault()).toBeTruthy();
  });
});
