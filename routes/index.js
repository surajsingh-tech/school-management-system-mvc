
const router = require('express').Router()

// एक्सपोर्ट करो ताकि app.js में यूज़ हो सके
module.exports = router;

// front.js से राउटर इम्पोर्ट करो
const frontRouter = require('./user/userFront');
const userContectUsRouter=require('./user/userContactUs')

// frontRouter को माउंट करो
router.use('/', frontRouter);
router.use('/', userContectUsRouter);
//for admin
const adminRouter=require('./admin/home')
router.use('/admin', adminRouter);

//for admin events
const eventRouter=require('./admin/event')
router.use('/admin',eventRouter)

const settingRouter=require('./admin/setting')
router.use('/admin',settingRouter)