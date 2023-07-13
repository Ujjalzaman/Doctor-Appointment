import { Schema, model } from "mongoose";
import { IDepartment, IDepartmentModel } from "./department.interface";

const DepartmentSchema = new Schema<IDepartment, IDepartmentModel>({
    department: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true,
    }
})
export const DepartmentModel = model<IDepartment, IDepartmentModel>('Department', DepartmentSchema);