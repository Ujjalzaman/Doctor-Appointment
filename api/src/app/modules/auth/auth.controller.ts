import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import config from "../../../config";
import path from 'path';
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import moment from "moment";

const Login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.loginUser(req.body);
    const { accessToken } = result;

    const cookieOptions = {
        secure: config.env === 'production',
        httpOnly: true
    }
    res.cookie('accessToken', accessToken, cookieOptions)
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Logged !!',
        success: true,
        data: result,
    })
})
const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.resetPassword(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Passwrod Reset!!',
        success: true,
        data: result,
    })
})

const PasswordResetConfirm = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.PassworResetConfirm(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Passwrod Changed!!',
        success: true,
        data: result,
    })
})

const VerifyUser = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User is not found !!");
    }
    const getVerficationUser = await prisma.userVerfication.findFirst({
        where: {
            userId: userId
        }
    })
    if (getVerficationUser) {
        const expiresAt = moment(getVerficationUser.expiresAt);
        const currentTime = moment();
        // check currenttime is before then expires Time
        const isWithinNext6Hours = currentTime.isBefore(expiresAt);

        if (isWithinNext6Hours) {
            await prisma.$transaction(async (tx) => {
                await tx.doctor.update({
                    where: {
                        id: isUserExist.id
                    },
                    data: {
                        verified: true
                    }
                });
                await tx.userVerfication.delete({
                    where: {
                        id: getVerficationUser.id
                    }
                })
            })
            res.redirect('/api/v1/auth/verified');
        } else {
            res.redirect('/api/v1/auth/expired/link');
        }
    }
})

const Verified = catchAsync(async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../../template/verfied.html"))
})

const VerficationExpired = catchAsync(async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../../../template/expiredVarification.html"))
})

export const AuthController = {
    Login,
    VerifyUser,
    Verified,
    VerficationExpired,
    resetPassword,
    PasswordResetConfirm
}