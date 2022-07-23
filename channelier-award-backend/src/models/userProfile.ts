import mongoose, { Document, Schema } from "mongoose";
export interface IUserProfile extends Document {
    nominationId:string
    userId:string
    productName: string
    brandLogo: {}
    productImage: {}
    // companyLogo: {}
    introVideo: string
    sampleAcceptance: boolean
    billingAddress: string
    shippingAddress: string
    gst: string
}



const userProfileschema = new Schema({
    nominationId:{type:String},
    userId:{type:String},
    productName: {type:String},
    brandLogo: {type:Object},
    productImage: {type:Object},
    // companyLogo: {type:Object},
    introVideo: {type:String},
    sampleAcceptance: {type:Boolean},
    billingAddress: {type:String},
    shippingAddress: {type:String},
    gst: {type:String}

}, {
    timestamps: true
})



export const UserProfile = mongoose.model<IUserProfile>("UserProfile", userProfileschema, "UserProfile")