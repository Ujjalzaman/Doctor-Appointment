import fs from 'fs';
import handlebars from 'handlebars';
import ApiError from '../errors/apiError';
import httpStatus from 'http-status';
import { Transporter } from './Transporter';
import config from '../config';

type IEmailProps = {
    pathName: string;
    replacementObj: any,
    toMail: string,
    subject: string,
}
export const EmailtTransporter = async({pathName,replacementObj, toMail, subject }:IEmailProps) =>{  
    const html = await readHtmlFile(pathName);
    const template = handlebars.compile(html);
    const htmlToSend = template(replacementObj);
    
    const mailOptions = {
        from: `<${config.adminEmail}>`,
        to: toMail,
        subject: subject,
        html: htmlToSend
    };

    try {
        await Transporter.sendMail(mailOptions);
    } catch (error) {
        console.log(error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to send Email !");
    }
};

const readHtmlFile = async(path:string): Promise<string> =>{
    try {
        const html = await fs.promises.readFile(path, {encoding: 'utf-8'});
        return html
    } catch (error) {
        console.log("Error Reading html file", error);
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to read HTML file")
    }
}