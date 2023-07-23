import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DoctorTimeSlotService } from "./doctorTimeSlot.service";
import { IDoctorTimeSlot } from "./doctorTimeSlot.interface";

const createDoctorTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const { ...patientInfo } = req.body;
    const result = await DoctorTimeSlotService.createDoctorTimeSlot(patientInfo);
    sendResponse<IDoctorTimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully time-slot created !!',
        success: true,
        data: result,
    })
})

const getAllDoctorTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await DoctorTimeSlotService.getAllDoctorTimeSlot();
    sendResponse<IDoctorTimeSlot[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All time-slot !!',
        success: true,
        data: result,
    })
})

const getSingleDoctorTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await DoctorTimeSlotService.getSingleDoctorTimeSlot(id);
    sendResponse<IDoctorTimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully Get  time-slot !!',
        success: true,
        data: result,
    })
})

const deleteDoctorTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await DoctorTimeSlotService.deleteDoctorTimeSlot(id);
    sendResponse<IDoctorTimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully Deleted time-slot !!',
        success: true,
    })
})

const updateDoctorTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const { ...patientInfo } = req.body;
    const { id } = req.params;
    const result = await DoctorTimeSlotService.updateDoctorTimeSlot(id, patientInfo);
    sendResponse<IDoctorTimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully Updated time-slot !!',
        success: true,
        data: result,
    })
})

export const DoctorTimeSlotController = {
    createDoctorTimeSlot,
    deleteDoctorTimeSlot,
    getAllDoctorTimeSlot,
    getSingleDoctorTimeSlot,
    updateDoctorTimeSlot
}