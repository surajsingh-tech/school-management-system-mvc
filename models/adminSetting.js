const mongoose = require('mongoose');

const adminSettingsSchema = new mongoose.Schema({
  map1: { type: String },
  map2: { type: String },
  address: { type: String },
  phone: { type: String },
  email: { type: String },
  whatsapp: { type: String },
  youtube: { type: String },
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  sitename: { type: String },
}, { timestamps: true });

// Model export
module.exports = mongoose.model('AdminSetting', adminSettingsSchema);