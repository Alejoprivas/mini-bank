import Database from "../classes/Database";
import crypto from 'crypto';
import mongoose, {Schema} from "mongoose";
import Properties from "../properties";
import jwt  from 'jsonwebtoken';
const UserModel = {
    init(){
        const db = Database;
        var AccountSchema = mongoose.model('Account').schema;
        const UserSchema = new mongoose.Schema({            
        rut: {
            type: "String",
            required: true,
            unique: true,
        },
        email: {
            type: "String",
            required:true,
            unique: true,
        },
        hash: {
            type: "String"
        },
        salt:{
            type: "String"
        },
        account: [AccountSchema],
    },{
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
      });

      UserSchema.virtual('token').get(function () {
        return this.__token;
      }).set(function (token) {
        this.__token = token;
      });
        UserSchema.methods.setPassword = function(password) {
            this.salt = crypto.randomBytes(16).toString('hex');
            this.hash = crypto
              .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
              .toString('hex');
        };
             
        UserSchema.methods.validPassword = function(password) {
            const hash = crypto
              .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
              .toString('hex');
              console.log(hash)
            return this.hash === hash;
        };
        UserSchema.methods.generateJwt = function() {
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);          
            return jwt.sign(
              {
                _id: this._id,
                email: this.email,
                rut: this.rut,
                account: this.account,
                exp: parseInt(expiry.getTime() / 1000)
              },
              Properties.JWT_SECRET
            ); 
          };
        
        UserSchema.methods.registerAccount = function() {
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);          
            return jwt.sign(
              {
                _id: this._id,
                email: this.email,
                rut: this.rut,
                account: this.account,
                exp: parseInt(expiry.getTime() / 1000)
              },
              Properties.JWT_SECRET
            ); 
        };

        UserSchema.methods.updateAccountBalance = function(account,newBalance){
          let result = null;
          console.log('account',this.account.id(account._id));
          if(this.account.id(account._id).balance >= newBalance){
            this.account.id(account._id).balance = this.account.id(account._id).balance + newBalance;
            console.log(this.account.id(account._id));
            result = true;
          }else{
            result = false;
          }
          console.log('done');
          return result; 
      }  

        UserModel.model= mongoose.model('User',UserSchema); 
        
        return UserSchema;
    }, 
    async registerUser(user) {
        var newUser = new UserModel.model(user);
        newUser.setPassword(user.password);
        newUser.account.push({balance:1000});
        newUser.account.push({balance:0});
        return await newUser.save();
    },
    async changePassword(email,oldPassWord,newPassWord){
        let user = await UserModel.model.findOne({email:email});
        let result = await user.validPassword(oldPassWord) ? await user.setPassword(newPassWord) : false;
        console.log('newPassWordSet', token);
        return result;
    },
    async getByEmailAndPassword(email,password){
        let user = await UserModel.model.findOne({email:email},{});
        let token = await user.validPassword(password) ? await user.generateJwt() : false;
        user.hash = undefined;
        user.salt = undefined;
        user.token = token;
        return token? user: false;
          
    },
    async getAccounts(rut){
        let user = await UserModel.model.findOne({rut:rut},{});
        let account = user.account;
        return account? account: false;
    },
    async updateBalance(rut,accountNumber,newBalance){
      let user = await UserModel.model.findOne({rut:rut},{});
      let isValid = user.updateAccountBalance(accountNumber,newBalance);
      if(isValid){
        await user.save();
      }
      return isValid? isValid: false;
    },    
    async createBulk(userBulk) {
        await UserModel.model.insertMany(userBulk, function (err, docs) {
            if (err){ 
                return console.error(err);
            } else {
              console.log("Inserted many");
            }
          });
    },
    async remove(id) { 
        await UserModel.model.findOneAndRemove({ _id: id }).exec(); 
    },
    /**
     * Update password
     */
    async updatePassword (idUser, password) {
      let user = await UserModel.model.findOneAndUpdate({ _id: idUser }, {
        password: password
      });
      return user;
    }
  
}


export default UserModel;