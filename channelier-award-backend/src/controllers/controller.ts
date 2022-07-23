import { Request, Response, NextFunction } from 'express';
import { IUser, Users } from '../models/user';
import { Queries } from '../models/userQueries';
import { AwardList } from '../models/award';
import { ProductList } from '../models/product';
import { Nominee } from '../models/nomineeProducts';
import { Payment } from '../models/payment';
import { sendMail } from './mailerService';
import { Juries } from '../models/jury';
import { ManagePolling } from '../models/managePolling';
import { Lead } from '../models/lead';
import { Campaigns } from '../models/user';
import { Blogs } from '../models/blog';
import { OTPRecord } from '../models/otpService';
import { Nomination } from '../models/nomination';
import { Team } from '../models/teamProfile';
var webp = require("webp-converter");
webp.grant_permission();
var fs = require("fs");
import jwt from 'jsonwebtoken';

//Blogs
// import sharp from 'sharp';
import mongoose from "mongoose";
var fs = require("fs");
import _ from 'underscore';
import config from '../config/config';
import request from 'request';
import { parseInt } from 'lodash';
import logger from '../logger';
import { createHmac } from 'crypto';
import { UserProfile } from '../models/userProfile';
import { level } from 'winston';



async function userLogin(req: Request, res: Response) {
    let result: any = { user: {}, token: '' };
    // const newHash = createHmac('sha256', config.crypto.key).update(req.body.phone).digest('hex');

    // if (req.body.hash !== newHash) {
    //     return res.json({ status: -1, msg: 'Unable to logged in' });
    // }
    switch (true) {
        case (req.body.query == 'update-number'):
            result = await Users.update({ _id: req.body.id }, { phone: req.body.phone });
            break;
        case (req.body.query == 'insert'):
            const find = await Users.find({ phone: req.body.phone });
            if (find.length === 0) {
                const userObj = new Users({ phone: req.body.phone,tandc:"off" });
                result.user = await userObj.save();
            } else {
                result.user = find[0];
            }
            const token = jwt.sign({ id: result.user._id, phone: result.user.phone, role: result.user.role ? result.user.role : 'user' }, config.jwtKey.secret);
            result.token = token;
            if (!result.user.role) {
                result.user.role = 'user';
            }
            console.log(token, '\n', result)
            break;
        default:
            break;
    }
    res.json(result);
}

async function createUser(req: Request, res: Response) {

    const requiredFields = ['name', 'email', 'companyName'];
    
    const {body, file} = req;
    let formattedData = body
    if(formattedData.data !== undefined){
        formattedData = formattedData.data
    }

    const ip = req.ip;
    console.log("ddd",formattedData);
    
    let emptyField: any = [];
    formattedData['ip'] = ip;

    // If Terms and conditions are not applied
    if (formattedData['tandc'] != 'on') {
        res.json({ error: 1 });  
    } 
    
    else {

        for (let index = 0; index < requiredFields.length; index++) {
            const element = requiredFields[index];
            if (typeof formattedData[element] == 'undefined') {
                emptyField = element;
            }
        }
        
        if (emptyField.length == 0) {

            if (file) {
                console.log(file);
                const url = 'https://award.channelier.com'
                formattedData['companyLogo'] =  url + '/uploads/' + file.filename;
            }
            else {
                const url = 'https://award.channelier.com'
                formattedData['companyLogo'] =  url + '/uploads/default-image.jpg';
            }

            try {
                const result = await Users.findByIdAndUpdate({ _id: req.body.id }, formattedData,{new:true});
                res.json(result);
            }
            catch (error) {
                console.log(error);
            }
        } 
        
        // Required fields are missing
        else {
            res.json({ error: 2 }); 
        }
    }
}

async function updateUserProfile(req: Request, res: Response) {

    const requiredFields = ['name', 'email', 'companyName'];
    
    const {body, file} = req;
    let formattedData = body
    if(formattedData.data !== undefined){
        formattedData = formattedData.data
    }

    const ip = req.ip;
    console.log("ddd",formattedData);
    
    let emptyField: any = [];
    formattedData['ip'] = ip;

    // If Terms and conditions are not applied
    if (formattedData['tandc'] != 'on') {
        res.json({ error: 1 });  
    } 
    
    else {

        for (let index = 0; index < requiredFields.length; index++) {
            const element = requiredFields[index];
            if (typeof formattedData[element] == 'undefined') {
                emptyField = element;
            }
        }
        
        if (emptyField.length == 0) {

            if (file) {
                console.log(file);
                const url = 'https://award.channelier.com'
                formattedData['companyLogo'] =  url + '/uploads/' + file.filename;
            }
    
            try {
                const oldDetails = await Users.find({ _id: req.body.id });
                console.log(oldDetails);

                if (oldDetails[0].phone !== req.body.phone) {
                    console.log("Different Phone Number");
                    return res.json({
                        message: 'Different Phone Number',
                        id: req.body.id,
                        isMobileUpdated: true,
                        phone: req.body.phone,
                        isNewNumberVerified: false
                    })
                }
                else {
                    console.log("Same Phone Number");

                    try {
                        const result = await Users.findByIdAndUpdate({ _id: req.body.id }, formattedData, { new: true });
                        res.json(result);
                    }
                    catch (error) {
                        console.log(error);
                    }
                }
            }
            catch (error) {
                console.log(error);
            }
        } 
        
        // Required fields are missing
        else {
            res.json({ error: 2 }); 
        }
    }
}

async function saveQuery(req: Request, res: Response) {
    const requiredFields = ['userName', 'userEmail', 'userContact', 'query'];
    const formattedData: any = {};


    let emptyField: any = [];
    for (let index = 0; index < req.body.length; index++) {
        const element = req.body[index];
        formattedData[element['name']] = element['value'];
    }

    for (let index = 0; index < requiredFields.length; index++) {
        const element = requiredFields[index];
        if (typeof formattedData[element] == 'undefined') {
            emptyField = element;
        }

    }


    if (emptyField.length == 0) {
        let queryObj = new Queries(formattedData);
        let result = await queryObj.save();
        res.json(result);
    } else {
        res.json({ error: 2 }); // required filled are missing
    }

}

async function saveAward(req: Request, res: Response) {
    let queryObj = new AwardList(req.body);
    let result = await queryObj.save();
    res.json(result);
}

async function actionByAdmin(req: Request, res: Response) {

    const result = await Users.updateOne({ _id: req.body.recordId }, req.body.doc);
    res.json(result);
}

async function saveProduct(req: Request, res: Response) {
    let queryObj = new ProductList(req.body);
    let result = await queryObj.save();
    res.json(result);
}



async function getUsers(req: Request, res: Response) {
    let searchQuery: any = {};
    let dateCriteria = {};
    let limit = req.body.limit;
    let skip = req.body.skip;
    let value: string = req.body.sort;
    let search: string = req.body.searchText;



    if (req.body.start) {
        var startDate = new Date(req.body.start);
        var endDate = new Date(req.body.enddate);
        endDate.setHours(23, 59);
        dateCriteria = { '$gte': startDate, '$lte': endDate };
        searchQuery['createdAt'] = dateCriteria;
    }

    if (req.body.archive) {
        searchQuery["archive"] = { $eq: 1 }
    } else {
        searchQuery["archive"] = { $ne: 1 }
    }

    let users;
    let totalRecords;
    let totalUser;
    let aggregateOps: any;
    aggregateOps = {
        $match: {
            $and: [searchQuery,
                {
                    $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { companyName: { $regex: search, $options: 'i' }},{ leadAssigned: { $regex: search, $options: 'i' }},{ leadStatus: { $regex: search, $options: 'i' }},
                    { phone: { $regex: search, $options: 'i' } }]
                }
            ]
        }
    }
    if (search) {
        totalRecords = await Users.aggregate([
            aggregateOps, { $count: 'count' }
        ])

        if (totalRecords.length) {
            totalUser = totalRecords[0].count
        } else {
            totalUser = 0;
        }

        users = await Users.aggregate([
            aggregateOps,
            {
                $lookup: {
                    from: "Campaigns",
                    localField: "ip",
                    foreignField: "fields.ip",
                    as: "campaign"
                }
            },
            {$project: {_id: 1, name: 1, email: 1, phone: 1, createdAt: 1, updatedAt: 1, campaign: 1, companyName: 1, website: 1, ip: 1, tandc: 1, comment: 1, status: 1, archive: 1, role: 1,leadAssigned:1,leadStatus:1}},
            req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },
        ]).skip(skip).limit(limit);



    } else {
        totalUser = await Users.find(searchQuery).count();

        users = await Users.aggregate([
            { $match: searchQuery },
            {
                $lookup: {
                    from: "Campaigns",
                    localField: "ip",
                    foreignField: "fields.ip",
                    as: "campaign"
                }
            },
            {$project: {_id: 1, name: 1, email: 1, phone: 1, createdAt: 1, updatedAt: 1, campaign: 1, companyName: 1, website: 1, ip: 1, tandc: 1, comment: 1, status: 1, archive: 1, role: 1,leadAssigned:1,leadStatus:1}},
            req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },
        ]).skip(skip).limit(limit);

    }

    res.json({ users, totalUser });
}
async function getOTPUsers(req: Request, res: Response) {
    let query = {};
    let limit = 0;
    let skip = 0;


    if (req.body) {
        limit = req.body.limit;
        skip = req.body.skip;
    }
    const count = await OTPRecord.find({}).count(query);
    const users = await OTPRecord.find(query)
        .skip(skip)
        .limit(limit)
        .sort({ "createdAt": -1 });
    res.json({ users, count });
}

