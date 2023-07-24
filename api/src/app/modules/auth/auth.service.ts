import { IAuth } from "./auth.interface";
import { AuthModel } from "./auth.model";

const createAuth = async (payload: IAuth): Promise<IAuth | null> => {
    const result = await AuthModel.create(payload);
    return result;
}

const getAllAuth = async (): Promise<IAuth[] | null> => {
    const result = await AuthModel.find();
    return result;
}

const getSingleAuth = async (id: string): Promise<IAuth | null> => {
    const result = await AuthModel.findOne({ _id: id });
    return result;
}

const deleteAuth = async (id: string): Promise<void> => {
    await AuthModel.findOneAndDelete({ _id: id });
}

const updateAuth = async (id: string, payload: Partial<IAuth>): Promise<IAuth | null> => {
    const result = await AuthModel.findOneAndUpdate({ _id: id }, { payload });
    return result;
}

export const AuthService = {
    createAuth,
    updateAuth,
    deleteAuth,
    getAllAuth,
    getSingleAuth
}