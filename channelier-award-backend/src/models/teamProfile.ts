import mongoose, { Document, Schema } from "mongoose";
export interface IQuery extends Document {
    employeeName: string
    employeeImage: string
    designation:string
 
   
}

const teamSchema = new Schema({
    employeeName: { type: String },
    employeeImage: { type: String },
    designation: { type: String },
    
}, {
    timestamps: true
})

export const Team = mongoose.model<IQuery>("Team", teamSchema, "Team")