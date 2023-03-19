export class Revenue {
    months: [];
    amount: [];

    constructor(obj?: any) {
        this.months = obj ? obj.months : '';
        this.amount = obj ? obj.amount : '';
    }

    public toJSON() {
        return {
            months: this.months,
            amount: this.amount
        };
    }
}