// utils/extractName.js

module.exports = function extractName(text, filename = "") {
  const lines = text
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.length < 60);

  const ignorePatterns = [
    /resume/i,
    /curriculum vitae/i,
    /education/i,
    /skills/i,
    /experience/i,
    /profile/i,
    /contact/i,
    /email/i,
    /phone/i,
    /^\d+$/,
  ];

  for (const line of lines.slice(0, 15)) {
    if (ignorePatterns.some(pattern => pattern.test(line))) continue;

    const words = line.split(/\s+/);
    const isLikelyName =
      words.length >= 2 &&
      words.length <= 4 &&
      words.every(w =>
        /^[A-Z][a-z]+$/.test(w) || /^[A-Z]{2,}$/.test(w)
      );

    if (isLikelyName) return line;
  }

  // 🧯 Fallback to filename
  const fallback = filename
    .split('.')[0]
    .replace(/[_\-]/g, ' ')
    .replace(/\bresume\b|\bcv\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  return fallback || "Unnamed Candidate";
};
