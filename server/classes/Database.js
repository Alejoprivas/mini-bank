import mongoose from "mongoose";
 
import properties from "../properties.js";
import Database from ''
import seed from "../config/seed"
import HackerNewsModel from "../models/HackerNewsModel";
import UserModel from "../models/UserModel";
class Database {
    constructor(){

    }
    async init(){

        await this.authenthicate();
        /**init models **/
        HackerNewsModel.init();
        UserModel.init();
        console.log(seed())
    }

    async authenthicate(){
        try{
            this.DatabaseConnection = await mongoose.connect(`mongodb://${properties.db_url}`,{useNewUrlParser:true , useCreateIndex: true});
        }catch(err){
            console.log(`Failed connection to the DB: ${err.message}`)
            console.log("Wait 5 seconds before retry");
            await new Promise(resolve => setTimeout(resolve, 5000));
            await this.authenticate();
        }
    }
    
   
};
export default new Database();