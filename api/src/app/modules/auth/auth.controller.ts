import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { IAuth } from "./auth.interface";

const createAuth = catchAsync(async (req: Request, res: Response) => {
    const { ...appointInfo } = req.body;
    const result = await AuthService.createAuth(appointInfo);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Autht created !!',
        success: true,
        data: result,
    })
})

const getAllAuth = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.getAllAuth();
    sendResponse<IAuth[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Autht !!',
        success: true,
        data: result,
    })
})

const getSingleAuth = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AuthService.getSingleAuth(id);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Autht !!',
        success: true,
        data: result,
    })
})

const deleteAuth = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await AuthService.deleteAuth(id);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Autht !!',
        success: true,
    })
})

const updateAuth = catchAsync(async (req: Request, res: Response) => {
    const { ...appointInfo } = req.body;
    const { id } = req.params;
    const result = await AuthService.updateAuth(id, appointInfo);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Updated Autht informations !!',
        success: true,
        data: result,
    })
})

export const AuthController = {
    createAuth,
    updateAuth,
    deleteAuth,
    getAllAuth,
    getSingleAuth
}