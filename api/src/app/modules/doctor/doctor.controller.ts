import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorService } from "./doctor.service";
import { IDoctor } from "./doctor.interface";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const { ...DoctorInfo } = req.body;
    const result = await DoctorService.createDoctor(DoctorInfo);
    sendResponse<IDoctor>(res, {
        statusCode: 200,
        message: 'Successfully doctor created !!',
        success: true,
        data: result,
    })
})

const getAllDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorService.getAllDoctor();
    sendResponse<IDoctor[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Doctor !!',
        success: true,
        data: result,
    })
})

const getSingleDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorService.getSingleDoctor(id);
    sendResponse<IDoctor>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Doctor !!',
        success: true,
        data: result,
    })
})

const deleteDoctor = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await DoctorService.deleteDoctor(id);
    sendResponse<IDoctor>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Doctor !!',
        success: true,
    })
})

const updateDoctor = catchAsync(async (req: Request, res: Response) => {
    const { ...doctorInfo } = req.body;
    const { id } = req.params;
    const result = await DoctorService.updateDoctor(id, doctorInfo);
    sendResponse<IDoctor>(res, {
        statusCode: 200,
        message: 'Successfully Updated doctor informations !!',
        success: true,
        data: result,
    })
})

export const DoctorController = {
    updateDoctor,
    deleteDoctor,
    getAllDoctor,
    getSingleDoctor,
    createDoctor
}