import Database from "../classes/Database";
import crypto from 'crypto';
import mongoose, {Schema} from "mongoose";
import Properties from "../properties";
import jwt  from 'jsonwebtoken';
const AccountModel = {
    init(){
        const db = Database;
        const AccountSchema = new Schema({
            tipo: String, 
            balance:Number,
        });
        AccountSchema.model= mongoose.model('Account',AccountSchema); 
        
        return AccountSchema;
    }, 

}


export default AccountModel;