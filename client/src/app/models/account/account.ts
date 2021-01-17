
export class Account {
    public _id: string;
    public balance: string;
    constructor(
        _id?: string,
        balance?: string,
    ) {
        this._id = _id;
        this.balance = balance;
    }
}