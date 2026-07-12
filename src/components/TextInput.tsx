import { useState } from "react";

function TextInput() {
  const [text, setText] = useState("");

  const handleAnalyze = () => {
    const normalizedInput = {
      sourceType: "sms",
      rawText: text,
      timestamp: Date.now(),
    };

    console.log(normalizedInput);
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
    >
      <h2>📄 Paste Text</h2>

      <textarea
        placeholder="Paste suspicious SMS, Email or Chat..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "10px",
        }}
      />

      <br />

      <button
        onClick={handleAnalyze}
        style={{
          marginTop: "15px",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Analyze Text
      </button>
    </div>
  );
}

export default TextInput;