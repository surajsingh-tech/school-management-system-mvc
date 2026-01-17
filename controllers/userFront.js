let homePage = (req,res) => {
  res.render('pages/index', { title: 'Home' })
}
let aboutPage = (req,res) => {
  res.render('pages/aboutPage', { title: 'About', page: 'About ' })
}
let featuresPage = (req,res) => {
  res.render('pages/featuresPage', { title: 'Features', page: 'Features ' })
}
let departmentsPage = (req,res) => {
  res.render('pages/departmentsPage', { title: 'Departments', page: 'Departments ' })
}

let enquiryPage = (req,res) => {
  res.render('pages/enquiryPage', { title: 'Enquiry', page: 'Enquiry ' })
}
let faqPage = (req,res) => {
  res.render('pages/faqPage', { title: 'FAQ', page: 'FAQ Page' })
}
let galleryPage = (req,res) => {
  res.render('pages/galleryPage', { title: 'Gallery', page: 'Gallery ' })
}
let teamPage = (req,res) => {
  res.render('pages/teamPage', { title: 'Team', page: 'Team Page' })
}
let testimonialPage = (req,res) => {
  res.render('pages/testimonialPage', { title: 'Testimonial', page: 'Testimonial ' })
}
let contactUsPage = (req,res) => {
  res.render('pages/contactUsPage', { title: 'Contact', page: 'Contact ' })
}

let eventsPage = (req,res) => {
  res.render('pages/eventsPage', { title: 'Events', page: 'Events ' })
}

// shorthand export
module.exports = {
  homePage,
  aboutPage,
  featuresPage,
  departmentsPage,
  contactUsPage,
  enquiryPage,
  faqPage,
  galleryPage,
  teamPage,
  testimonialPage,
  eventsPage
}