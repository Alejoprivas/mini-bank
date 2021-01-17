import Database from "../classes/Database";
import crypto from 'crypto';
import mongoose, {Schema} from "mongoose";
import Properties from "../properties";
import jwt  from 'jsonwebtoken';
const TransactionModel = {
    init(){
        const db = Database;
        const TransactionSchema = new Schema({ 
            tipo:String,
            source: String,
            destination: String,
            balance: Number,
            state: String,
        });

        TransactionSchema.model= mongoose.model('Transaction',TransactionSchema); 
                
        return TransactionSchema;
    },
     
}


export default TransactionModel;