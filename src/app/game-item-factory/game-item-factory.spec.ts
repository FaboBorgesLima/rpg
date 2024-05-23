import { GameItemFactoryService } from './game-item-factory.service';

describe('GameItemFactory', () => {
  it('should create an instance', () => {
    expect(new GameItemFactoryService()).toBeTruthy();
  });
});
