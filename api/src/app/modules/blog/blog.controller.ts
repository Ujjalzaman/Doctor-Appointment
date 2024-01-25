import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { BlogService } from "./blog.service";
import { Blogs } from "@prisma/client";
import httpStatus from "http-status";
import pick from "../../../shared/pick";

const createBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.createBlog(req);
    sendResponse<Blogs>(res, {
        statusCode: httpStatus.OK,
        message: "Blog Created Successfully",
        success: true,
        data: result
    })
})

const getAllBlogs = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['searchTerm', 'title', 'description']);
    const options = pick(req.query, ['limit', 'page', 'sortBy', 'sortOrder'])
    const result = await BlogService.getAllBlogs(filter, options);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        message: "Blogs Retrive Successfully",
        success: true,
        data: result
    })
})

const getBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.getBlog(req.params.id);
    sendResponse<Blogs>(res, {
        statusCode: httpStatus.OK,
        message: "Blog Retrive Successfully",
        success: true,
        data: result
    })
})

const updateBlog = catchAsync(async (req: Request, res: Response) => {
    const result = await BlogService.updateBlog(req);
    sendResponse<Blogs>(res, {
        statusCode: httpStatus.OK,
        message: "Blog Updated Successfully",
        success: true,
        data: result
    })
})

const deleteBlog = catchAsync(async (req: Request, res: Response) => {
    await BlogService.deleteBlog(req.params.id);
    sendResponse<Blogs>(res, {
        statusCode: httpStatus.OK,
        message: "Blog deleted Successfully",
        success: true,
    })
})

export const BlogController = {
    createBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}