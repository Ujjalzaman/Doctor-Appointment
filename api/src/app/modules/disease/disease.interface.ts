import { Model } from "mongoose";

export interface IDisease {
    disease: string;
    bronchitis: string
}
export type IDiseaseModel = Model<IDisease, {}>