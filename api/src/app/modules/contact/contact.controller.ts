import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ContactService } from "./contact.service";

const ContactUs = catchAsync(async (req: Request, res: Response) => {
    const result = await ContactService.contactUs(req.body);
    sendResponse(res, {
        statusCode: 200,
        message: 'Successfully Email Send !!',
        success: true,
        data: result
    })
})

export const ContactController = {
    ContactUs
}