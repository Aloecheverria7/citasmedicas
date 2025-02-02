require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    }
});

async function sendMail(to, subject, text) {
    try {
        const info = await transporter.sendMail({
            from: 'citas@ewoldygroup.com',
            to: to,
            subject: subject,
            text: text,
        });

        console.log('Correo enviado: ', info.messageId);

        return info;
    } catch (error) {
        console.error('Error al enviar correo', error);
        throw error;
    }
}

module.exports = sendMail;