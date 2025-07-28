const pdfParse = require('pdf-parse');

async function parseResumeFromBuffer(buffer) {
  const data = await pdfParse(buffer);
  const text = data.text || "";

  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.length <= 60); // relaxed length

  const ignoreList = [
    "additional", "personal", "curriculum", "resume", "profile", "details",
    "education", "skills", "projects", "experience", "work", "objective",
    "contact", "summary", "declaration"
  ];

  let name = null;

  // 🔍 STRATEGY 1: Real name in first few lines
  for (const line of lines.slice(0, 10)) {
    const lower = line.toLowerCase();
    if (ignoreList.some(word => lower.includes(word))) continue;

    const words = line.split(/\s+/);
    const isLikelyName = words.length <= 4 && words.every(w => /^[A-Z][a-z]+$/.test(w));
    if (isLikelyName) {
      name = line;
      break;
    }
  }

  // 📧 STRATEGY 2: Extract from email
  if (!name) {
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@/);
    if (emailMatch) {
      const raw = emailMatch[0].replace('@', '').replace(/[._]/g, ' ');
      name = raw
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }
  }

  // 🗂️ STRATEGY 3: Use filename (fallback via req.file.originalname)
  if (!name) {
    name = "Unnamed Candidate"; // frontend fallback will replace if needed
  }

  // ✅ Skill matching
  const skillKeywords = [
    'Python', 'Java', 'C++', 'SQL', 'HTML', 'CSS', 'JavaScript',
    'React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Docker',
    'Kubernetes', 'TypeScript', 'Git', 'Tailwind', 'Next.js', 'Bootstrap'
  ];

  const lowerText = text.toLowerCase();
  const skills = skillKeywords.filter(skill =>
    lowerText.includes(skill.toLowerCase())
  );

  return { name, skills };
}

module.exports = { parseResumeFromBuffer };
