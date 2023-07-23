import { Model, Types } from "mongoose";
import { IBloodGroup } from "../../../interfaces/common";
import { IDepartment } from "../madical-department/department.interface";
import { IDisease } from "../disease/disease.interface";

export interface IPatient {
    name: {
        firstName: string;
        lastName?: string;
        middleName?: string;
    },
    disease?: Types.ObjectId | IDisease;
    previousMedicalHistory?: [Types.ObjectId | null];
    email: string;
    phoneNumber: string;
    address?: string;
    status?: boolean;
    bloodGroup?: IBloodGroup;
    age?: string;
    weight?: string;
}
export type IPatientModel = Model<IPatient, {}>;