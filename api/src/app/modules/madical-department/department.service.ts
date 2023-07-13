import { IDepartment } from "./department.interface";
import { DepartmentModel } from "./department.model";

const createDepartment = async(payload: IDepartment): Promise<IDepartment | null> => {
    const result = await DepartmentModel.create(payload);
    return result;
}

const updateDepartment = async(departmentId: string, payload: IDepartment): Promise<IDepartment | null> => {
    const result = await DepartmentModel.findOneAndUpdate({_id: departmentId}, {payload});
    return result;
}

const getDepartment = async(): Promise<IDepartment[] | null> => {
    const result  = await DepartmentModel.find();
    return result;
}

const getSingleDepartment = async(departmentid: string):Promise<IDepartment | null> => {
    const result  = await DepartmentModel.findOne({_id: departmentid});
    return result;
}

const deleteDepartment = async(departmentid: string): Promise<void> => {
    await DepartmentModel.findOneAndDelete({_id: departmentid});
}
export const DepartmentService = {
    deleteDepartment,
    getSingleDepartment,
    getDepartment,
    createDepartment,
    updateDepartment
}