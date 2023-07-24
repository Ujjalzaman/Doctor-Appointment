import { IDoctor } from "./doctor.interface";
import { DoctorModel } from "./doctor.model";

const getAllDoctor = async (): Promise<IDoctor[] | null> => {
    const result = await DoctorModel.find();
    return result;
}

const getSingleDoctor = async (doctorId: string): Promise<IDoctor | null> => {
    const result = await DoctorModel.findOne({ _id: doctorId });
    return result;
}

const deleteDoctor = async (doctorId: string): Promise<void> => {
    await DoctorModel.findOneAndDelete({ _id: doctorId });
}

const updateDoctor = async (doctorId: string, payload: Partial<IDoctor>): Promise<IDoctor | null> => {
    const result = await DoctorModel.findOneAndUpdate({ _id: doctorId }, { payload });
    return result;
}

export const DoctorService = {
    getAllDoctor,
    getSingleDoctor,
    deleteDoctor,
    updateDoctor
}