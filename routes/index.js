const router = require('express').Router()

// Export so it can be used in app.js
module.exports = router;

// Import router from front.js
const frontRouter = require('./user/userFront');
const userContectUsRouter = require('./user/userContactUs')

// Mount frontRouter
router.use('/', frontRouter);
router.use('/', userContectUsRouter);

// For admin
const adminRouter = require('./admin/home')
router.use('/admin', adminRouter);

// For admin events
const eventRouter = require('./admin/event')
router.use('/admin', eventRouter)

const settingRouter = require('./admin/setting')
router.use('/admin', settingRouter)

const enquiryRouter = require('./admin/enquiry')
router.use('/admin', enquiryRouter)