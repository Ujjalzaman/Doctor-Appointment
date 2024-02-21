"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailtTransporter = void 0;
const fs_1 = __importDefault(require("fs"));
const handlebars_1 = __importDefault(require("handlebars"));
const apiError_1 = __importDefault(require("../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const Transporter_1 = require("./Transporter");
const EmailtTransporter = ({ pathName, replacementObj, firstName, lastName, fromMail, toMail, subject }) => {
    const readHtmlFile = (path, callback) => {
        fs_1.default.readFile(path, { encoding: 'utf-8' }, function (err, html) {
            if (err) {
                callback(err);
            }
            else {
                callback(null, html);
            }
        });
    };
    readHtmlFile(__dirname + `${pathName}`, function (err, html) {
        if (err) {
            console.log(err);
            return;
        }
        const template = handlebars_1.default.compile(html);
        const htmlToSend = template(replacementObj);
        var mailOptions = {
            from: `<${fromMail}>`,
            to: toMail,
            subject: subject,
            html: htmlToSend
        };
        Transporter_1.Transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                throw new apiError_1.default(http_status_1.default.NO_CONTENT, "Unable to send message !");
            }
            else {
                return;
            }
        });
    });
};
exports.EmailtTransporter = EmailtTransporter;
