import { Model, Types } from "mongoose";
import { IDoctor } from "../doctor/doctor.interface";

export interface IDoctorTimeSlot {
    vistitingTime: string;
    weekly: string;
    doctor: Types.ObjectId | IDoctor;
    maximumPatientVisit?: number;
    visited?: number;
    boothNumber?: number;
    apartmentNumber?: number;
}
export type IDoctorTimeSlotPatientModel = Model<IDoctorTimeSlot, {}>;