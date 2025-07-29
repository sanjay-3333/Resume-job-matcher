const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  skills: { type: [String], required: true },
  location: { type: String, default: "Unknown" },
  salary: { type: Number, default: 0 }
}, { timestamps: true }); // 

module.exports = mongoose.model('Job', JobSchema);
