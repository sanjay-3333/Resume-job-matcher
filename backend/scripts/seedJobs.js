const mongoose = require('mongoose');
const Job = require('../models/Job');

mongoose.connect('mongodb+srv://sanjays2021hresumeadmin:Ssss33339@resumecluster.rytartb.mongodb.net/resumeMatcher?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  console.log('✅ MongoDB connected');

  // Clear existing job records (optional for development)
  await Job.deleteMany();

  // Enriched job data
  const jobs = [
    {
      jobTitle: "Frontend Developer",
      skills: ["JavaScript", "HTML", "CSS", "React", "TypeScript", "Responsive Design", "REST APIs", "Git"],
      location: "Remote",
      salary: 1000000
    },
    {
      jobTitle: "Frontend Engineer",
      skills: ["JavaScript", "React", "Redux", "CSS", "HTML", "Webpack", "Git", "Unit Testing"],
      location: "Bangalore",
      salary: 700000
    },
    {
      jobTitle: "Software Developer",
      skills: ["Python", "SQL", "Git", "OOP", "Unit Testing", "Data Structures", "REST APIs", "Linux"],
      location: "Coimbatore",
      salary: 600000
    },
    {
      jobTitle: "Full Stack Developer",
      skills: ["Node.js", "Express", "MongoDB", "React", "JavaScript", "Docker", "Git", "REST APIs", "HTML", "CSS"],
      location: "Chennai",
      salary: 900000
    },
    {
      jobTitle: "Backend Developer",
      skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker", "Redis", "GraphQL", "CI/CD", "Linux"],
      location: "Mumbai",
      salary: 850000
    }
  ];

  await Job.insertMany(jobs);
  console.log('✅ Sample jobs inserted');
  process.exit();
}).catch(err => {
  console.error('❌ Error seeding jobs:', err);
  process.exit(1);
});
