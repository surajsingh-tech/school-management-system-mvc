
const router = require('express').Router()

// एक्सपोर्ट करो ताकि app.js में यूज़ हो सके
module.exports = router;

// front.js से राउटर इम्पोर्ट करो
const frontRouter = require('./userFront');

// frontRouter को माउंट करो
router.use('/', frontRouter);

//for admin
const adminRouter=require('./admin/home')
router.use('/admin', adminRouter);

//for admin events
const eventRouter=require('./admin/event')
router.use('/admin',eventRouter)

