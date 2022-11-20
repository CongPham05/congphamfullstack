import { json } from 'body-parser';
import specialtyService from '../services/specialtyService';

let createSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.createSpecialty(req.body);

        return res.status(200).json(infor)
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error form the server createSpecialty'
        })
    }
}
let getAllSpecialty = async (req, res) => {
    try {
        let infor = await specialtyService.getAllSpecialty();
        return res.status(200).json(infor);

    } catch (error) {
        console.log(error);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the Server getAllSpecialty"
        })
    }
}
let getDetailSpecialtyById = async (req, res) => {
    try {

        let infor = await specialtyService.getDetailSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(infor);

    } catch (error) {
        console.log(error);
        return res.status(200), json({
            errCode: -1,
            errMessage: "Loi getDetailSpecialtyById. . ."
        })
    }
}
module.exports = {
    createSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById
}