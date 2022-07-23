import mongoose, { Document, Schema } from "mongoose";
export interface ILead extends Document {
    mobile: string,
    campaign: string,
    status: string,
    comment: string,
    archive: number,
    leadAssigned:string,
    leadStatus:string
    
}

const leadSchema = new Schema({
    mobile: { type: String,unique: true },
    campaign: {type: String},
    status : { type: String },
    comment : { type: String },
    archive:  { type: Number },
    leadAssigned:{type:String},
    leadStatus:{type:String}

}, {
    timestamps: true
})

export const Lead = mongoose.model<ILead>("Lead", leadSchema, "Lead")