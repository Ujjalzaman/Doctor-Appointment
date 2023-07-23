import { IMadicalHistory } from "./madicalHistory.interface";
import { MadicalHistoryModel } from "./madicalHistory.model";

const createMadicalHistory = async (payload: IMadicalHistory): Promise<IMadicalHistory | null> => {
    const result = await MadicalHistoryModel.create(payload);
    return result;
}

const getAllMadicalHistory = async (): Promise<IMadicalHistory[] | null> => {
    const result = await MadicalHistoryModel.find();
    return result;
}

const getSingleMadicalHistory = async (id: string): Promise<IMadicalHistory | null> => {
    const result = await MadicalHistoryModel.findOne({ _id: id });
    return result;
}

const deleteMadicalHistory = async (id: string): Promise<void> => {
    await MadicalHistoryModel.findOneAndDelete({ _id: id });
}

const updateMadicalHistory = async (id: string, payload: Partial<IMadicalHistory>): Promise<IMadicalHistory | null> => {
    const result = await MadicalHistoryModel.findOneAndUpdate({ _id: id }, { payload });
    return result;
}

export const MadicalHistoryService = {
    updateMadicalHistory,
    getAllMadicalHistory,
    getSingleMadicalHistory,
    deleteMadicalHistory,
    createMadicalHistory
}