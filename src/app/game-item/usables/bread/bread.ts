import { Effect, getDefaultEffect } from '../../../effect/effect';
import { UsableItem } from '../usable-item';

export class Bread extends UsableItem {
  constructor() {
    super('bread', 50);
  }
  override getEffects(): Effect {
    const effect = getDefaultEffect();
    effect.deltaLife = 15;

    return effect;
  }
}
