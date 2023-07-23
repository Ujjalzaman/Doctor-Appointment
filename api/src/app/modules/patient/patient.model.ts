import { Schema, model } from "mongoose";
import { BloodGroup } from "../../../constants";
import { IPatient, IPatientModel } from "./patient.interface";

const PatientSchema = new Schema<IPatient, IPatientModel>({
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
    weight: {
        type: String
    },
    disease: {
        type: Schema.Types.ObjectId,
        ref: 'Disease'
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const PatientModel = model<IPatient, IPatientModel>('Patient', PatientSchema);