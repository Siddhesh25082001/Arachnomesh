import { Document, model, Schema } from "mongoose";

export interface IAdminUser extends Document {
    email: string,
    password: string,
    role: string,  //admin OR superAdmin
}

const adminUserSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, required: true}
});

export const AdminUser = model<IAdminUser>('AdminUser', adminUserSchema, 'AdminUser');