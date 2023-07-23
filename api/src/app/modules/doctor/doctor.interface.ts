import { Model, Types } from "mongoose";
import { IBloodGroup } from "../../../interfaces/common";
import { IDepartment } from "../madical-department/department.interface";

export interface IDoctor {
    name: {
        firstName: string;
        lastName?: string;
        middleName?: string;
    },
    title?: string;
    department: Types.ObjectId | IDepartment;
    email: string;
    phoneNumber: string;
    address?: string;
    status?: boolean;
    bloodGroup?: IBloodGroup;
    age?: string;
}
export type IDoctorModel = Model<IDoctor, {}>;