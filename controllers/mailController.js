// node mailer

require("dotenv").config();
const nodemailer = require("nodemailer");

const sendEmail = async (req, res) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: req.body.to,
        subject: req.body.subject,
        text: req.body.body + "GitHub Link : ",
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200).send("Email sent");
};

module.exports = sendEmail;