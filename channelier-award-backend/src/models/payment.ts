import mongoose, { Document, Schema } from "mongoose";
export interface IPayment extends Document {
    orderId:string,
    amount:string,
    userId: string,
    paymentStatus: string,
    nomineeIds:[],
    successResponse:{}
    archive: number
}

const paymentSchema = new Schema({
    orderId:  { 
        type: String
    },
    userId:  { 
        type: String
    },
    amount: {
        type: String
    },
    discount: {
        type: String
    },
    nomineeIds: [{
        type: Schema.Types.ObjectId,
        ref: 'nomineeList'
    }],
    paymentStatus:  { 
        type: String
    },
    successResponse:{},
    archive: Number
}, {
    timestamps: true
})

export const Payment = mongoose.model<IPayment>("paymentDetails", paymentSchema, "paymentDetails")
