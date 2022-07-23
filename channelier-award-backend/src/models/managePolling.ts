import mongoose, { Document, Schema } from "mongoose";
export interface IManagePolling extends Document {
    userKey: string
    nomineeId: string
    award: string
}

const managePollingSchema = new Schema({
    userKey: { type: String, required: true },
    nomineeId: { type: String, required: true },
    award: { type: String, required: true }
}, {
    timestamps: true
})

export const ManagePolling = mongoose.model<IManagePolling>("managePolling",managePollingSchema,"managePolling")
