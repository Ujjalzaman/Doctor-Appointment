import { Model, Types } from "mongoose";
import { IPatient } from "../patient/patient.interface";
import { IDoctor } from "../doctor/doctor.interface";

export interface IPayment {
    patient: Types.ObjectId | IPatient;
    doctor?: Types.ObjectId | IDoctor;
    transactionId?:string;
    orderId?:string;
    paymentMethod:"ONLINE" | "OFFLINE";
    amount: string;
}
export type IPaymentModel = Model<IPayment, {}>;