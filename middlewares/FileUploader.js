// Multer - Middleware for handling multipart/form-data (file uploads)
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sanitize = require('sanitize-filename'); //  Ensures safe filenames by removing invalid/special characters

const fileUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const fullPath = path.resolve(`public/uploads/${folderName}`); //  Absolute server-side path where multer will save uploaded files
      
      // Ensure folder exists
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
      }

      cb(null, fullPath);
    },

    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const cleanName = sanitize(file.originalname); // Remove unsafe characters
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + cleanName);
    }
  });

  return multer({ storage: storage });
};

module.exports = {
  departmentUploader: fileUploader('departments'),
  eventsUploader: fileUploader('events'),
  featuresUploader: fileUploader('features'),
  galleryUploader: fileUploader('gallery'),
  teamUploader: fileUploader('team'),
  testimonialUploader: fileUploader('testimonials'),
};


/*
FOR IMAGE LIMIT AND EXTENSION VALIDATION

const multer  = require('multer')

const fileUploader = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    }
  });

  // ✅ Validation: size + extension
  return multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png/; // allowed extensions
      const ext = file.originalname.toLowerCase();
      if (allowedTypes.test(ext)) {
        cb(null, true);
      } else {
        cb(new Error('Only .jpg, .jpeg, .png files are allowed'));
      }
    }
  });
};
*/