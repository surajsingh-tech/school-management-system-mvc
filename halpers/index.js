const hbs=require('hbs');
hbs.registerHelper('siteName',()=>{
  return process.env.SITE_NAME
})
 
hbs.registerHelper('siteNameLogo',()=>{
  return process.env.SITE_NAME_LOGO.split(" ").map(x=>x[0]).join(" ")
})

hbs.registerHelper('siteEmail',()=>{
  return process.env.SITE_EMAIL
})

hbs.registerHelper('sitePhone',()=>{
  return process.env.SITE_PHONE
})

hbs.registerHelper('siteWhatsapp',()=>{
  return process.env.SITE_WHATSAPP
})

hbs.registerHelper('siteMap1',()=>{       
  return process.env.SITE_MAP1
})

hbs.registerHelper('siteMap2',()=>{
  return process.env.SITE_MAP2
})

hbs.registerHelper('siteFacebook',()=>{
  return process.env.SITE_FACEBOOK
})

hbs.registerHelper('siteInstagram',()=>{
  return process.env.SITE_INSTAGRAM
})

hbs.registerHelper('siteYoutube',()=>{
  return process.env.SITE_YOUTUBE
})

hbs.registerHelper('siteTwiter',()=>{
  return process.env.SITE_TWITTER
})

hbs.registerHelper('siteAddress',()=>{
  return process.env.SITE_ADDRESS
})

hbs.registerHelper('eq', function (a, b) {
  return a == b;
});

hbs.registerHelper("formatDate", function(date) {
  return new Date(date).toLocaleDateString("en-GB"); 
});

hbs.registerHelper("shortway", function (str, len) {
  if (str.length > len) {
    return str.substring(0, len) + "...";
  }
  else {
    return str.substring(0, 40) + "...";
  }
});

hbs.registerHelper("chkactive",(active)=>{
  if(active===true)return "Yes"
  else return "NO"
})

hbs.registerHelper("formatDateTime", function(date) {
  const d = new Date(date);
  return d.toLocaleString("en-US", {
    dateStyle: "medium",   // Sat, Jan 17, 2026
    timeStyle: "short"     // 9:07 PM
  });
});

hbs.registerHelper("formatDate", function(date) {
  if (!date) return "";
  return new Date(date).toISOString().split("T")[0]; // 2026-01-18
});

hbs.registerHelper("formActive", function(a, b) {
  return String(a) === String(b);
});
