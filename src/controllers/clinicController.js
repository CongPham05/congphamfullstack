import clinicService from '../services/clinicService';


let createClinic = async (req, res) => {
    try {
        let infor = await clinicService.createClinic(req.body);

        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi create Clinic . . ."
        })
    }
}
let getAllClinic = async (req, res) => {
    try {
        let infor = await clinicService.getAllClinic();
        return res.status(200).json(infor);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi getALLClinic Clinic . . ."
        })
    }
}
let getDetailClinicById = async (req, res) => {
    try {
        let infor = await clinicService.getDetailClinicById(req.query.id);
        return res.status(200).json(infor);
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi  getDetailClinicById . . ."
        })
    }
}
module.exports = {
    createClinic,
    getAllClinic,
    getDetailClinicById
}