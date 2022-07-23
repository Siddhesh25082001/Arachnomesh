import mongoose, { Document, Schema } from "mongoose";
export interface IQuery extends Document {
   companyName:string
   companyLogo:string
   productLogo:string
   productName:string
   sorting:number
   archive:boolean
}

const nomination = new Schema({
    companyName: { type: String, required: true},
    companyLogo: { type: String, required: true},
    productLogo: { type: String, required: true},
    productName:{type:String, required: true},
    category:{type:String, required: true},
    sorting:{type:Number},
    archive:{type:Boolean}
    
}, {
    timestamps: true
})

export const Nomination = mongoose.model<IQuery>("Nomination", nomination, "Nomination")