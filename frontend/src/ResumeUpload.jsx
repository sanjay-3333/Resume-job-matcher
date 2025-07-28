import React, { useState } from "react";
import axios from "axios";

const ResumeUpload = ({ onSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected?.type !== "application/pdf") {
      alert("Please select a valid PDF file.");
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);
    setUploading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/resume/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      onSuccess(res.data);
    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload. Check server or resume format.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input type="file" onChange={handleFileChange} accept=".pdf" />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        style={{ marginLeft: "10px", padding: "6px 12px" }}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default ResumeUpload