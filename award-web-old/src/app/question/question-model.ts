export interface IAnswer {
  _id?: string,
  questionId: string
  nominationId: string
  userId: string
  answeredBy: string
  field: any
  questionText?: string
  isScorable?: boolean
  scores?: any[]
  answerType?: AnswerType
  mapId?: string
};

export enum AnswerType{
  MultiSelect = "MULTI_SELECT",
  SingleSelect = "SINGLE_SELECT",
  Text = "TEXT",
  File = "FILE",
  SubQuest = "SUB_QUEST"
}
