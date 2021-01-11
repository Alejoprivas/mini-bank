import jsonwebtoken from "jsonwebtoken";
import cors from "cors";
import helmet from "helmet";
// Properties
import properties from "../properties";
// Errors
import UserModel from "../models/Testing_db/UserModel";

export const authorize = () => {
  // Roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // Authenticate JWT token and attach user to request object (req.user)
    async (req, res, next) => {
      let token =
        req.headers.authorization &&
        req.headers.authorization.replace("Bearer ", "");

      if (!token) {
        res.status(500).json({ status: 500, message: "Unknown server error" });
      } else {
        let decodedUser = null;
        try {
          decodedUser = jsonwebtoken.verify(token, properties.tokenSecret);
        } catch (err) {
          // Token not valid
          return res.status(500).json({ status: 500, message: "Unknown server error" });;
        }

      }
    }
  ];
};

export const initSecurity = app => {
  app.use(helmet());
  app.use(cors());
};
