import { IAppointment } from "./appointment.interface";
import { AppointmentModel } from "./appointment.model";

const createAppointment = async (payload: IAppointment): Promise<IAppointment | null> => {
    const result = await AppointmentModel.create(payload);
    return result;
}

const getAllAppointment = async (): Promise<IAppointment[] | null> => {
    const result = await AppointmentModel.find();
    return result;
}

const getSingleAppointment = async (id: string): Promise<IAppointment | null> => {
    const result = await AppointmentModel.findOne({ _id: id });
    return result;
}

const deleteAppointment = async (id: string): Promise<void> => {
    await AppointmentModel.findOneAndDelete({ _id: id });
}

const updateAppointment = async (id: string, payload: Partial<IAppointment>): Promise<IAppointment | null> => {
    const result = await AppointmentModel.findOneAndUpdate({ _id: id }, { payload });
    return result;
}

export const AppointmentService = {
    createAppointment,
    getAllAppointment,
    getSingleAppointment,
    deleteAppointment,
    updateAppointment
}