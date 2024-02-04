import { Medicine } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createMedicine = async (payload: Medicine[]): Promise<{message : string}> => {
    const createMedicinePromise = payload.map((medicine: Medicine) =>
        prisma.medicine.create({
            data: {
                dosage: medicine.dosage,
                duration: medicine.duration,
                frequency: medicine.frequency,
                medicine: medicine.medicine,
                prescriptionId: medicine.prescriptionId
            }
        })
    )
    await Promise.all(createMedicinePromise);
    return {
        message: "Successfully medicine added"
    }
}

const updateMedicine = async (payload: Medicine): Promise<Medicine> => {
    const isPrescriptionId = await prisma.prescription.findUnique({
        where: {
            id: payload.prescriptionId
        }
    })
    if (!isPrescriptionId) { throw new ApiError(httpStatus.NOT_FOUND, 'Prescription is not found !!') }

    const result = await prisma.medicine.update({
        where: {
            id: payload.id
        },
        data: {
            dosage: payload.dosage,
            duration: payload.duration,
            frequency: payload.frequency,
            medicine: payload.medicine
        }
    })
    return result;

}

const deleteMedicine = async (id: string): Promise<Medicine> => {
    const result = await prisma.medicine.delete({where: {id}})
    return result;
}

export const MedicineService = {
    updateMedicine,
    createMedicine,
    deleteMedicine
}