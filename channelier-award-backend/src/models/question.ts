import { Document, model, Schema } from "mongoose";

export enum AnswerType{
    MultiSelect = "MULTI_SELECT",
    SingleSelect = "SINGLE_SELECT",
    Text = "TEXT",
    File = "FILE",
    SubQuest = "SUB_QUEST"
}

export interface IQuestion extends Document {
    text: string
    isScorable: boolean
    answerType: AnswerType
    mapId: string
};

const questionSchema = new Schema({
    text: { type: String, required: true },
    isScorable: { type: Boolean, required: true },
    answerType: { type: String, required: true},
    mapId: { type: String, required: true}
});

export const Question = model<IQuestion>('question', questionSchema, 'question');
