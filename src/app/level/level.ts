export class Level {
  protected xp: number = 0;

  constructor(xp: number) {
    this.setXp(xp);
  }

  getXp(): number {
    return this.xp;
  }

  setXp(xp: number): void {
    this.xp = Math.max(Math.trunc(xp), 0);
  }

  getLevelAmount(): number {
    let remainingXp = this.xp;

    let level = 0;

    do {
      level++;

      remainingXp -= 900 + level * 100;
    } while (remainingXp >= 0);

    return level;
  }
}
