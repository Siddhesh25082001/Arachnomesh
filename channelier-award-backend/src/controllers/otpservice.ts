import { Request, Response, json } from 'express';
import { OTPRecord } from '../models/otpService';
import request from "request";
import { createHmac } from 'crypto';
import config from '../config/config';
import { Users } from '../models/user';


async function sendOTP(req: Request, res: Response) {
    const otp = Math.floor(Math.random() * 90000) + 9999; //review 

    let options = {
        method: 'GET',
        url: 'http://enterprise.smsgupshup.com/GatewayAPI/rest',
        qs: {
            userid: '2000163871',
            password: '5Nsr694rN',
            send_to: req.body.number,
            method: 'SendMessage',
            msg: `Your One-Time Verification Code for registration on Channelier FMCG Awards is ${otp}. This OTP expires in 10 minutes.`,
            msg_type: 'Text',
            auth_scheme: 'Plain',
            v: '1.1',
            format: 'text',
            mask: 'CHNNLR'
        }
    };

    request(options, async (error, response, body) => {
        let obj = new OTPRecord({ OTP: otp, phoneNumber: req.body.number, masterOTP: "0", originalOTP: otp });
        await obj.save();
        console.log("Otp Record", obj);
        
        let allRecords = await OTPRecord.find({});
        if(allRecords.length == 0) console.log("No records found");
        else console.log("No of Records", allRecords.length);

        res.json({ otp: otp, status: true, response });
    });
}

async function verifyOTP(req: Request, res: Response) {

    if(req.body.id){

        console.log("Inside If")
        console.log("Body Content", req.body);

        let otp = req.body.OTP
        let result: any = await OTPRecord.find({ OTP: otp, phoneNumber: req.body.number });
        console.log("Number and OTP", result);

        if(result.length > 0) {
            const newUserDetail = await Users.findByIdAndUpdate({ _id: req.body.id }, {phone: req.body.number});
            console.log(newUserDetail)
            return res.json({
                message: "New Mobile Number Updated",
                status: 1,
                isNewNumberVerified: true
            })
        }

        else {
            res.json({
                status: -1, 
                message: "You have entered a wrong OTP"
            })
        }
    }
    
    else {

        console.log("Inside Else")
        console.log("Body Content", req.body);

        let otp = req.body.OTP
        let result: any = await OTPRecord.find({ OTP: otp, phoneNumber: req.body.number });
        const currentDate: any = new Date();
        
        switch (true) {
            
            case (result.length == 0):
                res.json({ 
                    status: -1, 
                    message: "You have entered a wrong OTP." 
                });
                break;

            case (typeof result[0]["updatedAt"] != "undefined"):
                
                let diff = (currentDate - result[0]["createdAt"]);
                
                if ((diff / 60e3) <= 5) {
                    await OTPRecord.deleteMany({ phoneNumber: req.body.number });
                    let hash = createHmac('sha256', config.crypto.key).update(req.body.number).digest('hex');
                    res.json({ 
                        status: 1, 
                        message: "OTP Verified Successfully", 
                        hash: hash
                    });
                } 
                
                else {
                    await OTPRecord.deleteMany({ phoneNumber: req.body.number });
                    res.json({ 
                        status: 0, 
                        message: "You have entered an expired OTP. Please generate a new OTP and re-enter" 
                    });
                }
                
                break;
            
            default:
                res.json({ 
                    status: -2, 
                    message: "Unkown error" 
                });
                break;
        }
    }
}

async function setMasterOTP(req: Request, res: Response) {
    console.log(req.body);

    const otpBody = {
        OTP: req.body.MasterOTP,
        masterOTP: req.body.MasterOTP,
        originalOtp: req.body.otp
    }

    const body = {
        OTP: req.body.MasterOTP,
        masterOTP: req.body.MasterOTP,

    }


    let updateresult = await OTPRecord.findOneAndUpdate({ _id: req.body.id, originalOtp: { $exists: false } }, otpBody);
    if (updateresult == null) {
        updateresult = await OTPRecord.findOneAndUpdate({ _id: req.body.id }, body);

    }
    res.json(updateresult)

}

export default {
    sendOTP,
    verifyOTP,
    setMasterOTP
}
