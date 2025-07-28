🧠 Resume-Job Matcher

A full-stack MERN application that intelligently matches resumes to job roles based on extracted skills and name recognition using PDF parsing.



🚀 Features

- 📄 Upload resume in PDF format
- 🧠 Extracts name and skills using regex & keyword matching
- 🎯 Matches resume skills to available job postings from MongoDB
- 📊 Shows match percentage for each job
- 💻 Clean and interactive React frontend
- 🔧 Node.js & Express backend for parsing and matching



## 🛠️ Tech Stack

| Layer     | Technologies                             |
|-----------|------------------------------------------|
| Frontend  | React, CSS, Axios                        |
| Backend   | Node.js, Express                         |
| Database  | MongoDB, Mongoose                        |
| Parsing   | pdf-parse, Regex                         |

---

## 🧑‍💻 How It Works

1. User uploads a resume (PDF).
2. Backend extracts:
   - Name using regex
   - Skills using a predefined skill list
3. Extracted skills are compared against job postings stored in MongoDB.
4. UI displays:
   - Candidate's name and skills
   - Matching jobs and match percentages

---

📂 Folder Structure
mern-resume-matcher/
├── backend/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ └── utils/
├── frontend/
│ ├── public/
│ └── src/
│ ├── ResumeUpload.jsx
│ ├── ResumeMatcher.jsx
│ └── ...
└── README.md

1.Backend Setup
bash
Copy
Edit
cd backend
npm install
npm run dev

2.Configure your MongoDB URI in a .env file:
env
Copy
Edit
MONGO_URI=mongodb://localhost:27017/resumeMatcherDB

3. Frontend Setup
bash
Copy
Edit
cd ../frontend
npm install
npm start
The app will be running at http://localhost:3000
