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
            createdAt: { type: Date, default: Date.now },
            state: String,
        });

        TransactionModel.model= mongoose.model('Transaction',TransactionSchema); 
                
        return TransactionSchema;
    },
    async getTransactions(accountNumber) {
        let transferHistory = await TransactionModel.model.find({source:accountNumber});
        return transferHistory ? transferHistory : false;
    },
    async deposit(accountNumber,amount) {
        const transaction = {
            tipo:'deposit',
            source : accountNumber,
            destination : accountNumber,
            balance : amount,
            state : 'done'
        }
        let result = null;
        try{
            var newtransaction = new TransactionModel.model(transaction);
            result = await newtransaction.save();
            console.log(result);
        }catch(e){
            console.log(e);
            result = false;
        }
        return result;
    },
    async withdrawal(sourceAccount,destinationAccount,amount) {
        const transaction = {
            tipo:'withdrawal',
            source : sourceAccount,
            destination : destinationAccount,
            balance : amount,
            state : 'done'
        }
        let result = null;
        try{
            var newtransaction = new TransactionModel.model(transaction);
            result = await newtransaction.save();
        }catch(e){
            console.log(e);
            result = false;
        }
        return result;
    },
    async transfer(source,destination,amount) {
        const transaction = {
            tipo:'transfer',
            source : source,
            destination : destination,
            balance : amount,
            state : 'done'
        }
        let result = null;
        try{
            var newtransaction = new TransactionModel.model(transaction);
            result = await newtransaction.save();
        }catch(e){
            console.log(e);
            result = false;
        }
        return result;
    },     
}


export default TransactionModel;