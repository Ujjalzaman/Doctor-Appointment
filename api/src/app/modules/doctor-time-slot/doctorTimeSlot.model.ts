import { Schema, model } from "mongoose";
import { IDoctorTimeSlot, IDoctorTimeSlotPatientModel } from "./doctorTimeSlot.interface";

const DoctorTimeSlotSchema = new Schema<IDoctorTimeSlot, IDoctorTimeSlotPatientModel>({
    vistitingTime: {
        type: String,
        required: true,
    },
    weekly: {
        type: String,
        required: true,
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    maximumPatientVisit: {
        type: Number
    },
    visited: {
        type: Number
    },
    boothNumber: {
        type: Number
    },
    apartmentNumber: {
        type: Number
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const DoctorTimeSlotModel = model<IDoctorTimeSlot, IDoctorTimeSlotPatientModel>('doctorTimeSlot', DoctorTimeSlotSchema);