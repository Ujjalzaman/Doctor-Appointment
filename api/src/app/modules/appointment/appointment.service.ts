import { Appointments, Patient, Payment, paymentStatus } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import moment from 'moment';
import { EmailtTransporter } from "../../../helpers/emailTransporter";
import * as path from 'path';
import config from "../../../config";

const createAppointment = async (payload: any): Promise<Appointments | null | any> => {

    const { patientInfo, payment } = payload;
    if(patientInfo.patientId){
        const isUserExist = await prisma.patient.findUnique({
            where: {
                id: patientInfo.patientId
            }
        })
        if (!isUserExist) {
            patientInfo['patientId'] = null
        }
    }

    const isDoctorExist = await prisma.doctor.findUnique({
        where: {
            id: patientInfo.doctorId
        }
    });

    if (!isDoctorExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    patientInfo['paymentStatus'] = paymentStatus.paid;
  
    const result = await prisma.$transaction(async (tx) => {
        const previousAppointment = await tx.appointments.findFirst({
            orderBy: { createdAt: 'desc' },
            take: 1
        });
        const appointmentLastNumber = (previousAppointment?.trackingId ?? '').slice(-3);
        const lastDigit = (Number(appointmentLastNumber) + 1 || 0).toString().padStart(3, '0');

        // Trcking Id To be ==> First 3 Letter Of User  + current year + current month + current day + unique number (Matched Previous Appointment).
        const first3DigitName = patientInfo?.firstName?.slice(0, 3).toUpperCase();
        const year = moment().year();
        const month = (moment().month() + 1).toString().padStart(2, '0');
        const day = (moment().dayOfYear()).toString().padStart(2, '0');
        const trackingId = first3DigitName + year + month + day + lastDigit || '001';
        patientInfo['trackingId'] = trackingId;

        const appointment = await tx.appointments.create({
            data: patientInfo,
            include: {
                doctor: true,
                patient: true
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
        const pathName = path.join(__dirname, '../../../../template/appointment.html')
        const appointmentObj = {
            created: moment(appointment.createdAt).format('LL'),
            trackingId: appointment.trackingId,
            patientType: appointment.patientType,
            status: appointment.status,
            paymentStatus: appointment.paymentStatus,
            prescriptionStatus: appointment.prescriptionStatus,
            scheduleDate:moment(appointment.scheduleDate).format('LL'),
            scheduleTime:appointment.scheduleTime,
            doctorImg: appointment?.doctor?.img,
            doctorFirstName: appointment?.doctor?.firstName,
            doctorLastName: appointment?.doctor?.lastName,
            specialization:appointment?.doctor?.specialization,
            designation:appointment?.doctor?.designation,
            college:appointment?.doctor?.college,
            patientImg:appointment?.patient?.img,
            patientfirstName:appointment?.patient?.firstName,
            patientLastName:appointment?.patient?.lastName,
            dateOfBirth: moment().diff(moment(appointment?.patient?.dateOfBirth), 'years'),
            bloodGroup:appointment?.patient?.bloodGroup,
            city:appointment?.patient?.city,
            state:appointment?.patient?.state,
            country:appointment?.patient?.country
        }
        const replacementObj = appointmentObj;
        const subject = `Appointment Confirm With Dr ${appointment?.doctor?.firstName + ' ' + appointment?.doctor?.lastName} at ${appointment.scheduleDate} + ' ' + ${appointment.scheduleTime}`
        const toMail = `${appointment.email + ',' + appointment.doctor?.email}`;
        EmailtTransporter({ pathName, replacementObj, toMail, subject })
        return appointment;
    });
    return result;
}

const createAppointmentByUnAuthenticateUser = async (payload: any): Promise<Appointments | null> => {
    const { patientInfo, payment } = payload;
    if(patientInfo.patientId){
        const isUserExist = await prisma.patient.findUnique({
            where: {
                id: patientInfo.patientId
            }
        })
        if (!isUserExist) {
            patientInfo['patientId'] = null
        }
    }

    const result = await prisma.$transaction(async (tx) => {
        const previousAppointment = await tx.appointments.findFirst({
            orderBy: { createdAt: 'desc' },
            take: 1
        });

        const appointmentLastNumber = (previousAppointment?.trackingId ?? '').slice(-3);
        const lastDigit = (Number(appointmentLastNumber) + 1).toString().padStart(3, '0')
        // Trcking Id To be ==> UNU - 'Un Authenticate User  + current year + current month + current day + unique number (Matched Previous Appointment).
        const year = moment().year();
        const month = (moment().month() + 1).toString().padStart(2, '0');
        const day = (moment().dayOfYear()).toString().padStart(2, '0');
        const trackingId = 'UNU' + year + month + day + lastDigit || '0001';
        patientInfo['trackingId'] = trackingId;
        patientInfo['doctorId'] = config.defaultAdminDoctor

        const appointment = await tx.appointments.create({
            data: patientInfo,
        });
        const { paymentMethod, paymentType } = payment;
        const vat = (15 / 100) * (60 + 10)
        if (appointment.id) {
            await tx.payment.create({
                data: {
                    appointmentId: appointment.id,
                    bookingFee: 10,
                    paymentMethod: paymentMethod,
                    paymentType: paymentType,
                    vat: vat,
                    DoctorFee: 60,
                    totalAmount: (vat + 60),
                }
            })
        }

        const appointmentObj = {
            created: moment(appointment.createdAt).format('LL'),
            trackingId: appointment.trackingId,
            patientType: appointment.patientType,
            status: appointment.status,
            paymentStatus: appointment.paymentStatus,
            prescriptionStatus: appointment.prescriptionStatus,
            scheduleDate:moment(appointment.scheduleDate).format('LL'),
            scheduleTime:appointment.scheduleTime,
        }
        const pathName = path.join(__dirname, '../../../../template/meeting.html')
        const replacementObj = appointmentObj;
        const subject = `Appointment Confirm at ${appointment.scheduleDate} ${appointment.scheduleTime}`

        const toMail = `${appointment.email}`;
        EmailtTransporter({ pathName, replacementObj, toMail, subject })
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

const getAppointmentByTrackingId = async (data: any): Promise<Appointments | null> => {
    const { id } = data;

    const result = await prisma.appointments.findUnique({
        where: {
            trackingId: id
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true,
                    college: true,
                    degree: true,
                    img: true
                },
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    address: true,
                    city: true,
                    country: true,
                    state: true,
                    img: true
                }
            }
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
        },
        include: {
            appointment: {
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true,
                            address: true,
                            country: true,
                            city: true
                        }
                    },
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            address: true,
                            country: true,
                            city: true
                        }
                    }
                }
            }
        }
    });
    return result;
}

