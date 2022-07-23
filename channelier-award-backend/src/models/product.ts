import mongoose, { Document, Schema } from "mongoose";
export interface IProduct extends Document {
    parentId: string
    productName: string
    alias:string
    level: string
    status:string
}

const productSchema = new Schema({
    parentId: { type: String},
    productName: { type: String,  required: true },
    alias: { type: String,  required: true },
    level: { type: String, required: true },
    status:{type:String}
}, {
    timestamps: true
})

export const ProductList = mongoose.model<IProduct>("productList", productSchema, "productList")
