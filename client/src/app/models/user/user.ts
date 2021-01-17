

import { Account } from '../account/account';

export class User {

    public _id: string;
    public email?: string;
    public name?: string;
    public password: string;
    public roles?: string[];
    public surname?: string;
    public username: string;

    public token: string;
    public account?: Account[];

    constructor(
        _id?: string,
        email?: string,
        username?: string,
        token?: string,
        account?: Account[]
    ) {
        this._id = _id;
        this.username = username;
        this.token = token;
        this.account = account;
    }

    isAdmin(): boolean {
        if (!this.roles)
            return false;
        return this.roles.indexOf('ADMIN') === 0;
    }

    hasRole(role: string | Array<string>): boolean {
        if (!this.roles) return false;

        if (typeof role === 'string') {
            return (this.roles.indexOf(role) !== -1);
        } else {
            const found = role.filter(rol => {
                return (this.roles.indexOf(rol) !== -1);
            });
            return found.length > 0;
        }
    }
}
