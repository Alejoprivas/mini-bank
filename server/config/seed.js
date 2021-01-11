/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
 
import HackerNewsModel from '../models/HackerNewsModel';
import UserModel from '../models/UserModel';
import properties from '../properties';

const start = ()=>{
    if(properties.seedDB) {
        console.log("seed database  set to truth");
        let userSeed = [
            {
                rut: '26655791-4',
                email: 'alejoprivas@gmail.com',
                balance: '89999999',
            },
            {
                rut: '26655791-5',
                email: 'pedro_perez@gmail.com',
                balance: '11111111',
            },
        ]
        let singleUser = {rut:'123123-4',email:'aa@gmail.com',balance:'919191',password:'password'};
        
        let user = UserModel;
        //console.log(user.registerUser(singleUser));
        //console.log(user.getByEmailAndPassword(singleUser.email,singleUser.password));
        //users.createBulk(userSeed);
    }else{
        console.log("seed database not set, you can change it in the properties.js file")
    }
}

export default start
