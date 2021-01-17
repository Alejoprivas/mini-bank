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
       router.post(baseUrl + '/makeWithdrawal' , TransactionController.makeWithdrawal);
        },
        makeDeposit: async (req, res) => {
            try {
              console.log(req.user);
              let token = req.headers.authorization.replace("Bearer ", "");
              let accountNumber = req.body.accountNumber;
              let depositAmount = req.body.depositAmount;
              if (token) {
                let decoded,transaction,updateAccount = null;  
                try {
                  let checkIfPositive = Math.sign(depositAmount) > 0 ? depositAmount : false;
                  if(!checkIfPositive){
                    throw new Error('Invalid parameter');
                  }
                  decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);
                  let clientAccounts = await UserModel.getAccounts(decoded.rut);
                  let selectedAccount = clientAccounts.find((account)=>{
                    return account._id == accountNumber;
                  });
                  updateAccount = await UserModel.updateBalance(decoded.rut,selectedAccount,depositAmount);
                  transaction = updateAccount ? await TransactionModel.deposit(selectedAccount._id , depositAmount) : false;
                  } catch (err) {
                    console.log(err)
                  return res.json({
                    success: false,
                    mesage: "Failed to perform operation"
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
        makeWithdrawal: async (req, res) => {
          try {
            let token = req.headers.authorization.replace("Bearer ", "");
            let accountNumber = req.body.accountNumber;
            let withdrawalAmount = req.body.withdrawalAmount;
            if (token) {
              let decoded,transaction,updateAccount = null;  
              try {
                let checkIfPositive = Math.sign(withdrawalAmount) > 0 ? withdrawalAmount : false;
                if(checkIfPositive){
                  throw new Error('Invalid parameter');
                }
                decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);
                let clientAccounts = await UserModel.getAccounts(decoded.rut);
                let selectedAccount = clientAccounts.find((account)=>{
                  return account._id == accountNumber;
                });
                updateAccount = await UserModel.updateBalance(decoded.rut,selectedAccount,withdrawalAmount);
                transaction = updateAccount ? await TransactionModel.withdrawal(selectedAccount._id , withdrawalAmount) : false;
                } catch (err) {
                return res.json({
                  success: false,
                  mesage: "Failed to perform operation"
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