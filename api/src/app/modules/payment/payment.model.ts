import { Schema, model } from "mongoose";
import { IPayment, IPaymentModel } from "./payment.interface";

const PaymentSchema = new Schema<IPayment, IPaymentModel>({
    patient: {
        type: Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctor: {
        type: Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    transactionId: {
        type: String,
    },
    orderId: {
        type: String,
    },
    paymentMethod: {
        type: String,
        enum: ['ONLINE', "OFFLINE"],
        required: true
    },
    amount: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    }
});
export const PaymentModel = model<IPayment, IPaymentModel>('Payment', PaymentSchema);