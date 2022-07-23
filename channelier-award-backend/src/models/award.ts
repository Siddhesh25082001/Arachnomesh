import mongoose, { Document, Schema } from "mongoose";
export interface IAward extends Document {
    awardName: string
    alias: string
    level: string
    amount:string
    discountAmount:string
    show: boolean
}

const awardSchema = new Schema({
    awardName: { type: String, required: true },
    level: { type: String, required: true },
    alias: { type: String, required: true},
    amount:{ type: String, required: true},
    discountAmount: { type: String, required: true},
    show:{ type: Boolean, default:true }
}, {
    timestamps: true
})

export const AwardList = mongoose.model<IAward>("awardList",awardSchema,"awardList")
