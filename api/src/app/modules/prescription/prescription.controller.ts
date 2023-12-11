import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PrescriptionService } from "./prescription.service";

const createPrescription = catchAsync(async (req: Request, res: Response) => {
    await PrescriptionService.createPrescription(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Created Prescription !!',
        success: true,
    })
})

export const PrescriptionController = {
    createPrescription
}