// controllers/resumeController.js

const pdfParse = require("pdf-parse");
const Job = require("../models/Job");
const Resume = require("../models/Resume");
const extractName = require("../utils/extractName");
const extractSkills = require("../utils/extractSkills");

exports.parseResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume file uploaded" });
    }

    const buffer = req.file.buffer;
    const originalFileName = req.file.originalname;

    // 🧾 Parse PDF to plain text
    const { text = "" } = await pdfParse(buffer);

    // 🔍 Extract name from resume text or fallback to filename
    let name = extractName(text, originalFileName);
    if (!name || name === "Unnamed Candidate") {
      name = originalFileName
        .split('.')[0]
        .replace(/[_\-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    // 🧠 Extract skills from resume
    const skills = extractSkills(text);

    // 🏢 Fetch all available jobs
    const allJobs = await Job.find({});
    if (!allJobs.length) {
      return res.status(404).json({ error: "No jobs available to match" });
    }

    // 🤝 Match resume skills with job skills
    const matchedJobs = allJobs
      .map(job => {
        const matchedSkills = job.skills.filter(skill =>
          skills.includes(skill)
        );
        const totalUniqueSkills = new Set([...job.skills, ...skills]).size || 1; // avoid division by 0

        const matchPercentage = Math.round(
          (matchedSkills.length / totalUniqueSkills) * 100
        );

        return {
          title: job.jobTitle,
          location: job.location,
          description: job.description,
          skills: job.skills,
          matchedSkills,
          matchPercentage,
          salary: job.salary
        };
      })
      .filter(job => job.matchPercentage > 0)
      .sort((a, b) => b.matchPercentage - a.matchPercentage); // 🔝 Best matches first

    // 💾 Save parsed resume in DB
    const resumeDoc = new Resume({
      name,
      skills,
      originalFileName,
      matches: matchedJobs
    });

    await resumeDoc.save();

    // 📤 Send response to frontend
    res.json({ name, skills, matches: matchedJobs });

  } catch (err) {
    console.error("❌ Error parsing resume:", err);
    res.status(500).json({ error: "Failed to parse resume" });
  }
};
