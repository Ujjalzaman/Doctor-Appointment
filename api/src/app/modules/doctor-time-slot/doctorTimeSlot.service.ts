import { IDoctorTimeSlot } from "./doctorTimeSlot.interface";
import { DoctorTimeSlotModel } from "./doctorTimeSlot.model";

const createDoctorTimeSlot = async (payload: IDoctorTimeSlot): Promise<IDoctorTimeSlot | null> => {
    const result = await DoctorTimeSlotModel.create(payload);
    return result;
}

const getAllDoctorTimeSlot = async (): Promise<IDoctorTimeSlot[] | null> => {
    const result = await DoctorTimeSlotModel.find();
    return result;
}

const getSingleDoctorTimeSlot = async (id: string): Promise<IDoctorTimeSlot | null> => {
    const result = await DoctorTimeSlotModel.findOne({ _id: id });
    return result;
}

const deleteDoctorTimeSlot = async (id: string): Promise<void> => {
    await DoctorTimeSlotModel.findOneAndDelete({ _id: id });
}

const updateDoctorTimeSlot = async (id: string, payload: Partial<IDoctorTimeSlot>): Promise<IDoctorTimeSlot | null> => {
    const result = await DoctorTimeSlotModel.findOneAndUpdate({ _id: id }, { payload });
    return result;
}

export const DoctorTimeSlotService = {
    createDoctorTimeSlot,
    getAllDoctorTimeSlot,
    getSingleDoctorTimeSlot,
    deleteDoctorTimeSlot,
    updateDoctorTimeSlot
}