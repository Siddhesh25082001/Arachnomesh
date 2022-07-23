import mongoose, { Document, Schema } from "mongoose";
export interface IQuery extends Document {
    userName: string
    userEmail: string
    userContact:string
    query: string
    comment:string
    status:string
    leadAssigned:string
    leadStatus:string
    archive: number
}

const querySchema = new Schema({
    userName: { type: String },
    userEmail: { type: String },
    userContact: { type: String },
    query: { type: String },
    comment: { type: String },
    status: { type: String },
    leadAssigned: { type: String },
    leadStatus: { type: String },
    archive: { type: Number }
}, {
    timestamps: true
})

export const Queries = mongoose.model<IQuery>("Queries", querySchema, "Queries")