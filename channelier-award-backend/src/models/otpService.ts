import mongoose, { Document, Schema } from "mongoose";
export interface IOtp extends Document {
    OTP: string
    phoneNumber: string
}

const otpSchema = new Schema({
    OTP: { type: String, required: true },
    originalOtp:{type:String},
    phoneNumber: { type: String, required: true },
    masterOTP:{type:String}
}, {
    timestamps: true
})

export const OTPRecord = mongoose.model<IOtp>("OTPRecord",otpSchema,"OTPRecord")