//for Check Schema Validation 
const mongoose = require("mongoose");  //for validate id in mongo   (!mongoose.Types.ObjectId.isValid(id)) 
const Event = require('../../models/events');
const fs=require('fs').promises;
const path=require('path')

let adminEventsPage =async(req,res) => {
  try{
    let data=await Event.find().sort({_id:-1})
      res.render('admin/events/events.hbs', {
      title: 'Admin Events Page',
      page: 'Admin',
      data:data
  })
  }
  catch(err){
    console.log(err); 
  }
}  

let adminEventsCreatePage =async(req,res) => {
  try{
    res.render('admin/events/createEvents.hbs', {
    title: 'Admin Events Create Page',
    page: 'Admin', 
    data:{}
  })
  }
  catch(err){

  }
}


let adminEventsShowPage = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {       // If the ID is not a valid 24-character MongoDB ObjectId, return a 400 Bad Request
      return res.status(400).send("Invalid Event ID");
    }

    const data = await Event.findById(id);

    if(data)
    {
     res.render('admin/events/eventView.hbs', { event:data ,title: 'Admin Event View Page',page: 'Admin'});
    }
    else{
       res.status(404).send("Event not found");
    }
  
  } catch (err) {
    console.error("Error in adminEventsShowPage:", err);
    return res.status(500).send("Internal Server Error");
  }
};



let adminEventsUpdatePage =async(req,res) => {
  try{
    let data=await Event.find().sort({_id:-1})
     res.render('admin/events/updateEvents.hbs', {
     title: 'Admin Events Update Page',
     page: 'Admin'
  })
  }
  catch(err){

  }
}

let adminEventsDeletePage =async(req,res) => {
  try{
    let id=req.params._id;
    let data=await Event.findById(id)
    console.log("data",data);
    if(data)
    {
         try{
          const filePath=path.join(__dirname,"../../public",data.pic)
         await fs.unlink(filePath)
          console.log("File deleted successfully");
         } 
         catch(err)
         {
            console.log("File delete error:", err);
         }
         await Event.deleteOne({ _id: id });
    }
     res.redirect('/admin/events'); 
  }
  catch(err){
     console.log(err);
    res.status(500).send("Error deleting event");
  }
}


let eventStorePage = async (req, res) => {
  try {
    var data=new Event(req.body)//- new Event(req.body) → नया Mongoose document बनाता है, validation attach करता है, और .save() allow करता है
    if(req.file)
    {
      data.pic=`./uploads/events/${req.file.filename}`
    }
    data.createdBy='Admin'
    await data.save()
    res.redirect('/admin/events')
  } catch (err) {
    // if validation error
    res.render('admin/events/createEvents.hbs', {
      title: 'Admin Events Create Page',
      page: 'Admin',
      errorMessage: err.errors, // mongoose error messages
      formData: req.body        // pass back user input
    });
  }
};

module.exports = {
  adminEventsPage,
  adminEventsCreatePage,
  adminEventsUpdatePage,
  eventStorePage,
  adminEventsDeletePage,
  adminEventsShowPage
}