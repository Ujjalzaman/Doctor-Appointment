import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import prisma from "../../../shared/prisma";

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


export const PrescriptionService = {
    createPrescription
}