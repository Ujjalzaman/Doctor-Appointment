import { Doctor } from "@prisma/client";
import prisma from "../../../shared/prisma";


const create = async (payload: any): Promise<any> => {
    const result = await create(payload)
    return result;
}

const getAllDoctors = async (): Promise<Doctor[] | null> => {
    const result = await prisma.doctor.findMany();
    return result;
}

const getDoctor = async (id: string): Promise<Doctor | null> => {
    const result = await prisma.doctor.findUnique({
        where: {
            id: id
        }
    });
    return result;
}

const deleteDoctor = async (id: string): Promise<any> => {
    const result = await prisma.$transaction(async (tx) => {
        const patient = await tx.doctor.delete({
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

const updateDoctor = async (id: string, payload: Partial<Doctor>): Promise<Doctor> => {
    const result = await prisma.doctor.update({
        data: payload,
        where: {
            id: id
        }
    })
    return result;
}

export const DoctorService = {
    create,
    updateDoctor,
    deleteDoctor,
    getAllDoctors,
    getDoctor
}