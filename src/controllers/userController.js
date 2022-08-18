import userServicde from '../services/userService'


let handleLogin = async (req, res) => {

    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res
            .status(500)
            .json({
            errCode: 1,
            message:'Con lon may khong nhap email, password a',
        })
    }
    let userData = await userServicde.handleUserLogin(email, password);
    
    return res
        .status(200)
        .json({
            errCode:userData.errCode,
            message: userData.errMessage,
            user:userData.user?userData.user:{}
            
        })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.query.id; //All, id
   
    if (!id) {
       
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required paramters',
            users:[]
        })
    }
    let users = await userServicde.getAllUsers(id);
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userServicde.createNewUser(req.body);
    return res.status(200).json(message);
}

let handleDeleteUser = async (req, res) => {
    if (!req.body.id) {
        res.status(200).json({
            errCode: 1,
            message: "Loi thieu id de xoa"
        });
    }
    let message = await userServicde.deleteUser(req.body.id);
    return res.status(200).json(message);
}

let handleEditUser = () => {
    
}
module.exports = {
    handleLogin,
    handleGetAllUsers,
    handleCreateNewUser,
    handleEditUser,
    handleDeleteUser,
}