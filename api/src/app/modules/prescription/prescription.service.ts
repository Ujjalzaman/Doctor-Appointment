import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";
import { Prescription } from "@prisma/client";

const createPrescription = async (user: any, paylaod: any): Promise<{ message: string }> => {
    const { userId } = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if (!isDoctor) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Doctor Account is not found !!')
    }
    const isPatient = await prisma.patient.findUnique({
        where: {
            id: paylaod.patientId
        }
    })
    if (!isPatient) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const isAppointment = await prisma.appointments.findUnique({
        where: {
            id: paylaod.appointmentId
        }
    })
    if (!isAppointment) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Appopintment is not found !!')
    }
    paylaod.doctorId = isDoctor.id;
    await prisma.$transaction(async (tx) => {
        await tx.appointments.update({
            where: {
                id: isAppointment.id
            },
            data: {
                status: 'complete',
                followUp: paylaod.followUpDate,
            }
        })

        const medicines = paylaod.medicines;
        const prescription = await tx.prescription.create({
            data: {
                ...paylaod,
                medicines: undefined
            }
        });

        const medicinePromise = medicines.map((medicine: any) =>
            tx.medicine.create({
                data: {
                    ...medicine,
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

const getAllPrescriptions = async (): Promise<Prescription[] | null> => {
    const result = await prisma.prescription.findMany();
    return result;
}

const getPrescriptionById = async (id: string): Promise<Prescription | null> => {
    const result = await prisma.prescription.findUnique({
        where: {
            id: id
        },
        include: {
            medicines: true
        }
    });
    return result;
}

const getPatientPrescriptionById = async (user: any): Promise<Prescription[] | null> => {
    const {userId} = user;
    const isPatient = await prisma.patient.findUnique({
        where: {
            id: userId
        }
    })
    if(!isPatient){
        throw new ApiError(httpStatus.NOT_FOUND, 'Patient Account is not found !!')
    }
    const result = await prisma.prescription.findMany({
        where: {
            patientId: userId
        },
        include: {
            medicines: true,
            doctor: true
        }
    })
    return result;
}

const getDoctorPrescriptionById = async (user: any): Promise<Prescription[] | null> => {
    const {userId} = user;
    const isDoctor = await prisma.doctor.findUnique({
        where: {
            id: userId
        }
    })
    if(!isDoctor){
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
    getAllPrescriptions
}