import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import { Blogs } from "@prisma/client";
import { IBlogFilters, blogSearchablFields } from "./blog.interface";
import calculatePagination, { IOption } from "../../../shared/paginationHelper";
import { IGenericResponse } from "../../../interfaces/common";


const createBlog = async (user: any, payload: Blogs): Promise<Blogs> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    if (isUserExist) {
        payload.userId = isUserExist.id
    }
    const result = await prisma.blogs.create({
        data: payload,
    })
    return result
}

const getAllBlogs = async (filters: IBlogFilters, options: IOption): Promise<IGenericResponse<Blogs[]>> => {
    const { limit, page, skip } = calculatePagination(options);
    const { searchTerm, ...filterData } = filters;

    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: blogSearchablFields.map((field) => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive'
                }
            }))
        })
    };
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.entries(filterData).map(([key, value]) => ({
                [key]: { equals: value }
            }))
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.blogs.findMany({
        skip,
        take: limit,
        where: whereConditions,
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true
                }
            }
        },
        orderBy: options.sortBy && options.sortOrder ? {
            [options.sortBy]: options.sortOrder
        } : {
            createdAt: 'desc'
        }
    })
    const total = await prisma.blogs.count({ where: whereConditions });

    return {
        meta: {
            page,
            limit,
            total
        },
        data: result
    }
}

const getBlog = async (id: string): Promise<Blogs | null> => {
    const result = await prisma.blogs.findUnique({
        where: { id },
        include: {
            user: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true
                }
            }
        }
    });
    return result;
}

const deleteBlog = async (id: string): Promise<Blogs | null> => {
    const result = await prisma.blogs.delete({
        where: { id }
    });
    return result;
}

const updateBlog = async (id: string, payload: Partial<Blogs>): Promise<Blogs | null> => {
    const result = await prisma.blogs.update({
        where: {
            id: id
        },
        data: payload
    })
    return result;
}

export const BlogService = {
    createBlog,
    getAllBlogs,
    getBlog,
    deleteBlog,
    updateBlog
}