import { Schema, model } from "mongoose";
import { IDisease, IDiseaseModel } from "./disease.interface";

const DiseaseSchema = new Schema<IDisease, IDiseaseModel>({
    disease: {
        type: String,
        required: true,
        unique: true
    },
    bronchitis: {
        type:String,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
})
export const DiseaseModal = model<IDisease, IDiseaseModel>('Disease', DiseaseSchema);