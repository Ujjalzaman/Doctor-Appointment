import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { AppointmentService } from "./appointment.service";
import { IAppointment } from "./appointment.interface";

const createAppointment = catchAsync(async (req: Request, res: Response) => {
    const { ...appointInfo } = req.body;
    const result = await AppointmentService.createAppointment(appointInfo);
    sendResponse<IAppointment>(res, {
        statusCode: 200,
        message: 'Successfully Appointmentt created !!',
        success: true,
        data: result,
    })
})

const getAllAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.getAllAppointment();
    sendResponse<IAppointment[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Appointmentt !!',
        success: true,
        data: result,
    })
})

const getSingleAppointment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await AppointmentService.getSingleAppointment(id);
    sendResponse<IAppointment>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Appointmentt !!',
        success: true,
        data: result,
    })
})

const deleteAppointment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await AppointmentService.deleteAppointment(id);
    sendResponse<IAppointment>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Appointmentt !!',
        success: true,
    })
})

const updateAppointment = catchAsync(async (req: Request, res: Response) => {
    const { ...appointInfo } = req.body;
    const { id } = req.params;
    const result = await AppointmentService.updateAppointment(id, appointInfo);
    sendResponse<IAppointment>(res, {
        statusCode: 200,
        message: 'Successfully Updated Appointmentt informations !!',
        success: true,
        data: result,
    })
})

export const AppointmentController = {
    createAppointment,
    updateAppointment,
    getAllAppointment,
    getSingleAppointment,
    deleteAppointment
}