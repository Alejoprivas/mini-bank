// Properties
import Properties from "../properties";

// Security
import { authorize } from "./security/SecurityManager";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/UserModel";


// Errors
import ErrorManager from "../classes/ErrorManager";
import Errors from "../classes/Errors";

const securityControllers = {
  /**
   * Init routes
   */
  init: router => {
    const baseUrl = `${Properties.api}`;
    router.post(baseUrl + "/login", securityControllers.login);
    router.post(baseUrl + "/verifyToken", securityControllers.verifyToken);
    router.post(
      baseUrl + "/changePassword",
      authorize(),
      securityControllers.changePassword
    );
  },

  /**
   * Login function
   *
   */
  login: async (req, res) => {
    try {
      let params = req.body;
      // Retrieve Token
      //console.log(params.username, params.password);
      //let user = await UserModel.getByUsernameAndPassword(
      
      let user = await UserModel.getByEmailAndPassword(
        params.username,
        params.password
      );

      if(user){
        res.send(user);

      } else {
        // Error login
        throw new Errors.INVALID_LOGIN();
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ status: 500, message: "Unknown server error" });;
    }
  },
  /**
   * Verify JWT Token function
   *
   */
  verifyToken: async (req, res) => {
    try {
      let token = req.body.token;
      console.log(token);
      //console.log('token',token)
      if (token) {
        let decoded = null;
        try {
          decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);
          console.log(decoded);
          } catch (err) {
          return res.json({
            success: false,
            mesage: "Failed to authenticate token"
          });
        }
        res.json(decoded);
      } else {
          console.log('Error');
        throw {error:500};
      }
    } catch (err) {

      res.status(400).json({code:500});
    }
  },

  /**
   * Change password for current user
   *
   */
  changePassword: async (req, res) => {
    try {
      // Retrieve user
      
      let user = await UserModel.getByEmailAndPassword(
        req.body.email,
        req.body.passwordOld
      );
      //console.log(user)
      if (!user) {
        throw new Errors.OLD_PWD_NOT_VALID();
      }
      user.setPassword(req.body.passwordNew)
      //console.log(req.user)
      user.save()
      //await UserModel.updatePassword(user._id, user.hash);
      res.json({
        success: true
      });
    } catch (err) {
      const safeErr = ErrorManager.getSafeError(err);
      res.status(400).json(safeErr);
    }
  }
};

export default securityControllers;
