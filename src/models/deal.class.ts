export class Deal {
    firstName: string;
    lastName: string;
    email: string;
    amount: number;
    topic: string;

    constructor(obj?: any) {
        this.firstName = obj ? obj.firstName : '';
        this.lastName = obj ? obj.lastName : '';
        this.email = obj ? obj.email : '';
        this.amount = obj ? obj.amount: '';
        this.topic = obj ? obj.topic: '';
    }

    public toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            amount: this.amount,
            topic: this.topic
        };
    }
}