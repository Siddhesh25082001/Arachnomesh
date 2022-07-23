import mongoose, { Document, Schema } from "mongoose";
export interface IBlog extends Document {
    name: string,
    sort: number,
    summery: string,
    doc: string,
    file:string,
    slug:string
}

const blogSchema = new Schema({
    name:{ type: String },
    sort:{type: Number},
    summery: { type: String },
    doc: { type: String },
    file:{ type: String },
    slug:{type: String, required:true, unique : true}
}, {
    timestamps: true
})

export const Blogs = mongoose.model<IBlog>("Blogs", blogSchema, "Blogs")