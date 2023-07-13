import { Schema, model } from "mongoose";
import { IAdmin, IAdminModel } from "./admin.interface";
import { BloodGroup } from "../../../constants";

const AdminSchema = new Schema<IAdmin, IAdminModel>({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
        }
    },
    address: {
        type: String,
    },
    bloodGroup: {
        type: String,
        enum: BloodGroup
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const AdminModel = model<IAdmin, IAdminModel>('Admin', AdminSchema);