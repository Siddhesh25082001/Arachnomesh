import express from 'express';
import Controller from '../controllers/controller';
import OTPService from '../controllers/otpservice';
import Payment from '../controllers/paymentService';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import config from '../config/config';
import otpservice from '../controllers/otpservice';
import adminRouter from './admin';
import awardRouter from './award';


const upload = multer({ dest: config.filePath.img });
const blogFiles = multer({ dest: config.filePath.blog });
const apiRouter = express.Router();
const storage = multer.diskStorage(
    {
        destination: config.filePath.mockups,
        filename: function (req, file, cb) {
            cb(null, file.originalname);
        }
    }
);
const storage_slider = multer.diskStorage(
    {
        destination: config.filePath.img,
        filename: function (req, file, cb) {            
           
            
           
            cb(null, file.originalname.replace(/ /g, ''));
        }
    }
);
const storage_slider_2 = multer.diskStorage(
    {
        destination: config.filePath.img,
        filename: function (req, file, cb) {
            
            
            var filename = Math.floor(Math.random() * 90000) + 10000 + "_" + file.originalname.replace(/ /g, '');
            cb(null, filename);
        }
    }
);


const uploadMockups = multer({ storage: storage })
const uploadSliderImage = multer({ storage: storage_slider })
const uploadSliderImage_2 = multer({ storage: storage_slider_2 })
apiRouter.post("/user-query", Controller.saveQuery)
apiRouter.get("/delete-blog/:id", Controller.deleteBlog)
apiRouter.get("/get-blog-list", Controller.getAllBlogList)
apiRouter.post("/save-award", Controller.saveAward)
apiRouter.post("/check-registration-data", Controller.checkUserRegistrationData)
apiRouter.post("/save-product", Controller.saveProduct)
apiRouter.post("/get-by-id", Controller.getBlogbyId)
apiRouter.post("/upload-mockups", uploadMockups.single('file'), (req: Request, res: Response) => {
    res.json("file uploaded");
})

//added for award 2022
apiRouter.post("/get-nomination-by-id", Controller.getNominationById)
// apiRouter.post("/upload-employee-img", uploadSliderImage.single('file'), (req: Request, res: Response) => {

//     if (res) {
//         Controller.convertAllImage(req.file);

//         res.json("file uploaded");
//     }
// })
// apiRouter.post("/upload-slider-img", uploadSliderImage_2.single('file'), (req: Request, res: Response) => {

//     if (res && typeof req.file !== 'undefined') {
//         let type = req.file.filename.split('.').pop();
//         if (type != 'webp') {
//             Controller.convertAllImage(req.file);
//         }



//         res.json({ fileName: req.file.filename, status: "file uploaded" });
//     }

// })
apiRouter.post("/add-profile", Controller.addTeamProfile);
apiRouter.post("/edit-profile", Controller.editTeamProfile);
apiRouter.get("/getEmployeeData", Controller.getTeamProfile);
// apiRouter.post("/add-blog", blogFiles.single('file'), Controller.addBlog);
// apiRouter.post("/update-blog", blogFiles.single('file'), Controller.updateblogData);
//update-blog
apiRouter.post("/blog-detail-page", Controller.blogDetail)
apiRouter.post("/save-nominee", Controller.saveNominee)
apiRouter.post("/save-user-profile", uploadSliderImage.fields([
    { name: "productImage", maxCount: 1 },
    { name: "brandLogo", maxCount: 1 },
    { name: "introVideo", maxCount: 1 }
  ]),Controller.saveUserProfile)
apiRouter.get("/get-user-profile/:id", Controller.getUserProfile)


// apiRouter.post("/add-jury", upload.fields([{ name: 'file', maxCount: 1 }, { name: 'brand', maxCount: 1 }]), Controller.addNewJury);
// apiRouter.post("/update-jury", upload.fields([{ name: 'file', maxCount: 1 }, { name: 'brand', maxCount: 1 }]), Controller.updateJury)
apiRouter.post("/delete-jury", Controller.deleteJury)
apiRouter.post("/update-nominee-details", Controller.updateNomineeDetails)

apiRouter.post("/create-user", uploadSliderImage.single('companyLogo'), Controller.createUser);
apiRouter.post("/update-user-profile",uploadSliderImage.single('companyLogo'), Controller.updateUserProfile)

