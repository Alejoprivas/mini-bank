import mongoose from "mongoose";
 
import properties from "../properties.js";
import start from "../config/seed";
import UserModel from "../models/UserModel";
import TransactionModel from "../models/TransactionModel";
import AccountModel from "../models/AccountModel";


class Database {
    constructor(){

    }
    async init(){

        await this.authenthicate();
        /**init models **/
        
        TransactionModel.init();
        AccountModel.init();
        UserModel.init();
    }

    async authenthicate(){
        try{
            this.DatabaseConnection = await mongoose.connect(`mongodb://${properties.db_url}`,{useNewUrlParser:true ,useUnifiedTopology: true, useCreateIndex: true});
        }catch(err){
            console.log(`Failed connection to the DB: ${err.message}`)
            console.log("Wait 5 seconds before retry");
            await new Promise(resolve => setTimeout(resolve, 5000));
            await this.authenticate();
        }
    }
    
   
};
export default new Database();