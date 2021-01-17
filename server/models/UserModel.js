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
        },{
          toJSON: { virtuals: true },
          toObject: { virtuals: true }
        });

        UserSchema.virtual('token').get(function () {
          return this.__token;
        }).set(function (token) {
          this.__token = token;
        });; 
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
                balance: this.balance,
                exp: parseInt(expiry.getTime() / 1000)
              },
              Properties.JWT_SECRET
            ); 
          };
        UserModel.model= mongoose.model('User',UserSchema); 
        
        return UserSchema
    }, 
    async registerUser(user) {
        var newUser = new UserModel.model(user);
        newUser.balance = 0;
        newUser.setPassword(user.password);
        //newUser.save();
        return await newUser.save();
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
        //console.log('token', token);
        //let login = user
        user.hash = undefined;
        user.salt = undefined;
        user.token = token;
        //console.log(user.token)
        return token? user: false;
        //*/ 
        /*
          .findOne({
            email: email,
            hash: password
          })
          .lean();

        if (result) user.hash = undefined;
        return user;
        
         //*/
          
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