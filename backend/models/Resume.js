const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  skills: { type: [String], required: true },
  filePath: { type: String }, // optional unless you're storing locally
  originalFileName: { type: String, required: true },
  matches: [
    {
      jobTitle: { type: String, required: true },
      location: { type: String, default: 'Unknown' },
      salary: { type: Number, default: 0 },
      requiredSkills: { type: [String], default: [] },
      matchPercentage: { type: Number, default: 0 }
    }
  ],
  uploadedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Resume', ResumeSchema);
