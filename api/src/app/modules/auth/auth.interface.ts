import { Model, Types } from "mongoose";
type authRules = 'ADMIN' | "PATIENT" | "DOCTOR"

export interface IAuth {
    userId: Types.ObjectId | null;
    password: string;
    email: string;
    rule: authRules;
}
export type IAuthModel = Model<IAuth, {}>;