import mongoose from "mongoose";
import { IPatient } from "../patient/patient.interface";
import { PatientModel } from "../patient/patient.model";
import { IAuth } from "./auth.interface";
import { AuthModel } from "./auth.model";
import ApiError from "../../../errors/apiError";
import { IDoctor } from "../doctor/doctor.interface";
import { DoctorModel } from "../doctor/doctor.model";
import config from "../../../config";
import { IAdmin } from "../admin/admin.interface";
import { AdminModel } from "../admin/admin.model";

const createPatient = async (payload: IPatient, auth: IAuth): Promise<IAuth | null> => {

    // let session = await mongoose.startSession();
    // let newUserData;
    // try {
    //     session.startTransaction();

    //     const patient = await PatientModel.create([payload], { session });

    //     if (!patient) {
    //         throw new ApiError(403, "Unable to Create Patient Account !!");
    //     }

    //     auth.email = patient[0].email;
    //     auth.rule = "patient";
    //     auth.user = patient[0]._id;

    //     const authUser = await AuthModel.create([auth], { session });

    //     if (!authUser) {
    //         throw new ApiError(403, "Unable to Create Auth Account !!");
    //     }
    //     newUserData = authUser[0];

    //     await session.commitTransaction();
    //     await session.endSession();
    // } catch (error) {
    //     await session.endSession();
    //     await session.abortTransaction();
    //     throw new ApiError(403, "Session aborted !!")
    // }
    // if (newUserData) {
    //     newUserData = await AuthModel.findOne({ _id: newUserData._id }).populate('user');
    // }
    // return newUserData;
}

const createDoctor = async (payload: IDoctor, auth: IAuth): Promise<IAuth | null> => {

    let session = await mongoose.startSession();
    let newUserData;
    try {
        session.startTransaction();

        const patient = await DoctorModel.create([payload], { session });

        if (!patient) {
            throw new ApiError(403, "Unable to Create Doctor Account !!");
        }

        auth.email = patient[0].email;
        auth.rule = "doctor";
        auth.user = patient[0]._id;
        auth.password = config.default_doctor_pass as string;

        const authUser = await AuthModel.create([auth], { session });

        if (!authUser) {
            throw new ApiError(403, "Unable to Create Auth Account !!");
        }
        newUserData = authUser[0];

        await session.commitTransaction();
        await session.endSession();

    } catch (error) {
        await session.endSession();
        await session.abortTransaction();
        throw new ApiError(403, "Session aborted !!")
    }
    if (newUserData) {
        newUserData = await AuthModel.findOne({ _id: newUserData._id }).populate('user');
    }
    return newUserData;
}

const createAdmin = async (payload: IAdmin, auth: IAuth): Promise<IAuth | null> => {

    let session = await mongoose.startSession();
    let newUserData;
    try {
        session.startTransaction();

        const patient = await AdminModel.create([payload], { session });

        if (!patient) {
            throw new ApiError(403, "Unable to Create Admin Account !!");
        }

        auth.email = patient[0].email;
        auth.rule = "admin";
        auth.user = patient[0]._id;
        auth.password = config.default_doctor_pass as string;

        const authUser = await AuthModel.create([auth], { session });

        if (!authUser) {
            throw new ApiError(403, "Unable to Create Admin Account !!");
        }
        newUserData = authUser[0];
    } catch (error) {
        session.endSession();
        session.abortTransaction();
        throw new ApiError(403, "Session aborted !!")
    }
    if (newUserData) {
        newUserData = await AuthModel.findOne({ _id: newUserData._id }).populate('user');
    }
    return newUserData;
}


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
    getSingleAuth,
    createPatient,
    createAdmin,
    createDoctor
}