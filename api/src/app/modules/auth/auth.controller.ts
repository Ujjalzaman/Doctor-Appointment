import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AuthService } from "./auth.service";
import { IAuth } from "./auth.interface";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const { patient, ...otherInfo } = req.body;
    const result = await AuthService.createPatient(patient, otherInfo);

    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Patient created !!',
        success: true,
        data: result,
    })
})
const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const { doctor, ...otherInfo } = req.body;
    const result = await AuthService.createPatient(doctor, otherInfo);

    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Doctor created !!',
        success: true,
        data: result,
    })
})
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const { admin, ...otherInfo } = req.body;
    const result = await AuthService.createPatient(admin, otherInfo);

    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Admin created !!',
        success: true,
        data: result,
    })
})

const getAllAuth = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.getAllAuth();
    sendResponse<IAuth[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Auth !!',
        success: true,
        data: result,
    })
})

const getSingleAuth = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AuthService.getSingleAuth(id);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Auth !!',
        success: true,
        data: result,
    })
})

const deleteAuth = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await AuthService.deleteAuth(id);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Auth !!',
        success: true,
    })
})

const updateAuth = catchAsync(async (req: Request, res: Response) => {
    const { ...appointInfo } = req.body;
    const { id } = req.params;
    const result = await AuthService.updateAuth(id, appointInfo);
    sendResponse<IAuth>(res, {
        statusCode: 200,
        message: 'Successfully Updated Auth informations !!',
        success: true,
        data: result,
    })
})

export const AuthController = {
    updateAuth,
    deleteAuth,
    getAllAuth,
    getSingleAuth,
    createPatient,
    createDoctor,
    createAdmin
}