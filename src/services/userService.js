import db from '../models/index';
import bcrypt from 'bcryptjs';


const salt = bcrypt.genSaltSync(10);

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt)
            resolve(hashPassword)
        }
        catch (e) {
            reject(e)
        }

    })
}
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    attributes: ['id', 'email', 'roleId', 'password', 'firstName', 'lastName'],
                    raw: true,
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
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
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
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                });

            }
            if (userId && userId !== 'ALL') {
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
    return new Promise(async (resolve, reject) => {
        try {
            //check email co ton tai ko 
            let check = await checkUserEmail(data.email);
            if (check) {
                resolve({
                    errCode: 1,
                    errMessage: "Da ton tai email tu truoc"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    address: data.address,
                    gender: data.gender,
                    phonenumber: data.phonenumber,
                    roleId: data.roleId,
                    positionId: data.positionId,
                    image: data.avatar
                })
                resolve({
                    errCode: 0,
                    message: 'OK',

                });
            }

        }
        catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
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
                where: { id: userId }
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
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.positionId || !data.gender) {

                resolve({
                    errCode: 2,
                    errMessage: "Missing required parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                user.roleId = data.roleId;
                user.positionId = data.positionId;
                user.gender = data.gender;
                user.phonenumber = data.phonenumber;
                if (data.avatar) {
                    user.image = data.avatar

                }
                await user.save();
                resolve({
                    errCode: 0,
                    errMessage: 'Update thanh cong nguoi dung'
                });
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: 'Ko co nguoi dung'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}
let getAllCodeService = (typeInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required paramenter'
                })
            }
            else {
                let res = {};
                let allcode = await db.Allcode.findAll({
                    where: { type: typeInput }
                });
                res.errCode = 0;
                res.data = allcode;
                resolve(res);
            }


        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin,
    getAllUsers,
    createNewUser,
    deleteUser,
    updateUserData,
    getAllCodeService,
}
