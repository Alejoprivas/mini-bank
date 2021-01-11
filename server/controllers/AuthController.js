// Properties
import Properties from "../properties";

// Security
import { authorize } from "../security/SecurityManager";
import jsonwebtoken from "jsonwebtoken";
import UserModel from "../models/UserModel";


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
      let user = await UserModel.getByUsernameAndPassword(
        params.username,
        params.password
      );
      if (!user) {
          console.log('Errors');
        //throw new Errors.INVALID_LOGIN();
      }
    } catch (err) {
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
      if (token) {
        let decoded = null;
        try {
          decoded = jsonwebtoken.verify(token, Properties.tokenSecret);
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
      let user = await UserModel.getByUsernameAndPassword(
        req.user.username,
        req.body.passwordOld
      );
      if (!user) {
        //throw new Errors.OLD_PWD_NOT_VALID();
      }

      await UserModel.changePassword(req.user.username,req.body.passwordOld, req.body.passwordNew);
      res.json({
        success: true
      });
    } catch (err) {
      res.status(400).json(safeErr);
    }
  }
};

export default securityControllers;
