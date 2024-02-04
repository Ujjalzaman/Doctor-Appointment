import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { MedicineService } from "./medicine.service";
import { Medicine } from "@prisma/client";

const updateMedicine = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicineService.updateMedicine(req.body);
    sendResponse<Medicine>(res, {
        statusCode: 200,
        message: 'Successfully Update medicine !!',
        success: true,
        data: result
    })
})

const createMedicine = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicineService.createMedicine(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully create medicine !!',
        success: true,
        data: result
    })
})

const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
    const result = await MedicineService.deleteMedicine(req.params.id);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully deleted medicine !!',
        success: true,
        data: result
    })
})

export const MedicineController = {
    updateMedicine,
    createMedicine,
    deleteMedicine
}