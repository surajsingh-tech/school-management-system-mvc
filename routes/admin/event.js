const eventRouter=require('express').Router();
const {adminEventsPage,adminEventsCreatePage,adminEventsUpdatePage,eventStorePage,adminEventsDeletePage,adminEventsShowPage}=require('../../controllers/admin/adminEvents')
const {eventsUploader}=require('../../middlewares/FileUploader');
eventRouter.get('/events',adminEventsPage)
eventRouter.get('/events/createPage',adminEventsCreatePage)
eventRouter.get('/events/updatePage/:id',adminEventsUpdatePage)
eventRouter.get('/event/delete/:_id',adminEventsDeletePage)
eventRouter.get('/event/view/:id',adminEventsShowPage)
eventRouter.post('/events/store', eventsUploader.single('pic'), eventStorePage)

module.exports=eventRouter;
