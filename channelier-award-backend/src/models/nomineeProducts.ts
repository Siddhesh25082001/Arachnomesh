import mongoose, { Document, Schema } from "mongoose";
export interface INominee extends Document {
    user: string
    awardCategory: string
    productCategory: string
    productSubCategory:string
    productSubSubCategory: string
    paymentDetail: string
    productName: string
    payment : boolean
    cart: boolean
    archive:boolean
    votes: number
    status: string
    comment: string
    employeeName: string
    answerSubmitted: boolean
    orderReceived: boolean
    juryChecked: boolean
    totalMarks: number
}

const nomineeSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    awardCategory: {
        type: Schema.Types.ObjectId,
        ref: 'awardList'
    },
    productCategory: {
        type: Schema.Types.ObjectId,
        ref: 'productList'
    },
    paymentDetail: {
        type: String
    },
    productSubCategory: {
        type: Schema.Types.ObjectId,
        ref: 'productList'
    },
    productSubSubCategory: {
        type: Schema.Types.ObjectId,
        ref: 'productList'
    },
    productName:{
        type: String
    },
    payment:{
        type: Boolean
    },
    cart:{
        type: Boolean
    },
    archive:{
        type: Boolean
    },
    votes:{
        type: Number
    },
    year: {type: Number},
    status : { type: String },
    comment : { type: String },
    employeeName : { type: String },
    answerSubmitted: { type: Boolean },
    orderReceived: { type: Boolean },
    juryChecked: { type: Boolean },
    totalMarks: { type: Number },
}, {
    timestamps: true
})

export const Nominee = mongoose.model<INominee>("nomineeList", nomineeSchema, "nomineeList")