async function getUserNewSlider(req: Request, res: Response) {


    const limit = parseInt(req.params.limit);
    const currentPage = parseInt(req.params.page);
    const count = await Nomination.find({ "archive": false }).count()
    const sliderData = await Nomination
        .find({ "archive": false })
        .sort({ "sorting": 1 })

    // const sliderData = await Nomination
    //     .find({ "archive": false })
    //     .skip(limit*(currentPage-1))
    //     .limit(limit)
    //     .sort({ "sorting": 1 });



        
    res.json({ sliderData, count });
}

async function getUserNewSliderWithNomination(req: Request, res: Response) {

    const limit = parseInt(req.params.limit);
    const currentPage = parseInt(req.params.page);
    const category = req.params.category;
    const query: any = {};
    query["archive"] = false;
    if (category != "all" && category != 'All Category') {
        query["category"] = category;
    }
    const count = await Nomination.find(query).count();
    const sliderData = await Nomination
        .find(query)
        .skip(limit * (currentPage - 1))
        .limit(limit)
        .sort({ "sorting": 1 })






    res.json({ sliderData, count });
}


async function getAllproductCategory(req: Request, res: Response) {
    const cateogry = await ProductList.find({ level: "2" }, "productName");
    res.json(cateogry);

}

async function getUserSlider(req: Request, res: Response) {
    let pageNo = parseInt(req.params.pageNumber);
    let count = await Users.find({ archive: { $ne: 1 } }).count();
    let slideItems: any = [];




    Nominee.aggregate([
        {
            $match: { "payment": true }
        },
        {
            '$lookup':
            {
                from: 'Users',
                localField: 'user',
                foreignField: '_id',
                as: 'user'
            }
        },
        {
            $project: {
                companyName: "$user.companyName",
                companyLogo: "$user.companyLogo",
                archive: "$user.archive",
                productName: 1,

            }
        },



        { $skip: (16 * (pageNo - 1)) },
        { $limit: 16 }
    ], function (err: any, userList: any) {
        if (err) console.log(err);


        const dataCount = userList.length;


        while (userList.length > 0) {


            let items = userList.splice(0, 2);

            let itemFirst = '';

            for (let index = 0; index < items.length; index++) {
                if (items[index].companyLogo.length > 0) {


                    const element = items[index];

                    itemFirst = `<div class="nomination-box">
                     <img src="${element['companyLogo']}" alt="${element['companyName']}">
                     <div class="nomination-detail">
                        <h2>${element['companyName']}</h2>
                     </div>
               </div>`;
                    slideItems.push(itemFirst);

                }
            }


        }
        res.json({ count: dataCount, data: slideItems, currentPage: pageNo });



    });

}

async function getQueries(req: Request, res: Response) {

    let dateCriteria = {};
    let query: any = {};
    let limit = req.body.limit;
    let skip = req.body.skip
    let value: string = req.body.sort;
    let search: string = req.body.searchText;

    if (req.body.start) {
        var startDate = new Date(req.body.start);
        var endDate = new Date(req.body.enddate);
        endDate.setHours(23, 59);
        dateCriteria = { '$gte': startDate, '$lte': endDate };
        query['createdAt'] = dateCriteria;
    }

    if (req.body.archive) {

        query['archive'] = 1;
    } else {

        query['archive'] = { $ne: 1 };
    }

    let result;
    let totalRecords;
    let count;
    let aggregateOps: any;
    aggregateOps = {
        $match: {
            $and: [query,
                {
                    $or: [{ userName: { $regex: search, $options: 'i' } }, { userEmail: { $regex: search, $options: 'i' } }, { userContact: { $regex: search, $options: 'i' } },{ leadAssigned: { $regex: search, $options: 'i' }},{ leadStatus: { $regex: search, $options: 'i' }},
                    { query: { $regex: search, $options: 'i' } }, { comment: { $regex: search, $options: 'i' } }, { status: { $regex: search, $options: 'i' } }]
                }
            ]
        }
    }

    if (search) {
        totalRecords = await Users.aggregate([
            aggregateOps, { $count: 'count' }
        ])

        if (totalRecords.length) {
            count = totalRecords[0].count
        } else {
            count = 0;
        }

        result = await Queries.aggregate([
            aggregateOps,
            req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },
        ]).skip(skip).limit(limit);
    } else {
        count = await Queries.find(query).count();
        result = await Queries.aggregate([
            { $match: query },
            req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },
        ]).skip(skip).limit(limit);
    }



    res.json({ result, count });
}

async function getAwards(req: Request, res: Response) {
    const awardList = await AwardList.find({ "show": true });
 
    
    res.json(awardList);
}

async function getProducts(req: Request, res: Response) {
    const productList = await ProductList.find({});
    res.json(productList);
}

async function saveNominee(req: Request, res: Response) {

    let obj: any = {};
    if (req.body.level == "1") {
        obj = {
            user: req.body.user,
            awardCategory: req.body.awardId,
            cart: true,
            archive: false
        }
    } else {
        obj = {
            user: req.body.user,
            awardCategory: req.body.awardId,
            archive: false
        }
    }
  
    const nominee = new Nominee(obj);
    const result = await nominee.save();
    if (Object.keys(result).length > 0) {
        let productList: any = [];
        if (req.body.level == "1") {
            productList = null;
        } else {
            productList = await ProductList.find({ "level": "2" });
        }
        res.json({ awardLevel: req.body.level, products: productList, nomineeId: result._id })
    } else {
        res.json({ err: 1 })
    }
}

async function getUserWithNominee(req: Request, res: Response) {
    const response = await Nominee.find({}).populate('user').populate('awardCategory').populate('productCategory');
    res.json(response);
}

//added for award 2022
async function getNominationById(req:Request,res:Response){
    const nominationById=await Nominee.findById(req.body)
    res.json(nominationById)
}
async function getUsersById(req:Request,res:Response){
    return res.json(await Users.findById(req.body))
}
//till here

async function getUserStatus(req: Request, res: Response) {
    let pageNo = parseInt(req.params.pageNumber);
    const count = await Nominee.find(
        {
            user: req.body.userId,
            archive: false,
            productSubSubCategory:{$exists:true},
            payment:true,
            // $or: [{ cart: true }, { payment: true }]
        }
    ).count();
    const response = await Nominee.aggregate([
        {
            $match: {
                user: mongoose.Types.ObjectId(req.body.userId),
                archive: false,
                productSubSubCategory:{$exists:true},
                payment:true,
                // $or: [{ cart: true }, { payment: true }]
            }
        }, {
            $lookup: {
                from: "awardList",
                localField: "awardCategory",
                foreignField: "_id",
                as: "award"
            }
        },
        {
            $lookup: {
                from: "productList",
                localField: "productCategory",
                foreignField: "_id",
                as: "productCategory"
            }
        },
        {
            $lookup: {
                from: "productList",
                localField: "productSubCategory",
                foreignField: "_id",
                as: "productSubCategory"
            }
        },
        {
            $lookup: {
                from: "productList",
                localField: "productSubSubCategory",
                foreignField: "_id",
                as: "productSubSubCategory"
            }
        },
        {
            $lookup: {
                from: "paymentDetails",
                localField: "paymentDetail",
                foreignField: "orderId",
                as: "Payment"
            }
        }, {
            $project: {
                _id: 1,
                awardName: "$award.awardName",
                productCategory: "$productCategory.productName",
                productSubCategory: "$productSubCategory.productName",
                productSubSubCategory: "$productSubSubCategory.productName",
                productName: 1,
                txn: "$Payment.orderId",
                paymentStatus: "$Payment.paymentStatus",
                payDate: "$Payment.createdAt",
                cart: 1,
                archive: 1,
                createdAt: 1,
                answerSubmitted:1,
                payment: 1
            }
        }
    // ]).skip(6 * (pageNo - 1)).limit(6);
        ])
    res.json({ data: response, count: count, currentPage: pageNo });
}

