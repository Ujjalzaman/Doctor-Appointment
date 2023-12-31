import { Appointments, Patient } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import moment from 'moment';

const createAppointment = async (user: any, payload: any): Promise<Appointments | null> => {
    const { patientInfo, payment } = payload;
    const isUserExist = await prisma.patient.findUnique({
        where: {
            id: user.userId
        }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }

    const isDoctorExist = await prisma.doctor.findUnique({
        where: {
            id: patientInfo.doctorId
        }
    })
    if (!isDoctorExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    if (isUserExist) {
        patientInfo['patientId'] = isUserExist.id;
        patientInfo['status'] = 'pending';
    }

    const result = await prisma.$transaction(async (tx) => {
        const appointment = await tx.appointments.create({
            data: patientInfo,
            include: {
                doctor: {
                    select: {
                        firstName: true,
                        lastName: true
                    }
                }
            }
        });
        const { paymentMethod, paymentType } = payment;
        const docFee = Number(isDoctorExist.price);
        const vat = (15 / 100) * (docFee + 10)
        if (appointment.id) {
            await tx.payment.create({
                data: {
                    appointmentId: appointment.id,
                    bookingFee: 10,
                    paymentMethod: paymentMethod,
                    paymentType: paymentType,
                    vat: vat,
                    DoctorFee: docFee,
                    totalAmount: (vat + docFee),
                }
            })
        }
        return appointment;
    })

    return result;
}

const getAllAppointments = async (): Promise<Appointments[] | null> => {
    const result = await prisma.appointments.findMany();
    return result;
}

const getAppointment = async (id: string): Promise<Appointments | null> => {
    const result = await prisma.appointments.findUnique({
        where: {
            id: id
        },
        include: {
            doctor: true,
            patient: true
        }
    });
    return result;
}

const getPatientAppointmentById = async (user: any): Promise<Appointments[] | null> => {
    const { userId } = user;
    const isPatient = await prisma.patient.findUnique({
        where: {
            id: userId
        }
    })
    if (!isPatient) {
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

const getPaymentInfoViaAppintmentId = async (id: string): Promise<any> => {
    const result = await prisma.payment.findFirst({
        where: {
            appointmentId: id
        }
    });
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
const getDoctorAppointmentsById = async (user: any, filter: any): Promise<Appointments[] | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    let andCondition: any = { doctorId: userId };

    if (filter.sortBy == 'today') {
        const today = moment().startOf('day');
        const tomorrow = moment(today).add(1, 'days');

        andCondition.appointmentTime = {
            gte: today.toDate(),
            lt: tomorrow.toDate()
        }
    }
    if (filter.sortBy == 'upcoming') {
        const todayDate = moment().startOf('day');
        const upcomingDate = moment(todayDate).add(1, 'days');
        andCondition.appointmentTime = {
            gte: upcomingDate.toDate()
        }
    }

    const whereConditions = andCondition ? andCondition : {}

    const result = await prisma.appointments.findMany({
        where: whereConditions,
        include: {
            patient: true
        }
    });

    return result;
}

const getDoctorPatients = async (user: any): Promise<Patient[]> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }

    const patients = await prisma.appointments.findMany({
        where: {
            doctorId: userId
        },
        distinct: ['patientId']
    });

    //extract patients from the appointments table
    const patientIds = patients.map(appointment => appointment.patientId);

    const patientList = await prisma.patient.findMany({
        where: {
            id: {
                in: patientIds
            }
        }
    })
    return patientList;
}

const updateAppointmentByDoctor = async (user: any, payload: Partial<Appointments>): Promise<Appointments | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
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
    getDoctorPatients,
    getPaymentInfoViaAppintmentId
}