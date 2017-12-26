export class Transaction {
    coin: string;
    amount: number;
    price: number;
    date: Date;

     public constructor(coin?: string, amount?: number, price?: number) {
        this.coin = coin;
        this.amount = amount;
        this.price = price;
    }
}

export class Position extends Transaction {
    id: number;
    listPrice: number;      // Current price.

    public constructor (coin: string, amount: number, price: number, listPrice: number) {
        super(coin, amount, price);
        this.listPrice = listPrice;
    }

    // Current position value.
    public get value(): number {
        return this.listPrice * this.amount;
    }

    // Initial value for which the buy was made.
    public get initialValue(): number {
        return this.price * this.amount;
    }

    // Total profit.
    public get profit(): number {
        return this.value - this.initialValue;
    }

    // Profit in percent.
    public get profitPercentage(): number {
        return (this.profit / this.initialValue) * 100;
    }
}