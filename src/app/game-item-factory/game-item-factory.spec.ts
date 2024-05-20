import { GameItemFactory } from './game-item-factory';

describe('GameItemFactory', () => {
  it('should create an instance', () => {
    expect(new GameItemFactory()).toBeTruthy();
  });
});
