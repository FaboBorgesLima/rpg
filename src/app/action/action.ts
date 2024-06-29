import { Effect, getDefaultEffect } from '../effect/effect';
import { Entity } from '../entity/entity';

export class Action {
  constructor(private owner: Entity, private actionType: ActionType) {}

  getOwner(): Entity {
    return this.owner;
  }

  getActionType(): ActionType {
    return this.actionType;
  }

  interact(targetAction: Action): Effect {
    const output = getDefaultEffect();

    switch (this.actionType) {
      case 'defense':
        output.deltaStamina = 15;
        break;
      case 'attack':
        output.deltaStamina = -5;
        break;
      case 'run':
        output.deltaStamina = -20;
        if (this.owner.getRunAwayChance(targetAction.owner) > Math.random()) {
          output.runAway = true;
        }
    }

    switch (targetAction.actionType) {
      case 'defense':
        break;
      case 'attack':
        if (targetAction.getOwner().willStrike()) {
          output.deltaLife = -targetAction.getOwner().getTotalDamage();
          if (this.actionType == 'defense') {
            output.deltaLife *= this.getOwner().getDamageSusceptibility();
          } else if (this.actionType == 'run') {
            output.deltaLife *= 2;
          }
        }
        break;
      case 'run':
    }
    return output;
  }
}
export type ActionType = 'defense' | 'attack' | 'run';
