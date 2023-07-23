import { Schema, model } from "mongoose";
import { IMadicalHistory, IMadicalHistoryModel } from "./madicalHistory.interface";

const MadicalHistorySchema = new Schema<IMadicalHistory, IMadicalHistoryModel>({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient'
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    },
    appointementedDate: {
        type: String,
    },
    patientCondion: {
        type: String,
    },
    describeProblem: {
        type: String,
    },
    diagnosis: {
        type: String,
    },
    disease: {
        type: String,
    },

}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const MadicalHistoryModel = model<IMadicalHistory, IMadicalHistoryModel>('madicalHistory', MadicalHistorySchema);