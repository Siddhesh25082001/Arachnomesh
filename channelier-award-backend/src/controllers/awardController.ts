import { Request, Response } from "express";
import { isValidObjectId, Types } from "mongoose";
import logger from "../logger";
import { Answer, IAnswer } from "../models/answer";
import { AwardList } from "../models/award";
import { Nomination } from "../models/nomination";
import { NominationAssignment } from "../models/nominationAssignment";
import { Nominee } from "../models/nomineeProducts";
import { AnswerType, Question } from "../models/question";
import { IScore, Score, scoreSchema } from "../models/score";
import { UserProfile } from "../models/userProfile";

/**
 * This controller handels the question get request based on award category
 * @params nominationId
 */
async function getQuestion(req: Request, res: Response) {
    const nominationId = req.params.id;
    if (!isValidObjectId(nominationId)) {
        return res.status(400).json({ msg: 'nomination id is required.' });
    }

    try {
        const nomination = await Nominee.findOne({ _id: nominationId }).lean();
        if (!nomination) {
            return res.status(400).json({ msg: 'Nomination not found.' });
        }

        //vallidation for user with role jury
        //to fetch data the nomination must assigned
        if(req.user.role === 'admin') {
            const questions = await Question.find({}).lean();
            return res.status(200).json({ questions: questions });
        }
        if (req.user.role === 'jury') {
            const assign = await NominationAssignment.findOne({userId: req.user.id}).lean();
            if (!assign) {
                return res.status(403).json({ msg: 'Unauthorize request' });
            }
            if (assign.nominationId.findIndex(val => val.toString() === nominationId) === -1) {
                return res.status(403).json({ msg: 'Unauthorize request' });
            }

            const questions = await Question.find({ isScorable: true, $or: [{answerType: AnswerType.Text}, {answerType: AnswerType.File}] }).lean();
            return res.status(200).json({ questions: questions });
        }

        //vallidation for user with role user
        if (req.user.role === 'user') {
            if(nomination.user.toString() !== req.user.id)
            return res.status(403).json({ msg: 'Unauthorize request' });
            else {
                const questions = await Question.find({}).lean();
                return res.status(200).json({ questions: questions });
            }
        }

        //may implement for user with other kind of access
        res.status(400).json({ questions: [] });
        
    } catch (error) {
        logger.error(`Controller: awardController: getQuestion: ${error}`);
        res.status(500).json({ msg: 'Unable to fetch questions' });
    }
}

async function isBrandRelated(req: Request, res: Response) {
    const nominationId = req.params.id;
    if (!isValidObjectId(nominationId)) {
        return res.status(400).json({ msg: 'nomination id is required.' });
    }

    try {
        const nomination = await Nominee.findOne({ _id: nominationId }).lean();
        if (!nomination) {
            return res.status(400).json({ msg: 'Nomination not found.' });
        }

        if (req.user.role === 'user' || req.user.role ==="jury") {
            if(nomination.user.toString() !== req.user.id && req.user.role==="user")
                return res.status(403).json({ msg: 'Unauthorize request' });
            else {
                const award = await AwardList.findOne({_id: nomination.awardCategory}).lean();
                if(!award) {
                    return res.status(400).json({ msg: 'Award not found.' });
                }
                let val=false;
                if(award!==null && award.awardName.includes("Brand")) {
                    val=true;
                }
                return res.status(200).json({ isBrand: val });
            }
        }

        //may implement for user with other kind of access
        res.status(400).json({ questions: [] });
        
    } catch (error) {
        logger.error(`Controller: awardController: getQuestion: ${error}`);
        res.status(500).json({ msg: 'Unable to fetch questions' });
    }
}

/**
 * This controller posts nominee answer to the given question sets
 * @params operationType
 */
