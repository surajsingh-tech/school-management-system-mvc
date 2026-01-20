const settingRouter=require('express').Router();
const {settingCreatePage}=require('../../controllers/admin/adminSetting')
// settingRouter.get('/setting',adminEventsPage)
settingRouter.get('/createSettting',settingCreatePage)

module.exports=settingRouter;
