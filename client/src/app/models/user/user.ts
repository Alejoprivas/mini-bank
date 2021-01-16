
import { UserBase } from './user.base';

/**
 * YOU CAN OVERRIDE HERE UserBase.ts
 */
export class User extends UserBase {

    // Insert here your custom attributes and function

    // Functions for User

    public token: string;

    constructor(
        _id?: string,
        username?: string,
        token?: string,
        roles?: string[]
    ) {
        super();
        this._id = _id;
        this.username = username;
        this.token = token;
        this.roles = roles;
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
