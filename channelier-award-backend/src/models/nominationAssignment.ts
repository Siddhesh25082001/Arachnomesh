import { Document, model, Schema, Types } from "mongoose";

export interface INominationAssignment extends Document {
    userId: string
    nominationId: string[];
    cat1: string[];
    cat2: string[];
    cat3: string[];
    intermediateCat: string[];
}

const nominationAssignmentSchema = new Schema({
    userId: {type: Types.ObjectId, required: true, ref: 'Users', unique: true},
    nominationId: [{type: Schema.Types.ObjectId, ref: 'nomineeList'}],
    cat1: [{type: Schema.Types.ObjectId}],
    cat2: [{type: Schema.Types.ObjectId}],
    cat3: [{type: Schema.Types.ObjectId}],
    intermediateCat: [{type: Schema.Types.ObjectId}],
});

export const NominationAssignment = model<INominationAssignment>('nominationAssignment', nominationAssignmentSchema, 'nominationAssignment');