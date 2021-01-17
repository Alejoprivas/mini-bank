import Properties from "../properties";
import ErrorManager from "../classes/ErrorManager";
import Errors from "../classes/Errors";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/UserModel"; 
import mongoose,{Schema} from "mongoose";

const AccountController = {
  
     init: router => {
       const baseUrl = `${Properties.api}/accounts`;
       // custom route
       router.get(baseUrl  , AccountController.getAccounts);
        },
        getAccounts: async (req, res) => {
            try {
              let token = req.headers.authorization.replace("Bearer ", "");
              if (token) {
                let decoded = null;
                try {
                  decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);
                  } catch (err) {
                      console.log(err)
                  return res.json({
                    success: false,
                    mesage: "Failed to authenticate token"
                  });
                }       
                let accounts = await UserModel.getAccounts(decoded.rut);
                res.json(accounts);
              } else {
                  console.log('Error');
                throw {msg:"Ocurrio un error durante la transacción",error:500};
              }
            } catch (err) {
        
              res.status(400).json({code:500});
            }
        },     
  };

export default AccountController;