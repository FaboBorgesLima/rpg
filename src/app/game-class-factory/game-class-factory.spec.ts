import { GameClassFactory } from './game-class-factory';

describe('GameClassFactory', () => {
  it('should create an instance', () => {
    expect(new GameClassFactory()).toBeTruthy();
  });
});
