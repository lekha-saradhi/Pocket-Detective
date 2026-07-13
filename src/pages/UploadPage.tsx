import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UploadPage() {
  const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleAnalyze = () => {
    if (!message.trim() && !file) {
      alert("Please paste a message or upload a screenshot.");
      return;
    }

    // Temporary navigation until OCR & Detection Engine are ready
    navigate("/report");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1>Upload Evidence</h1>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Paste suspicious SMS, email, or chat message..."
        rows={8}
        cols={50}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
          }
        }}
      />

      {file && <p>Selected: {file.name}</p>}

      <button onClick={handleAnalyze}>
        Analyze
      </button>
    </div>
  );
}