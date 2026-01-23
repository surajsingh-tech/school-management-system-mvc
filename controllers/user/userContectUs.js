
const UserContact=require('../../models/user/userContactUs');

let getContactCreatePage=async(req,res)=>{
      try
      {
        res.render('pages/contactUsPage.hbs',{
            title: "Contact Page",
            page: "ContactUs ",
            successMessage: req.query.success ? "Your Form Successfully Submitted" : null,
            scroolTarget: "contactFormSection" 
        })
      }
      catch(err)
      {
        res.status(500).send("Server Issue ")
      }
}

let contectStore=async(req,res)=>{
  try{
     let trimmedData = {};

    for (let key in req.body) {
      let value=req.body[key]
      if (typeof req.body[key] === 'string') {
        trimmedData[key] = value.trim(); // or also write like  req.body[key].trim()
      } else {
        trimmedData[key] = value;
      }
    }

    let contact=new UserContact(trimmedData)
    await contact.save()
     res.redirect('/contactUs?success=1');
  }
  catch(err){
    console.log("Err",err.errors);
    res.render('pages/contactUsPage.hbs',{
      title: "Contact Page",
      page: "ContactUs ",
      errorMessage: err.errors,
      formData: req.body,
      scroolTarget: "contactFormSection"  // for auto-scrolling to the form section (center) after page reload
    })
  }
}


module.exports={
  getContactCreatePage,
  contectStore
} 