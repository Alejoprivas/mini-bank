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
        var newUser = new UserModel.model(user);
        newUser.setPassword(user.password);
        newUser.account.push({balance:1000});
        newUser.account.push({balance:0});
        return await newUser.save();
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
    async withdrawal(accountNumber,amount) {
        const transaction = {
            tipo:'withdrawal',
            source : accountNumber,
            destination : accountNumber,
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
    async withdraw(account,amount) {
        var newUser = new UserModel.model(user);
        newUser.setPassword(user.password);
        newUser.account.push({balance:1000});
        newUser.account.push({balance:0});
        return await newUser.save();
    },
    async transfer(account,destination,amount) {

        ///await TransactionModel.model.
        return null;
    },     
}


export default TransactionModel;