const getPatientPaymentInfo = async (user: any): Promise<Payment[]> => {
    const { userId } = user;
    const isUserExist = await prisma.patient.findUnique({
        where: { id: userId }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await prisma.payment.findMany({
        where: { appointment: { patientId: isUserExist.id } },
        include: {
            appointment: {
                include: {
                    doctor: {
                        select: {
                            firstName: true,
                            lastName: true,
                            designation: true
                        }
                    }
                }
            }
        }
    });
    return result;
}
const getDoctorInvoices = async (user: any): Promise<Payment[] | null> => {
    const { userId } = user;
    const isUserExist = await prisma.doctor.findUnique({
        where: { id: userId }
    })
    if (!isUserExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.payment.findMany({
        where: { appointment: { doctorId: isUserExist.id } },
        include: {
            appointment: {
                include: {
                    patient: {
                        select: {
                            firstName: true,
                            lastName: true
                        }
                    }
                }
            }
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
    if (!isDoctor) { throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!') }

    let andCondition: any = { doctorId: userId };

    if (filter.sortBy == 'today') {
        const today = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss');
        const tomorrow = moment(today).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');

        andCondition.scheduleDate = {
            gte: today,
            lt: tomorrow
        }
    }
    if (filter.sortBy == 'upcoming') {
        const upcomingDate = moment().startOf('day').add(1, 'days').format('YYYY-MM-DD HH:mm:ss')
        andCondition.scheduleDate = {
            gte: upcomingDate
        }
    }
    const whereConditions = andCondition ? andCondition : {}

    const result = await prisma.appointments.findMany({
        where: whereConditions,
        include: {
            patient: true,
            prescription: {
                select: {
                    id: true
                }
            }
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
                // @ts-ignore
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
    getPaymentInfoViaAppintmentId,
    getPatientPaymentInfo,
    getDoctorInvoices,
    createAppointmentByUnAuthenticateUser,
    getAppointmentByTrackingId
}