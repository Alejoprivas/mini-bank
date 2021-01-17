import Properties from "../properties";
import ErrorManager from "../classes/ErrorManager";
import Errors from "../classes/Errors";

import UserModel from "../models/UserModel";
import mongoose,{Schema} from "mongoose";

const UserController = {
  
     init: router => {
       const baseUrl = `${Properties.api}/user`;
       // custom route
       router.get(baseUrl , UserController.get);
       router.post(baseUrl , UserController.post);
       //router.delete(`${baseUrl}/delete/:id` , UserController.remove);
      },
      get: async (req,res) => {
        try {
          //let user = await UserModel.findAll();
          console.log(UserModel);
          res.send('Test');
        } catch (err) {
          const safeErr = ErrorManager.getSafeError(err);
          res.status(safeErr.status).json(safeErr);
          //res.status(500).json("Error");
        }
      },
      
      post: async (req,res) => {
        try {
          let user = await UserModel.registerUser(req.body);
          user.salt = undefined;
          user.hash = undefined;
          
          res.send(user);
        } catch (err) {
          const safeErr = ErrorManager.getSafeError(err);
          res.status(safeErr.status).json(safeErr);
        }
      },
      remove: async (req,res) => {
        try { 
          let id= req.params.id
          let user = await UserModel.remove(id);
          
          res.status(200).json("success");
        } catch (err) {
          console.log(err)
          res.status(500).json("Error");
        }
      }
      /*** */
     
     
  };

export default UserController;