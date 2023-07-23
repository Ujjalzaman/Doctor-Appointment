import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MadicalHistoryService } from "./madicalHistory.service";
import { IMadicalHistory } from "./madicalHistory.interface";

const createMadicalHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...patientInfo } = req.body;
    const result = await MadicalHistoryService.createMadicalHistory(patientInfo);
    sendResponse<IMadicalHistory>(res, {
        statusCode: 200,
        message: 'Successfully Madical History created !!',
        success: true,
        data: result,
    })
})

const getAllMadicalHistory = catchAsync(async (req: Request, res: Response) => {
    const result = await MadicalHistoryService.getAllMadicalHistory();
    sendResponse<IMadicalHistory[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Madical History !!',
        success: true,
        data: result,
    })
})

const getSingleMadicalHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await MadicalHistoryService.getSingleMadicalHistory(id);
    sendResponse<IMadicalHistory>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Madical History !!',
        success: true,
        data: result,
    })
})

const deleteMadicalHistory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await MadicalHistoryService.deleteMadicalHistory(id);
    sendResponse<IMadicalHistory>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Madical History !!',
        success: true,
    })
})

const updateMadicalHistory = catchAsync(async (req: Request, res: Response) => {
    const { ...patientInfo } = req.body;
    const { id } = req.params;
    const result = await MadicalHistoryService.updateMadicalHistory(id, patientInfo);
    sendResponse<IMadicalHistory>(res, {
        statusCode: 200,
        message: 'Successfully Updated Madical History informations !!',
        success: true,
        data: result,
    })
})

export const MadicalHistoryController = {
    createMadicalHistory,
    updateMadicalHistory,
    getSingleMadicalHistory,
    deleteMadicalHistory,
    getAllMadicalHistory
}