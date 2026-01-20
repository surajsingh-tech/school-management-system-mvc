//for Check Schema Validation
const mongoose = require("mongoose"); 
const Setting = require("../../models/adminSetting");


let settingCreatePage = async (req, res) => {
  try {
     let data= await Setting.findOne()
     res.render("admin/setting/createSetting.hbs", {
      title: "Admin Setting Create Page",
      page: "Admin",
      data: data||{},
    });
  } catch (err) {
    console.log("error",err);
    res.send(err.message)
  }
};


let viewSetting=async(req,res)=>{
    try{
      let data= await Setting.findOne()
      console.log("Data setting",data);
      res.render('admin/setting/viewSetting.hbs',{
      title: "Admin Setting Page",
      page: "Admin",
      data: data||{}, 
      })}
    catch(err){
      res.send(err.message)
    }
}


let settingStorePage = async (req, res) => {
  try {
    let prevData = await Setting.findOne();

    if (prevData) {
      await Setting.findByIdAndUpdate(prevData._id, {
        $set: {
          ...req.body,
          updateBy: "Admin"
        }
      }, { new: true, runValidators: true });
    } else {
      let data = new Setting({
        ...req.body,
        createBy: "Admin",
        updateBy: ""
      });
      await data.save();
    }
    
    res.redirect("/admin/setting");
  } catch (err) {
    res.render("admin/setting/createSetting.hbs", {
      title: "Admin Events Create Page",
      page: "Admin",
      errorMessage: err.errors,
      formData: req.body,
    });
  }
};

module.exports = {
  settingCreatePage,
  settingStorePage,
  viewSetting
};