apiRouter.post("/user-status/:pageNumber/:count", Controller.getUserStatus)
apiRouter.post("/get-user-nominations", Controller.getUserNominations)
apiRouter.post("/archiveNomination", Controller.archiveNomination);
apiRouter.post("/saveNominationSlider", Controller.saveNominationSlider);
apiRouter.post("/editNominationSlider", Controller.editNominationSlider);
apiRouter.post("/_editNominationSlider", Controller._editNominationSlider);
apiRouter.post("/getNominationSlider", Controller.getNominationSlider);
apiRouter.post("/archiveNominationSlider", Controller.archiveNominationSlider);
apiRouter.post("/cart", Controller.fetchCartData)
apiRouter.post("/send-otp", OTPService.sendOTP)
apiRouter.post("/update-number", Controller.checkNumberExistance, OTPService.sendOTP)
apiRouter.post("/user-login", Controller.userLogin)
apiRouter.post("/verify-otp", OTPService.verifyOTP)
apiRouter.post("/update-award", Controller.updateAward)
apiRouter.post("/update-product", Controller.updateProduct)
apiRouter.post("/remove-item", Controller.removeItemFormCart)
apiRouter.post("/checkout", Controller.checkout)
apiRouter.post("/delete-product", Controller.deleteProduct)
apiRouter.post("/confirmation", Controller.comfirmation)
apiRouter.post("/get-product-by-id", Controller.getProductById)
apiRouter.post("/get-order-id", Payment.createBookingOrder)
apiRouter.post("/confirm-booking", Payment.confirmBooking, Payment.sendMailToUser)
apiRouter.post("/confirm-booking-withZeroPayment", Payment.createBookingWithZeroPayment, Payment.confirmBooking, Payment.sendMailToUser)
apiRouter.post("/search-product", Controller.searchNominatedProduct)
apiRouter.post("/payment-details", Controller.paymentDetails)
apiRouter.post("/vote-for-product", Controller.managePolling, Controller.polling)
apiRouter.post("/lead-capture", Controller.leadCapture)
apiRouter.post("/update-status", Controller.updateStatus)
apiRouter.post("/action-by-admin", Controller.actionByAdmin)
apiRouter.post("/update-nomination", Controller.actionNomination)
apiRouter.post("/delete-data", Controller.deleteDataById)
apiRouter.post("/archive-jury", Controller.archiveAdminJuryById)
apiRouter.post("/archive-data", Controller.setArchiveFlagById)
apiRouter.post("/archive-payment", Controller.archivePaymebtById)
apiRouter.post("/delete-lead", Controller.deleteLeadById)
apiRouter.post("/website-clicks", Controller.webClicks)
apiRouter.post("/add-userqueries-remark", Controller.addRemarkuserQuery);
apiRouter.post("/user-list", Controller.getUsers)
apiRouter.post("/get-user-by-id", Controller.getUsersById)
apiRouter.post("/otp-list", Controller.getOTPUsers)
apiRouter.post("/get-campaign-group", Controller.getCampaignGroup)
apiRouter.post("/get-campaign-data", Controller.getCampaign)
apiRouter.post("/query-list",Controller.getQueries)
apiRouter.get("/award-list", Controller.getAwards)
apiRouter.get("/product-list", Controller.getProducts)
apiRouter.get("/get-user-with-nominee", Controller.getUserWithNominee)
//apiRouter.get("/get-jury-for-admin",Controller.getJuryForAdmin)
apiRouter.post("/get-jury-for-admin", Controller.getJuryForAdmin)
// apiRouter.get("/archive-jury-for-admin",(req:Request,res:Response,next:NextFunction)=>{
//     req.query.archive = 'enable';
//     next();
// },Controller.getJuryForAdmin)
apiRouter.get("/user-archive-list/:skip/:limit", (req: Request, res: Response, next: NextFunction) => {
    req.query.archive = 'enable';
    next();
}, Controller.getUsers)
apiRouter.get("/archive-query-list",(req:Request,res:Response,next:NextFunction)=>{
    req.query.archive = 'enable';
    next();
},Controller.getQueries)
apiRouter.get("/get-jury/:pageNumber/:count/:year", Controller.getJury)
apiRouter.get("/jury-slider-data/:pageNumber/:count", Controller.getSliderJury)
apiRouter.get("/get-blog/:pageNumber/:count", Controller.getBlogList)
//getUserSlider
apiRouter.get("/get-user-slider/:pageNumber/:count", Controller.getUserSlider)
apiRouter.get("/getUserNewSlider/:limit/:page", Controller.getUserNewSlider)
apiRouter.get("/getUserNewSliderWithNomination/:limit/:page/:category", Controller.getUserNewSliderWithNomination)

apiRouter.get("/polling-awads", Controller.getNominatedAwardsCat)
apiRouter.get("/send-test-mail", Payment.sendMailToUser)
apiRouter.get("/client-url/:company_name", Controller.searchNominatedProduct)
apiRouter.post("/payment-data", Controller.paymentData)
apiRouter.get("/archive-payment-list", (req: Request, res: Response, next: NextFunction) => {
    req.query.archive = 'enable';
    next();
},
    Controller.paymentData)
apiRouter.post("/get-leads", Controller.getLeads);
apiRouter.get("/get-archive-leads/:skip/:limit", (req: Request, res: Response, next: NextFunction) => {
    req.query.archive = 'enable';
    next();
}, Controller.getLeads);
apiRouter.post("/setMaster-otp", otpservice.setMasterOTP);
apiRouter.post("/getSearchField", Controller.getSearchField);
apiRouter.get("/getAllproductCategory", Controller.getAllproductCategory);
apiRouter.get("/getProductByParentId/:id", Controller.getProductByParentId);

apiRouter.use('/admin', adminRouter);
apiRouter.use('/award', awardRouter);

export default apiRouter;