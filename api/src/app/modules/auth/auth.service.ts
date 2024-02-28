import bcrypt from 'bcrypt';
import prisma from "../../../shared/prisma";
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { JwtHelper } from '../../../helpers/jwtHelper';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import moment from 'moment';
import { EmailtTransporter } from '../../../helpers/emailTransporter';
const { v4: uuidv4 } = require('uuid');
import * as path from 'path';

type ILginResponse = {
    accessToken?: string;
    user: {}
}

const loginUser = async (user: any): Promise<ILginResponse> => {
    const { email: IEmail, password } = user;
    const isUserExist = await prisma.auth.findUnique({
        where: { email: IEmail }
    })

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    // check Verified doctor or not
    if (isUserExist.role === 'doctor') {
        const getDoctorInfo = await prisma.doctor.findUnique({
            where: {
                email: isUserExist.email
            }
        })
        if (getDoctorInfo && getDoctorInfo?.verified === false) {
            throw new ApiError(httpStatus.NOT_FOUND, "Please Verify Your Email First !");
        }
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
    const { role, userId } = isUserExist;
    const accessToken = JwtHelper.createToken(
        { role, userId },
        config.jwt.secret as Secret,
        config.jwt.JWT_EXPIRES_IN as string
    )
    return { accessToken, user: { role, userId } }
}

const VerificationUser = async (user: any): Promise<ILginResponse> => {
    const { email: IEmail, password } = user;
    const isUserExist = await prisma.auth.findUnique({
        where: { email: IEmail }
    })

    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    const isPasswordMatched = await bcrypt.compare(password, isUserExist.password);

    if (!isPasswordMatched) {
        throw new ApiError(httpStatus.NOT_FOUND, "Password is not Matched !");
    }
    const { role, userId } = isUserExist;
    const accessToken = JwtHelper.createToken(
        { role, userId },
        config.jwt.secret as Secret,
        config.jwt.JWT_EXPIRES_IN as string
    )
    return { accessToken, user: { role, userId } }
}

const resetPassword = async (payload: any): Promise<{ message: string }> => {
    const { email } = payload;
    const isUserExist = await prisma.auth.findUnique({
        where: { email: email }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !");
    }
    const clientUrl = `${config.clientUrl}/reset-password/`
    const uniqueString = uuidv4() + isUserExist.id;
    const uniqueStringHashed = await bcrypt.hashSync(uniqueString, 12);
    const encodedUniqueStringHashed = uniqueStringHashed.replace(/\//g, '-');

    const resetLink = clientUrl + isUserExist.id + '/' + encodedUniqueStringHashed;
    const currentTime = moment();
    const expiresTime = moment(currentTime).add(4, 'hours');

    await prisma.$transaction(async (tx) => {
        //Check if the forgotPassword record exists before attempting reset
        const existingForgotPassword = await tx.forgotPassword.findUnique({
            where: { id: isUserExist.id }
        });
        if (existingForgotPassword) {
            await tx.forgotPassword.delete({
                where: { id: isUserExist.id }
            })
        }

        const forgotPassword = await tx.forgotPassword.create({
            data: {
                userId: isUserExist.id,
                expiresAt: expiresTime.toDate(),
                uniqueString: resetLink
            }
        });
        
        if (forgotPassword) {
            const pathName = path.join(__dirname, '../../../../template/resetPassword.html')
            const obj = {
                link: resetLink
            };
            const subject = "Request to Reset Password";
            const toMail = isUserExist.email;
            try {
                await EmailtTransporter({ pathName, replacementObj: obj, toMail, subject })
            } catch (error) {
                console.log("Error reset password email", error);
                throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Unable to send reset email!")
            }
        }
        return forgotPassword;
    });


    return {
        message: "Password Reset Successfully !!"
    };
}

const PassworResetConfirm = async (payload: any): Promise<any> => {
    const { userId, uniqueString, password } = payload;

    await prisma.$transaction(async (tx) => {
        const isUserExist = await tx.auth.findUnique({
            where: { id: userId }
        });

        if (!isUserExist) { throw new ApiError(httpStatus.NOT_FOUND, "User is not Exist !") };
        const resetLink = `${config.clientUrl}/reset-password/${isUserExist.id}/${uniqueString}`
        const getForgotRequest = await tx.forgotPassword.findFirst({
            where: {
                userId: userId as string,
                uniqueString: resetLink
            }
        })
        if (!getForgotRequest) { throw new ApiError(httpStatus.NOT_FOUND, "Forgot Request was not found or Invalid !") };

        const expiresAt = moment(getForgotRequest.expiresAt);
        const currentTime = moment();
        if (expiresAt.isBefore(currentTime)) {
            throw new ApiError(httpStatus.NOT_FOUND, "Forgot Request has been expired !")
        } else {
            await tx.auth.update({
                where: {
                    id: userId
                },
                data: {
                    password: password && await bcrypt.hashSync(password, 12)
                }
            });
            await prisma.forgotPassword.delete({
                where: {
                    id: getForgotRequest.id
                }
            })
        }
    });
    return {
        message: "Password Changed Successfully !!"
    }
}

export const AuthService = {
    loginUser,
    VerificationUser,
    resetPassword,
    PassworResetConfirm
}