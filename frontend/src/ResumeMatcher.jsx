module.exports = function extractName(text, fileName = "") {
  const lines = text
    .split("\n")
    .map(line => line.trim())
    .filter(line => line.length > 0 && line.length <= 60);

  const disallowedPhrases = [
    "developer", "engineer", "bootcamp", "course", "project", "student",
    "experience", "skills", "information", "summary", "email", "phone",
    "linkedin", "github", "contact", "details", "career", "objective",
    "about", "me", "profile", "education", "resume", "cv", "additional information"
  ];

  const disallowedPattern = new RegExp(`\\b(${disallowedPhrases.join("|")})\\b`, "i");

  const isValidName = (line) => {
    if (disallowedPattern.test(line.toLowerCase())) return false;

    const words = line.trim().split(/\s+/);
    const hasOnlyLetters = /^[a-zA-Z\s.]+$/.test(line);
    const capitalizedWords = words.filter(word => /^[A-Z][a-z.]*$/.test(word));

    return (
      hasOnlyLetters &&
      capitalizedWords.length >= 2 &&
      capitalizedWords.length <= 4 &&
      words.length === capitalizedWords.length
    );
  };

  let extractedName = null;

  // 1. Check for "Candidate: Name" format
  for (const line of lines.slice(0, 10)) {
    if (line.toLowerCase().startsWith("candidate:")) {
      const possibleName = line.split(":")[1]?.trim();
      if (possibleName && isValidName(possibleName)) {
        extractedName = possibleName;
        break;
      }
    }
  }

  // 2. Check top few lines for a name-looking string
  if (!extractedName) {
    for (const line of lines.slice(0, 10)) {
      if (isValidName(line)) {
        extractedName = line;
        break;
      }
    }
  }

  // 3. Fallback: derive from filename
  if (!extractedName && fileName) {
    const cleaned = fileName
      .replace(/\.[^/.]+$/, "") // remove .pdf, .docx, etc.
      .replace(/[_\-]/g, " ")    // turn underscores/dashes to spaces
      .replace(/resume|cv|profile|document/gi, "") // remove generic terms
      .replace(/\s+/g, " ") // collapse multiple spaces
      .trim();

    const words = cleaned.split(" ");
    const nameGuess = words
      .filter(w => /^[a-zA-Z.]+$/.test(w)) // ignore numbers or gibberish
      .slice(0, 3) // get first 2–3 words max
      .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

    if (nameGuess && nameGuess.length >= 5) {
      extractedName = nameGuess;
    }
  }

  return extractedName || "Unnamed Candidate";
};
