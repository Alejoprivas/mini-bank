import Properties from "../properties";
import ErrorManager from "../classes/ErrorManager";
import Errors from "../classes/Errors";
import jsonwebtoken from "jsonwebtoken";
import TransactionModel from "../models/TransactionModel"; 
import UserModel from "../models/UserModel";
import AccountModel from "../models/AccountModel";
import mongoose,{Schema} from "mongoose";

const TransactionController = {
  
     init: router => {
       const baseUrl = `${Properties.api}/transaction`;
       // custom route
       router.post(baseUrl + '/makeDeposit' , TransactionController.makeDeposit);
        },
        makeDeposit: async (req, res) => {
            try {
              let token = req.headers.authorization.replace("Bearer ", "");
              let accountNumber = req.body.accountNumber;
              let depositAmount = req.body.depositAmount;
              if (token) {
                let decoded,transaction,updateAccount = null;
                
                try {
                  decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);
                  let clientAccounts = await UserModel.getAccounts(decoded.rut);
                  let selectedAccount = clientAccounts.find((account)=>{
                    return account._id == accountNumber;
                  });
                  updateAccount = await UserModel.updateBalance(decoded.rut,selectedAccount,depositAmount);
                  console.log(updateAccount);
                  transaction = await TransactionModel.deposit(selectedAccount._id , depositAmount);
                    if(transaction){
                      console.log(selectedAccount.balance + transaction.balance);
                      
                    }
                  } catch (err) {
                      console.log(err)
                  return res.json({
                    success: false,
                    mesage: "Failed to authenticate token"
                  });
                }
                res.json({data:transaction ? transaction : false ,code:200});
              } else {
                  console.log('Error');
                throw {msg:"Ocurrio un error durante la transacción",error:500};
              }
            } catch (err) {
              res.status(400).json({code:500});
            }
        },     
  };

export default TransactionController;