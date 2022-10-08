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
module.exports = {
    getTopDoctorHome,
    getAllDoctors,
    postInforDoctor

}