import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer from 'nodemailer';
import config from '../config';
import ApiError from '../errors/apiError';
import httpStatus from 'http-status';

type IEmailProps = {
    pathName: string;
    replacementObj: any,
    firstName: string | null,
    lastName: string | null,
    fromMail: string,
    toMail: string,
    subject: string,
}

export const EmailtTransporter = ({pathName,replacementObj,firstName, lastName, fromMail, toMail, subject }:IEmailProps) =>{  
    const readHtmlFile = (path:string, callback: Function) =>{
        fs.readFile(path, {encoding: 'utf-8'}, function(err, html){
            if(err){
                callback(err);
            }else{
                callback(null, html)
            }
        })
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "ujjalzaman@gmail.com",
            pass: config.emailPass
        }
    });

    readHtmlFile(__dirname + `${pathName}`, function(err:any, html:any){
        if(err){
            console.log(err);
            return;
        }
        const template = handlebars.compile(html);
        const htmlToSend = template(replacementObj);
        var mailOptions = {
            from: `"${firstName + ' ' + lastName}" <${fromMail}>`,
            to: toMail,
            subject: subject,
            html: htmlToSend
        };

        transporter.sendMail(mailOptions, function (error: any, info: any) {
            if (error) {
                console.log(error)
                throw new ApiError(httpStatus.NO_CONTENT, "Unable to send message !")
            } else {
                return
            }
        });
    })
}