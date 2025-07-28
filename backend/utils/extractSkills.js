module.exports = function extractSkills(text) {
  const skillKeywords = [
    'Python', 'Java', 'C++', 'SQL', 'HTML', 'CSS', 'JavaScript',
    'React', 'Node.js', 'Express', 'MongoDB', 'AWS', 'Docker',
    'Kubernetes', 'TypeScript', 'Git', 'Tailwind', 'Next.js', 'Bootstrap'
  ];

  const lowerText = text.toLowerCase();
  return skillKeywords.filter(skill =>
    lowerText.includes(skill.toLowerCase())
  );
};
