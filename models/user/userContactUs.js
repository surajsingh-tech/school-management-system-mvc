let mongoose = require('mongoose');

let userContect = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, "Name is required"], 
    minlength: [3, "Name must be at least 3 characters"], 
    maxlength: [25, "Name must not exceed 25 characters"] 
  },
  email: { 
    type: String, 
    required: [true, "Email is required"], 
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"] 
  },
  phone: {  
    type: String,  
    required: [true, "Phone number is required"],  
    match: [/^(\+91)?[6-9]\d{9}$/, "Please enter a valid Indian mobile number"] 
  },
  subject: { 
    type: String, 
    required: [true, "Subject is required"], 
    minlength: [5, "Subject must be at least 5 characters"], 
    maxlength: [200, "Subject must not exceed 200 characters"] 
  },
  message: { 
    type: String, 
    required: [true, "Message is required"], 
    minlength: [5, "Message must be at least 5 characters"], 
    maxlength: [500, "Message must not exceed 500 characters"] 
  },
  createdBy: { type: String, default: "User" }
}, { timestamps: true });

let contectUs = mongoose.model('userContectUs', userContect);
module.exports = contectUs;