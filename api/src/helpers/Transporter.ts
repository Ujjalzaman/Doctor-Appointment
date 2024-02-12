import nodemailer from 'nodemailer';
import config from '../config';

export const Transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "ujjalzaman@gmail.com",
        pass: config.emailPass
    }
});