async function updateNomineeDetails(req: Request, res: Response) {
    if(req.body.productlevel==="-1"){
        await Nominee.update({ _id: req.body.nomId },{productName:req.body.ProductName});
        return res.json("Product name updated")
    }
    const levelObj: any = {};
    levelObj["2"] = "productCategory";
    levelObj["3"] = "productSubCategory";
    levelObj["4"] = "productSubSubCategory";
    let update: any = {};
    update[levelObj[req.body.productlevel]] = req.body.productId;
    /* Commented @Shivam Nomination Level count mismatch issue(28/7/2021) */
    // if (req.body.productlevel == req.body.awardLevel) {
    //     update["cart"] = true;
    // }
    const result = await Nominee.update({ _id: req.body.nomId }, update);
    let query: any = {};
    query['parentId'] = req.body.productId;
    let productList = await ProductList.find(query);
    if (productList.length === 0) {
        await Nominee.update({ _id: req.body.nomId }, { cart: true });
    }
    res.json({ awardLevel: req.body.awardLevel, products: productList, nomineeId: req.body.nomId })
    // }
}

async function updateAward(req: Request, res: Response) {
    const result = await AwardList.update({ _id: req.body.id }, req.body.queryObject);
    res.json(result);
}

async function updateProduct(req: Request, res: Response) {
    const result = await ProductList.update({ _id: req.body.id }, req.body.queryObject);
    res.json(result);
}

async function deleteProduct(req: Request, res: Response) {
    const result = await ProductList.findOneAndRemove({ _id: req.body.id });
    res.json(result);
}

async function fetchCartData(req: Request, res: Response) {
    const response: any = await Nominee.find({ user: req.body.id, cart: true,productSubSubCategory:{$exists:true},productName:{$exists:true}}).populate('awardCategory');
    let totalAmount: number = 0;
    let nominationsIds: any = [];
    for (let index = 0; index < response.length; index++) {
        const element: any = response[index];
        totalAmount = totalAmount + parseInt(element.awardCategory.amount);

        nominationsIds.push(element['_id']);
        let productCategoryId: any = "";
        switch (true) {
            case (typeof element.productSubSubCategory === 'object'):
                if (element["productSubSubCategory"]) {
                    productCategoryId = element["productSubSubCategory"];
                }
                break;
            case (typeof element.productSubCategory === 'object'):
                if (element["productSubCategory"]) {
                    productCategoryId = element["productSubCategory"];
                }
                break;
            case (typeof element.productCategory === 'object'):
                if (element["productCategory"]) {
                    productCategoryId = element["productCategory"];
                }
                break;
            default:
                productCategoryId = "FMCG"; //FMCG category
                break;
        }

        let temp: any;
        if (productCategoryId == 'FMCG') {
            temp = await ProductList.find({ level: "1" });
        } else {
            temp = await ProductList.findById(productCategoryId);
        }

        if (productCategoryId == 'FMCG') {
            response[index]["_doc"]["productCategoryName"] = temp[0]['productName'];
        } else {
            response[index]["_doc"]["productCategoryName"] = temp['productName'];
        }

    }

    let firstTimeDiscount: any = 0;
    try{
        let currentYearAwards = await Nominee.find(
            {
                user: req.body.id,
                year: new Date().getFullYear()
            }
        )
        
        if(currentYearAwards.length !== 0){
            try{
                let paidAwards = await Nominee.find(
                    {
                        user: req.body.id,
                        payment: true,
                        year: new Date().getFullYear()
                    }
                )
                if(paidAwards.length !== 0){
                    firstTimeDiscount = 0;
                }
                else {
                    firstTimeDiscount = 20000;
                }
            }
            catch (error){
                console.log(error);
            }

        }
        else{
            firstTimeDiscount = 20000;
        }
    }
    catch(error){
        console.log(error);
    }

    totalAmount = totalAmount - firstTimeDiscount;
    let gstAdded = (totalAmount * 0.18);
    res.json({ result: response, nominations: nominationsIds, amount: (totalAmount + gstAdded) * 100, GST: gstAdded, totalwithoutgst: totalAmount * 100, firstNomineeDiscount: firstTimeDiscount });
}

async function removeItemFormCart(req: Request, res: Response) {
    console.log(req.body.nomineeId);
    
    const result = await Nominee.updateMany({ _id:{$in:req.body.nomineeId}}, { cart: false, archive: true });
    if (result.n > 0) {
        res.json(true);
    }

}

async function archiveNomination(req: Request, res: Response) {
    let updateBody = {};
    if (req.body.archive != 'archive') {
        updateBody = { archive: true }
    } else {
        if (req.body.archive == 'archive') {

            updateBody = { archive: false }
        }
    }
    const result = await Nominee.update({ _id: req.body.nomineeId }, updateBody);
    if (result.n > 0) {
        res.json(true);
    }

}

async function checkout(req: Request, res: Response) {
    let data: any = Object.keys(req.body);
    for (let index = 0; index < data.length; index++) {
        const element = data[index];
        let temp = await Nominee.update({ _id: element }, { productName: req.body[element] });

    }
    res.json(true);
}

async function comfirmation(req: Request, res: Response) {
    const response: any = await Nominee.find({ user: req.body.userId, cart: true }).populate('user');
    for (let index = 0; index < response.length; index++) {
        const element = response[index]["_id"];
        await Nominee.update({ _id: element }, { payment: true, cart: false });
    }
    await sendMail(response[0]['user']['email'], response[0]['user']['name']);
    res.json(true);
}

async function checkUserRegistrationData(req: Request, res: Response) {
    const checkDuePayment = await Nominee.find({ user: req.body.id, cart: true, payment: { $exists: false } }).lean();
    const response: any = await Users.find({ _id: req.body.id }).lean();
    response[0]['duePayment'] = checkDuePayment.length;
    res.json(response);
}

// async function addNewJury(req: Request, res: Response) {
//     let files = JSON.parse(JSON.stringify(req.files));
//     if (typeof (files.brand) != "undefined") {
//         sharp(files['brand'][0]['path']).resize(300, 62, {
//             fit: sharp.fit.contain,
//             background: { r: 255, g: 255, b: 255 }
//         }).toFile(`${config.filePath.resizeImg}${files['brand'][0]['filename']}`, (err, resizeImage) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 //console.log(resizeImage);
//             }
//         })
//     } if (typeof (files.file) != "undefined") {
//         sharp(files['file'][0]['path']).resize(300, 300, {
//             fit: sharp.fit.contain,
//             background: { r: 255, g: 255, b: 255 }
//         }).toFile(`${config.filePath.resizeImg}${files['file'][0]['filename']}`, (err, resizeImage) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(resizeImage);
//             }
//         })
//     }
//     let obj = {
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         description: req.body.text,
//         sort: parseInt(req.body.sort),
//         file: files.file[0]['filename'],
//         brand: (typeof (files.brand) != "undefined") ? files.brand[0]['filename'] : null,
//         designation: req.body.designation,
//         website: req.body.website,
//         year: req.body.year.split(','),
//     }
//     const jury = new Juries(obj);
//     const user: IUser = new Users({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         website: req.body.website,
//         role: 'jury'
//     })

//     const result1 = await jury.save();
//     const result2 = await user.save();
//     res.json(result1);
// }

// async function updateJury(req: Request, res: Response) {
//     let files = JSON.parse(JSON.stringify(req.files));

//     let obj: any = {};
//     obj['year'] = req.body.year.split(',');
//     if (_.isEmpty(files)) {
//         obj['name'] = req.body.name;
//         obj['email'] = req.body.email;
//         obj['phone'] = req.body.phone;
//         obj['description'] = req.body.text;
//         obj['designation'] = req.body.designation;
//         obj['sort'] = req.body.sort;
//         obj['website'] = req.body.website;
//         let temp = await Juries.update({ _id: req.body.id }, obj);
//         res.json(temp);
//     } else {
//         if (typeof (files.brand) != "undefined") {
//             obj['brand'] = files['brand'][0]['filename'];
//             sharp(files['brand'][0]['path']).resize(300, 62, {
//                 fit: sharp.fit.contain,
//                 background: { r: 255, g: 255, b: 255 }
//             }).toFile(`${config.filePath.resizeImg}${files['brand'][0]['filename']}`, (err, resizeImage) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     // console.log(resizeImage);
//                 }
//             })
//         } if (typeof (files.file) != "undefined") {
//             obj['file'] = files['file'][0]['filename'];
//             sharp(files['file'][0]['path']).resize(300, 300, {
//                 fit: sharp.fit.contain,
//                 background: { r: 255, g: 255, b: 255 }
//             }).toFile(`${config.filePath.resizeImg}${files['file'][0]['filename']}`, (err, resizeImage) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     //console.log(resizeImage);
//                 }
//             })
//         }
//         obj['name'] = req.body.name;
//         obj['email'] = req.body.email;
//         obj['phone'] = req.body.phone;
//         obj['description'] = req.body.text;
//         obj['designation'] = req.body.designation;
//         obj['sort'] = req.body.sort;
//         obj['website'] = req.body.website;
//         let temp = await Juries.update({ _id: req.body.id }, obj);
//         res.json(temp);
//     }
// }

