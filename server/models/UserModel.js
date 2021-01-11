import Database from "../classes/Database";
import crypto from 'crypto';
import mongoose, {Schema} from "mongoose";
import Properties from "../properties";
import jwt  from 'jsonwebtoken';
const UserModel = {
    init(){
        const db = Database;
        
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
        balance: {
            type: "String"
        },
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
            return this.hash === hash;
        };
        UserSchema.methods.generateJwt = function() {
            const expiry = new Date();
            expiry.setDate(expiry.getDate() + 7);          
            return jwt.sign(
              {
                _id: this._id,
                email: this.email,
                name: this.name,
                exp: parseInt(expiry.getTime() / 1000)
              },
              Properties.JWT_SECRET
            ); 
          };
        UserModel.model= mongoose.model('User',UserSchema); 
        
        return UserSchema
    }, 
    async registerUser(user) {
        var user = new UserModel.model(user);
        newUser.setPassword(user.password);
        newUser.save();
        return newUser;
    },
    async changePassword(email,oldPassWord,newPassWord){
        let user = await UserModel.model.findOne({email:email});
        let result = await user.validPassword(oldPassWord) ? await user.setPassword(newPassWord) : false;
        console.log('newPassWordSet', token);
        return result;
    },
    async getUser(id) {
        let result = await Database.getConnection().models.User.findByPk(id, {
            attributes: {
              exclude: ["hash"]
            }
          });
          // Find roles
          let roles = await result.getRoles({ raw: true });
          result.dataValues.roles = roles.map(item => item.role);
          return result;
    },
    async getByEmailAndPassword(email,password){
        let user = await UserModel.model.findOne({email:email});
        let token = await user.validPassword(password) ? await user.generateJwt() : false;
        console.log('token', token);
        return token;
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
    }
  
}


export default UserModel;