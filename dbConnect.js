// db.js
const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/V_M_School');
    console.log('Database is connected');
  } catch (err) {
    console.error('Database not connected:', err);
  }
}

module.exports = connectDB;