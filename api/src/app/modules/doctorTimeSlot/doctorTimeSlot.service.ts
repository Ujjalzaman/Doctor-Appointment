import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { DoctorTimeSlot } from "@prisma/client";

const createTimeSlot = async (user: any, payload: any): Promise<DoctorTimeSlot | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.doctorTimeSlot.create({
        data: {
            day: payload.day,
            doctorId: payload.doctorId,
            maximumPatient: payload.maximumPatient,
            weekDay: payload.weekDay,
            timeSlot: {
                create: payload.timeSlot.map((item:any) => ({
                    startTime : item.startTime,
                    endTime : item.endTime
                }))
            }
        }
    })
    return result;
}

const deleteTimeSlot = async (id: string): Promise<DoctorTimeSlot | null> => {
    const result = await prisma.doctorTimeSlot.delete({
        where: {
            id: id
        }
    })
    return result;
}

const getTimeSlot = async (id: string): Promise<DoctorTimeSlot | null> => {
    const result = await prisma.doctorTimeSlot.findFirst({
        where: {
            id: id
        }
    })
    return result;
}

const getMyTimeSlot = async (user: any): Promise<DoctorTimeSlot[] | null> => {
    const result = await prisma.doctorTimeSlot.findMany({
        where: {
            doctorId: user.userId
        }
    })
    return result;
}

const getAllTimeSlot = async (): Promise<DoctorTimeSlot[] | null> => {
    const result = await prisma.doctorTimeSlot.findMany({})
    return result;
}
const updateTimeSlot = async (id: string, payload: Partial<DoctorTimeSlot>): Promise<DoctorTimeSlot | null> => {
    const result = await prisma.doctorTimeSlot.update({
        where: {
            id: id
        },
        data: payload
    })
    return result;
}

export const TimeSlotService = {
    updateTimeSlot,
    getAllTimeSlot,
    getTimeSlot,
    createTimeSlot,
    deleteTimeSlot,
    getMyTimeSlot
}