import { useState } from "react";
import { extractText } from "../services/ocr";
import { decodeQR } from "../services/qr";
import { extractUrls } from "../services/url";

import { processText } from "../services/pipeline";
function UploadPage() {
  const [ocrText, setOcrText] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [urls, setUrls] = useState<string[]>([]);
  const [qrUrl, setQrUrl] = useState("");

const [text, setText] = useState("");
const [textResult, setTextResult] = useState("");

  async function handleOCR(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      const result = await extractText(file);

      setOcrText(result.text);
      setConfidence(result.confidence);

      // Extract URLs from OCR text
      const extractedUrls = extractUrls(result.text);
      setUrls(extractedUrls);

      console.log("OCR Result:", result);
      console.log("Extracted URLs:", extractedUrls);
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
      const result = await decodeQR(file);

      console.log("QR Result:", result);

      setQrUrl(result.url);
    } catch (error) {
      console.error(error);
    }
  }
  function handleText() {
  const result = processText(text);

  console.log(result);

  setTextResult(JSON.stringify(result, null, 2));
}


  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <h1>Pipeline Testing</h1>

      <hr />
      <h2>Text Test</h2>

<textarea
  rows={6}
  style={{ width: "100%" }}
  value={text}
  onChange={(e) => setText(e.target.value)}
/>

<br />
<br />

<button onClick={handleText}>
  Process Text
</button>

<h3>Normalized Output</h3>

<pre>{textResult}</pre>

<hr />

      <h2>OCR Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleOCR}
      />

      <h3>Extracted Text</h3>

      <pre>{ocrText}</pre>

      <h3>Confidence</h3>

      <p>{confidence.toFixed(2)}%</p>

      <h3>Extracted URLs</h3>

      {urls.length === 0 ? (
        <p>No URLs Found</p>
      ) : (
        <ul>
          {urls.map((url, index) => (
            <li key={index}>{url}</li>
          ))}
        </ul>
      )}

      <hr />

      <h2>QR Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleQR}
      />

      <h3>Decoded URL</h3>

      {qrUrl ? (
        <a href={qrUrl} target="_blank" rel="noreferrer">
          {qrUrl}
        </a>
      ) : (
        <p>No QR Code Found</p>
      )}
    </div>
  );
}

export default UploadPage;
