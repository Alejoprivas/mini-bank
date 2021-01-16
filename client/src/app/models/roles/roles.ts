
import { RolesBase } from './roles.base';

export class Roles extends RolesBase {



    constructor(
        _id?: string,
        name?: string
    ) {
        super();
        this._id = _id;
        this.name = name;
    }

}
