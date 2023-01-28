import doctorService from '../services/doctorService';

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let response = await doctorService.getTopDoctorHome(+limit);
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from Server...',
        })
    }
}
let getAllDoctors = async (req, res) => {
    try {
        let doctors = await doctorService.getAllDoctors();
        return res.status(200).json(doctors)

    } catch (error) {
        console.log(error)
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Loi den tu server...'
        })
    }
}
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorService.postInforDoctor(req.body);
        return res.status(200).json(response);

    } catch (error) {
        console.log(error)
        return res.status(200)
            .json({
                errCode: -1,
                errMessage: "Loi den tu server postInforDoctor..."
            })
    }
}
let getDetailDoctorById = async (req, res) => {
    try {
        let response = await doctorService.getDetailDoctorById(req.query.doctorId);
        return res.status(200).json(response);

    } catch (error) {
        console.log("Loi den tu server...")
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi khong lay dc Detail doctor..."
        })
    }
}
let bulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorService.bulkCreateSchedule(req.body);
        return res.status(200).json({ infor })
    } catch (error) {
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi ko luu dc bulkCreateSchedule . . ."
        })
    }
}
let getScheduleByDate = async (req, res) => {
    try {
        let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date);
        return res.status(200)
            .json(infor)

    } catch (error) {
        res.status(200)
            .json({
                errCode: -1,
                errMessage: "Loi get schedule by date . . ."
            })
    }
}
let getExtraInforDoctorById = async (req, res) => {
    try {

        let infor = await doctorService.getExtraInforDoctorById(req.query.doctorId);
        return res.status(200).json(infor)

    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Loi tu Server . . ."
        })
    }
}
let getProfileDoctorById = async (req, res) => {
    try {

        let infor = await doctorService.getProfileDoctorById(req.query.doctorId);
        return res.status(200).json(infor)

    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Loi tu Server . . ."
        })
    }
}
let getListPatientForDoctor = async (req, res) => {
    try {

        let infor = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(infor)

    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Loi tu Server . . ."
        })
    }
}
let sendRemedy = async (req, res) => {
    try {
        let data = req.body;


        let infor = await doctorService.sendRemedy(req.body);

        return res.status(200).json(infor)

    } catch (error) {
        console.log(error);
        res.status(200).json({
            errCode: -1,
            errMessage: "Loi tu Server . . ."
        })
    }
}
module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor,
    getDetailDoctorById,
    bulkCreateSchedule,
    getScheduleByDate,
    getExtraInforDoctorById,
    getProfileDoctorById,
    getListPatientForDoctor,
    sendRemedy
}