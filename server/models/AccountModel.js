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
        AccountModel.model= mongoose.model('Account',AccountSchema); 

        AccountSchema.methods.updateBalance = function(accountNumber,newBalance){
            let selectedAccount = this.account.find((account)=>{
              return account._id == accountNumber;
            });
            selectedAccount.balance = selectedAccount.balance + transaction.balance;
            return selectedAccount.balance; 
        }  
        return AccountSchema;
    }, 
    async updateBalance(accountNumber,newBalance){
        let account = await AccountModel.model.find({});
        //let result = await account.updateBalance(accountNumber,newBalance);
        console.log('result', account);
        return account;
    },
}


export default AccountModel;