async function getJuryForAdmin(req: Request, res: Response) {
    let query: any;

    let limit = req.body.limit;
    let skip = req.body.skip
    let year = req.body.year;
    let value: string = req.body.sort;

    if (req.body.archive) {
        query = { archive: 1 };
    } else {
        query = { archive: { $ne: 1 } };
    }


    if (req.body.year) {
        if (year == '2020' || year == '2021' || year=='2022') {
            query.year = year
        }

    }else{
        query.year = String(new Date().getFullYear())
    }
    let result
    const count = await Juries.find(query).count();
    if (req.body.sort) {
        if (req.body.orderBy === "ASC") {
            result = await Juries.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ [value]: 1 });;
        } else {
            result = await Juries.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ [value]: -1 });;
        }
    } else {
        result = await Juries.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });;
    }


    res.json({ result, count });
}

async function getJury(req: Request, res: Response) {

    let pageNo = parseInt(req.params.pageNumber);
    let y = req.params.year;
    let count = await Juries.find({ "year": y }).count();
    const JuryList = await Juries.find({ "year": y }).skip(8 * (pageNo - 1)).limit(8).sort({ "sort": 1 });

    res.json({ count: count, data: JuryList, currentPage: pageNo });

}

async function getBlogList(req: Request, res: Response) {
    let pageNo = parseInt(req.params.pageNumber);
    let count = await Blogs.find({}).count();
    const BlogsList = await Blogs.find({}, 'name summery file slug createdAt').skip(8 * (pageNo - 1)).limit(8).sort({ "sort": 1 });
    res.json({ count: count, data: BlogsList, currentPage: pageNo });
}



async function getSliderJury(req: Request, res: Response) {
    let pageNo = parseInt(req.params.pageNumber);
    let count = await Juries.find({}).count();
    let slideItems: any = [];
    let logoitems: any = [];
    const JuryList = await Juries.find({}).skip(16 * (pageNo - 1)).limit(16).sort({ "sort": 1 });
    const dataCount = JuryList.length;
    while (JuryList.length > 0) {
        let itemFirst = '';
        let logoFirst = '';
        let items = JuryList.splice(0, 4);

        for (let index = 0; index < items.length; index++) {
            const element: any = items[index];
            itemFirst += `<div class="col-sm-3">
            <div class="jury-box">
            <img class="mob-view" src="/uploads/thumbnails-${element['file']}" alt="${element['name']}">
            <div class="jury-detail">
                <h3>${element['name']}</h3>
                <p>${element['description']}</p>
                <img class="logo-mob-view"  src="/uploads/thumbnails-${element['brand']}" alt="${element['description']}">
            </div>
            </div>
        </div>`;

        }
        slideItems.push(itemFirst);
        for (let index = (items.length - 1); index >= 0; index--) {
            const element = items[index];
            logoFirst += `<div class="col-sm-3">
                <div class="jury-designation">
                                    <img src="/uploads/thumbnails-${element['brand']}" alt="${element['description']}">
                                    </div>
                                </div>`;
        }
        logoitems.push(logoFirst);
    }
    res.json({ count: dataCount, data: slideItems, logo: logoitems, currentPage: pageNo });
}



async function deleteJury(req: Request, res: Response) {
    const result = await Juries.findOneAndRemove({ _id: req.body.id });
    res.json(result);
}

async function getUserNominations(req: Request, res: Response) {
    let query: any = {}; let dateCriteria: any = {}; let pageTotal = 0; let cartQuery: any = {}; let checkoutQuery: any = {};
    let limit = req.body.limit;
    let skip = req.body.skip;
    let type = req.body.type; let nomineeTotal = 0
    let cartTotal = 0;
    let checkoutTotal = 0;
    let archiveTotal = 0;
    let notFilledUndefined:any={}
    let searchQuery: any = {};
    if (req.body.search) {
        searchQuery = { '$regex': req.body.search, '$options': 'i' }
    }
    let value: string = req.body.sort;
    if (value === "awardName") {
        value = "award.awardName"
    }
    else if (value === "productCatName") {
        value = "productCat.productName"
    }
    else if (value === "companyName") {
        value = "user.companyName"
    }


    if (req.body.start) {
        var startDate = new Date(req.body.start);
        var endDate = new Date(req.body.enddate);
        endDate.setHours(23, 59);


        dateCriteria = { '$gte': startDate, '$lte': endDate };
        query['createdAt'] = dateCriteria;
        cartQuery['createdAt'] = dateCriteria;
        checkoutQuery['createdAt'] = dateCriteria;
        nomineeTotal = await Nominee.find({ 'createdAt': dateCriteria }).count();
    } else {
        nomineeTotal = await Nominee.find({}).count();
    }

    if (typeof type != "undefined") {

        if (type != '' && type != '-1') {
            if (type == 'archive') {
                query[type] = true;
                cartQuery['cart'] = true;
                cartQuery['archive'] = false;
                checkoutQuery['payment'] = true;
                checkoutQuery['archive'] = false;
                cartTotal = await Nominee.find(cartQuery).count();
                checkoutTotal = await Nominee.find(checkoutQuery).count();
            } else {
                query[type] = true;
                query['archive'] = false;
                cartQuery['cart'] = true;
                cartQuery['archive'] = false;
                checkoutQuery['payment'] = true;
                checkoutQuery['archive'] = false;
                cartTotal = await Nominee.find(cartQuery).count();
                checkoutTotal = await Nominee.find(checkoutQuery).count();
            }

        } else {

            query["archive"] = false;
            cartQuery['cart'] = true;
            cartQuery['archive'] = false;
            checkoutQuery['payment'] = true;
            checkoutQuery['archive'] = false;
            cartTotal = await Nominee.find(cartQuery).count();
            checkoutTotal = await Nominee.find(checkoutQuery).count();
        }
    } else {
        query["archive"] = false;
        cartQuery['cart'] = true;
        cartQuery['archive'] = false;
        checkoutQuery['payment'] = true;
        checkoutQuery['archive'] = false;
        cartTotal = await Nominee.find(cartQuery).count();
        checkoutTotal = await Nominee.find(checkoutQuery).count();

    }


    if (req.body.userId != "") {


        var id = mongoose.Types.ObjectId(req.body.userId);
        query["user"] = id;
    }
    if(req.body.answerSubmitted==="true") {
        notFilledUndefined['answerSubmitted']={$exists:true};
        query['$and']=[{answerSubmitted:true},notFilledUndefined]
       
    }
    else if(req.body.answerSubmitted==="false") {
        notFilledUndefined['answerSubmitted']={$exists:false};
        query['$or']=[{answerSubmitted:false},notFilledUndefined]
       
        
    }

    if(req.body.orderReceived==="true") {
        query['orderReceived']=true;
    }
    else if(req.body.orderReceived==="false") {
        query['orderReceived']=false;
    }

    let response: any;

    let totalRecords: any


    response = await Nominee.aggregate([

        {
            $match: query
        },
        {
            $lookup: {
                from: "Users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $lookup: {
                from: "awardList",
                localField: "awardCategory",
                foreignField: "_id",
                as: "award"
            }
        },
        {
            $lookup: {
                from: "productList",
                localField: "productCategory",
                foreignField: "_id",
                as: "productCat"
            }
        }, {
            $lookup: {
                from: "productList",
                localField: "productSubCategory",
                foreignField: "_id",
                as: "productSubCat"
            }
        }, {
            $lookup: {
                from: "productList",
                localField: "productSubSubCategory",
                foreignField: "_id",
                as: "productSubSubCat"
            }
        },
        {
            $project: {
                _id:1,
                awardCategory: 1,
                productCategory: 1,
                productSubCategory:1,
                productSubSubCategory: 1,
                paymentDetail: 1,
                productName: 1,
                payment : 1,
                cart: 1,
                archive:1,
                votes: 1,
                status: 1,
                comment: 1,
                employeeName: 1,
                answerSubmitted: 1,
                orderReceived: 1,
                juryChecked: 1,
                totalMarks: 1,
                createdAt: 1,
                updatedAt: 1,
                user: {_id: 1, name: 1, email: 1, phone: 1, createdAt: 1, updatedAt: 1, campaign: 1, companyName: 1, website: 1, ip: 1, tandc: 1, comment: 1, status: 1, archive: 1, role: 1},
                award: 1,
                productCat: 1,
                productSubCat: 1,
                productSubSubCat: 1,
            }
        },
        Object.keys(searchQuery).length > 0 ?
            {
                $match: {
                    $or: [
                        { "productName": searchQuery },
                        { "user.companyName": searchQuery },
                        { "award.awardName": searchQuery },
                        { "productCat.productName": searchQuery },
                        { "productSubCat.productName": searchQuery },
                        { "productSubSubCat.productName": searchQuery }
                    ]
                }
            } : { $match: {} },
        req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },

    ]).collation({ locale: "en" }).skip(skip).limit(limit)



    totalRecords = await Nominee.aggregate([

        {
            $match: query
        },
        {
            $lookup: {
                from: "Users",
                localField: "user", foreignField: "_id", as: "user"
            }
        },
        {
            $lookup: {
                from: "awardList",
                localField: "awardCategory",
                foreignField: "_id",
                as: "award"
            }
        },
        {
            $lookup: {
                from: "productList",
                localField: "productCategory",
                foreignField: "_id",
                as: "productCat"
            }
        }, {
            $lookup: {
                from: "productList",
                localField: "productSubCategory",
                foreignField: "_id",
                as: "productSubCat"
            }
        }, {
            $lookup: {
                from: "productList",
                localField: "productSubSubCategory",
                foreignField: "_id",
                as: "productSubSubCat"
            }
        },
        Object.keys(searchQuery).length > 0 ?
            {
                $match: {
                    $or: [
                        { "productName": searchQuery },
                        { "user.companyName": searchQuery },
                        { "award.awardName": searchQuery },
                        { "productCat.productName": searchQuery },
                        { "productSubCat.productName": searchQuery },
                        { "productSubSubCat.productName": searchQuery }
                    ]
                }
            } : { $match: {} },
        { $count: 'count' }
    ])


    if (totalRecords.length) {
        pageTotal = totalRecords[0].count
    } else {
        pageTotal = 0;
    }





    // else {
    //     response = await Nominee.find(query).populate('awardCategory').populate('productCategory').populate('productSubCategory').populate('productSubSubCategory').sort({createdAt:-1}).skip(skip).limit(limit);

    //     pageTotal=await Nominee.find(query).count();

    //     //     for (let index = 0; index < response.length; index++) {
    //     //     const element = response[index];

    //     //     let temp;
    //     //     if (element['user']!=null && typeof (element['user']['archive']) == "undefined") {

    //     //         if (element.productCategory) {
    //     //             temp = element.productCategory['productName'];
    //     //         }
    //     //         if (element.productSubCategory) {
    //     //             let product = await ProductList.find({ _id: element.productSubCategory });
    //     //             temp = `${temp}>${product[0]['productName']}`;
    //     //         } if (element.productSubSubCategory) {
    //     //             let product = await ProductList.find({ _id: element.productSubSubCategory });
    //     //             temp = `${temp}>${product[0]['productName']}`;
    //     //         }
    //     //         response[index]['_doc']["productCategoryAll"] = temp;
    //     //     }
    //     // }
    // }

    if (type == 'archive') {
        archiveTotal = await Nominee.find({ archive: true }).count();
    }


    res.json({ response, nomineeTotal, cartTotal, checkoutTotal, pageTotal, archiveTotal });
}

