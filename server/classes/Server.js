import express from "express";
import http from "http";
import bodyParser from "body-parser";
import path from "path";

import swaggerUi from "swagger-ui-express"; 
import properties from "../properties.js";

import cors from "cors";
import cron from "node-cron";
import Database from "./Database.js";


import UserController from "../controllers/UserController";
import securityControllers from "../controllers/AuthController.js";
import AccountController from "../controllers/AccountController";
import TransactionController from "../controllers/TransactionController";
//Controllers

class Server{
    constructor(){
        this.app = express();
    }

    async init(){
        console.log("Starting the app");

        //Start Database
        Database.init();

        this.app.use(bodyParser.json());
        this.app.use(cors());

        //Start Server
        const server = http.Server(this.app);
        this.app.use(express.static(properties.publicPath));
        console.log("localhost:"+properties.port);
        //Import controllers
        const router = express.Router();
        await server.listen(properties.port);
        securityControllers.init(router);
        UserController.init(router);
        AccountController.init(router);
        TransactionController.init(router);
        this.app.use("/",router);

    }
}

export default new Server();
