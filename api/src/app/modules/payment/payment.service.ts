import { IPayment } from "./payment.interface";
import { PaymentModel } from "./payment.model";

const createPayment = async (payload: IPayment): Promise<IPayment | null> => {
    const result = await PaymentModel.create(payload);
    return result;
}

const getAllPayment = async (): Promise<IPayment[] | null> => {
    const result = await PaymentModel.find();
    return result;
}

const getSinglePayment = async (id: string): Promise<IPayment | null> => {
    const result = await PaymentModel.findOne({ _id: id });
    return result;
}

const deletePayment = async (id: string): Promise<void> => {
    await PaymentModel.findOneAndDelete({ _id: id });
}

const updatePayment = async (id: string, payload: Partial<IPayment>): Promise<IPayment | null> => {
    const result = await PaymentModel.findOneAndUpdate({ _id: id }, { payload });
    return result;
}

export const PaymentService = {
    createPayment,
    getAllPayment,
    getSinglePayment,
    deletePayment,
    updatePayment
}