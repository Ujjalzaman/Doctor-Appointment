import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IPatient } from "./patient.interface";
import { PatientService } from "./patient.service";

const getAllPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await PatientService.getAllPatient();
    sendResponse<IPatient[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Patient !!',
        success: true,
        data: result,
    })
})

const getSinglePatient = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PatientService.getSinglePatient(id);
    sendResponse<IPatient>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Patient !!',
        success: true,
        data: result,
    })
})

const deletePatient = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await PatientService.deletePatient(id);
    sendResponse<IPatient>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Patient !!',
        success: true,
    })
})

const updatePatient = catchAsync(async (req: Request, res: Response) => {
    const { ...patientInfo } = req.body;
    const { id } = req.params;
    const result = await PatientService.updatePatient(id, patientInfo);
    sendResponse<IPatient>(res, {
        statusCode: 200,
        message: 'Successfully Updated Patient informations !!',
        success: true,
        data: result,
    })
})

export const PatientController = {
    updatePatient,
    deletePatient,
    getAllPatient,
    getSinglePatient,
    // createPatient
}