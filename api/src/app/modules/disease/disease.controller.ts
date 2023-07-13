import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { DiseaseService } from "./disease.service";
import sendResponse from "../../../shared/sendResponse";
import { IDisease } from "./disease.interface";

const createDisease = catchAsync(async(req:Request, res: Response) => {
    const {...disease} = req.body;
    const result = await DiseaseService.createDisease(disease);
    sendResponse<IDisease>(res, {
        statusCode: 200, 
        message: 'Successfully created Disease !!', 
        success: true,
        data: result,
    })
})

const getAllDisease = catchAsync(async(req:Request, res: Response) => {
    const result = await DiseaseService.getAllDisease();
    sendResponse<IDisease[]>(res, {
        statusCode: 200, 
        message: 'Successfully Retriev All Disease !!', 
        success: true,
        data: result,
    })
})

const getsingleDisease = catchAsync(async(req:Request, res: Response) => {
    const {diseaseId} = req.params;
    const result = await DiseaseService.getSingleDisease(diseaseId);
    sendResponse<IDisease>(res, {
        statusCode: 200, 
        message: 'Successfully Get Single Disease !!', 
        success: true,
        data: result,
    })
})

const deleteDisease = catchAsync(async(req:Request, res: Response) => {
    const {diseaseId} = req.params;
    const result = await DiseaseService.deleteDisease(diseaseId);
    sendResponse<IDisease>(res, {
        statusCode: 200, 
        message: 'Successfully Deleted Disease !!', 
        success: true,
    })
})

const updateDisease = catchAsync(async(req:Request, res: Response) => {
    const {...disease} = req.body;
    const {diseaseId} = req.params;
    const result = await DiseaseService.updateDisease(diseaseId,disease);
    sendResponse<IDisease>(res, {
        statusCode: 200, 
        message: 'Successfully Updated Disease !!', 
        success: true,
        data: result,
    })
})


export const DiseaseController = {
    createDisease,
    getAllDisease,
    getsingleDisease,
    updateDisease,
    deleteDisease
}