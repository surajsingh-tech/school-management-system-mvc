const userContectUsRouter=require('express').Router()
const{getContactCreatePage,contectStore}=require('../../controllers/user/userContectUs')

userContectUsRouter.get("/contactUs",getContactCreatePage)
userContectUsRouter.post("/contactStore",contectStore)
module.exports=userContectUsRouter;
