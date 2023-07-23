import { Model, Types } from "mongoose";
import { IPatient } from "../patient/patient.interface";
import { IDoctor } from "../doctor/doctor.interface";

export interface IMadicalHistory {
    patient: Types.ObjectId | IPatient;
    doctor?: Types.ObjectId | IDoctor;
    appointementedDate?:string;
    patientCondion?:string;
    describeProblem?:string;
    diagnosis?:string;
    disease?:string;
}
export type IMadicalHistoryModel = Model<IMadicalHistory, {}>;