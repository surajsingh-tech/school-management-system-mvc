//for Check Schema Validation
const mongoose = require("mongoose"); //for validate id in mongo   (!mongoose.Types.ObjectId.isValid(id))
const Event = require("../../models/events");
const fs = require("fs").promises;
const path = require("path");

let adminEventsPage = async (req, res) => {
  try {
    let data = await Event.find().sort({ _id: -1 });
    res.render("admin/events/events.hbs", {
      title: "Admin Events Page",
      page: "Admin",
      data: data,
    });
  } catch (err) {
    console.log(err);
  }
};

let adminEventsCreatePage = async (req, res) => {
  try {
    res.render("admin/events/createEvents.hbs", {
      title: "Admin Events Create Page",
      page: "Admin",
      data: {},
    });
  } catch (err) {}
};

let adminEventsShowPage = async (req, res) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      // If the ID is not a valid 24-character MongoDB ObjectId, return a 400 Bad Request
      return res.status(400).send("Invalid Event ID");
    }

    const data = await Event.findById(id);
    if (data) {
      res.render("admin/events/eventView.hbs", {
        event: data,
        title: "Admin Event View Page",
        page: "Admin",
      });
    } else {
      res.status(404).send("Event not found");
    }
  } catch (err) {
    console.error("Error in adminEventsShowPage:", err);
    return res.status(500).send("Internal Server Error");
  }
};

let adminEventsUpdatePage = async (req, res) => {
  try {
    let id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       res.status(400).send("Invalid Event ID");
    }

    let data = await Event.findById(id);
    console.log("data Data",data);
    
    if (data) {
       res.render("admin/events/eventUpdate.hbs", {
        title: "Admin Events Update Page",
        page: "Admin",
        data: data,
      });
    } else {
       res.status(404).render("admin/events/events.hbs", {
        error: "Event not found",
      });
    }
  } catch (err) {
    console.error("Something went wrong:", err.message);
     res.status(500).render("admin/events/events", {
      error: "Server error while updating event",
    });
  }
};

let eventUpdateStore=async (req,res)=>{
  let preEvent;
  try{
    let id=req.params.id;
     preEvent=await Event.findById(id)
    if (!preEvent) {
      return res.status(404).send("Event not found");
    }

    // Update object 
    const updateData = {
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      longDescription: req.body.longDescription,
      date: req.body.date,
      active: req.body.active,
      pic: req.file ? `/uploads/events/${req.file.filename}` : preEvent.pic,
      updatedBy: "Admin",
      updatedAt: new Date()
    };

     // Update call
     await Event.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
     res.redirect("/admin/events"); 
  }
    catch(err){
      console.log("data Update ERRor",err.errors.title)
     const fieldErrors = err.errors || {};
      const mergedData = {
        _id: preEvent._id,

        // Title
        title: fieldErrors.title
          ? req.body.title // error आया तो req.body वाला ही
          : (req.body.title !== undefined && req.body.title.trim() !== ""
              ? req.body.title // user ने नया लिखा है
              : preEvent.title), // वरना पुराना

        // Short Description
        shortDescription: fieldErrors.shortDescription
          ? req.body.shortDescription
          : (req.body.shortDescription !== undefined && req.body.shortDescription.trim() !== ""
              ? req.body.shortDescription
              : preEvent.shortDescription),

        // Long Description
        longDescription: fieldErrors.longDescription
          ? req.body.longDescription
          : (req.body.longDescription !== undefined && req.body.longDescription.trim() !== ""
              ? req.body.longDescription
              : preEvent.longDescription),

        // Date
        date: fieldErrors.date
          ? req.body.date
          : (req.body.date !== undefined && req.body.date.trim() !== ""
              ? req.body.date
              : preEvent.date),

        // Active
        active: fieldErrors.active
          ? req.body.active
          : (typeof req.body.active !== "undefined"
              ? req.body.active
              : preEvent.active),

        // Pic
        pic: req.file ? `/uploads/events/${req.file.filename}` : preEvent.pic,
      };

        res.render("admin/events/eventUpdate.hbs", {
          title: "Admin Events Update Page",
          page: "Admin",
          errorMessage: err.errors || err.message,
          data: mergedData, 
    });
  }
}


let adminEventsDeletePage = async (req, res) => {
  try {
    let id = req.params._id;
    let data = await Event.findById(id);
    console.log("data", data);
    if (data) {
      try {
        const filePath = path.join(__dirname, "../../public", data.pic);
        await fs.unlink(filePath);
        console.log("File deleted successfully");
      } catch (err) {
        console.log("File delete error:", err);
      }
      await Event.deleteOne({ _id: id });
    }
    res.redirect("/admin/events");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error deleting event");
  }
};

let eventStorePage = async (req, res) => {
  try {
    var data = new Event(req.body); //- new Event(req.body) → नया Mongoose document बनाता है, validation attach करता है, और .save() allow करता है
    if (req.file) {
      data.pic = `/uploads/events/${req.file.filename}`; // This path will be used by the browser to display the image via <img src="{{pic}}">
    }
    data.createdBy = "Admin";
    await data.save();
    res.redirect("/admin/events");
  } catch (err) {
    // if validation error
    res.render("admin/events/createEvents.hbs", {
      title: "Admin Events Create Page",
      page: "Admin",
      errorMessage: err.errors, // mongoose error messages
      formData: req.body, // pass back user input
    });
  }
};

module.exports = {
  adminEventsPage,
  adminEventsCreatePage,
  adminEventsUpdatePage,
  eventStorePage,
  adminEventsDeletePage,
  adminEventsShowPage,
  eventUpdateStore
};
