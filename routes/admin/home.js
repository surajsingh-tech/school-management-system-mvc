const adminRouter=require('express').Router();
const {adminHomePage}=require('../../controllers/admin/adminHome')
adminRouter.get('/',adminHomePage)

module.exports=adminRouter;
