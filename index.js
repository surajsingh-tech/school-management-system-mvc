const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');
const siteSettingsMiddleware=require('./middlewares/getSiteSetting.js')
require('dotenv').config();   // load .env

// Register helpers
require('./halpers/index.js');
 
// View engine setup
app.set('view engine', 'hbs');

// Views folder location
app.set('views', path.join(__dirname, 'views'));

// Register partials
hbs.registerPartials(path.join(__dirname, './views/partials'));

// Static files
app.use(express.static(path.join(__dirname,'public')))

// Body-parser (built-in in Express)
app.use(express.json()); // for JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(siteSettingsMiddleware);

// for send flash Message
const session = require("express-session");
const flash = require("connect-flash");

// Session + Flash setup
app.use(session({
  secret: "secretKey",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// Global flash variables for views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// Routes
const Router = require('./routes/index.js');
app.use('/', Router);

//DB require
const connectDB=require('./dbConnect.js')
connectDB();

// Port
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Your Server is running on http://localhost:${port}`));