"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const Transporter_1 = require("../../../helpers/Transporter");
const contactUs = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, subject, text } = payload;
    if (!email || !firstName || !lastName || !subject || !text) {
        throw new apiError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, 'Mising Email required fields!');
    }
    try {
        const mailOptions = {
            from: `"${firstName + ' ' + lastName}" <${email}>`,
            to: 'ujjalzaman+doctor@gmail.com',
            subject: subject,
            text: text
        };
        yield Transporter_1.Transporter.sendMail(mailOptions);
        return {
            message: "Successfull message has been sent !"
        };
    }
    catch (error) {
        throw new apiError_1.default(http_status_1.default.NO_CONTENT, "Unable to send message !");
    }
});
exports.ContactService = {
    contactUs
};
