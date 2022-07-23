import { Request, Response } from "express";
import { DocumentDefinition, isValidObjectId, Types } from "mongoose";
import logger from "../logger";
import { AdminUser } from "../models/adminUser";
import { INominee, Nominee } from "../models/nomineeProducts";
import jwt from 'jsonwebtoken';
import config from "../config/config";
import XLSX from 'xlsx';
import { Readable } from "stream";
import { AwardList } from "../models/award";
import { ProductList } from "../models/product";
import { INominationAssignment, NominationAssignment } from "../models/nominationAssignment";
import { Juries } from "../models/jury";
import { Users } from "../models/user";

/**
 * This controller returns the nomination count grouped by awards and product category
 */
async function nominationByHierarchicalCategory(req: Request, res: Response) {
    let awardCategoryData: any;
    let productCategoryData: any;

    try {
        //Data grouping based on award category
        awardCategoryData = await Nominee.aggregate([
            { $match: { archive: false } },
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" } },
            { $match: { "award.show": true } },
            { $group: { _id: "$award._id", name: { "$first": "$award.awardName" }, count: { $sum: 1 } } },
            { $project: { _id: 0, 'awardCategoryId': { $arrayElemAt: ["$_id", 0] }, 'awardCategoryName': { $arrayElemAt: ["$name", 0] }, 'count': "$count" } }
        ]).exec();

        //Data grouping based on product category
        // `$facet` runs all three pipelines on same data independently 
        productCategoryData = await Nominee.aggregate([
            { $match: { archive: false } },
            {
                $facet: {
                    "byProductCategory": [
                        { $match: { $and: [{ archive: false }, { "productCategory": { $ne: null } }] } },
                        { $lookup: { from: "productList", localField: "productCategory", foreignField: "_id", as: "productCat" } },
                        { $group: { _id: "$productCat._id", name: { "$first": "$productCat.productName" }, p_id: { "$first": "$productCat.parentId" }, count: { $sum: 1 } } },
                        { $project: { _id: 0, 'productId': { $arrayElemAt: ["$_id", 0] }, 'productName': { $arrayElemAt: ["$name", 0] }, 'parentId': { $arrayElemAt: ["$p_id", 0] }, 'count': "$count", 'level': "1" } }
                    ],
                    "byProductSubCategory": [
                        { $match: { $and: [{ archive: false }, { "productSubCategory": { $ne: null } }] } },
                        { $lookup: { from: "productList", localField: "productSubCategory", foreignField: "_id", as: "productSubCat" } },
                        { $group: { _id: "$productSubCat._id", name: { "$first": "$productSubCat.productName" }, p_id: { "$first": "$productSubCat.parentId" }, count: { $sum: 1 } } },
                        { $project: { _id: 0, 'productId': { $arrayElemAt: ["$_id", 0] }, 'productName': { $arrayElemAt: ["$name", 0] }, 'parentId': { $arrayElemAt: ["$p_id", 0] }, 'count': "$count", 'level': "2" } }
                    ],
                    "byProductSubSubCategory": [
                        { $match: { $and: [{ archive: false }, { "productSubSubCategory": { $ne: null } }] } },
                        { $lookup: { from: "productList", localField: "productSubSubCategory", foreignField: "_id", as: "productSubSubCat" } },
                        { $group: { _id: "$productSubSubCat._id", name: { "$first": "$productSubSubCat.productName" }, p_id: { "$first": "$productSubSubCat.parentId" }, count: { $sum: 1 } } },
                        { $project: { _id: 0, 'productId': { $arrayElemAt: ["$_id", 0] }, 'productName': { $arrayElemAt: ["$name", 0] }, 'parentId': { $arrayElemAt: ["$p_id", 0] }, 'count': "$count", 'level': "3" } }
                    ]
                }
            }
        ]).exec();
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: nominationByHierarchicalCategory: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }

    res.json({ awardCategoryData: awardCategoryData, productCategoryData: productCategoryData });
}

/**
 * This controller returns data for nomination stats page, returns nomination
 * count grouped by product category distributed over award category
 */
