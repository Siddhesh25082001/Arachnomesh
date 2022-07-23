import { Juries } from '../models/jury';
import fs from 'fs';
var webp = require("webp-converter");
import { Team } from '../models/teamProfile';
import { Nomination } from '../models/nomination';
import { Nominee } from '../models/nomineeProducts';
import config from '../config/config';
const path = require('path');
// import sharp from 'sharp';
// sharp.cache(false)
import { ProductList } from '../models/product';
import { Answer, IAnswer } from '../models/answer';
import { AnswerType } from '../models/question';
import { Score } from '../models/score';


let final_data: any = {};
let level_2: any = [];
let level_3: any = [];
let level_4: any = [];


const tempFxn=async function(){
    // Juries.updateMany({},{$set: {year:['2020']}}, function(error) {
    //     if(error){
    //         return;
    //     }
    // });
   
    // for (let index = 1; index <= 171; index++) {
    // }
    // let data = {
    //     sorting: 2001
    // }
    //let update = await Nomination.updateMany({ archive: { $ne: true } }, data);
    
  
    // let update = await Nomination.updateMany({ archive: { $ne: true } }, data);
    
    // const data = await Nominee.aggregate([
    //     {
    //         $match: {'payment':true}
    //     }, {
    //         $lookup: {
    //             from: "Users",
    //             localField: "user",
    //             foreignField: "_id",
    //             as: "user"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "awardList",
    //             localField: "awardCategory",
    //             foreignField: "_id",
    //             as: "award"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "productList",
    //             localField: "productCategory",
    //             foreignField: "_id",
    //             as: "productCategory"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "productList",
    //             localField: "productSubCategory",
    //             foreignField: "_id",
    //             as: "productSubCategory"
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "productList",
    //             localField: "productSubSubCategory",
    //             foreignField: "_id",
    //             as: "productSubSubCategory"
    //         }
    //     },
    // ]);

       
      
       
    // data.forEach(async element => {
    //     let data:any={};
    //     data["companyName"]=element["user"][0]["companyName"];
    //     data["productName"]=element["productName"];
    //     data["awardCategory"]=element["award"][0]["awardName"];
    //     data["productCategory"] = element["productCategory"][0]["productName"];
    //     data["productSubCategory"] = element["productSubCategory"][0]["productName"];
    //     data["productSubSubCategory"] = element["productSubSubCategory"][0]?.productName;
    //     data["date"] = new Date(element["createdAt"]).toDateString();
    //     data["comment"] = element["user"][0]["comment"];
    //     final_data.push(data);
    // });

    // const dirPath = path.join(__dirname, '../../');
       
    // fs.writeFile(
    //     `${dirPath}/${config.filePath.img}/data.json`,
    //     JSON.stringify(final_data),
    //     function (err) {
    //         if (err) throw err;
    //         console.log("Object Saved!");
            
    //     }
    // );


        


    //   let category_key:any={};
    //   let keyflag = element["productSubSubCategory"][0]?.productName || "";
    //     if (keyflag!="") {
    //         let index=checkKeyExist(keyflag)
    //             if (index) {
    //                  final_data[index][keyflag].push(element)
    //                }
    //             else{
    //                 category_key[keyflag.toString()] = [];
    //                 category_key[keyflag].push(element)
    //                 final_data.push(category_key);
    //                }
    //         }
    //     });
    //     console.log(final_data);
        
   


// function checkKeyExist(checkkey:any){
//     for (let index = 0; index < final_data.length; index++) {
//         const element = final_data[index];
//         let key=Object.keys(element)[0];
//             if (checkkey==key) {
//                return index;
//                 break;
//                }
        
//     };

    
// }
     

/* ------------------------WebP Image Script ---------------------------------*/

// const dirPath = path.join(__dirname, '../../uploads/awards');

    let dirPath="/var/uploads/awards2";
    fs.readdir(dirPath, function (err, filenames) {
        if (err) {
          
           console.log(err);
           
        }

        filenames.forEach(function (filename) {
            console.log(filename);
            let type = filename.split('.').pop();
            if(type === 'webp') {
                // fs.unlinkSync(dirPath+"/"+filename);
                // sharp(dirPath+"/"+filename).flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } }).resize( {
                //             fit: sharp.fit.contain,
                //             width : 500,
                //         }).toFile(`${dirPath}/${filename}`, (err, resizeImage) => {
                //                     if (err) {
                //                         console.log(err);
                //                     } else {
                //                        //console.log(resizeImage);
                //                     }
                //                 })

                // async function resizeFile(path : any) {
                //     let buffer = await sharp(path).resize({fit: sharp.fit.contain,width : 500}).toBuffer();
                //     return sharp(buffer).toFile(`${dirPath}/${filename}`)
                    
                // }
                // resizeFile(dirPath+"/"+filename)
            }

            
            // const result = webp.cwebp(dirname+"/"+filename, `${dirname}/${filename.substring(0,filename.lastIndexOf('.'))}.webp`, "-q 80");
            // result.then((response: any) => {
            //     // fs.unlinkSync(dirname+"/"+filename);

            //     console.log(response);
            // })
            

        });

        // filenames.forEach(function (filename) {
        //     sharp(dirPath+"/"+filename).flatten({ background: { r: 255, g: 255, b: 255, alpha: 0 } }).resize( {
        //         fit: sharp.fit.contain,
        //         width : 500,
        //     }).webp({quality: 80}).toFile(`${dirPath}/${filename.substring(0, filename.lastIndexOf('.'))}.webp`, (err, resizeImage) => {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //            //console.log(resizeImage);
        //         }
        //     })
        // })

        
    });

/* ------------------------Categories Script ---------------------------------*/
const category2 = await ProductList.find({ level: "2" },"productName");
category2.forEach(item => {
    level_2.push(item.productName);
})
final_data['ProductCategory'] = level_2;

const category3 = await ProductList.find({ level: "3" },"productName");
category3.forEach(item => {
    level_3.push(item.productName);
})
final_data['ProductSubCategory'] = level_3;

const category4 = await ProductList.find({ level: "4" },"productName");
category4.forEach(item => {
    level_4.push(item.productName);
})
final_data['ProductSubSubCategory'] = level_4;

console.log(final_data);

// const dirPath = path.join(__dirname, '../../');
       
    fs.writeFile(
        `${dirPath}/data_cat.json`,
        JSON.stringify(final_data),
        function (err) {
            if (err) throw err;
            console.log("Object Saved!");
            
        }
    );
}