async function getNominatedAwardsCat(req: Request, res: Response) {

    const now = new Date('2020-05-25T17:58:18.545Z')
    let date = now.getTime();


    let result: any = await Nominee.find({ payment: true }).populate('awardCategory');
    let tempObj: any = {};
    let fnlObject: any = {};
    for (let index = 0; index < result.length; index++) {
        const element: any = result[index];
        let productSub = element['productSubCategory'] || 'NA';
        let productSubSub = element['productSubSubCategory'] || 'NA';
        if (tempObj.hasOwnProperty(element.awardCategory["_id"] + "-" + element.productCategory + "-" + productSub + '-' + productSubSub)) {
            element['_doc']['level'] = 'awardCategory';
            fnlObject[element['awardCategory']['awardName']] = element;
            fnlObject[element['awardCategory']['awardName']]['test'] = 1;
        } else {
            tempObj[element.awardCategory["_id"] + "-" + element.productCategory + "-" + productSub + '-' + productSubSub] = 1;
        }

    }
    res.json(fnlObject);
}

async function getProductById(req: Request, res: Response) {
    const type = req.body.apiType;
    let tempObj: any = {};
    let fnlObject: any = {};
    let result: any;
    switch (true) {
        case (type == 'awardCategory'):
            result = await Nominee.find({ awardCategory: req.body.id, payment: true }).populate('productCategory').populate('user');
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                let productSub = element['productSubCategory'] || 'NA';
                let productSubSub = element['productSubSubCategory'] || 'NA';
                if (tempObj.hasOwnProperty(element.awardCategory + "-" + element.productCategory["_id"] + "-" + productSub + '-' + productSubSub)) {

                    element['_doc']['level'] = 'productCategory';
                    fnlObject[element['productCategory']['productName']] = element;
                } else {
                    tempObj[element.awardCategory + "-" + element.productCategory["_id"] + "-" + productSub + '-' + productSubSub] = 1;
                }
            }
            break;
        case (type == 'productCategory'):
            result = await Nominee.find({ awardCategory: req.body.awardId, productCategory: req.body.productCatId, payment: true }).populate('productSubCategory').populate('user');
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if (typeof (element['productSubCategory']) == 'undefined') {
                    element['_doc']['level'] = 'Product';
                    fnlObject[element['productName']] = element;
                } else {
                    let productCat = element['productCategory'] || 'NA';
                    let productSub = element['productSubCategory']['_id'] || 'NA';
                    let productSubSub = element['productSubSubCategory'] || 'NA';
                    if (tempObj.hasOwnProperty(element.awardCategory + "-" + productCat + "-" + productSub + "-" + productSubSub)) {
                        element['_doc']['level'] = 'productSubCategory';
                        fnlObject[element['productSubCategory']['productName']] = element;
                    } else {
                        tempObj[element.awardCategory + "-" + productCat + "-" + productSub + "-" + productSubSub] = 1;
                    }
                }
            }
            break;
        case (type == 'productSubCategory'):
            result = await Nominee.find({ awardCategory: req.body.awardId, productCategory: req.body.productCatId, productSubCategory: req.body.productSubCategoryId, payment: true }).populate('productSubSubCategory').populate('user');
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                if (typeof (element['productSubSubCategory']) == 'undefined') {
                    //let product:any = await 
                    element['_doc']['level'] = 'Product';
                    fnlObject[element['productName']] = element;
                } else {
                    let productCat = element['productCategory'] || 'NA';
                    let productSub = element['productSubCategory'] || 'NA';
                    let productSubSub = element['productSubSubCategory']['_id'] || 'NA';
                    element['_doc']['level'] = 'productSubSubCategory';
                    if (tempObj.hasOwnProperty(element.awardCategory + "-" + productCat + "-" + productSub + "-" + productSubSub)) {
                        element['_doc']['level'] = 'productSubSubCategory';
                        fnlObject[element['productSubSubCategory']['productName']] = element;
                    } else {
                        tempObj[element.awardCategory + "-" + productCat + "-" + productSub + "-" + productSubSub] = 1;
                    }
                }
            }
            break;
        case (type == 'productSubSubCategory'):
            result = await Nominee.find({ awardCategory: req.body.awardId, productCategory: req.body.productCatId, productSubCategory: req.body.productSubCategoryId, productSubSubCategory: req.body.productSubSubCategoryId, payment: true }).populate('user');
            for (let index = 0; index < result.length; index++) {
                const element = result[index];
                element['_doc']['level'] = 'Product';
                fnlObject[element['productName']] = element;
            }
            break;
        default:
            break;
    }
    res.json(fnlObject);
}

async function searchNominatedProduct(req: Request, res: Response) {
    let aggregateOps: any;
    if (req.params.company_name) {
        aggregateOps = [{ $match: { payment: true } }, { $lookup: { from: "Users", localField: "user", foreignField: "_id", as: "user" } }, { $project: { _id: 0, productName: 1, awardCategory: 1, productCategory: 1, productSubCategory: 1, productSubSubCategory: 1, company: "$user.companyName" } }, { $unwind: "$company" }, { $match: { company: req.params.company_name } }, { $project: { awardCategory: 1, productCategory: 1, productSubCategory: 1, productSubSubCategory: 1 } }];
    } else if (req.body.searchValue) {
        aggregateOps = [{ $match: { payment: true } }, { $lookup: { from: "Users", localField: "user", foreignField: "_id", as: "user" } }, { $project: { _id: 0, productName: 1, awardCategory: 1, productCategory: 1, productSubCategory: 1, productSubSubCategory: 1, company: "$user.companyName" } }, { $unwind: "$company" }, { $match: { $or: [{ productName: { $regex: req.body.searchValue, $options: 'i' } }, { company: { $regex: req.body.searchValue, $options: 'i' } }] } }, { $project: { awardCategory: 1, productCategory: 1, productSubCategory: 1, productSubSubCategory: 1 } }];
    }
    const searchData = await Nominee.aggregate(aggregateOps);
    let removeDuplicate = _.uniq(searchData, (x: any) => {
        return [x.awardCategory, x.productCategory, x.productSubCategory, x.productSubSubCategory].join()
    });

    let fnlData: any = {};
    let temp: any;
    for (let index = 0; index < removeDuplicate.length; index++) {
        const element = removeDuplicate[index];
        element['payment'] = true;
        temp = await Nominee.aggregate([
            {
                $match: element
            }, {
                $lookup: {
                    from: "Users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user"
                },
            },
            {
                $lookup: {
                    from: "awardList",
                    localField: "awardCategory",
                    foreignField: "_id",
                    as: "award"
                }
            },
            {
                $lookup: {
                    from: "productList",
                    localField: "productCategory",
                    foreignField: "_id",
                    as: "productCategory"
                }
            },
            {
                $lookup: {
                    from: "productList",
                    localField: "productSubCategory",
                    foreignField: "_id",
                    as: "productSubCategory"
                }
            },
            {
                $lookup: {
                    from: "productList",
                    localField: "productSubSubCategory",
                    foreignField: "_id",
                    as: "productSubSubCategory"
                }
            }
        ]);
        if (temp.length > 1) {

            const element = temp[0];
            let key = '';
            key += element['award'][0]['awardName'] + ' - ';
            switch (true) {
                case (element['productSubSubCategory'].length > 0):
                    key += element['productSubSubCategory'][0]['productName'];
                    break;
                case (element['productSubCategory'].length > 0):
                    key += element['productSubCategory'][0]['productName'];
                    break;
                case (element['productCategory'].length > 0):
                    key += element['productCategory'][0]['productName'];
                    break;
                default:
                    break;
            }

            fnlData[key] = temp;
            // }
        }
    }
    res.json(fnlData);
}

