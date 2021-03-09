const nodemailer = require('nodemailer');
const path = require('path');
const EmailTemplates = require('email-templates');

const { EMAIL_SENDER, EMAIL_SENDER_PASS } = require('../configs/config');
const emailTemplates = require('../email-templates');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});
console.log(EMAIL_SENDER);
console.log(EMAIL_SENDER_PASS);
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_SENDER,
        pass: EMAIL_SENDER_PASS
    }
});

const sendEmail = async (userEmail, action, context) => {
    try {
        const template = emailTemplates[action];

        if (!template) {
            throw new Error('Something wrong with email');
        }

        const html = await templateParser.render(template.templateName, context);

        return transporter.sendMail({
            from: 'No reply',
            to: userEmail,
            subject: template.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendEmail
};