const getOnlyCompanyLogo= async function(){
    let base64Count=0;
    const companyData=await Nomination.find({});
    console.log(companyData.length);
    
 
   
   
    companyData.forEach(element => {
        if (typeof element.companyLogo !="undefined") {
            if (element.companyLogo.includes("base64")) {
                console.log(base64Count++);

            } else {
                let logoChunks = element.companyLogo.split("/")
                console.log(logoChunks);
                
                let fileName = logoChunks[2];
                let fileFirstPath = logoChunks[1];
                let pathToFile = `/var/${fileFirstPath}/awards/${fileName}`;
                let pathToNewDestination = `/var/companyLogo/${fileName}`;
                console.log(pathToFile);
                console.log(pathToNewDestination);
                
                


                fs.copyFile(pathToFile, pathToNewDestination, function (err) {
                    if (err) {
                        console.log(err);

                    } else {
                        console.log("Successfully copied and moved the file!")
                    }
                })
            }


        }
            });

}

const getJuryExcels= async function(){
    const jury=await Juries.find({year:"2020"});
    let juryData:any={};
    let juryArray:any=[];
    let pathToNewDestination = `/var/uploads/awards`;
    jury.forEach(element => {
      
        juryData["name"]=element.name;
        juryData["email"]=element.email;
        juryData["mobile"]=element.phone;
        juryData["company"]=element.description;
        juryData["desgination"]=element.designation;
        juryData["website"]=element.website;
        juryData["year"]=element.year;
       

        fs.appendFile(
            `${pathToNewDestination}/jurydata.json`,
            JSON.stringify(juryData),
            function (err) {
                if (err) throw err;
                console.log("Object Saved!");
                
            }
        );

    });
    
       
    
}

const updateQuestionAnswers= async function(){
    Answer.bulkWrite([
        {
            updateMany : 
                {
                    "filter": {$or: [{"mapId": 'qc-006'}, {"mapId": 'qc-017'}]},
                    "update": { $set : {"scores": null}}
                }
        }
    ]);
}

const updateMarks= async function(){
    const nom=await Nominee.find({answerSubmitted: true});
    for(let val of nom) {
        const answers=await Answer.find({nominationId: val._id});
        let marks=0;
        for(let ans of answers) {
            if(ans.scores) {
                for(let i=0;i<ans.scores.length;i++) {
                    if(ans.scores[i].score) {
                        marks =marks + ans.scores[i].score;
                    }
                }
            }
        }
        await Nominee.updateOne({_id: val._id}, {totalMarks: marks}); 
    }
}


const updateScores= async function(){
    const nominations=['qc-007', 'qc-008', 'qc-009', 'qc-010', 'qc-011'];
    for(var i=0;i<nominations.length;i++) {
        const answers=await Answer.find({mapId: nominations[i], scores: {$exists: true, $size: 0}});
        for(let val of answers) {
            if (val.answerType === AnswerType.SingleSelect || val.answerType === AnswerType.MultiSelect || val.answerType === AnswerType.SubQuest) {
                let score;
                switch (val.answerType) {
                    case AnswerType.SingleSelect:
                        if(val.field) {
                            const selected = parseInt(val.field.selected);
                            score = new Score({score: selected * 2, judgeId: null});
                            val.scores = [score];
                        }
                        break;
                    
                    case AnswerType.MultiSelect:
                        if(val.field) {
                            const fields = Object.keys(val.field);
                            let count = 0;
                            fields.forEach(key => {
                                if (key.includes('opt') && val.field[key]) {
                                    count++;
                                }
                            });
                            score = new Score({score: count * 2, judgeId: null});
                            val.scores = [score];
                        }
                        break;

                    case AnswerType.SubQuest:
                        if(val.field) {
                        const keyList = Object.keys(val.field);
                            let c = 0;
                            keyList.forEach(key => {
                                if (val.field[key] === "1") {
                                    c++;
                                }
                            });
                            score = new Score({score: c, judgeId: null});
                            val.scores = [score];
                        }
                        break;
                    default:
                        break;
                }
                await Answer.updateOne({ _id: val._id }, { scores: val.scores });
            }
        }
    }
    await updateMarks();
}

export default {
    tempFxn,
    getOnlyCompanyLogo,
    getJuryExcels,
    updateQuestionAnswers,
    updateMarks,
    updateScores,
}
