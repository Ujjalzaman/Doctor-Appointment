import { Model, Types } from "mongoose";
type authRules = 'ADMIN' | "PATIENT" | "DOCTOR"

export interface IAuth {
    user?: Types.ObjectId;
    password?: string;
    email?: string;
    rule?: string;
}
export type IAuthModel = Model<IAuth, {}>;