async function postAnswer(req: Request, res: Response) {
    const data = JSON.parse(req.body.data)
    const answers = data.answers;
    const nominationId = data.nominationId;
    const isFinalSubmission = data.isFinalSubmission;
    if (!Array.isArray(answers) || !nominationId || isFinalSubmission === undefined) {
        return res.status(400).json({ msg: 'Unable to process the request' });
    }

    try {
        const nomination = await Nominee.findOne({_id: nominationId});
        if (!nomination) {
            return res.status(400).json({ msg: 'Nomination not found' });
        }
        if (nomination.answerSubmitted) {
            return res.status(400).json({ msg: 'Answer edit not allowed after final submission' });
        }
        _assignMarks(answers);
        let result: any[] = await _postAnswer(answers, req.user.id);
        if (isFinalSubmission) {
            nomination.answerSubmitted = true
            let marks=await findTotalMarks(nominationId);
            nomination.totalMarks=marks;
            await nomination.save();
        }
        res.status(200).json({ status: 'success', msg: 'Operation completed successfully', result: result });
    } catch (error) {
        logger.error(`Controller: awardController: postAnswer: ${error}`);
        return res.status(400).json({ msg: 'Unable to process the request' });
    }
}

/**
 * @private
 * A utility fuction used by controller `postAnswer` to insert asnwers for given set of question of a nomination
 */
// async function _insertAnswer(ans: any[], userId: string): Promise<boolean> {
//     //validating if user is authorize
//     ans.forEach(val => {
//         if (val.userId !== userId) {
//             return false;
//         }
//     })
//     try {
//         const result = await Answer.insertMany(ans, { ordered: true });
//         if (result.length !== ans.length) {
//             return false;
//         }
//     } catch (error) {
//         logger.error(`Controller: awardController: postAnswer: ${error}`);
//         return false;
//     }
//     return true;
// }

/**
 * @private
 * A utility fuction used by controller `postAnswer` to update asnwers for given set of question of a nomination
 */
