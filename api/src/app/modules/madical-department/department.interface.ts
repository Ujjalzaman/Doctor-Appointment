import { Model } from "mongoose";

export interface IDepartment {
    department: string;
    title?: string;
    status?: true;
}
export type IDepartmentModel = Model<IDepartment, {}>