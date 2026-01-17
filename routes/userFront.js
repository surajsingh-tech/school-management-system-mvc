const frontRouter=require('express').Router();
const {homePage,aboutPage,departmentsPage,featuresPage, testimonialPage, contactUsPage, faqPage, galleryPage, teamPage, enquiryPage, eventsPage}=require('../controllers/userFront')
frontRouter.get('/',homePage)
frontRouter.get('/about',aboutPage)
frontRouter.get('/departments',departmentsPage)
frontRouter.get('/features',featuresPage)
frontRouter.get('/contactUs',contactUsPage)
frontRouter.get('/testimonial',testimonialPage)
frontRouter.get('/faq',faqPage)
frontRouter.get('/gallery',galleryPage)
frontRouter.get('/team',teamPage)
frontRouter.get('/enquiry',enquiryPage)
frontRouter.get('/events',eventsPage)
module.exports=frontRouter;