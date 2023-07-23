import { Schema, model } from "mongoose";
import { BloodGroup } from "../../../constants";
import { IDoctor, IDoctorModel } from "./doctor.interface";

const DoctorSchema = new Schema<IDoctor, IDoctorModel>({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String
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
        type: String,
        required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    age: {
        type: String
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const DoctorModel = model<IDoctor, IDoctorModel>('doctor', DoctorSchema);