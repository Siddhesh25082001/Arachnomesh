import { Router } from "express";
import adminController from "../controllers/adminController";
import { checkAuth } from "../middleware/checkAuth";

const adminRouter = Router();

adminRouter.get('/nominationByCategory', adminController.nominationByHierarchicalCategory);
adminRouter.get('/nominationByFlatCategory', adminController.nominationByFlatCategory);
adminRouter.get('/nomination-details/:id', adminController.getNomination);
adminRouter.get('/getNominationAssignment/:id', adminController.getNominationAssignment);
adminRouter.get('/getJuryData/:id', adminController.getJuryData);
adminRouter.post('/getNominationByproductId',checkAuth(['admin']), adminController.getNominationByproductId);
adminRouter.post('/update-nomination', checkAuth(['superAdmin']), adminController.updateNomination);
adminRouter.post('/login-user', adminController.loginAdminUser);
adminRouter.get('/export-category', adminController.exportCategory);
adminRouter.post('/assignNomination', adminController.assignNominationTojury);

export default adminRouter;