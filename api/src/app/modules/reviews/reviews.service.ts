import { Doctor, Reviews, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";

const create = async (user: any, payload: Reviews): Promise<Reviews> => {
    if (user) {
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

const getDoctorReviews = async (doctorId: string): Promise<Reviews[] | null> => {

    const result = await prisma.reviews.findMany({
        where: {
            doctorId: doctorId
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


export const ReviewService = {
    create,
    getAllReviews,
    getDoctorReviews,
    deleteReviews,
    updateReview
}