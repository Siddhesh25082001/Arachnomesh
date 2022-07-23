import { Document, model, Schema } from "mongoose";
import { AnswerType } from "./question";
import { IScore, scoreSchema } from "./score";

export interface IAnswer extends Document {
    questionId: string
    nominationId: string
    userId: string
    answeredBy: string // User Or Admin
    field: any
    scores: [IScore]
    answerType: AnswerType
    mapId: string
};

const answerSchema = new Schema({
    questionId: { type: Schema.Types.ObjectId, required: true, ref: 'question' },
    nominationId: { type: Schema.Types.ObjectId, ref: 'nomineeList' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'Users' },
    answeredBy: { type: String, required: true },
    field: { type: Object, required: true },
    scores: [scoreSchema],
    answerType: Object,
    mapId: String
}, { timestamps: true });

// answerSchema.index({ questionId: 1, nominationId: 1 }, { unique: true });

export const Answer = model<IAnswer>('answer', answerSchema, 'answer');
