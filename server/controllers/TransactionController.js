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
       router.post(baseUrl + '/transactionHistory' , TransactionController.transactionHistory)
       router.post(baseUrl + '/makeDeposit' , TransactionController.makeDeposit);
       router.post(baseUrl + '/makeWithdrawal' , TransactionController.makeWithdrawal);
       router.post(baseUrl + '/transferMoney' , TransactionController.transferMoney);
        },
        transactionHistory: async(req, res) =>{
          try {
            let token = req.headers.authorization.replace("Bearer ", "");
            let accountNumber = req.body.accountNumber;
            if (token) {
              let decoded,transactions = null;  
              try {
                transactions = await TransactionModel.getTransactions(accountNumber);
                } catch (err) {
                  console.log(err)
                return res.json({
                  success: false,
                  mesage: "Failed to perform operation"
                });
              }
              res.json({data:transactions ? transactions : false ,code:200});
            } else {
                console.log('Error');
              throw {msg:"Ocurrio un error durante la transacción",error:500};
            }
          } catch (err) {
            res.status(400).json({code:500});
          }
        },
        makeDeposit: async (req, res) => {
            try {
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
                  updateAccount = await UserModel.updateBalance(decoded.rut,accountNumber,depositAmount);
                  transaction = updateAccount ? await TransactionModel.deposit(accountNumber , depositAmount) : false;
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
            let withdrawalAmount = req.body.withdrawalAmount*-1;
            
            if (token) {
              let decoded,transaction,updateAccount = null;  
              try {
                let checkIfPositive = Math.sign(withdrawalAmount) > 0 ? withdrawalAmount : false;
                if(checkIfPositive){
                  throw new Error('Invalid parameter');
                }
                decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);
                updateAccount = await UserModel.updateBalance(decoded.rut,accountNumber,withdrawalAmount);
                transaction = updateAccount ? await TransactionModel.withdrawal(accountNumber , accountNumber ,Math.abs(withdrawalAmount)) : false;
                } catch (err) {
                return res.json({
                  success: false,
                  mesage: "Failed to perform operation "+err,
                  data: { state: "fail"}
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
      transferMoney: async (req, res) => {
        try {
          let token = req.headers.authorization.replace("Bearer ", "");
          let sourceAccount = req.body.sourceAccount;
          let rutDestination = req.body.rutDestination;
          let destinationAccount = req.body.destinationAccount;
          let transferAmount = (req.body.transferAmount * -1);
          if (token) {
            let decoded,transaction,updateSourceAccount,updateDesitnationAccount = null;  
            try {
              let checkIfPositive = Math.sign(transferAmount) > 0 ? transferAmount : false;
              if(checkIfPositive){
                throw new Error('Invalid parameter');
              }
              decoded = jsonwebtoken.verify(token, Properties.JWT_SECRET);

              updateSourceAccount = await UserModel.updateBalance(decoded.rut,sourceAccount,transferAmount);
              if(updateSourceAccount){
                console.log('updating Dest')
                updateDesitnationAccount = await UserModel.updateBalance(rutDestination,destinationAccount,Math.abs(transferAmount));
              }
              transaction = updateSourceAccount && updateDesitnationAccount ? await TransactionModel.transfer(sourceAccount,destinationAccount,Math.abs(transferAmount)) : false;
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
                       
  };

export default TransactionController;