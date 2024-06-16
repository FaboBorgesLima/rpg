export class Currency {
  private amount: number = 0;

  constructor(amount: number = 0) {
    this.setAmount(amount);
  }

  setAmount(amount: number) {
    this.amount = Math.trunc(amount);
  }

  getAmount(): number {
    return this.amount;
  }

  add(amount: number) {
    this.setAmount(this.amount + amount);
  }

  minus(amount: number) {
    this.setAmount(this.amount - amount);
  }

  tryToBuy(price: number): boolean {
    if (this.canBuy(price)) {
      this.minus(price);
      return true;
    }

    return false;
  }

  canBuy(price: number): boolean {
    return this.amount >= price;
  }
}
