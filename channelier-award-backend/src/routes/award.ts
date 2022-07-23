import { Router } from "express";
import multer from "multer";
import config from "../config/config";
import awardController from "../controllers/awardController";
import { checkAuth } from "../middleware/checkAuth";

const storage = multer.diskStorage(
    {
        destination: config.filePath.img,
        filename: function (req, file, cb) {
            cb(null, JSON.parse(req.body.data).nominationId + '.' +file.mimetype.split('/').reverse()[0]);
        }
    }
);
const upload = multer({storage: storage});
const awardRouter = Router();

awardRouter.get('/question/:id', checkAuth(['user', 'jury', 'admin','superAdmin']), awardController.getQuestion);
awardRouter.post('/answer', upload.single('file'),checkAuth(['user']), awardController.postAnswer);
awardRouter.get('/answer/:id', checkAuth(['user', 'jury', 'admin','superAdmin']), awardController.getAnswerOfNomination);
awardRouter.get('/partBanswer/:userId', awardController.getAnswerOfPartBNomination);






awardRouter.post('/answerForAdmin', checkAuth(['admin']), awardController.getAnswerOfNominationForAdmin);
awardRouter.get('/getAssignedNominationHierarchy', checkAuth(['jury']), awardController.getAssignedNominationHierarchy);
awardRouter.post('/setScore', checkAuth(['jury']), awardController.setScore);
awardRouter.post('/getAssignedNominationByCompany', checkAuth(['jury']), awardController.getAssignedNominationByCompany);
awardRouter.post('/getAssignedNomination', checkAuth(['jury']), awardController.getAssignedNomination);
awardRouter.get('/isBrandRelated/:id', checkAuth(['user', 'jury', 'admin','superAdmin']), awardController.isBrandRelated);
export default awardRouter;