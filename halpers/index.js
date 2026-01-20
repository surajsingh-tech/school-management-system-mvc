const hbs=require('hbs');

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
