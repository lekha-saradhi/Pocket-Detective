import { useState } from "react";

import { processText, processImage, processQR } from "../services/pipeline";
import { extractText } from "../services/ocr";
import { extractUrls } from "../services/url";

function TestingPage() {
  // Text Test
  const [text, setText] = useState("");
  const [textOutput, setTextOutput] = useState("");

  // OCR Test
  const [ocrText, setOcrText] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);

  // QR Test
  const [qrUrl, setQrUrl] = useState("");

  async function handleText() {
    const result = processText(text);

    console.log(result);

    setTextOutput(JSON.stringify(result, null, 2));
  }

  async function handleOCR(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      // Test Pipeline
      const normalized = await processImage(file);

      setOcrText(normalized.rawText);

      // OCR Confidence
      const ocr = await extractText(file);

      setConfidence(ocr.confidence);

      // URL Extraction
      const extractedUrls = extractUrls(normalized.rawText);

      setUrls(extractedUrls);

      console.log(normalized);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleQR(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const normalized = await processQR(file);

      setQrUrl(normalized.rawUrl ?? "");

      console.log(normalized);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1>🧪 Pocket Detective - Developer Testing</h1>

      <p>
        Internal testing page for the Input Pipeline.
      </p>

      <hr />

      {/* ================= TEXT ================= */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h2>📝 Text Pipeline</h2>

        <textarea
          rows={6}
          style={{
            width: "100%",
            padding: "10px",
          }}
          placeholder="Paste suspicious message here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <br />
        <br />

        <button onClick={handleText}>
          Process Text
        </button>

        <h3>Normalized Output</h3>

        <pre>{textOutput}</pre>
      </div>

      {/* ================= OCR ================= */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          marginBottom: "30px",
        }}
      >
        <h2>🖼 OCR Pipeline</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleOCR}
        />

        <h3>Extracted Text</h3>

        <pre>{ocrText}</pre>

        <h3>Confidence</h3>

        <p>{confidence.toFixed(2)}%</p>

        <h3>URLs Found</h3>

        {urls.length === 0 ? (
          <p>No URLs Found</p>
        ) : (
          <ul>
            {urls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        )}
      </div>

      {/* ================= QR ================= */}

      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <h2>🔳 QR Pipeline</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleQR}
        />

        <h3>Decoded URL</h3>

        {qrUrl ? (
          <a
            href={qrUrl}
            target="_blank"
            rel="noreferrer"
          >
            {qrUrl}
          </a>
        ) : (
          <p>No QR Code Found</p>
        )}
      </div>
    </div>
  );
}

export default TestingPage;