"use strict";
const nodemailer = require("nodemailer");


module.exports = {
    async main(html, subject) {

        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "vinniimiranda@gmail.com", // generated ethereal user
                pass: "matadorx" // generated ethereal password
            }
        });


        let mailOptions = {
            from: '"Sistema" <vinniimiranda@gmail.com>',
            to: "vinniimiranda@gmail.com, lpfernandes_@hotmail.com",
            subject,
            text: "",
            html
        };

        let info = await transporter.sendMail(mailOptions)

    }

}