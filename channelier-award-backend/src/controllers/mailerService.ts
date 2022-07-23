import * as nodemailer from "nodemailer";
import logger from "../logger";
import moment from 'moment';

export const sendMail = async (template:any,email:any) => {
      return  new Promise( async (resolve, reject) =>  {
          let transporter = nodemailer.createTransport({
            host: "smtp.zoho.com",
            port: 465,
            secure: true, // true for 465, false for other ports
            auth: {
              user: 'awards@channelier.com', 
              pass: 'John@123@'
            },
          });
          let info = await transporter.sendMail({
            from: '"Channelier Awards" <awards@channelier.com>', // sender address
            to: email, // list of receivers
            subject: "Registration Successfully", // Subject line
            html: template
          });
          logger.info(info);
          resolve(info);
    });
}

export const mailBody = (body:any)=>{
   let header = `<!DOCTYPE html><html><head><title>Emailer</title><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><style type="text/css">body{padding-top:0 !important;padding-bottom:0 !important;padding-top:0 !important;padding-bottom:0 !important;margin:0 !important;width:100% !important;-webkit-text-size-adjust:100% !important;-ms-text-size-adjust:100% !important;-webkit-font-smoothing:antialiased !important}.tableContent img{border:0 !important;display:block !important;outline:none !important}p{color:#000;font-size:15px;font-weight:normal;line-height:1.5;text-align:left}@media only screen and (max-width:480px){table[class="MainContainer"],td[class="cell"]{width:100% !important;height:auto !important}td[class="specbundle"]{width:100% !important;float:left !important;font-size:13px !important;line-height:17px !important;display:block !important;padding-bottom:15px !important}td[class="spechide"]{display:none !important}img[class="banner"]{width:100% !important;height:auto !important}}@media only screen and (max-width:540px){table[class="MainContainer"],td[class="cell"]{width:100% !important;height:auto !important}td[class="specbundle"]{width:100% !important;float:left !important;font-size:13px !important;line-height:17px !important;display:block !important;padding-bottom:15px !important}td[class="spechide"]{display:none !important}img[class="banner"]{width:100% !important;height:auto !important}}</style></head><body paddingwidth="0" paddingheight="0" style="padding-top: 0; padding-bottom: 0; padding-top: 0; padding-bottom: 0; background-repeat: repeat; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-font-smoothing: antialiased;" offset="0" toppadding="0" leftpadding="0"><table width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent bgBody" align="center" style='font-family:Helvetica, Arial,serif;'><tbody><tr><td><table bgcolor="#ffffff" width="100%" border="0" cellspacing="0" cellpadding="0" class="tableContent" align="center" style='font-family:Helvetica, Arial,serif; padding:50px 0;'><tbody><tr><td><table width="900" border="0" cellspacing="0" cellpadding="0" align="center" class="MainContainer" style="width: 900px;"><tbody><tr><td><table width="100%" border="0" cellpadding="0" cellspacing="0" style="background:#25282f ;padding: 20px 0;"><tbody><tr><td align="center"><a href="https://www.channelier.com/" target="_blank"><img src="http://award-test.arachnomesh.com/uploads/mailFiles/logo-channelier.png" width="200" height="26"></a></td></tr></tbody></table></td></tr><tr height="35px"><td></td></tr><tr><td><table width="100%" border="0" cellpadding="20" cellspacing="0"><tbody><tr><td style="background:#25282f; width: 30px;"><a href="https://www.instagram.com/channelier_/" target="_blank"> <img src="http://award-test.arachnomesh.com/uploads/mailFiles/instagram-icon.png" style="width: 25px; margin: 20px auto;"></a> <a href="https://www.facebook.com/channelier/" target="_blank"><img src="http://award-test.arachnomesh.com/uploads/mailFiles/facebook-icon.png" style="width: 25px; margin:20px auto;"></a> <a href="https://twitter.com/Channelier" target="_blank"><img src="http://award-test.arachnomesh.com/uploads/mailFiles/twitter-icon.png" style="width: 25px; margin: 20px auto;"></a></td><td><table width="100%" border="0" cellpadding="0" cellspacing="0"><tbody><tr><td><b style="font-size: 16px; font-weight: normal; line-height: 24px; margin:10px 0;">Dear ${body.name},</b><br><p style="font-size: 16px; font-weight: normal; line-height: 24px; margin:10px 0;">`;
                                                                       
   let headerClose =  `</p></td></tr></tbody></table>`;

  return `${header}${body.msg}${headerClose}`
}


