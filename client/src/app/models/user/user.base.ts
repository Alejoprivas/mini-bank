export class UserBase {

    constructor() { }

    public _id: string;
    public email?: string;
    public name?: string;
    public password: string;
    public roles?: string[];
    public surname?: string;
    public username: string;

}