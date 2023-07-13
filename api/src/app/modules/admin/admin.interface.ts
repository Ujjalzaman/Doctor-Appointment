import { Model } from "mongoose";

type IBloodGroup = 'O+' | 'O-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'A+' | 'A-'

export interface IAdmin {
    name: {
        firstName: string;
        lastName: string;
        middleName?: string;
    },
    email: string;
    phoneNumber: number;
    address: string;
    status: boolean;
    bloodGroup: IBloodGroup;
}
export type IAdminModel = Model<IAdmin, {}>;