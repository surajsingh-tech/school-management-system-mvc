let enquiryRouter=require('express').Router()
const {enquiryPage,enquiryView,enquiryDelete,updateEnquiry,updateEnquiryStore}=require('../../controllers/admin/adminEnquiry')

enquiryRouter.get('/enquiry',enquiryPage)
enquiryRouter.get('/enquiry/view/:id',enquiryView)
enquiryRouter.get('/enquiry/update/:id',updateEnquiry)
enquiryRouter.get('/enquiry/delete/:id',enquiryDelete)
enquiryRouter.post('/enquiry/update/store/:id',updateEnquiryStore)

module.exports=enquiryRouter;