const Job = require('../models/Job');

async function matchJobs(candidateSkills) {
  const jobs = await Job.find({}); // ✅ Fetch all jobs from MongoDB

  return jobs.map(job => {
    const jobSkills = job.skills || [];

    const matchedSkills = jobSkills.filter(skill =>
      candidateSkills.includes(skill)
    );

    const totalUniqueSkills = new Set([...jobSkills, ...candidateSkills]).size;

    const matchPercentage = totalUniqueSkills === 0 ? 0 :
      Math.round((matchedSkills.length / totalUniqueSkills) * 100);

    return {
      jobTitle: job.jobTitle,
      location: job.location,
      description: job.description,
      skills: jobSkills,
      matchedSkills,
      matchPercentage,
      salary: job.salary
    };
  }).filter(job => job.matchPercentage > 0); // Only return matches with >0%
}

module.exports = matchJobs;
