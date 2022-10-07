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

    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            errMessage: "Loi tu Server..."
        })
    }
}


module.exports = {
    getTopDoctorHome,
    getAllDoctors

}