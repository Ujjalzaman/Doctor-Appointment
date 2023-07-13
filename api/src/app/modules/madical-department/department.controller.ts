import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { DepartmentService } from "./department.service";
import { IDepartment } from "./department.interface";

const createDepartment = catchAsync(async(req:Request, res: Response) => {
    const {...departmentInfo} = req.body;
    const result = await DepartmentService.createDepartment(departmentInfo);
    sendResponse<IDepartment>(res, {
        statusCode: 200, 
        message: 'Successfully created Madical Department !!', 
        success: true,
        data: result,
    })
})

const getAllDepartment = catchAsync(async(req:Request, res: Response) => {
    const result = await DepartmentService.getDepartment();
    sendResponse<IDepartment[]>(res, {
        statusCode: 200, 
        message: 'Successfully Retriev All Madical Department !!', 
        success: true,
        data: result,
    })
})

const getSingleDepartment = catchAsync(async(req:Request, res: Response) => {
    const {id} = req.params;
    const result = await DepartmentService.getSingleDepartment(id);
    sendResponse<IDepartment>(res, {
        statusCode: 200, 
        message: 'Successfully Get Single madical department !!', 
        success: true,
        data: result,
    })
})

const deleteDepartment = catchAsync(async(req:Request, res: Response) => {
    const {id} = req.params;
    const result = await DepartmentService.deleteDepartment(id);
    sendResponse<IDepartment>(res, {
        statusCode: 200, 
        message: 'Successfully Deleted Madical Department !!', 
        success: true,
    })
})

const updateDepartment = catchAsync(async(req:Request, res: Response) => {
    const {...dipartmentInfo} = req.body;
    const {id} = req.params;
    const result = await DepartmentService.updateDepartment(id,dipartmentInfo);
    sendResponse<IDepartment>(res, {
        statusCode: 200, 
        message: 'Successfully Updated Madical Department !!', 
        success: true,
        data: result,
    })
})

export const DepartmentController = {
    createDepartment,
    deleteDepartment,
    getAllDepartment,
    getSingleDepartment,
    updateDepartment
}