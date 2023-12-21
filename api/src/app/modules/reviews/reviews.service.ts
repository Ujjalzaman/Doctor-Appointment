import { Reviews } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const create = async (user: any, payload: Reviews): Promise<Reviews> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    if (isUserExist) {
        payload.patientId = user.userId
    }
    const result = await prisma.reviews.create({
        data: payload
    })
    return result
}

const getAllReviews = async (): Promise<Reviews[] | null> => {
    const result = await prisma.reviews.findMany();
    return result;
}

const getSingleReview = async (id: string): Promise<Reviews | null> => {
    console.log(id)
    const result = await prisma.reviews.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const getDoctorReviews = async (user: any): Promise<Reviews[] | null> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.reviews.findMany({
        where: {
            doctorId: isUserExist.id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    });
    return result;
}

const deleteReviews = async (id: string): Promise<Reviews> => {
    const result = await prisma.reviews.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updateReview = async (id: string, payload: Partial<Reviews>): Promise<Reviews> => {
    const result = await prisma.reviews.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

const replyReviewByDoctor = async (user: any, id: string, payload: Partial<Reviews>): Promise<Reviews> => {
    const isUserExist = await prisma.doctor.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const result = await prisma.reviews.update({
        data: {
            response: payload.response
        },
        where: {
            id: id
        }
    })
    return result;
}


export const ReviewService = {
    create,
    getAllReviews,
    getDoctorReviews,
    deleteReviews,
    updateReview,
    getSingleReview,
    replyReviewByDoctor
}