async function paymentData(req: Request, res: Response) {
    let searchQuery: any = {};
    let dateCriteria = {};
    let query: any;
    let amountQuery: any = {};
    let statusQuery: any = {};
    let archive = req.body.archive;
    let type = req.body.type;
    let status = req.body.status;
    let searchText = req.body.searchText;
    let paid;
    let unpaid;
    let limit = req.body.limit;
    let skip = req.body.skip;
    let value: string = req.body.sort;
    if (value === "companyName") {
        value = "user.companyName"
    }

    if (req.body.start) {
        var startDate = new Date(req.body.start);
        var endDate = new Date(req.body.enddate);
        endDate.setHours(23, 59);
        dateCriteria = {'$gte': startDate, '$lte': endDate };
        searchQuery['createdAt'] = dateCriteria;
    }

    if (req.body.type) {
        paid = { '$gt': '0' };
        unpaid = { '$eq': '0' }
    }



    if (typeof archive != "undefined") {
        if (archive == true) {
            query = { archive: 1 };
        } else {
            query = { archive: { $ne: 1 } }
        }
    }

    if (typeof searchText != "undefined" && searchText!=="") {
        query["user.companyName"]={$regex: searchText, $options: 'i'} 
    }



    if (typeof type != "undefined") {

        if (type == 'paid') {
            amountQuery['amount'] = paid;
        }

        else if (type == 'unpaid') {
            amountQuery['amount'] = unpaid
        }

    }

    if (typeof status != "undefined") {
        if (status == 'success') {
            statusQuery['paymentStatus'] = 'sucess'
        }

        else if (status == 'created') {
            statusQuery['paymentStatus'] = 'created'
        }
    }

        console.log(query,"query");
        

    const totalRecords = await Payment.aggregate([
        { '$addFields': { user_id: { '$toObjectId': '$userId' } } },
       

        {
            $lookup: {
                from: "Users",
                localField: "user_id",
                foreignField: "_id",
                as: "user"
            }

        },
        { '$match': { '$and': [query, amountQuery, statusQuery,searchQuery] } },

        { $count: 'count' }

    ])


    let result: any;



    if (req.body.sort) {
        result = await Payment.aggregate([
            { '$addFields': { user_id: {$toObjectId: '$userId' } } },
           
            // {
            //     $unwind: "$nomineeIds"
            // }, 
            {
                $lookup: {
                    from: "Users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }

            },
            {
                $lookup: {
                    from: "nomineeList",
                    localField: "nomineeIds",
                    foreignField: "_id",
                    as: "nominee"
                }
            },
            { '$match': { '$and': [query, amountQuery, statusQuery,searchQuery] } },
            req.body.orderBy === "ASC" ?
                { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }
        ]).collation({ locale: "en_US", numericOrdering: true }).skip(skip).limit(limit);
    } else {
        result = await Payment.aggregate([
            { '$addFields': { user_id: { $toObjectId: '$userId' } } },
           
            // {
            //     $unwind: "$nomineeIds"
            // }, 
            {
                $lookup: {
                    from: "Users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }

            },
            {
                $lookup: {
                    from: "nomineeList",
                    localField: "nomineeIds",
                    foreignField: "_id",
                    as: "nominee"
                }
            },
            { '$match': { '$and': [query, amountQuery, statusQuery,searchQuery] } },

            { '$sort': { createdAt: -1 } },

        ]).skip(skip).limit(limit);
    }



    let pageTotal = 0
    if (totalRecords.length) {
        pageTotal = totalRecords[0].count
    } else {
        pageTotal = 0;
    }

    // for(let index=0; index<result.length; index++) {
    //     if(result[index].user[0]) {
    //         result[index].user[0].companyLogo="";            
    //     }        
    // }

    res.json({ result, pageTotal });
}

async function paymentDetails(req: Request, res: Response) {
    const result = await Payment.aggregate([{
        $match: {
            _id: mongoose.Types.ObjectId(req.body.id)
        }
    }, {
        $unwind: "$nomineeIds"
    }, {
        $lookup: {
            from: "nomineeList",
            localField: "nomineeIds",
            foreignField: "_id",
            as: "nominee"
        }
    }, {
        $project: {
            productName: "$nominee.productName",
            productCategory: "$nominee.productCategory",
            productSubCategory: "$nominee.productSubCategory",
            productSubSubCategory: "$nominee.productSubSubCategory",
            awardCategory: "$nominee.awardCategory",
            user: "$nominee.user",

        }
    }, {
        $lookup: {
            from: "Users",
            localField: "user",
            foreignField: "_id",
            as: "userDetails"
        }
    }, {
        $lookup: {
            from: "productList",
            localField: "productCategory",
            foreignField: "_id",
            as: "productCat"
        }
    }, {
        $lookup: {
            from: "productList",
            localField: "productSubCategory",
            foreignField: "_id",
            as: "productSubCat"
        }
    }, {
        $lookup: {
            from: "productList",
            localField: "productSubSubCategory",
            foreignField: "_id",
            as: "productSubSubCat"
        }
    }, {
        $lookup: {
            from: "awardList",
            localField: "awardCategory",
            foreignField: "_id",
            as: "award"
        }
    }, {
        $project: {
            productCategory: "$productCat.productName",
            productSubCategory: "$productSubCat.productName",
            productSubSubCategory: "$productSubSubCat.productName",
            product: "$productName",
            award: "$award.awardName",
            user: "$userDetails.name",
            email: "$userDetails.email",
            number: "$userDetails.phone",
            company: "$userDetails.companyName",
        }
    }
    ]
    );
    res.json(result);
}

async function polling(req: Request, res: Response) {
    let query = {};
    if (req.body.vote === 1) {
        query = { _id: req.body.id };
    } else {
        let priviousVotes = req.body.vote - 1;
        query = { _id: req.body.id, votes: priviousVotes };
    }
    let excQuery = await Nominee.update(query, { votes: req.body.vote });
    res.json(excQuery);
}

async function managePolling(req: Request, res: Response, next: NextFunction) {
    let excQuery: any = await ManagePolling.aggregate([
        {
            $match: {
                award: req.body.award,
                userKey: req.body.key
            }
        }, {
            $group: {
                _id: "$award",
                lastVotingTime: { $last: "$createdAt" }
            }
        }
    ]);
    if (excQuery.length > 0) {
        let now = new Date();
        let lastVotingTime = new Date(excQuery[0]['lastVotingTime']);
        let expiry = lastVotingTime.getTime() + 50000;
        if (now.getTime() > expiry) {

            let temp: any = {};
            temp['userKey'] = req.body.key;
            temp['nomineeId'] = req.body.id;
            temp['award'] = req.body.award;
            const schemaObj = new ManagePolling(temp);
            await schemaObj.save();
            next();
        } else {
            res.json({ msg: 'vote done!' });
        }
    } else {
        let temp: any = {};
        temp['userKey'] = req.body.key;
        temp['nomineeId'] = req.body.id;
        temp['award'] = req.body.award;
        const schemaObj = new ManagePolling(temp);
        await schemaObj.save();
        next();
    }

}

async function checkNumberExistance(req: Request, res: Response, next: NextFunction) {
    let data = await Users.find({ phone: req.body.number });

    if (data.length > 0) {
        res.json({ msg: "This number already registered." });
    } else {
        next();
    }
}

async function leadCapture(req: Request, res: Response) {

    const oldNo = await Lead.find({ mobile: req.body[0]['value'] });


    if (oldNo.length === 0) {
        const data = new Lead({ mobile: req.body[0]['value'], campaign: req.body[0]['campaign'] });
        const result = await data.save();

        if (result['_id']) {
            res.json(true);
        } else {
            res.json(false);
        }
    } else {
        res.json({ status: -1 });
    }

}

async function getLeads(req: Request, res: Response) {
    let dateCriteria = {};
    let query: any = {};
    let limit = req.body.limit;
    let skip = req.body.skip;
    let value: string = req.body.sort;
    let search: string = req.body.searchText;



    if (req.body.start) {
        var startDate = new Date(req.body.start);
        var endDate = new Date(req.body.enddate);
        endDate.setHours(23, 59);
        dateCriteria = { '$gte': startDate, '$lte': endDate };
        query['createdAt'] = dateCriteria;
    }

    if (req.body.archive) {

        query['archive'] = 1;
    } else {

        query['archive'] = { $ne: 1 };
    }

    let result;
    let totalRecords;
    let count;
    let aggregateOps: any;
    aggregateOps = { $match: { $or: [{ comment: { $regex: search, $options: 'i' } }, { mobile: { $regex: search, $options: 'i' } }] } }
    if (search) {
        totalRecords = await Lead.aggregate([
            aggregateOps, { $count: 'count' }
        ])

        if (totalRecords.length) {
            count = totalRecords[0].count
        }

        if (req.body.sort) {
            if (req.body.orderBy === "ASC") {
                result = await Lead.aggregate([
                    aggregateOps, { '$sort': { [value]: 1 } }
                ]).skip(skip).limit(limit);
            } else {
                result = await Lead.aggregate([
                    aggregateOps, { '$sort': { [value]: -1 } }
                ]).skip(skip).limit(limit);
            }
        } else {
            result = await Lead.aggregate([
                aggregateOps
            ]).skip(skip).limit(limit);
        }

    } else {
        count = await Lead.find(query).count();
        if (req.body.sort) {
            if (req.body.orderBy === "ASC") {
                result = await Lead.find(query)
                    .skip(skip)
                    .limit(limit)
                    .sort({ [value]: 1 });
            } else {
                result = await Lead.find(query)
                    .skip(skip)
                    .limit(limit)
                    .sort({ [value]: -1 });
            }
        } else {
            result = await Lead.find(query)
                .skip(skip)
                .limit(limit)
                .sort({ createdAt: -1 });
        }
    }

    res.json({ result, count });
}

async function updateStatus(req: Request, res: Response) {
    const result = await Lead.update({ _id: req.body.recordId }, req.body.doc);
    res.json(result);
}

async function actionNomination(req: Request, res: Response) {
    let result;

    if (req.body.doc) {
        result = await Nominee.update({ _id: req.body.recordId }, req.body.doc);
    } else {
        result = await Nominee.update({ _id: req.body.recordId }, req.body.temp);
    }

    res.json(result);
}

async function deleteDataById(req: Request, res: Response) {

    let updateDoc;
    if (req.body.updateFlag) {
        updateDoc = await Users.update({ _id: req.body.recordId }, { archive: 0 });
    } else {
        updateDoc = await Users.update({ _id: req.body.recordId }, { archive: 1 });
    }

    res.json(updateDoc);
}
async function archiveAdminJuryById(req: Request, res: Response) {

    let updateDoc;

    if (req.body.updateFlag) {
        updateDoc = await Juries.findByIdAndUpdate({ _id: req.body.recordId }, { archive: 0 });

    } else {
        updateDoc = await Juries.findByIdAndUpdate({ _id: req.body.recordId }, { archive: 1 });
        ;

    }

    res.json(updateDoc);
}
async function archivePaymebtById(req: Request, res: Response) {

    let updateDoc;

    if (req.body.updateFlag) {
        updateDoc = await Payment.findByIdAndUpdate({ _id: req.body.recordId }, { archive: 0 });

    } else {
        updateDoc = await Payment.findByIdAndUpdate({ _id: req.body.recordId }, { archive: 1 });
    }

    res.json(updateDoc);
}


async function deleteLeadById(req: Request, res: Response) {
    const updateDoc = await Lead.update({ _id: req.body.recordId }, { archive: 1 });
    res.json(updateDoc);
}

async function webClicks(req: Request, res: Response) {

    const cObj = new Campaigns({ fields: req.body });
    const returnData = await cObj.save();

    res.json(returnData);

}

async function saveNominationSlider(req: Request, res: Response) {
    const sliderObj = new Nomination(req.body);
    try {
        let result = await sliderObj.save();
        res.json({ result, status: 200 });
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }



}

async function addTeamProfile(req: Request, res: Response) {
    const team = new Team(req.body);
    let result = await team.save();
    res.json(result);
}
async function editTeamProfile(req: Request, res: Response) {
    let id = { _id: req.body.id }
    delete req.body.id;
    const team = await Team.findByIdAndUpdate(id, req.body);
    if (team) {
        res.json(team);
    }
}

async function getTeamProfile(req: Request, res: Response) {
    const team = await Team.find({});
    res.json(team);
}

// async function convertAllImage(file: any) {

//     // const result = webp.cwebp(file.path, `${file.destination}/${file.filename.substring(0, file.filename.lastIndexOf('.'))}.webp`, "-q 80");
//     // result.then((response:any) => {
//     //     //fs.unlinkSync(file.path);
//     // })

//     sharp(file.path).flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } }).resize({
//         fit: sharp.fit.contain,
//         width: 500
//     }).webp({ quality: 80 }).toFile(`${file.destination}/${file.filename.substring(0, file.filename.lastIndexOf('.'))}.webp`, (err, resizeImage) => {
//         if (err) {
//             console.log(err);
//         } else {
//             //console.log(resizeImage);
//         }
//     })
// }

async function editNominationSlider(req: Request, res: Response) {
    const findBody = { "_id": req.body._id }
    const updateBody = { "$set": { sorting: req.body.sorting } };


    await Nomination.update(findBody, updateBody, { multi: true, upsert: true }, (err, result) => {


        res.json(result);
    })
}

async function _editNominationSlider(req: Request, res: Response) {
    const findBody = { "_id": req.body._id }
    delete req.body._id;
    const updateBody = { "$set": req.body };

    await Nomination.update(findBody, updateBody, { multi: true, upsert: true }, (err, result) => {


        res.json(result);
    })
}
async function getNominationSlider(req: Request, res: Response) {
    let query: any;
    let limit = req.body.limit;
    let skip = req.body.skip;
    let value: string = req.body.sort;
    let search: string = req.body.searchText;

    if (req.body.archive) {
        query = { archive: true }
    } else {
        query = { archive: false }
    }

    let result;
    let totalRecords;
    let pageTotal;
    let aggregateOps: any;
    aggregateOps = {
        $match: {
            $and: [query,
                {
                    $or: [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }, { companyName: { $regex: search, $options: 'i' } },
                    { phone: { $regex: search, $options: 'i' } }]
                }
            ]
        }
    }
    if (search) {
        totalRecords = await Nomination.aggregate([
            aggregateOps, { $count: 'count' }
        ])

        if (totalRecords.length) {
            pageTotal = totalRecords[0].count
        } else {
            pageTotal = 0;
        }

        result = await Nomination.aggregate([
            aggregateOps,
            req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },
        ]).skip(skip).limit(limit);

    } else {
        pageTotal = await Nomination.find(query).count();
        result = await Nomination.aggregate([
            { $match: query },
            req.body.sort ? (req.body.orderBy === "ASC" ? { '$sort': { [value]: 1 } } : { '$sort': { [value]: -1 } }) : { '$sort': { createdAt: -1 } },
        ]).skip(skip).limit(limit);
    }


    res.json({ pageTotal, result });
}

