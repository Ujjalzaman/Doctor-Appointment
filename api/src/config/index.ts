import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path: path.join(process.cwd(), '.env')});

const clientUrl = process.env.NODE_ENV==="development" ? process.env.CLIENT__LOCAL_URL : process.env.CLIENT_URL

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    default_doctor_pass: process.env.DOCTOR_PASS,
    clientUrl: clientUrl,
    jwt: {
        secret: process.env.JWT_SCRET,
        JWT_EXPIRES_IN: process.env.JWT_EXPIRED_IN,
        refresh_secret: process.env.JWT_REFRESH_SCRET,
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
}