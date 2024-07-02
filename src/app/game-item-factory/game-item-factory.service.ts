import { Injectable } from '@angular/core';
import { GameItem } from '../game-item/game-item';
import { Sword } from '../game-item/weapons/sword/sword';
import { Clothes } from '../game-item/armors/clothes/clothes';
import { Fists } from '../game-item/weapons/fists/fists';
import { Bread } from '../game-item/usables/bread/bread';
import { IronMace } from '../game-item/weapons/iron-mace/iron-mace';
import { LeatherArmor } from '../game-item/armors/leather-armor/leather-armor';
import { IronArmor } from '../game-item/armors/iron-armor/iron-armor';
import { UsableItem } from '../game-item/usables/usable-item';
import { ArmorItem } from '../game-item/armors/armor-item';
import { WeaponItem } from '../game-item/weapons/weapon-item';

@Injectable({
  providedIn: 'root',
})
export class GameItemFactoryService {
  factory(name: string): GameItem {
    switch (name) {
      case 'clothes':
        return new Clothes();
      case 'leather armor':
        return new LeatherArmor();
      case 'iron armor':
        return new IronArmor();
      case 'fists':
        return new Fists();
      case 'sword':
        return new Sword();
      case 'iron-mace':
        return new IronMace();
      case 'bread':
        return new Bread();
    }
    return new Clothes();
  }

  getDefault(): GameItem {
    return new Clothes();
  }

  getUsables(): UsableItem[] {
    return [new Bread()];
  }

  getArmors(): ArmorItem[] {
    return [new Clothes(), new LeatherArmor(), new IronArmor()];
  }

  getWeapons(): WeaponItem[] {
    return [new Fists(), new Sword(), new IronMace()];
  }
}