async function nominationByFlatCategory(req: Request, res: Response) {

    let awardCategoryData: any;
    let productCategoryData: any;

    try {
        awardCategoryData = await Nominee.aggregate([
            { $match: { archive: false } },
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" } },
            { $match: { "award.show": true } },
            { $group: { _id: "$award._id", name: { "$first": "$award.awardName" }, count: { $sum: 1 } } },
            { $project: { _id: 0, 'awardCategoryId': { $arrayElemAt: ["$_id", 0] }, 'awardCategoryName': { $arrayElemAt: ["$name", 0] }, 'count': "$count" } },
            { $sort: { awardCategoryId: -1 } },
        ]).exec();

        productCategoryData = await Nominee.aggregate([
            { $match: { archive: false, payment: true, "createdAt": { $gte: new Date("2022-04-01") } } },
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" } },
            { $match: { "award.show": true } },
            {
                $facet: {
                    "byProductCategory": [
                        { $match: { $and: [{ archive: false }, { "productCategory": { $ne: null } }] } },
                        { $lookup: { from: "productList", localField: "productCategory", foreignField: "_id", as: "productCat" } },
                        { $group: { _id: { prodId: "$productCat._id", awdId: "$award._id" }, prodName: { "$first": "$productCat.productName" }, awdName: { "$first": "$award.awardName" }, p_id: { "$first": "$productCat.parentId" }, count: { $sum: 1 } } },
                        { $group: { _id: { prodId: "$_id.prodId", prodName: "$prodName", p_id: "$p_id" }, awdDistr: { "$push": { "k": "$_id.awdId", "v": "$count", awardName: "$awdName" } } } },
                        { $project: { _id: 0, productId: { $arrayElemAt: ["$_id.prodId", 0] }, parentId: { $arrayElemAt: ["$_id.p_id", 0] }, productName: { $arrayElemAt: ["$_id.prodName", 0] }, awardWiseCount: "$awdDistr", level: "LEVEL_1" } },
                        { $sort: { productId: -1 } },
                    ],
                    "byProductSubCategory": [
                        { $match: { $and: [{ archive: false }, { "productSubCategory": { $ne: null } }] } },
                        { $lookup: { from: "productList", localField: "productSubCategory", foreignField: "_id", as: "productSubCat" } },
                        { $group: { _id: { prodId: "$productSubCat._id", awdId: "$award._id" }, prodName: { "$first": "$productSubCat.productName" }, awdName: { "$first": "$award.awardName" }, p_id: { "$first": "$productSubCat.parentId" }, count: { $sum: 1 } } },
                        { $group: { _id: { prodId: "$_id.prodId", prodName: "$prodName", p_id: "$p_id" }, awdDistr: { "$push": { "k": "$_id.awdId", "v": "$count", awardName: "$awdName" } } } },
                        
                        { $project: { _id: 0, productId: { $arrayElemAt: ["$_id.prodId", 0] }, parentId: { $arrayElemAt: ["$_id.p_id", 0] }, productName: { $arrayElemAt: ["$_id.prodName", 0] }, awardWiseCount: "$awdDistr", level: "LEVEL_2" } },
                        { $sort: { productId: -1 } },
                    ],
                    "byProductSubSubCategory": [
                        { $match: { $and: [{ archive: false }, { "productSubSubCategory": { $ne: null } }] } },
                        { $lookup: { from: "productList", localField: "productSubSubCategory", foreignField: "_id", as: "productSubSubCat" } },
                        { $group: { _id: { prodId: "$productSubSubCat._id", awdId: "$award._id" }, prodName: { "$first": "$productSubSubCat.productName" }, awdName: { "$first": "$award.awardName" }, p_id: { "$first": "$productSubSubCat.parentId" }, count: { $sum: 1 } } },
                        { $group: { _id: { prodId: "$_id.prodId", prodName: "$prodName", p_id: "$p_id" }, awdDistr: { "$push": { "k": "$_id.awdId", "v": "$count", awardName: "$awdName" } } } },
                        
                        { $project: { _id: 0, productId: { $arrayElemAt: ["$_id.prodId", 0] }, parentId: { $arrayElemAt: ["$_id.p_id", 0] }, productName: { $arrayElemAt: ["$_id.prodName", 0] }, awardWiseCount: "$awdDistr", level: "LEVEL_3" } },
                        { $sort: { productId: -1 } },
                    ]
                }
            }
        ]).exec();
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: nominationByFlatCategory: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
    res.json({ productWiseCount: productCategoryData[0], awardWiseCount: awardCategoryData });
}

// FInd Nominations by product Id
async function getNominationByproductId(req: Request, res: Response) {
    const productId = req.body;
    if (!productId) {
        return res.status(400).json({ status: false, msg: "Value is required", nomination: {} });
    }
    try {
        const nomination = await Nominee.find(req.body).lean();
        if (!nomination) {
            return res.status(200).json({ status: false, msg: "Nomination not found", nomination: {} });
        }

        return res.status(200).json({ status: true, msg: "done", nomination: nomination });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: getNomination: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}

async function getJuryData(req: Request, res: Response) {
    const productId = req.params.id;
    if (!productId || !isValidObjectId(productId)) {
        return res.status(400).json({ status: false, msg: "Nomination id is required", jury: {} });
    }
    try {
        const nominationAssignment = await NominationAssignment.find({ nominationId: { "$in" : [productId]} }).lean();
        if (!nominationAssignment) {
            return res.status(200).json({ status: false, msg: "Nomination not found", nomination: {} });
        }
        const JuryId=nominationAssignment[0]?.userId;
        if(!JuryId) {
            return res.status(200).json({ status: true, msg: "Nominee Not assigned", jury: {} });    
        }
        const Jury=[];
        for(let i=0;i<nominationAssignment.length; i++) {
            let j= await Users.find({_id: nominationAssignment[i]?.userId}).lean();
            Jury.push(j);
        }
        return res.status(200).json({ status: true, msg: "done", jury: Jury });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: getNomination: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}
/**
 * Returns nomination details by id if found, otherwise send status false
 */
async function getNomination(req: Request, res: Response) {
    const nominationId = req.params.id;
    if (!nominationId || !isValidObjectId(nominationId)) {
        return res.status(400).json({ status: false, msg: "Nomination id is required", nomination: {} });
    }

    try {
        const nomination = await Nominee.findById(nominationId)
            .populate('productCategory')
            .populate('productSubCategory')
            .populate('productSubSubCategory')
            .lean();
        if (!nomination) {
            return res.status(200).json({ status: false, msg: "Nomination not found", nomination: {} });
        }

        return res.status(200).json({ status: true, msg: "done", nomination: nomination });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: getNomination: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}

/**
 * Edit the nomination details of a given nomination, this controller can not update the payment details
 */
async function updateNomination(req: Request, res: Response) {
    const nomination = req.body;
    try {
        //updation request vallidation
        const isValid = await _checkEditActionValidity(nomination);
        if (!isValid) {
            logger.log({
                level: 'warn',
                message: `invalid edit nomination request => ${nomination}`,
            })
            return res.status(400).json({ status: false, msg: "invalid edit nomination request" });
        }
        const result = await Nominee.update({ _id: req.body._id }, nomination);
        res.status(200).json({ status: true, result: result, msg: 'updation completed' });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: updateNomination: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}

/**
 * This utility function used by `updateNomination` controller to vaildate edit request,
 * eg. payment request can not be updated through the request so we must vallidate the 
 * if request body have same payment details.
 */
async function _checkEditActionValidity(nomination: DocumentDefinition<INominee>): Promise<boolean> {
    const currNomination = await Nominee.findById(nomination._id).lean();
    if (!currNomination) {
        return false;
    }
    //payment status and details should not change
    if (nomination.payment === currNomination.payment && nomination.paymentDetail === currNomination.paymentDetail) {
        return true;
    }
    return false;
}

/**
 * This controller uses to logged in admin user and issues an access token
 */
async function loginAdminUser(req: Request, res: Response) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: false, msg: "Bad request", token: '' });
    }
    try {
        const user = await AdminUser.findOne({ email: email, password: password }).lean();
        if (!user) {
            return res.status(400).json({ status: false, msg: "User not found", token: '' });
        }
        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, config.jwtKey.secret);
        return res.status(200).json({ status: true, msg: "successfull", token: token });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: loginAdminUser: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}

/**
 * This controller will export product and award category in xlsx format
 */
async function exportCategory(req: Request, res: Response) {
    try {
        const awardCategory = await AwardList.find({ show: true }).lean();
    const productCategory = await ProductList.find().lean();

    let cols = ['Product Category'];
    awardCategory.forEach(val => {
        cols.push(val.awardName);
    })
    let data: string[][] = [];
    productCategory.forEach(val => {
        data.push([val.productName]);
    })
    const x = [
        cols,
        ...data
    ]
    let ws = XLSX.utils.aoa_to_sheet(x);
    const wscols = [
        { wch: 40 },
        { wch: 25 },
        { wch: 25 },
        { wch: 25 }
    ];

    ws['!cols'] = wscols;
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "product_category");

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=' + 'product_category.xlsx');
    const wbOpts: XLSX.WritingOptions = { bookType: "xlsx", type: "buffer" };
    const resp = XLSX.write(wb, wbOpts);
    const stream: Readable = bufferToStream(resp);
    stream.pipe(res);
    stream.on('end', () => {
        res.end();
    });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: exportCategory: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}

function bufferToStream(buffer: any) {
    var stream = new Readable();
    stream.push(buffer);
    stream.push(null);

    return stream;
}

/**
 * Controller to assign given list of nominations to a given jury user
 */
export async function assignNominationTojury(req: Request, res: Response) {
    const {cat1, cat2, cat3, nominations, intermediateCat} = req.body.assign;
    const nom1 = await _getNomination(cat1, 1);
    const nom2 = await _getNomination(cat2, 2);
    const nom3 = await _getNomination(cat3, 3);
    const nominationIds: string[] = [];
    nom1.forEach(val => {
        if(nominationIds.indexOf(val._id)<0) {
            nominationIds.push(val._id);
        }
    });
    nom2.forEach(val => {
        if(nominationIds.indexOf(String(val._id))<0) {
            nominationIds.push(String(val._id));
        }
    });
    nom3.forEach(val => {
        if(nominationIds.indexOf(String(val._id))<0) {
            nominationIds.push(String(val._id));
        }
    });
    nominations.forEach((val: string) => {
        if(nominationIds.indexOf(val)<0) {
            nominationIds.push(val);
        }
    });
    const userId = req.body.jury;
    if (!isValidObjectId(userId)) {
        return res.status(400).json({msg: "Jury user id is required"});
    }

    const jury = await Juries.findOne({_id: userId}).lean();
    if (!jury) {
        return res.status(400).json({msg: 'Jury not found'});
    }

    if (!jury.phone) {
        return res.status(400).json({msg: 'Jury phone no not exist'});
    }
    const juryUser = await Users.findOne({phone: (jury.phone.toString())});
    if (!juryUser) {
        return res.status(400).json({msg: 'Please register jury as user'});
    }

    if (juryUser.role !== 'jury') {
        return res.status(400).json({msg: 'Can only be assigned to the user with role jury'});
    }

    if (!Array.isArray(nominationIds)) {
        return res.status(400).json({msg: "nomination ids list is required"});
    }

    try {
        let assign = await NominationAssignment.findOne({userId: juryUser._id});
        if (!assign) {
            assign = new NominationAssignment({userId: juryUser._id});
        }
        assign.nominationId = nominationIds;
        assign.cat1=cat1;
        assign.cat2=cat2;
        assign.cat3=cat3;
        assign.intermediateCat=intermediateCat;
        await assign.save();
        return res.status(200).json({ status: "success" });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: assignNominationTojury: ${error}`
        });
        return res.status(400).json({ msg: "Unable to process the request" });
    }
}

async function getNominationAssignment(req: Request, res: Response) {
    const userId = req.params.id;
    if (!isValidObjectId(userId)) {
        return res.status(400).json({msg: "Jury user id is required"});
    }

    const jury = await Juries.findOne({_id: userId}).lean();
    if (!jury) {
        return res.status(400).json({msg: 'Jury not found'});
    }

    if (!jury.phone) {
        return res.status(400).json({msg: 'Jury phone no not exist'});
    }
    const juryUser = await Users.findOne({phone: (jury.phone.toString())});
    if (!juryUser) {
        return res.status(400).json({msg: 'Please register jury as user'});
    }

    if (juryUser.role !== 'jury') {
        return res.status(400).json({msg: 'Can only be assigned to the user with role jury'});
    }

    try {
        let assign = await NominationAssignment.findOne({userId: juryUser._id});
        return res.status(200).json({ status: "success", assign: assign });
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: adminController: assignNominationTojury: ${error}`
        });
        return res.status(400).json({ msg: "Unable to process the request" });
    }
}

async function _getNomination(query: any[], level: number): Promise<INominee[]> {
    for (let i = 0; i < query.length; i++) {
        query[i] = Types.ObjectId(query[i]);
    }
    
    if (level === 1) {
        const list = await Nominee.aggregate([
            { $match: {productCategory: {$in: query}, archive: false}},
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" } },
            { $match: { "award.show": true } },
        ]);
        return list;
    }

    if (level === 2) {
        const list = await Nominee.aggregate([
            { $match: {productSubCategory: {$in: query}, archive: false}},
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" } },
            { $match: { "award.show": true } },
        ]);
        return list;
    }

    if (level === 3) {
        const list = await Nominee.aggregate([
            { $match: {productSubSubCategory: {$in: query}, archive: false}},
            { $lookup: { from: "awardList", localField: "awardCategory", foreignField: "_id", as: "award" } },
            { $match: { "award.show": true } },
        ]);
        return list;
    }
    return [];
}

export default {
    nominationByHierarchicalCategory,
    nominationByFlatCategory,
    getNomination,
    getNominationAssignment,
    getJuryData,
    getNominationByproductId,
    updateNomination,
    loginAdminUser,
    exportCategory,
    assignNominationTojury,
}