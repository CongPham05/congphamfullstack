import db from '../models/index';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try {
       let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
         }
        catch (e) {
            reject(e)
        }
        
    })
}


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
let getAllUsers = (userId) => {
    return new Promise(async(resolve, reject) => {
        try { 
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });
             
            }
            if(userId && userId !=='ALL') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                });
                
            }
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try { 
            //check email co ton tai ko 
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    message: "Da ton tai email tu truoc"
                })
            }
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password:hashPasswordFromBcrypt,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                gender: data.gender==='1'? true:false,
                phonenumber: data.phonenumber,
                roleId: data.roleId,
            })
            resolve({
                errCode: 0,
                message: 'OK',

            });
        }
        catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (userId) => {
   return new Promise(async(resolve, reject) => {
    try {
       let user = await db.User.findOne({
           where: { id: userId }
       })
        
       if (!user) {
           resolve({
               errCode: 2,
               errMessage: 'nguoi dung ko ton tai tren data base'
            })
        }
        await db.User.destroy({
            where : { id: userId }
        })
            
        resolve({
            errCode: 0,
            errMessage: 'nguoi dung da bi xoa'
        });
        
    }
    catch (e) {
        reject(e);
    }
   })
}
module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
}