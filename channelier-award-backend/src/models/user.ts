import mongoose, { Document, Schema } from "mongoose";
export interface IUser extends Document {
    name: string
    email: string
    phone: string
    companyName: string
    website: string
    ip: string
    tandc: string
    companyLogo: string
    comment: string
    status: string
    archive: number
    role: string
    leadAssigned:string
    leadStatus:string
    lastName:string

}

export interface ICampaign extends Document {
    fields: Object
}

const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    companyName: { type: String },
    phone: { type: String },
    website: { type: String },
    ip: { type: String },
    tandc: { type: String },
    companyLogo: { type: String },
    comment: { type: String },
    status: { type: String },
    archive: { type: Number },
    role: { type: String },
    leadAssigned: { type: String },
    leadStatus: { type: String },
    lastName:{type:String},

}, {
    timestamps: true
})

const campaignSchema = new Schema({ fields: {} }, { timestamps: true })

export const Campaigns = mongoose.model<ICampaign>("Campaigns", campaignSchema, "Campaigns")
export const Users = mongoose.model<IUser>("Users", userSchema, "Users")