import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { TimeSlot } from "@prisma/client";

const createTimeSlot = async (user: any, payload: TimeSlot): Promise<TimeSlot | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.timeSlot.create({
        data: payload
    })
    return result;
}

const deleteTimeSlot = async (id: string): Promise<TimeSlot | null> => {
    const result = await prisma.timeSlot.delete({
        where: {
            id: id
        }
    })
    return result;
}

const getTimeSlot = async (id: string): Promise<TimeSlot | null> => {
    const result = await prisma.timeSlot.findFirst({
        where: {
            id: id
        }
    })
    return result;
}

const getMyTimeSlot = async (user: any): Promise<TimeSlot[] | null> => {
    const result = await prisma.timeSlot.findMany({
        where: {
            doctorId: user.userId
        }
    })
    return result;
}

const getallTimeSlot = async (): Promise<TimeSlot[] | null> => {
    const result = await prisma.timeSlot.findMany({})
    return result;
}
const updateTimeSlot = async (id: string, payload: Partial<TimeSlot>): Promise<TimeSlot | null> => {
    const result = await prisma.timeSlot.update({
        where: {
            id: id
        },
        data: payload
    })
    return result;
}


export const TimeSlotService = {
    updateTimeSlot,
    getallTimeSlot,
    getTimeSlot,
    createTimeSlot,
    deleteTimeSlot,
    getMyTimeSlot
}