async function _postAnswer(ans: any[], userId: string): Promise<any[]> {
    try {
        //validating if user is authorize
        ans.forEach(val => {
            if (val.userId !== userId) {
                throw 'Request not valid';
            }
        });
        for (let i = 0; i < ans.length; i++) {
            const answer = ans[i];
            console.log("a",answer);
            
            if (answer.nominationId === "") {
                delete answer.nominationId;
            }
            if (answer._id) {
                await Answer.updateOne({ _id: answer._id }, { field: answer.field, scores: answer.scores });
            } else {
                if(answer.scores===undefined) {
                    answer.scores = [];
                }
                const newAnswer = new Answer(answer);
                ans[i] = await newAnswer.save();
            }
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
    return ans;
}

async function findTotalMarks(nominationId: string): Promise<number> {
    let marks=0;
    try {
        const answer=await Answer.find({nominationId: nominationId});
        for(let val of answer) {
            if(val.scores) {
                for(let i=0;i<val.scores.length;i++) {
                    if(val.scores[i].score) {
                        marks =marks + val.scores[i].score;
                    }
                }
            }
        };
    } catch (error) {
        console.log(error)
        throw error;
    }
    return marks;
}

function _assignMarks(answers: IAnswer[]) {
    for(let val of answers) {
        if(val.mapId!=='qc-017' && val.mapId!=='qc-006') {
        if (val.answerType === AnswerType.SingleSelect || val.answerType === AnswerType.MultiSelect || val.answerType === AnswerType.SubQuest) {
            let score;
            switch (val.answerType) {
                case AnswerType.SingleSelect:
                    const selected = parseInt(val.field.selected);
                    score = new Score({score: selected * 2, judgeId: null});
                    val.scores = [score];
                    break;
                
                case AnswerType.MultiSelect:
                    const fields = Object.keys(val.field);
                    let count = 0;
                    fields.forEach(key => {
                        if (key.includes('opt') && val.field[key]) {
                            count++;
                        }
                    });
                    score = new Score({score: count * 2, judgeId: null});
                    val.scores = [score];
                    break;

                case AnswerType.SubQuest:
                    const keyList = Object.keys(val.field);
                    let c = 0;
                    keyList.forEach(key => {
                        if (val.field[key] === "1") {
                            c++;
                        }
                    });
                    score = new Score({score: c, judgeId: null});
                    val.scores = [score];
                    break;
                default:
                    break;
            }
        }
        }
    }
}

/**
 * This controller retruns the answers given by the nominee for a given nomination
 */
async function getAnswerOfNomination(req: Request, res: Response) {
    const nominationId = req.params.id;
    const userId = req.user.id;

    if (!nominationId || !isValidObjectId(nominationId)) {
        return res.status(400).json({ msg: 'Unable to process the request' });
    }

    try {
        const nomination = await Nominee.findById(nominationId).lean();

        //vallidation for user with role jury
        //to fetch data the nomination must assigned
        if (req.user.role === 'jury') {
            const assign = await NominationAssignment.findOne({userId: req.user.id}).lean();
            if (!assign) {
                return res.status(403).json({ msg: 'Unauthorize request' });
            }
            if (assign.nominationId.findIndex(val => val.toString() === nominationId) === -1) {
                return res.status(403).json({ msg: 'Unauthorize request' });
            }
            const answers = await Answer.aggregate([
                {$match: { nominationId: nomination?._id }},
                {$lookup: { from: "nomineeList", localField: "nominationId", foreignField: "_id", as: "nomination" } },
                { $match: { "nomination.answerSubmitted": true } },
                {$lookup: { from: "question", localField: "questionId", foreignField: "_id", as: "question" } },
                { $match: { "question.isScorable": true } },
                { $unset: "answeredBy" },
                { $project: { "_id": 1, "questionId": 1, "nominationId": 1, "userId": 1, "field": 1, "text": 1, "isScorable": 1, 
                    "scores": { $filter: {input: "$scores", as: "score", cond: {$eq: ["$$score.judgeId", Types.ObjectId(req.user.id)]}}}}}

            ]);
            res.status(200).json({ answers: answers, juryChecked: nomination?.juryChecked });
        }


        if (req.user.role === 'user') {
            if( nomination?.user.toString() !== userId)
            return res.status(403).json({ msg: 'Unauthorize request' });
            else {
                const filter = {$or: [{ nominationId: nomination?._id }, {$and: [{userId: req.user.id, nominationId: {$exists: false}}]}]}
                const answers = await Answer.find(filter)
                .select('_id questionId nominationId userId answeredBy field answerType mapId')
                .lean();
                res.status(200).json({ answers: answers, isFinalSubmitted: nomination?.answerSubmitted });
            }
        }

    } catch (error) {
        logger.error(`Controller: awardController: getAnswerOfNomination: ${error}`);
        res.status(500).json({ msg: 'Unable to fetch answers' });
    }

}

async function getAnswerOfNominationForAdmin(req: Request, res: Response) {
    const nominationId = req.body.nominationId;
    const userId = req.body.userId;
    if (!nominationId || !isValidObjectId(nominationId)) {
        return res.status(400).json({ msg: 'Unable to process the request' });
    }

    try {
        //vallidation for user with role admin
        //to fetch data the nomination must assigned
        if(req.user.role==='admin') {
            const filter = {$or: [{ nominationId: Types.ObjectId(nominationId) }, {$and: [{nominationId: {$exists: false}}, {userId: Types.ObjectId(userId)}]}]}
            const partAanswer=await UserProfile.findOne({'nominationId':nominationId})
            console.log(partAanswer);
            
            const answers = await Answer.aggregate([
                {$match: filter},
                { $unset: "answeredBy" },
                {
                    $lookup: {
                        from: "Users",
                        localField: "scores.judgeId", foreignField: "_id", as: "user"
                    }
                },
                {
                    $lookup: {
                        from: "Juries",
                        localField: "user.phone", foreignField: "phone", as: "jury"
                    }
                },
                { $project: { "_id": 1, "questionId": 1, "nominationId": 1,"field": 1, "userId": 1, "text": 1, "isScorable": 1, 
                    "scores": 1, 'user': {'_id': 1, 'phone': 1}, 'jury': {'phone': 1, 'name': 1}}}

            ]);
            res.status(200).json({ answers: answers,partAanswer });
        }
    } catch (error) {
        logger.error(`Controller: awardController: getAnswerOfNomination: ${error}`);
        res.status(500).json({ msg: 'Unable to fetch answers' });
    }

}

/**
 * This controller returns the category hierarchy of nominations for a user with role jury or above
 * @params userId
 */
export async function getAssignedNominationHierarchy(req: Request, res: Response) {
    let userId: string;
    if (req.user.role === 'admin') {
        userId = req.params.userId;
        if (!isValidObjectId(userId)) {
            return res.status(400).json({msg: 'User Id is required'});
        }
    } else {
        userId = req.user.id;
    }

    try {
        const result = await NominationAssignment.findOne({userId: userId}).lean();
        let bproductCategoryData: any[] = [];
        if (result) {
            bproductCategoryData = await Nominee.aggregate([
                {
                    $facet: {
                        "byProductCategory": [
                            { $match: { $and: [{ "productCategory": { $ne: null } }, {_id: {$in: result?.nominationId}}] } },
                            { $lookup: { from: "productList", localField: "productCategory", foreignField: "_id", as: "productCat" } },
                            { $group: { _id: "$productCat._id", name: { "$first": "$productCat.productName" }, p_id: { "$first": "$productCat.parentId" }, count: { $sum: 1 } } },
                            { $project: { _id: 0, 'productId': { $arrayElemAt: ["$_id", 0] }, 'productName': { $arrayElemAt: ["$name", 0] }, 'parentId': { $arrayElemAt: ["$p_id", 0] }, 'count': "$count", 'level': "1" } }
                        ],
                        "byProductSubCategory": [
                            { $match: { $and: [{ "productSubCategory": { $ne: null } }, {_id: {$in: result?.nominationId}}] } },
                            { $lookup: { from: "productList", localField: "productSubCategory", foreignField: "_id", as: "productSubCat" } },
                            { $group: { _id: "$productSubCat._id", name: { "$first": "$productSubCat.productName" }, p_id: { "$first": "$productSubCat.parentId" }, count: { $sum: 1 } } },
                            { $project: { _id: 0, 'productId': { $arrayElemAt: ["$_id", 0] }, 'productName': { $arrayElemAt: ["$name", 0] }, 'parentId': { $arrayElemAt: ["$p_id", 0] }, 'count': "$count", 'level': "2" } }
                        ],
                        "byProductSubSubCategory": [
                            { $match: { $and: [{ "productSubSubCategory": { $ne: null } }, {_id: {$in: result?.nominationId}}] } },
                            { $lookup: { from: "productList", localField: "productSubSubCategory", foreignField: "_id", as: "productSubSubCat" } },
                            { $group: { _id: "$productSubSubCat._id", name: { "$first": "$productSubSubCat.productName" }, p_id: { "$first": "$productSubSubCat.parentId" }, count: { $sum: 1 } } },
                            { $project: { _id: 0, 'productId': { $arrayElemAt: ["$_id", 0] }, 'productName': { $arrayElemAt: ["$name", 0] }, 'parentId': { $arrayElemAt: ["$p_id", 0] }, 'count': "$count", 'level': "3" } }
                        ]
                    }
                }
            ]).exec();
        }
        res.status(200).json({status: 'success', nominations: bproductCategoryData});
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: awardController: getAssignedNomination: ${error}`
        });
        return res.status(500).json({msg: 'Unable to process request.'});
    }

}

/**
 * This controller handles the score assignment corresponding to a question set of a nomination,
 * question type must be scorable(isScorable === true)
 */
export async function setScore(req: Request, res: Response) {
    const nominationId = req.body.nominationId;
    const userId = req.user.id;
    const scores: any[] = req.body.scores;
    if (!nominationId || !isValidObjectId(nominationId)) {
        return res.status(400).json({msg: 'Nomination id is required'});
    }
    if (!scores) {
        return res.status(400).json({msg: 'Scores id is required'});
    }
    try {
        const nomination = await Nominee.findOne({_id: nominationId});
        const answers = await Answer.find({ nominationId: nominationId });
        if (answers.length === 0) {
            return res.status(400).json({msg: 'Unable to process request'});
        }
    
        for (let i = 0; i < scores.length; i++) {
            const score = scores[i];
            let answer = answers.find(val => val._id.toString() === score.answerId);
            if (answer) {
                delete score.answerId;
                if(answer.scores===null) {                    
                    answer.scores=[score];
                }
                else {
                    const idx = answer.scores?.findIndex(val => val.judgeId?.toString() === score.judgeId);
                    if (idx === -1) {
                        answer.scores.push(score);
                    } else {
                        answer.scores[idx] = score;
                    }
                }
                await answer.save();
            }
        }
        if(nomination) {
            nomination.juryChecked = req.body.juryChecked;
            const marks=await findTotalMarks(nominationId);
            nomination.totalMarks=marks;
            await nomination.save();
        }
        res.status(200).json({msg:"score added successfully"});
    } catch (error) {
        res.status(400).json({msg:"process failed"});
    }
}

async function getAssignedNominationByCompany(req: Request, res: Response) {
    const userId = req.user.id;
    const hierarchy = req.body.category;
    const categoryId = req.body.categoryId;
    let query: any = {};
    //query[hierarchy] = Types.ObjectId(categoryId);
    const result = await NominationAssignment.findOne({userId: userId}).lean();
    let bproductCategoryData: any[] = [];
    if (result) {
        bproductCategoryData = await Nominee.aggregate([
            { $match: { _id: {$in: result?.nominationId}} },
            { $lookup: { from: "Users", localField: "user", foreignField: "_id", as: "user" } },
            { $group: { _id: "$user._id", name: { "$first": "$user.companyName" }, count: { $sum: 1 }, juryChecked: { "$sum": {$cond: [{$eq:['$juryChecked', true]}, 2, {$cond: [{$eq: ['$juryChecked',false]}, 1, 0]}]} } } },
            { $project: { _id: 0, 'userId': { $arrayElemAt: ["$_id", 0] }, 'companyName': { $arrayElemAt: ["$name", 0] }, 'count': "$count", 'juryChecked': 1 } }
                ]).exec();
    }
    res.status(200).json(bproductCategoryData);
}

async function getAssignedNomination(req: Request, res: Response) {
    const userId = req.user.id;
    const hierarchy = req.body.category;
    const categoryId = req.body.categoryId;
    const cmpId = req.body.cmpId;
    let query: any = {};
    //query[hierarchy] = Types.ObjectId(categoryId);
    const result = await NominationAssignment.findOne({userId: userId}).lean();
    let bproductCategoryData: any[] = [];
    if (result) {
        bproductCategoryData = await Nominee.aggregate([
            { $match: { $and: [query, {_id: {$in: result?.nominationId}}] } },
            { $lookup: { from: "Users", localField: "user", foreignField: "_id", as: "user" } },
            { $match: {"user._id": Types.ObjectId(cmpId)}},
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" }}
                ]).exec();
    }
    res.status(200).json(bproductCategoryData);
}


async function getAnswerOfPartBNomination(req: Request, res: Response){
   const partBanswer=await Answer.find({ userId: req.params.userId, mapId:{$in:["qc-001","qc-002","qc-003","qc-004","qc-005","qc-006"]} });
   res.json(partBanswer)
}



export default {
    getQuestion,
    postAnswer,
    getAnswerOfNomination,
    getAnswerOfNominationForAdmin,
    getAssignedNominationHierarchy,
    setScore,
    getAssignedNominationByCompany,
    getAssignedNomination,
    isBrandRelated,
    getAnswerOfPartBNomination
}