async function archiveNominationSlider(req: Request, res: Response) {
    let updateBody = {};
    if (req.body.archive != 'archive') {
        updateBody = { archive: true }
    } else {
        if (req.body.archive == 'archive') {

            updateBody = { archive: false }
        }
    }
    const result = await Nomination.update({ _id: req.body.id }, updateBody);
    if (result.n > 0) {
        res.json(true);
    }

}

async function getCampaignGroup(req: Request, res: Response) {
    let dateCriteria = {};
    let dateQuery: any = {};

    let grp = req.body.group;
    let limit = req.body.limit;
    let skip = req.body.skip;
    let query: any;

    if (req.body.start) {
        var startDate = new Date(req.body.start);
        var endDate = new Date(req.body.enddate);
        endDate.setHours(23, 59);
        dateCriteria = { '$gte': startDate, '$lte': endDate };
        dateQuery['createdAt'] = dateCriteria;
    }

    if (grp == 'name') {
        query = "$fields.value"
    }
    else if (grp == 'region') {
        query = "$fields.region"
    }
    else {
        query = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } }
    }

    const returnData = await Campaigns.aggregate(
        [{
            $match: dateQuery
        },
        {
            $sort: { createdAt: -1 },
        },
        {
            $group: {
                _id: query,
                lastDoc: { $first: "$createdAt" },
                count: { $sum: 1 }
            }
        }, {
            $sort: { lastDoc: -1 },
        }
        ]).skip(skip).limit(limit);


    const totalRecords = await Campaigns.aggregate(
        [{
            $match: dateQuery
        },
        {
            $group: {
                _id: query,

                count: { $sum: 1 }
            }
        }, {
            $sort: { createdAt: -1 },
        }, {
            $count: 'count'
        }
        ])


    const pageTotal = totalRecords[0]?.count;



    res.json({ returnData, pageTotal });

}

