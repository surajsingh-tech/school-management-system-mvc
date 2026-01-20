
const siteSetting = require('../utils/getSiteSetting');

// Middleware to inject site settings into res.locals for every request
let siteSettingsMiddleware = async (req, res, next) => {
  // Merge existing res.locals with site settings
  // This ensures that any previously set values in res.locals are preserved
  // and new site settings (Facebook, Email, Phone, etc.) are added
  res.locals = {
    ...res.locals,
    ...(await siteSetting())
  };

  next();
};


module.exports = siteSettingsMiddleware;