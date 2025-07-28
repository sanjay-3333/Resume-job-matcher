// routes/resumeRoutes.js

const express = require('express');
const multer = require('multer');
const router = express.Router();
const { parseResumeFromBuffer } = require('../utils/parser');
const matchJobs = require('../utils/matchJobs');
const Resume = require('../models/Resume');

// Use in-memory storage for multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/resume/upload
router.post('/upload', upload.single('resume'), async (req, res) => {
  try {
    // 1. Validate file
    if (!req.file) {
      return res.status(400).json({ error: 'No resume file uploaded.' });
    }

    if (!req.file.mimetype.includes('pdf')) {
      return res.status(400).json({ error: 'Only PDF files are supported.' });
    }

    console.log('📄 Uploading resume:', req.file.originalname);

    // 2. Parse name and skills from PDF buffer
    const buffer = req.file.buffer;
    const { name, skills } = await parseResumeFromBuffer(buffer, req.file.originalname);

    if (!name || skills.length === 0) {
      return res.status(422).json({ error: 'Could not extract valid name or skills from resume.' });
    }

    console.log('🔍 Extracted:', { name, skills });

    // 3. Match skills with job database
    const matchedJobs = await matchJobs(skills);
    console.log('🎯 Matched Jobs:', matchedJobs);

    // 4. Save to MongoDB
    const resumeDoc = new Resume({
      name,
      skills,
      originalFileName: req.file.originalname,
      matches: matchedJobs.map(job => ({
        jobTitle: job.jobTitle || job.title || 'Untitled',
        location: job.location || 'Unknown',
        salary: job.salary || 0,
        requiredSkills: job.skills || [],
        matchPercentage: job.matchPercentage || 0
      }))
    });

    await resumeDoc.save();
    console.log('✅ Resume saved to MongoDB');

    // 5. Respond to frontend
    res.json({
      message: '✅ Resume uploaded and matched successfully.',
      name,
      skills,
      matchedJobs
    });

  } catch (err) {
    console.error('❌ Resume upload error:', err.message || err);
    res.status(500).json({ error: 'Failed to process resume.' });
  }
});

// Optional: handle unmatched routes in this router
router.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = router;
