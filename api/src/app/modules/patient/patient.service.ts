import { Patient, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { create } from "./patientService";
const createPatient = async (payload: any): Promise<any> => {
    const result = await create(payload)
    return result;
}

const getAllPatients = async (): Promise<Patient[] | null> => {
    const result = await prisma.patient.findMany();
    return result;
}

const getPatient = async (id: string): Promise<Patient | null> => {
    const result = await prisma.patient.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const deletePatient = async (id: string): Promise<any> => {
    const result = await prisma.$transaction(async (tx) => {
        const patient = await tx.patient.delete({
            where: {
                id: id
            }
        });
        await tx.auth.delete({
            where: {
                email: patient.email
            }
        })
    });
    return result;
}

const updatePatient = async (id: string, payload: Partial<Patient>): Promise<Patient> => {
    const result = await prisma.patient.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

export const PatientService = {
    createPatient,
    updatePatient,
    getPatient,
    getAllPatients,
    deletePatient
}