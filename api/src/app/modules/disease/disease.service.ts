import { IDisease } from "./disease.interface";
import { DiseaseModal } from "./disease.model";

const createDisease = async (payload: IDisease): Promise<IDisease | null> => {
    const result = await DiseaseModal.create(payload);
    return result;
}

const getAllDisease = async (): Promise<IDisease[] | null> => {
    const result = await DiseaseModal.find();
    return result;
}

const getSingleDisease = async (payload: string): Promise<IDisease | null> => {
    const result = await DiseaseModal.findOne({_id: payload});
    return result;
}

const deleteDisease = async (payload: string): Promise<void> => {
    await DiseaseModal.findOneAndDelete({_id: payload});
}

const updateDisease = async (diseaseId: string, payload: IDisease): Promise<IDisease | null> => {
    const result = await DiseaseModal.findOneAndUpdate({_id: diseaseId}, {payload});
    return result;
}

export const DiseaseService = {
    createDisease,
    getAllDisease,
    getSingleDisease,
    deleteDisease,
    updateDisease
}