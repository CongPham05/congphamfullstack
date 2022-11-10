import specialtyServide from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyServide.createSpecialty(req.body);

        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server'
        })
    }
}
module.exports = {
    createSpecialty
}