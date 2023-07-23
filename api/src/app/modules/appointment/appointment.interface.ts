import { Model, Types } from "mongoose";
import { IPatient } from "../patient/patient.interface";
import { IDoctor } from "../doctor/doctor.interface";
import { IDoctorTimeSlot } from "../doctor-time-slot/doctorTimeSlot.interface";

type patientCondtion = ["Critical" | "Serious" | "Stable" | "Acute" | "Chronic" | "Critical but Stable" | "Non-Critical" | "Terminal" | "Emergent" | "Urgent"]

export interface IAppointment {
    doctor: Types.ObjectId | IDoctor
    patient: Types.ObjectId | IPatient;
    appointmentDate: string;
    payment?: ["PAID" | "UNPAID"];
    doctorTimeSlot: Types.ObjectId | IDoctorTimeSlot;
    condition?: patientCondtion;
    describeProblem?: string;
}
export type IAppointmentModel = Model<IAppointment, {}>;