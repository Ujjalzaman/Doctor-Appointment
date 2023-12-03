import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { Booking } from "@prisma/client";

const doctorAppointment = async (user: any): Promise<Booking[] | null> => {
    const {userId} = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if(!isDoctor){
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.booking.findMany({
        where: {
            doctorId: userId
        }
    })
    return result;
}


const updateAppointmentByDoctor = async (user: any, payload: Partial<Booking>): Promise<Booking | null> => {
    const {userId} = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if(!isDoctor){
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.booking.update({
        where: {
            id: payload.id
        },
        data: payload
    })
    return result;
}


const patientAppointment = async (user: any): Promise<Booking[] | null> => {
    const {userId} = user;
    const isPatient = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if(!isPatient){
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await prisma.booking.findMany({
        where: {
            patientId: userId
        }
    })
    return result;
}

export const AppointmentService = {
    doctorAppointment,
    patientAppointment,
    updateAppointmentByDoctor
}