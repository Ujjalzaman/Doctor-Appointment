"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
const clientUrl = process.env.NODE_ENV === "development" ? process.env.CLIENT__LOCAL_URL : process.env.CLIENT_URL;
const showErrorDetails = process.env.NODE_ENV !== 'production' ||
    process.env.SHOW_ERROR_DETAILS === 'true' ||
    process.env.VERCEL_ENV === 'preview';
exports.default = {
    env: process.env.NODE_ENV,
    showErrorDetails,
    port: process.env.PORT,
    default_doctor_pass: process.env.DOCTOR_PASS,
    clientUrl: clientUrl,
    jwt: {
        secret: process.env.JWT_SCRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRED_IN,
        refresh_secret: (_a = process.env.JWT_REFRESH_SECRET) !== null && _a !== void 0 ? _a : process.env.JWT_REFRESH_SCRET,
    },
    cloudinary: {
        name: process.env.CLOUND_NAME,
        key: process.env.API_KEY,
        secret: process.env.API_SECRET
    },
    emailPass: process.env.EMAIL_PASS,
    adminEmail: process.env.ADMIN_EMAIL,
    gmail_app_Email: process.env.GMAIL_APP_EMAIL,
    defaultAdminDoctor: process.env.DEFULT_ADMIN_DOCTOR,
    backendLiveUrl: process.env.BACKEND_LIVE_URL,
    backendLocalUrl: process.env.BACKEND_LOCAL_URL
};
