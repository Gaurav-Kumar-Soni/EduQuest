const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, title, body) => {
    try {
        let transport = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })

        let info = await transport.sendMail({
            from: "EduQuest || Eduquest academy - by sonigaurav",
            to: `${email}`,
            subject: `${title}`,
            html: `${body}`,
        })
        console.log("mailer info : ", info);
        return info;

    } catch (error) {
        console.log(error.message);
    }
} 

module.exports = mailSender; 