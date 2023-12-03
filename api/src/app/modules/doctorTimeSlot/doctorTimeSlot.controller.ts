import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { TimeSlot } from "@prisma/client";
import { TimeSlotService } from "./doctorTimeSlot.service";

const createTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await TimeSlotService.createTimeSlot(req.user, req.body);
    sendResponse<TimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully created Time Slot !!',
        success: true,
        data: result
    })
})

const getAllTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await TimeSlotService.getallTimeSlot();
    sendResponse<TimeSlot[]>(res, {
        statusCode: 200,
        message: 'Successfully  get all Time Slot !!',
        success: true,
        data: result
    })
})

const getMyTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await TimeSlotService.getMyTimeSlot(req.user);
    sendResponse<TimeSlot[]>(res, {
        statusCode: 200,
        message: 'Successfully  get all Time Slot !!',
        success: true,
        data: result
    })
})

const getTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await TimeSlotService.getTimeSlot(req.params.id);
    sendResponse<TimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully get Time Slot !!',
        success: true,
        data: result
    })
})

const updateTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await TimeSlotService.updateTimeSlot(req.params.id, req.body);
    sendResponse<TimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully updated Time Slot !!',
        success: true,
        data: result
    })
})

const deleteTimeSlot = catchAsync(async (req: Request, res: Response) => {
    const result = await TimeSlotService.deleteTimeSlot(req.params.id);
    sendResponse<TimeSlot>(res, {
        statusCode: 200,
        message: 'Successfully deleted Time Slot !!',
        success: true,
        data: result
    })
})


export const doctorTimeSlotController = {
    getAllTimeSlot,
    getTimeSlot,
    updateTimeSlot,
    createTimeSlot,
    deleteTimeSlot,
    getMyTimeSlot
}