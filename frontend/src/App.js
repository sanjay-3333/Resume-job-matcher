import React, { useState } from "react";
import axios from "axios";

function ResumeMatcher() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please upload a resume PDF.");
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const response = await axios.post("http://localhost:5000/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResult(response.data);
    } catch (err) {
      setError("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📄 Resume Matcher</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="file" accept=".pdf" onChange={handleFileChange} style={styles.inputFile} />
        <button type="submit" disabled={loading} style={styles.uploadBtn}>
          {loading ? "Processing..." : "Upload"}
        </button>
      </form>

      {error && <p style={styles.error}>{error}</p>}

      {result && (
        <div style={styles.resultContainer}>
          <h2 style={styles.sectionTitle}>👤 Candidate: {result.name}</h2>
          <p><strong>Skills:</strong> {result.skills.join(", ")}</p>

          <h3 style={styles.sectionTitle}>💼 Matched Jobs</h3>
          {result.matchedJobs.length === 0 ? (
            <p>No matching jobs found.</p>
          ) : (
            <ul style={styles.jobList}>
              {result.matchedJobs.map((job) => (
                <li key={job._id} style={styles.jobCard}>
                  <h4 style={styles.jobTitle}>
                    {job.title} <span style={styles.jobLocation}>({job.location})</span>
                  </h4>
                  <p>{job.description}</p>
                  <p>
                    <strong>Salary:</strong> {job.salary} | <strong>Match:</strong> {job.matchPercentage}%
                  </p>
                  <p>
                    <strong>Matched Skills:</strong> {job.matchedSkills.join(", ")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

// ✨ Corporate-style design using inline styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "30px",
    fontFamily: "Segoe UI, Roboto, sans-serif",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
    color: "#2c3e50",
    textAlign: "center",
  },
  form: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  inputFile: {
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    flex: 1,
  },
  uploadBtn: {
    padding: "10px 20px",
    backgroundColor: "#2c3e50",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  error: {
    color: "#e74c3c",
    fontWeight: "bold",
    marginTop: "10px",
  },
  resultContainer: {
    marginTop: "30px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
  },
  sectionTitle: {
    fontSize: "1.4rem",
    marginBottom: "10px",
    color: "#34495e",
  },
  jobList: {
    listStyle: "none",
    padding: 0,
  },
  jobCard: {
    border: "1px solid #dfe6e9",
    borderRadius: "8px",
    padding: "15px",
    marginBottom: "15px",
    transition: "box-shadow 0.3s ease",
    backgroundColor: "#fafafa",
  },
  jobTitle: {
    margin: "0 0 5px",
    color: "#2d3436",
    fontSize: "1.2rem",
  },
  jobLocation: {
    color: "#636e72",
    fontSize: "0.9rem",
    fontWeight: "normal",
  },
};

export default ResumeMatcher;
