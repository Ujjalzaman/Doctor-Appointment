import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BookingService } from "./booking.service";
import { Booking } from "@prisma/client";

const createDoctor = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.createBooking(req.user, req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Booking Created !!',
        success: true,
        data: result
    })
})

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.getAllBookings();
    sendResponse<Booking[]>(res, {
        statusCode: 200,
        message: 'Successfully Retrieve All Booking !!',
        success: true,
        data: result,
    })
})

const getBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.getBooking(req.params.id);
    sendResponse<Booking>(res, {
        statusCode: 200,
        message: 'Successfully Get Booking !!',
        success: true,
        data: result,
    })
})

const deleteBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.deleteBooking(req.params.id);
    sendResponse<Booking>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Booking !!',
        success: true,
        data: result,
    })
})

const updateBooking = catchAsync(async (req: Request, res: Response) => {
    const result = await BookingService.updateBooking(req.params.id, req.body);
    sendResponse<Booking>(res, {
        statusCode: 200,
        message: 'Successfully Updated Booking !!',
        success: true,
        data: result,
    })
})

export const BookingController = {
    createDoctor,
    getAllBooking,
    getBooking,
    updateBooking,
    deleteBooking
}