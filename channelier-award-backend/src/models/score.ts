import { Document, model, Schema } from "mongoose";

export interface IScore extends Document {
    judgeId?: string // judge user id
    score: number
}

export const scoreSchema = new Schema({
    judgeId: { type: Schema.Types.ObjectId, ref: 'Users'},
    score: { type: Number, required: true },
});

// scoreSchema.index({judgeId: 1, answerId: 1}, {unique: true});

export const Score = model<IScore>('score', scoreSchema, 'score');