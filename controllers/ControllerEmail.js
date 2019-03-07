"use strict";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey("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");

module.exports = {
    async main(html, subject) {

        const msg = {
            to: "vinniimiranda@gmail.com, lpfernandes_@hotmail.com",
            from: 'admin@gdocs.com',
            subject: subject,
            html: html,
        };
        
        sgMail.send(msg);
    }

}