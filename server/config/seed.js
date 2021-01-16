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
        /*
        const hash = new SHA3(512);
        hash.update(this.user.password);
        const sha3pass = hash.digest('hex');
        var password = sha3pass
        //*/
        let singleUser = {rut:'123123-4',email:'aa@gmail.com',balance:'919191',password:"62f264d7ad826f02a8af714c0a54b197935b717656b80461686d450f7b3abde4c553541515de2052b9af70f710f0cd8a1a2d3f4d60aa72608d71a63a9a93c0f5"};
        
        let user = UserModel;
        //console.log(user.registerUser(singleUser));
        //console.log(user.getByEmailAndPassword(singleUser.email,singleUser.password));
        //users.createBulk(userSeed);
    }else{
        console.log("seed database not set, you can change it in the properties.js file")
    }
}

export default start
