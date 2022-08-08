import bcrypt from 'bcryptjs';
import { raw } from 'body-parser';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    console.log(data)
    return new Promise(async(resolve,render) => {
        try {
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
            resolve("ok da xong nhe cac ban");
        }
        catch (e) {
            
        }
    })

    
}
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
let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try { 
            let users = await db.User.findAll({
                raw:true,
            });
           
            resolve(users);
        }
        catch (e) {
            reject(e);
        }
     })
 }
module.exports = {
    createNewUser,
    getAllUser,
}