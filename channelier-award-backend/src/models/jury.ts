import mongoose, { Document, Schema } from "mongoose";
export interface IJury extends Document {
    name: string
    email: string
    phone: number
    description: string
    file: string
    brand: string
    designation: string
    sort:number
    website: string
    archive : number
    year: string[]
}

const jurySchema = new Schema({
    name: { type: String },
    email: { type: String },
    description: { type: String },
    phone : { type: String },
    file : { type: String },
    brand : { type: String },
    designation: {type : String},
    sort: {type: Number},
    website: { type: String },
    archive:{type: Number },
    year:{type: Array, default: ['2021']},
}, {
    timestamps: true
})

export const Juries = mongoose.model<IJury>("Juries", jurySchema, "Juries")