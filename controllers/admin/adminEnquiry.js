let UserEnquiry=require('../../models/user/userContactUs')
let mongoose=require('mongoose');
let enquiryPage=async(req,res)=>{
  try{
    let data=await UserEnquiry.find()
    res.render('admin/enquiry/enquiryPage.hbs',{
      title: "Admin Enquiry Page",
      page: "Admin",
      data: data||{},
      errMsg:req.params.err?'User Enquiry not Found':null
    })
  }
  catch(err)
  {
    res.status(500).send("Server Error")
  }
}


let enquiryView=async(req,res)=>{
  try{
    id=req.params.id;
    let data=await UserEnquiry.findById(id)
    if (!mongoose.Types.ObjectId.isValid(id)) {
           res.status(400).send("Invalid Event ID");
        }
    
    if(data)
    {
      res.render('admin/enquiry/enquiryView.hbs',{
      title: "User Enquiry Detail Page",
      page: "Admin",
      user: data||{},
      })
    }
    else{
      res.redirect('admin/enquiry?err=1')
    }
  }
  catch(err){
    res.status(500).send("Server Issue")
  }
}

let updateEnquiry=async(req,res)=>{
  try{
    let id=req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
           res.status(400).send("Invalid Event ID");
        }
    let oldData=await UserEnquiry.findById(id)
    if(oldData)
    {
      res.render('admin/enquiry/enquiryUpdate.hbs',{
      title: "User Enquiry Update Page",
      page: "Admin",
      userData: oldData,
      })
    }
    else{
      res.send("User Id not Found")
    }
  }
  catch(err)
  {
    res.render('admin/enquiry/enquiryPage.hbs',{
      title: "Admin Enquiry Page",
      page: "Admin",
      data: data||{},
      errMsg:"User data not found"
    })
  }
} 



let updateEnquiryStore = async (req, res) => {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid Enquiry ID");
    }

    // ONLY allow status
    const { status } = req.body;

    let updatedData = await UserEnquiry.findByIdAndUpdate(
      id,
       { $set: { status } }, // only status update
      {
        new: true,
        runValidators: true // enum validation 
      }
    );
   
    if (!updatedData) {
      return res.send("User data not found");
    }

    res.redirect("/admin/enquiry");

  } catch (err) {
    let msg = err.message;
    if (err.name === "ValidationError") {
      msg = Object.values(err.errors).map(e => e.message).join(", ");
    }

    res.render("error", {
      title: "User Update Enquiry Page",
      page: "Admin",
      errMsg: msg
    });
  }
};


let enquiryDelete = async (req, res) => {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      req.flash("error", "Invalid Enquiry ID");
      return  res.redirect(req.get("Referrer") || "/admin/enquiry");
    }

    let userData = await UserEnquiry.findById(id);
    if (!userData) {
      req.flash("error", "Enquiry not found");
      return  res.redirect(req.get("Referrer") || "/admin/enquiry");
    }

    let enquiryStatus = userData.status;
    if (enquiryStatus === "resolve" || enquiryStatus === "reject") {
      const deletedEnquiry = await UserEnquiry.findByIdAndDelete(id);

      if (!deletedEnquiry) {
        req.flash("error", "Enquiry not found");
        return  res.redirect(req.get("Referrer") || "/admin/enquiry");
      } else {
        req.flash("success", "Enquiry deleted successfully");
        return res.redirect("/admin/enquiry");
      }
    } else {
      req.flash("error", "Please Resolve || Reject the user query first then delete");
      return  res.redirect(req.get("Referrer") || "/admin/enquiry"); 
    }
  } catch (err) {
    req.flash("error", "Server Issue");
    res.redirect(req.get("Referrer") || "/admin/enquiry");
  }
};

module.exports={
  enquiryPage,
  enquiryView,
  updateEnquiry,
  enquiryDelete,
  updateEnquiryStore
}