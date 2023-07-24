import { Schema, model } from "mongoose";
import { IAuth, IAuthModel } from "./auth.interface";
import { IAuthRules } from "../../../constants";

const AuthSchema = new Schema<IAuth, IAuthModel>({
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    password: {
        type:String,
        required: true
    },
    email: {
        type:String,
        required: true,
        unique: true
    },
    rule: {
        type:String,
        required: true,
        enum: IAuthRules
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const AuthModel = model<IAuth, IAuthModel>('Auth', AuthSchema);