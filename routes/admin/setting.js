const settingRouter=require('express').Router();
const {settingCreatePage,viewSetting,settingStorePage}=require('../../controllers/admin/adminSetting')
settingRouter.get('/createSettting',settingCreatePage)
settingRouter.post('/setting/store',settingStorePage)
settingRouter.get('/setting',viewSetting)
module.exports=settingRouter;
