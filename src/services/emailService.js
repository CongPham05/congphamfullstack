require('dotenv').config(); //process.env.{NAME}
const nodemailer = require("nodemailer");



let sendSimpleEmail = async (dataSend) => {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Tao la Hacker 👻" <congphamvan115@gmail.com>', // sender address
        to: dataSend.reciverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: getBodyHTMLEmail(dataSend),
    });
}
let getBodyHTMLEmail = (dataSend) => {
    let result = '';
    if (dataSend.language === 'vi') {
        result =
            `<h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên BookingCare <p/>
        <p>Thông tin đặt lịch khám bệnh : </p>
        <div><b>Thời gian: ${dataSend.time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Nếu các thông tin trên là đúng sự thật, 
        vui lòng click vào đường link bên dưới để hoàn tất thủ tục khám bệnh</p>
        <div>
        <a href=${dataSend.recivertLink} target="_blank">Click here</a>
        </div>
        <div>Xin chân thành cảm ơn !</div>
        `
    }
    if (dataSend.language === 'en') {
        result =
            `<h3>Dear  ${dataSend.patientName}</h3>
        <p>You received this email because you booked an online medical appointment on the page BookingCare <p/>
        <p>Information to book a medical appointment: </p>
        <div><b>Time: ${dataSend.time}</b></div>
        <div><b>Doctor: ${dataSend.doctorName}</b></div>
        <p>If the above information is true,
        Please click on the link below to complete the medical examination</p>
        <div>
        <a href=${dataSend.recivertLink} target="_blank">Click here</a>
        </div>
        <div>Sincerely thank !</div>
        `
    }
    return result;
}

module.exports = ({
    sendSimpleEmail
})