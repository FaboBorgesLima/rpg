import { Effect, getDefaultEffect } from '../../../effect/effect';
import { UsableItem } from '../usable-item';

export class Bread extends UsableItem {
  constructor() {
    super('bread', 100);
  }
  override getEffects(): Effect {
    const effect = getDefaultEffect();
    effect.deltaLife = 5;

    return effect;
  }
}
