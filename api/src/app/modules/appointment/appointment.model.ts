import { Schema, model } from "mongoose";
import { IAppointment, IAppointmentModel } from "./appointment.interface";
import { patientCondition } from "../../../constants";

const AppointmentSchema = new Schema<IAppointment, IAppointmentModel>({
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    appointmentDate: {
        type: String,
        required: true
    },
    payment: {
        type: String,
        enum: ["PAID", "UNPAID"],
    },
    doctorTimeSlot: {
        type: Schema.Types.ObjectId,
        ref: 'doctorTimeSlot',
        required: true,
    },
    condition: {
        type: String,
        enum: patientCondition
    },
    describeProblem: {
        type: String,
    }

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const AppointmentModel = model<IAppointment, IAppointmentModel>('Appointment', AppointmentSchema);