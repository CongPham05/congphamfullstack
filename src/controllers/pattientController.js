import patientService from '../services/pattientServices';

let postBookAppoinment = async (req, res) => {
    try {

        let infor = await patientService.postBookAppoinment(req.body);
        return res.status(200).json(infor)

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Servser ..."
        })
    }
}
let postVerifyBookAppointment = async (req, res) => {
    try {
        let infor = await patientService.postVerifyBookAppointment(req.body);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from Servser ..."
        })
    }
}
module.exports = {
    postBookAppoinment,
    postVerifyBookAppointment
}