import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Booking } from "@prisma/client";
import { AppointmentService } from "./appointment.service";

const doctorAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.doctorAppointment(req.user);
    sendResponse<Booking[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve doctor apppointments !!',
        success: true,
        data: result
    })
})

const patientAppointment = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.patientAppointment(req.user);
    sendResponse<Booking[]>(res, {
        statusCode: 200,
        message: 'Successfully patient apppointments !!',
        success: true,
        data: result
    })
})

const updateAppointmentByDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await AppointmentService.updateAppointmentByDoctor(req.user, req.body);
    sendResponse<Booking>(res, {
        statusCode: 200,
        message: 'Successfully updated apppointments !!',
        success: true,
        data: result
    })
})


export const AppointmentController = {
    doctorAppointment,
    patientAppointment,
    updateAppointmentByDoctor
}