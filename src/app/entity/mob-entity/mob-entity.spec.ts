import { MobEntity } from './mob-entity';

describe('MobEntity', () => {
  it('should create an instance', () => {
    expect(MobEntity.getDefault()).toBeTruthy();
  });
});
