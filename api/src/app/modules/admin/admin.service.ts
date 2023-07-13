import { IAdmin } from "./admin.interface";
import { AdminModel } from "./admin.model";

const createAdmin = async (payload: IAdmin): Promise<IAdmin | null> => {
    const result = await AdminModel.create(payload);
    return result;
}

const getAllAdmin = async (): Promise<IAdmin[] | null> => {
    const result = await AdminModel.find();
    return result;
}

const getSingleAdmin = async (payload: string): Promise<IAdmin | null> => {
    const result = await AdminModel.findOne({_id: payload});
    return result;
}

const deleteAdmin = async (payload: string): Promise<void> => {
    await AdminModel.findOneAndDelete({_id: payload});
}

const updateAdmin = async (adminId: string, payload: IAdmin): Promise<IAdmin | null> => {
    const result = await AdminModel.findOneAndUpdate({_id: adminId}, {payload});
    return result;
}

export const AdminService = {
    createAdmin,
    getAllAdmin,
    getSingleAdmin,
    deleteAdmin, 
    updateAdmin
}