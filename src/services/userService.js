import db from '../models/index';
import bcrypt from 'bcryptjs';


let handleUserLogin = (email, password)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw:true,
                });
                if (user) {
                    
                    let checkPassword = await bcrypt.compareSync(password, user.password); 
                    if (checkPassword) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        
                        console.log(user)
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Password co van de';
                       
                    }
                }
                else {
                    userData.errCode = 2;
                    userData.errMessage = 'User ko ton tai ';
                   
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = 'Email ko ton tai thu email khac';
               
            }
            resolve(userData);
        }
        catch (e) {
            reject(e);
        }
 })
}

let checkUserEmail = (userEmail) => {
    return new Promise(async(resolve, reject) => {
        try { 
            let user = await db.User.findOne({
                where: { email : userEmail}
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }
        catch (e) {
            reject(e);
        }
    })
}
module.exports = {
    handleUserLogin,
}
