const setting = require('../models/admin/adminSetting');

const getSiteSetting = async () => {
  let settingData = await setting.findOne();
  return {
    siteFacebook: settingData?.facebook || process.env.SITE_FACEBOOK,
    siteTwitter: settingData?.twitter || process.env.SITE_TWITTER,
    siteYoutube: settingData?.youtube || process.env.SITE_YOUTUBE,
    siteInstagram: settingData?.instagram || process.env.SITE_INSTAGRAM,
    siteAddress: settingData?.address || process.env.SITE_ADDRESS,
    sitePhone: settingData?.phone || process.env.SITE_PHONE,
    siteEmail: settingData?.email || process.env.SITE_EMAIL,
    siteName: settingData?.sitename || process.env.SITE_NAME,
    siteWhatsapp: settingData?.whatsapp || process.env.SITE_WHATSAPP,
    siteMap1: settingData?.map1 || process.env.SITE_MAP1,
    siteMap2: settingData?.map2 || process.env.SITE_MAP2,
    siteTime: settingData?.sitetime|| process.env.SITE_TIME,
    siteNameLogo: process.env.SITE_NAME_LOGO
      ? process.env.SITE_NAME_LOGO.split(" ").map(x => x[0]).join("")
      : ""
  };
};

module.exports = getSiteSetting;