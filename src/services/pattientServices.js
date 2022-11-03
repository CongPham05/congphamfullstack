import db from "../models/index";
require('dotenv').config();

let postBookAppoinment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            }
            else {
                //upsert patient 
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    default: {
                        email: data.email,
                        roleIdL: 'R3'
                    },
                });

                console.log('>> check user : ', user[0])
                //create a booking record
                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: { patientId: user[0].id },
                        default: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0], id,
                            date: data.date,
                            timeType: data.timeType
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save infor patient succed!'
                })
            }

        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    postBookAppoinment
}