async function getCampaign(req: Request, res: Response) {

    let grp = req.body.group;
    let limit = req.body.limit;
    let skip = req.body.skip;
    let returnData: any;

    if (grp == 'name') {
        returnData = await Campaigns.find({ "fields.value": req.body.value }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        // pageTotal = await Campaigns.find({"fields.value" : req.body.value}).sort({createdAt : -1}).count();
    }
    else if (grp == 'region') {
        returnData = await Campaigns.find({ "fields.region": req.body.value }).sort({ createdAt: -1 }).skip(skip).limit(limit);
        // pageTotal = await Campaigns.find({"fields.value" : req.body.value}).sort({createdAt : -1}).count();
    }
    else if (grp == 'date') {
        let date = new Date(req.body.value);
        let endDate = new Date(req.body.value);
        endDate.setHours(23, 59);

        let dateCriteria: any;
        dateCriteria = { "createdAt": { $gte: date, $lte: endDate } };
        returnData = await Campaigns.aggregate([
            {
                $match: dateCriteria
            },
        ])


    }

    res.json({ returnData });

}

// async function addBlog(req: Request, res: Response) {

//     const File = req.file;


//     if(typeof File !== 'undefined'){
//     sharp(File['path']).resize(345, 384, {
//         fit: sharp.fit.contain,
//         background: { r: 255, g: 255, b: 255 }
//     }).toFile(`${config.filePath.resizeBlogImg}${File['filename']}`, async (err, resizeImage) => {
//         if (err) {

//         } else {
//             req.body['file'] = File['filename'];

//             const userObj = new Blogs(req.body);
//             let result = await userObj.save();
//             res.json(result);
//         }
//     })
// }
// }

// async function updateblogData(req: Request, res: Response) {
//     let blogId = req.body._id;
//     delete req.body['_id'];


//     if (req.file) {
//         const File = req.file;


//         sharp(File['path']).resize(345, 384, {
//             fit: sharp.fit.contain,
//             background: { r: 255, g: 255, b: 255 }
//         }).toFile(`${config.filePath.resizeBlogImg}${File['filename']}`, async (err, resizeImage) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 req.body['file'] = File['filename'];
//                 const result = await Blogs.findByIdAndUpdate(blogId, req.body, { upsert: true });

//                 res.json(result);
//             }
//         })
//     } else {

//         let updatedata: any = {};
//         updatedata['name'] = req.body.name;
//         updatedata['file'] = req.body.file;
//         updatedata['slug'] = req.body.slug;
//         updatedata['sort'] = req.body.sort;
//         updatedata['summery'] = req.body.summery;
//         updatedata['doc'] = req.body.doc;
//         const updateBlog = await Blogs.findByIdAndUpdate(blogId, updatedata, { upsert: true });
//         res.json({ updateBlog });

//     }
// }


async function blogDetail(req: Request, res: Response) {
    const detail = await Blogs.find({ slug: req.body.pageName }, 'doc name createdAt');
    res.json(detail);
}

async function deleteBlog(req: Request, res: Response) {
    const response = await Blogs.deleteOne({ _id: req.params.id });
    res.json(response);
}


async function getAllBlogList(req: Request, res: Response) {
    const BlogsList = await Blogs.find({});
    res.json({ BlogsList });
}

async function getBlogbyId(req: Request, res: Response) {
    const blog = await Blogs.find({ _id: req.body.id });
    res.json({ blog });
}


async function setArchiveFlagById(req: Request, res: Response) {
    let updateDoc;
    if (req.body.updateFlag) {
        updateDoc = await Queries.update({ _id: req.body.recordId }, { archive: 0 });
    } else {
        updateDoc = await Queries.update({ _id: req.body.recordId }, { archive: 1 });
    }
    res.json(updateDoc);
}

async function addRemarkuserQuery(req: Request, res: Response) {
    const result = await Queries.update({ _id: req.body.recordId }, req.body.doc);
    res.json(result);
}

async function getSearchField(req: Request, res: Response) {
    let award = { awardName: req.body }
    let company = { companyName: req.body }
    const awardList: any = await AwardList.find(award, "awardName")
    const companyData: any = await Users.find(company, "companyName");


    let newArray = awardList.concat(companyData);
    res.json(newArray);

}

/**
 * Returns product category based on parent id
 */
async function getProductByParentId(req: Request, res: Response) {
    const parentId = req.params.id;
    console.log(parentId);
    
    if (!parentId) {
        return res.status(400).json({});
    }
    try {
        const productCategory = await ProductList.find({$and:[{parentId:parentId},{status:"1"}]}).lean();
        // const productCategory = await ProductList.find({})
        console.log(productCategory);
        
        return res.status(200).json(productCategory);
    } catch (error) {
        logger.log({
            level: "error",
            message: `Controller: controller: getProductByParentId: ${error}`
        });
        return res.status(500).json({ msg: "Unable to process the request" });
    }
}

/**
 * Save user profile (branlogo,companylogo,video,sampleAcceptance etc)
 */

async function saveUserProfile(req:Request,res:Response){

   try {
    

   
       const existingProfile=await UserProfile.find({nominationId:req.body.nominationId,userId:req.body.userId})
       
        
       let userProfile:any;
       if(existingProfile.length){
        console.log("exisiting");
        
        const {body,files}:any=req;
         
           
     
        const url = 'https://award-test.arachnomesh.com'
        body.productImage= {
            image:body.productImage,
            fileName: body.productImage
        }
        body.brandLogo= {
            image:body.brandLogo,
            fileName: body.brandLogo
        }
    

     
         userProfile=await UserProfile.updateOne({nominationId:req.body.nominationId,userId:req.body.userId},req.body)
       }else{
         
        console.log("new");
        
           const {body,files}:any=req;
         
           
           if(files){
           const url = 'https://award-test.arachnomesh.com'
           body.productImage= {
               image:url + '/uploads/' + files["productImage"][0].filename,
               fileName: files["productImage"][0].filename
           }
           body.brandLogo= {
            image:url + '/uploads/' + files["brandLogo"][0].filename,
            fileName:files["brandLogo"][0].filename

           }
           if (files.introVideo && files.introVideo.length) {
            body.introVideo= url + '/uploads/' + files["introVideo"][0].filename

           }else{
            body.introVideo=""
           }
           
           }else{
            body.productImage= ""
            body.brandLogo= ""
            body.introVideo= ""
           }
           

       userProfile=await UserProfile.create(body)
        }
       res.json({
        error:false,   
        userProfile})
   } catch (error) {
       console.log(error);
       
    res.json({
        message:error,
        error:true,   
       
    })
   }
}

/**
 * get user profile (branlogo,companylogo,video,sampleAcceptance etc)
 */

 async function getUserProfile(req:Request,res:Response){
    try {
       
        
        const userProfile=await UserProfile.findOne({nominationId:req.params.id})
        res.json({
         error:false,   
         userProfile})
    } catch (error) {
     res.json({
         message:error,
         error:true,   
        
     })
    }
 }

//getBlogbyId
export default {
    saveUserProfile,
    getUserProfile,
    saveQuery,
    getOTPUsers,
    saveAward,
    saveProduct,
    getUsers,
    getQueries,
    getProducts,
    getAwards,
    saveNominee,
    getUserWithNominee,
    updateNomineeDetails,
    fetchCartData,
    updateAward,
    updateProduct,
    removeItemFormCart,
    deleteProduct,
    checkout,
    comfirmation,
    userLogin,

    createUser,
    updateUserProfile,

    checkUserRegistrationData,
    getUserStatus,
    // addNewJury,
    getJury,
    // updateJury,
    deleteJury,
    getUserNominations,
    getNominatedAwardsCat,
    getProductById,
    searchNominatedProduct,
    paymentData,
    paymentDetails,
    archivePaymebtById,
    polling,
    managePolling,
    checkNumberExistance,
    leadCapture,
    getLeads,
    getJuryForAdmin,
    updateStatus,
    actionByAdmin,
    actionNomination,
    deleteDataById,
    deleteLeadById,
    archiveAdminJuryById,
    webClicks,
    getCampaign,
    getCampaignGroup,
    getSliderJury,
    getUserSlider,
    // addBlog,
    getBlogList,
    blogDetail,
    deleteBlog,
    getAllBlogList,
    getBlogbyId,
    // updateblogData,
    setArchiveFlagById,
    addRemarkuserQuery,
    archiveNomination,
    saveNominationSlider,
    getNominationSlider,
    archiveNominationSlider,
    getUserNewSlider,
    editNominationSlider,
    getUserNewSliderWithNomination,
    getSearchField,
    getAllproductCategory,
    _editNominationSlider,
    // convertAllImage,
    addTeamProfile,
    editTeamProfile,
    getTeamProfile,
    getProductByParentId,
    getUsersById,
    getNominationById
}