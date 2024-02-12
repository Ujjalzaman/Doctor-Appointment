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

const VerifyUser = catchAsync(async (req: Request, res: Response) => {
    try {
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
            if (expiresAt.isBefore(currentTime)) {
                await prisma.doctor.update({
                    where: {
                        id: isUserExist.id
                    },
                    data: {
                        verified: true
                    }
                })
                res.redirect('/api/v1/auth/expired/link');
            } else {
                res.redirect('/api/v1/auth/verified');
            }
        }
    } catch (error) {
        throw new ApiError(httpStatus.NOT_FOUND, "Internal Server Error");
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
    VerficationExpired
}