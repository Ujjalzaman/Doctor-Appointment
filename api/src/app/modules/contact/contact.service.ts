import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { Transporter } from '../../../helpers/Transporter';

interface ContactPayload {
    email: string;
    firstName: string;
    lastName: string;
    subject: string;
    text: string;
}

const contactUs = async (payload: ContactPayload): Promise<{ message: string }> => {
    const { email, firstName, lastName, subject, text } = payload;

    if (!email || !firstName || !lastName || !subject || !text) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Mising Email required fields!');
    }
    try {
        const mailOptions = {
            from: `"${firstName + ' ' + lastName}" <${email}>`,
            to: 'ujjalzaman+doctor@gmail.com',
            subject: subject,
            text: text
        };
        await Transporter.sendMail(mailOptions);
        return {
            message: "Successfull message has been sent !"
        }
    } catch (error) {
        throw new ApiError(httpStatus.NO_CONTENT, "Unable to send message !")
    }
}

export const ContactService = {
    contactUs
}