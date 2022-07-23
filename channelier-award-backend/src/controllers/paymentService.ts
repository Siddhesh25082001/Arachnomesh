import {Request, Response, json, NextFunction} from 'express';
import {Payment} from '../models/payment';
import Razorpay from 'razorpay';
import { Nominee } from '../models/nomineeProducts';
import { sendMail,mailBody,mailTable,mailFooter } from './mailerService';
import config from '../config/config';
var uuid = require("uuid");


async function createBookingWithZeroPayment(req:Request, res:Response,next:NextFunction){
  let orderId = uuid.v4();
  const orderDate = {
    "amount": req.body.amount,
    "currency": "INR",
    "receipt": "receipt",
    "payment_capture": 1
  };
  let temp :any= {
    orderId: orderId,
    amount: orderDate.amount,
    userId: req.body.id,
    paymentStatus: 'created',
    nomineeIds: req.body.awards
  }
  let paymentInstance = new Payment(temp);
  let result: any = await paymentInstance.save();



  if (typeof result['_id'] != 'undefined') {
    
    res.status(200).json({
     notes:{nominationsIds: req.body.awards},
      order_id: orderId,
 
        id: orderId
      });
  }

}

async function createBookingOrder(req:Request,res:Response) {
  const instance = new Razorpay({
    key_id: config.razorpay.key_id,
    key_secret: config.razorpay.key_secret
  });
  console.log("instance",instance);
  
  const orderDate = {
    "amount":req.body.amount,
    "currency": "INR",
    "receipt": "receipt",
    "payment_capture": 1
  };
  
  instance.orders.create(orderDate, async(err:any, order:any)=> {
    let temp = {
      orderId:order.id,
      amount:orderDate.amount,
      userId: req.body.id,
      paymentStatus: 'created',
      nomineeIds:req.body.awards
    }
    let paymentInstance = new Payment(temp);
    let result:any = await paymentInstance.save();
    order.notes = {
      nominationsIds: req.body.awards
    };

    if(typeof result['_id'] != 'undefined'){
      res.status(200).send(order);
    }
    
  });
}

async function confirmBooking(req:Request,res:Response,next:NextFunction) {
   
     let updateData:any = await Nominee.updateMany(
        { _id:  { $in: req.body.order.notes.nominationsIds } },
        { $set: { paymentDetail: req.body.order.id, cart: false,payment:true} },
        {multi: true}
     )
     if(updateData['n'] > 0){
        let temp = await Payment.update({orderId:req.body.order.id},{paymentStatus:'sucess',successResponse:req.body.sucessData,discount:req.body.discount});
        next();
     }else{
        res.json({status:false});
     }
     
}

async function sendMailToUser(req:Request,res:Response){

    let templateData = await Nominee.aggregate([
      { 
       "$match": { 
                     "paymentDetail": req.body.order.id
                 } 
      },{
        "$lookup": {
           from: 'Users',
           localField: 'user',
           foreignField: '_id',
           as: 'userInfo'
        }
      },
      {
       "$lookup": {
          from: 'awardList',
          localField: 'awardCategory',
          foreignField: '_id',
          as: 'awardInfo'
       }
      
     },
      {
        "$lookup": {
          from: 'paymentDetails',
          localField: 'paymentDetail',
          foreignField: 'orderId',
          as: 'paymentInfo'
        }
      }
    ]);
    console.log("template",templateData);
    
    let userName =  templateData[0]['userInfo'][0]['name'];
    let email = templateData[0]['userInfo'][0]['email'];
    let body = mailBody({msg:'Thank you for registering for Channelier FMCG Awards 2022.The details regarding this registration are given below. Our team will contact you for GST invoice.',name:userName});
    let table = mailTable(templateData);
    let footer = mailFooter();
    let result = await sendMail(`${body}${table}${footer}`,email);
    res.json(result);
}

export default{
    createBookingOrder,
  createBookingWithZeroPayment,
    confirmBooking,
    sendMailToUser
}