import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { Auth } from "@prisma/client";

const SignUP = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.AuthSignup(req.body);
    sendResponse<Auth>(res, {
        statusCode: 200,
        message: 'Successfully Signup !!',
        success: true,
        data: result,
    })
})

export const AuthController = {
    SignUP
}