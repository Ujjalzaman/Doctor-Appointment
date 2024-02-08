import nodemailer from 'nodemailer';
import config from '../../../config';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';

const contactUs = async (payload: any): Promise<{message: string}> => {
    const { email, firstName, lastName, subject, text } = payload;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ujjalzaman@gmail.com",
            pass: config.emailPass
        }
    });

    var mailOptions = {
        from: `"${firstName + ' ' + lastName}" <${email}>`,
        to: 'ujjalzaman+doctor@gmail.com',
        subject: subject,
        text: text
    };

    transporter.sendMail(mailOptions, function (error: any, info: any) {
        if (error) {
            throw new ApiError(httpStatus.NO_CONTENT, "Unable to send message !")
        } else {
            return
        }
    });
    return {
        message: "Successfull message has been sent !"
    }
    
}

export const ContactService = {
    contactUs
}