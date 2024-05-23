import { GameClassFactoryService } from './game-class-factory.service';

describe('GameClassFactory', () => {
  it('should create an instance', () => {
    expect(new GameClassFactoryService()).toBeTruthy();
  });
});
