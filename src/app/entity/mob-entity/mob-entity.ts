import { GameClass } from '../../game-class/game-class';
import { MobClass } from '../../game-class/mob-class/mob-class';
import { Entity } from '../entity';

export class MobEntity extends Entity {
  constructor(private mobClass: GameClass, name: string, public image: string) {
    super(name);
  }
  override getGameClass(): GameClass {
    return this.mobClass;
  }

  static getDefault(): MobEntity {
    return new MobEntity(MobClass.getDefault(), '404', '');
  }
}
