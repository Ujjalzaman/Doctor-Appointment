import { Appointments } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createAppointment = async (user: any, payload: Appointments): Promise<Appointments> => {
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if(!isUserExist){
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    
    if (user) {
        payload['patientId'] = user.userId;
        payload['status'] = 'pending';
    }
    const appointment = await prisma.appointments.create({
        data: payload
    });
    return appointment;
}

const getAllAppointments = async (): Promise<Appointments[] | null> => {
    const result = await prisma.appointments.findMany();
    return result;
}

const getAppointment = async (id: string): Promise<Appointments | null> => {
    const result = await prisma.appointments.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const getPatientAppointmentById = async (user: any): Promise<Appointments[] | null> => {
    const {userId} = user;
    const isPatient = await prisma.patient.findUnique({
        where: {
            id: userId
        }
    })
    if(!isPatient){
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await prisma.appointments.findMany({
        where: {
            patientId: userId
        },
        include: {
            doctor: true
        }
    })
    return result;
}

const deleteAppointment = async (id: string): Promise<any> => {
    const result = await prisma.appointments.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updateAppointment = async (id: string, payload: Partial<Appointments>): Promise<Appointments> => {
    const result = await prisma.appointments.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

//doctor Side
const getDoctorAppointmentsById = async (user: any): Promise<Appointments[] | null> => {
    const {userId} = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if(!isDoctor){
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.appointments.findMany({
        where: {
            doctorId: userId
        }
    })
    return result;
}

const updateAppointmentByDoctor = async (user: any, payload: Partial<Appointments>): Promise<Appointments | null> => {
    const {userId} = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if(!isDoctor){
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.appointments.update({
        where: {
            id: payload.id
        },
        data: payload
    })
    return result;
}

export const AppointmentService = {
    createAppointment,
    getAllAppointments,
    getAppointment,
    deleteAppointment,
    updateAppointment,
    getPatientAppointmentById,
    getDoctorAppointmentsById,
    updateAppointmentByDoctor,
}