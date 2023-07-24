import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { PaymentService } from "./payment.service";
import { IPayment } from "./payment.interface";

const createPayment = catchAsync(async (req: Request, res: Response) => {
    const { ...paymentInfo } = req.body;
    const result = await PaymentService.createPayment(paymentInfo);
    sendResponse<IPayment>(res, {
        statusCode: 200,
        message: 'Successfully Payment created !!',
        success: true,
        data: result,
    })
})

const getAllPayment = catchAsync(async (req: Request, res: Response) => {
    const result = await PaymentService.getAllPayment();
    sendResponse<IPayment[]>(res, {
        statusCode: 200,
        message: 'Successfully Retriev All Payment !!',
        success: true,
        data: result,
    })
})

const getSinglePayment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await PaymentService.getSinglePayment(id);
    sendResponse<IPayment>(res, {
        statusCode: 200,
        message: 'Successfully Get Single Payment !!',
        success: true,
        data: result,
    })
})

const deletePayment = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    await PaymentService.deletePayment(id);
    sendResponse<IPayment>(res, {
        statusCode: 200,
        message: 'Successfully Deleted Payment !!',
        success: true,
    })
})

const updatePayment = catchAsync(async (req: Request, res: Response) => {
    const { ...paymentInfo } = req.body;
    const { id } = req.params;
    const result = await PaymentService.updatePayment(id, paymentInfo);
    sendResponse<IPayment>(res, {
        statusCode: 200,
        message: 'Successfully Updated Payment informations !!',
        success: true,
        data: result,
    })
})

export const PaymentController = {
    createPayment,
    updatePayment,
    deletePayment,
    getAllPayment,
    getSinglePayment
}