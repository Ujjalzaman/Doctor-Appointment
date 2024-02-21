"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
exports.Transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: "ujjalzaman@gmail.com",
        pass: config_1.default.emailPass
    }
});
