//for Check Schema Validation
const mongoose = require("mongoose"); //for validate id in mongo   (!mongoose.Types.ObjectId.isValid(id))
const Setting = require("../../models/adminSetting");
const fs = require("fs").promises;
const path = require("path");

let settingCreatePage = async (req, res) => {
  try {
    res.render("admin/setting/createSetting.hbs", {
      title: "Admin Setting Create Page",
      page: "Admin",
      data: {},
    });
  } catch (err) {
    res.send(err.message)
  }
};



let settingStorePage = async (req, res) => {
  try {
    var data = new Setting(req.body); 
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
  settingCreatePage,
  settingStorePage
};
