import Properties from "../properties";

import HackerNewsModel from "../models/HackerNewsModel";
import mongoose,{Schema} from "mongoose";

const HackerNewsController = {
  
      
     init: router => {
       const baseUrl = `${Properties.api}/news`;
       
       // custom route
       router.get(baseUrl , HackerNewsController.get);
       
 
      },
      get: async (req,res) => {
        try {
            let news = await HackerNewsModel.findAll()
            console.log();

          res.send(news);
        } catch (err) {
          console.log(err)
          res.status(500).json("Error");
        }
      }
      /*** */
     
     
  };

export default HackerNewsController;