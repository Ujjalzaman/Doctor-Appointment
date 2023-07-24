import mongoose from "mongoose";
import { IPatient } from "./patient.interface";
import { PatientModel } from "./patient.model";

const getAllPatient = async (): Promise<IPatient[] | null> => {
    const result = await PatientModel.find();
    return result;
}

const getSinglePatient = async (patientId: string): Promise<IPatient | null> => {
    const result = await PatientModel.findOne({ _id: patientId });
    return result;
}

const deletePatient = async (patientId: string): Promise<void> => {
    await PatientModel.findOneAndDelete({ _id: patientId });
}

const updatePatient = async (patientId: string, payload: Partial<IPatient>): Promise<IPatient | null> => {
    const result = await PatientModel.findOneAndUpdate({ _id: patientId }, { payload });
    return result;
}

export const PatientService = {
    updatePatient,
    getAllPatient,
    getSinglePatient,
    deletePatient
}