export const mailTable =  (tableData:any) =>{
    let totalAmount:number = 0;
    let discountAmount=0;
    let table = `<table width="100%" border="0" cellpadding="20" cellspacing="0" style="text-align: left;"><thead><tr><th style="border-bottom: 2px solid #919191;">S.no</th><th style="border-bottom: 2px solid #919191;"> Award category</th><th style="border-bottom: 2px solid #919191;">Product name</th><th style="border-bottom: 2px solid #919191;">Price</th></tr></thead><tbody>`;
    console.log(tableData);
    let tbody = '';
    for (let index = 0; index < tableData.length; index++) {
      const element = tableData[index];
      console.log(element["paymentInfo"]);
      
     if(element["paymentInfo"][0]["amount"]=="0"){
       discountAmount = parseInt((element["paymentInfo"][0]["discount"]).split("/")[1]);
       totalAmount=0;
     }else{
      totalAmount+= parseInt(element['awardInfo'][0]['amount']);
       if (element["paymentInfo"][0]["discount"]) {
         discountAmount =parseInt((element["paymentInfo"][0]["discount"]).split("/")[1]);
         totalAmount-=discountAmount;
      }
     }
      tbody+= `<tr >
      <td style="border-bottom: 2px solid #919191;">${index+1}</td>
      <td style="border-bottom: 2px solid #919191;">${element['awardInfo'][0]['awardName']}</td>
      <td style="border-bottom: 2px solid #919191;">${element['productName']}</td>
      <td style="border-bottom: 2px solid #919191;">&#x20b9;${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(element['awardInfo'][0]['amount'])}</td>
   </tr>
   <tr>
     <td></td>
     <td></td>
     <td style="border-bottom: 2px solid #919191;">Discount</td>
     <td style="border-bottom: 2px solid #919191;">- ${discountAmount}</td>
   </tr>
    <tr>
     <td></td>
     <td></td>
     <td style="border-bottom: 2px solid #919191;">Total Amount</td>
     <td style="border-bottom: 2px solid #919191;">${totalAmount}</td>
   </tr>
   `;
    }
    let gst:number = (totalAmount*0.18);
    let total:number = totalAmount+gst;
    let date = moment(tableData[0]['updatedAt']).format('MMMM Do YYYY');
    let tableClose = `</tbody></table></td></tr></tbody></table></td></tr><tr><td><table width="100%" border="0" cellpadding="40" cellspacing="0" style="padding-left: 70px;"><tbody><tr><td><h4 style="line-height: 1.5; font-size: 22px; color: #000; margin: 15px 0;">Payment info:</h4><p style="line-height: 1.5; font-size: 16px; color: #000; margin: 0 0 10px; display: inline-flex; width: 100%;"><strong style="width: 120px;">Amount:</strong>&#x20b9;${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(totalAmount)}</p><p style="line-height: 1.5; font-size: 16px; color: #000; margin: 0 0 10px; display: inline-flex;width: 100%;"><strong style="width: 120px;">GST(18%):</strong>&#x20b9;${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(gst)}</p><p style="line-height: 1.5; font-size: 16px; color: #000; margin: 0 0 10px; display: inline-flex;width: 100%;"><strong style="width: 120px;">Total Amount:</strong>&#x20b9;${new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(total)}</p><p style="line-height: 1.5; font-size: 16px; color: #000; margin: 0 0 10px; display: inline-flex;width: 100%;"><strong style="width: 120px;">Order Id:</strong>${tableData[0]['paymentDetail']}</p><p style="line-height: 1.5; font-size: 16px; color: #000; margin: 0 0 10px; display: inline-flex;width: 100%;"><strong style="width: 120px;">Payment Date:</strong>${date}</p></td></tr></tbody></table></td></tr><tr><td><hr></td></tr><tr><td>`;
    return `${table}${tbody}${tableClose}`;
}

export const mailFooter = () => {
  return `<table width="100%" border="0" cellpadding="0" cellspacing="0" ><tbody><tr><td align="center"><p style="text-align: center;"> <img style="margin: 0 auto;" src="http://award-test.arachnomesh.com/uploads/mailFiles/footer-channelier.png"></p><p style="text-align: center;width: 100%; display: inline-flex;flex-direction: row; justify-content: center; margin:0 ;"> <a href="https://www.instagram.com/channelier_/" target="_blank"><img src="http://award-test.arachnomesh.com/uploads/mailFiles/instagram-icon.png" width="25px"></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://www.facebook.com/channelier/" target="_blank"><img src="http://award-test.arachnomesh.com/uploads/mailFiles/facebook-icon.png" width="25px"></a>&nbsp;&nbsp;&nbsp;&nbsp; <a href="https://twitter.com/Channelier" target="_blank"><img src="http://award-test.arachnomesh.com/uploads/mailFiles/twitter-icon.png" width="30px"></a></p><p style="text-align: center;"><a style="color: #000; text-decoration: none; line-height: 1.5; padding-right: 5px;font-size: 14px;" target="_blank" href="">Terms of Use</a> &nbsp;| &nbsp; <a style="color: #000; text-decoration: none; line-height: 1.5; padding-right: 5px;font-size: 14px;" target="_blank" href=""> Privacy policy</a></p></td></tr></tbody></table></td></tr><tr bgcolor="#25282f"><td><p style="color: #747474; line-height: 1; margin:12px 0; font-size: 14px;text-align: center;">Copyrights © 2022    All Rights Reserved by <a href="https://www.arachnomesh.com/" target="_blank" style="color: #fb6567;text-decoration: none;">Arachnomesh Technologies</a></p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></body></html>`;
}
