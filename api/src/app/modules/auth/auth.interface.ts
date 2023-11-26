import { Model, Types } from "mongoose";

export interface IAuth {
    user?: Types.ObjectId;
    password?: string;
    email?: string;
    rule?: string;
}
export type IAuthModel = Model<IAuth, {}>;