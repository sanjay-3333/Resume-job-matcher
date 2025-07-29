🧠 Resume Matcher

A MERN stack web app that intelligently matches a candidate’s resume with relevant job listings based on extracted skills.


🚀 Features

- 📄 Upload resume (PDF)
- 🧠 Extracts name and skills from resume
- 💼 Matches with jobs stored in MongoDB
- 📊 Match percentage shown
- 🌐 Fully deployed via Render

🛠️ Tech Stack

- **Frontend:** React, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (MongoDB Atlas)
- **Other Tools:** pdf-parse, Regex, Render for hosting

🔧 Backend
cd backend
npm install

.env:
PORT=5000
MONGO_URI=mongodb://localhost:27017/resumeMatcher

💻 Frontend
cd frontend
npm install

.env:
REACT_APP_API_URL=http://localhost:5000

Start React dev server:
npm start
