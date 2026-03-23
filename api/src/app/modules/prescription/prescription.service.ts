import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { Prescription } from "@prisma/client";

const createPrescription = async (user: any, paylaod: any): Promise<{message: string}> => {
    const { medicine, ...others } = paylaod;
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) { throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!') }

    const isAppointment = await prisma.appointments.findUnique({
        where: {
            id: paylaod.appointmentId
        }
    })
    if (!isAppointment) { throw new ApiError(httpStatus.NOT_FOUND, 'Appopintment is not found !!') }

    await prisma.$transaction(async (tx) => {
        const {status, patientType, ...rest} = others;
        await tx.appointments.update({
            where: {
                id: isAppointment.id
            },
            data: {
                isFollowUp: paylaod.followUpDate ? true : false,
                status: status || undefined,
                patientType: patientType || undefined,
                prescriptionStatus: "issued"
            }
        })
        
        const prescription = await tx.prescription.create({
            data: {
                ...rest,
                doctorId: isDoctor.id,
                patientId: isAppointment.patientId,
                medicines: undefined
            }
        });

        const medicinePromise = medicine.map((medicine: any) =>
            tx.medicine.create({
                data: {
                    dosage: medicine.dosage,
                    duration: medicine.duration,
                    frequency: medicine.frequency,
                    medicine: medicine.medicine,
                    prescriptionId: prescription.id
                }
            })
        )
        await Promise.all(medicinePromise)
    })
    return {
        message: "Successfully Prescription Created"
    }
}
// Update Prescription and Appointment table 
const updatePrescriptionAndAppointment = async (user: any, paylaod: any): Promise<{message: string}> => {
    const {status, patientType,followUpdate,prescriptionId, ...others} = paylaod;
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) { throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!') }

    const isPrescribed = await prisma.prescription.findUnique({
        where: {
            id: prescriptionId
        }
    })
    if (!isPrescribed) { throw new ApiError(httpStatus.NOT_FOUND, 'Prescription is not found !!') }

    await prisma.$transaction(async (tx) => {
        
        await tx.appointments.update({
            where: {
                id: isPrescribed.appointmentId
            },
            data: {
                isFollowUp: followUpdate ? true : false,
                status: status,
                patientType: patientType,
            }
        })
        
        await tx.prescription.update({
            where: {
                id: prescriptionId
            },
            data: {
                ...others,
            }
        });

    })
    return {
        message: "Successfully Prescription Updated"
    }
}

const getAllPrescriptions = async (): Promise<Prescription[] | null> => {
    const result = await prisma.prescription.findMany({
        include: {
            appointment: {
                select: {
                    trackingId: true
                }
            }
        }
    });
    return result;
}

const getPrescriptionById = async (id: string): Promise<Prescription | null> => {
    const result = await prisma.prescription.findUnique({
        where: {
            id: id
        },
        include: {
            medicines: true,
            appointment: {
                select: {
                    scheduleDate: true,
                    scheduleTime: true,
                    status: true,
                    trackingId: true,
                }
            },
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true,
                    email: true,
                    college: true,
                    address: true,
                    country: true,
                    state: true,
                    specialization: true
                }
            },
            patient: {
                select: {
                    firstName: true,
                    lastName: true,
                    gender: true,
                    dateOfBirth: true,
                    email: true,
                    bloodGroup: true,
                    address: true,
                    img: true,
                    city: true,
                }
            }
        }
    });
    return result;
}

const getPatientPrescriptionById = async (user: any): Promise<Prescription[] | null> => {
    const { userId } = user;
    const isPatient = await prisma.patient.findUnique({
        where: {
            id: userId
        }
    })
    if (!isPatient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await prisma.prescription.findMany({
        where: {
            patientId: userId
        },
        include: {
            doctor: {
                select: {
                    firstName: true,
                    lastName: true,
                    designation: true
                }
            },
            appointment: {
                select: {
                    scheduleDate: true,
                    scheduleTime: true,
                    status: true,
                    trackingId: true
                }
            }
        }
    })
    return result;
}

const getDoctorPrescriptionById = async (user: any): Promise<Prescription[] | null> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const result = await prisma.prescription.findMany({
        where: {
            doctorId: userId,
        },
        include: {
            medicines: true,
            patient: true
        }
    })
    return result;
}

const deletePrescription = async (id: string): Promise<any> => {
    const result = await prisma.prescription.delete({
        where: {
            id: id
        }
    });
    return result;
}

const updatePrescription = async (id: string, payload: Partial<Prescription>): Promise<Prescription> => {
    const result = await prisma.prescription.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

export const PrescriptionService = {
    createPrescription,
    getDoctorPrescriptionById,
    updatePrescription,
    getPatientPrescriptionById,
    deletePrescription,
    getPrescriptionById,
    getAllPrescriptions,
    updatePrescriptionAndAppointment
}