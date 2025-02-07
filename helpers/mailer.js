require('dotenv').config();

const axios = require('axios');

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

async function callEmailEndpoint(data) {
    try {
        const info = {
            ...data,
            to: 'aloecheverria7@gmail.com',
            subject: 'Nueva Cita Agendada',
            template_name: 'citas',
            mailer_name: 'Citas Medicas',
            markdown: false
        }

        const response = await axios.post(`https://prueba.ewoldygroup.com/api/send-email`, info);

        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}

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

module.exports = callEmailEndpoint;