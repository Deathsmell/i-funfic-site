import nodemailer from "nodemailer";
import {mailOptions} from "./secret"

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user: process.env.GMAIL_USERNAME || mailOptions.username,
        pass: process.env.GMAIL_PASSWORD || mailOptions.password
    }
});

export const sendMail = async (to: string, subject: string, text: string) => {

    const mailOptions = {
        from: 'i-mordor-funfik-site@mordor.com',
        to: to,
        subject: subject,
        text: text
    };

    await transport.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};