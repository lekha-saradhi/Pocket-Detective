import { useState } from "react";
import { extractText } from "../services/ocr";
import { decodeQR } from "../services/qr";

function UploadPage() {
  const [ocrText, setOcrText] = useState("");
  const [confidence, setConfidence] = useState(0);

  const [qrUrl, setQrUrl] = useState("");

  async function handleOCR(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const result = await extractText(file);

    setOcrText(result.text);

    setConfidence(result.confidence);
  }

  async function handleQR(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    const result = await decodeQR(file);

    console.log(result);

    setQrUrl(result.url);
  } catch (error) {
    console.error(error);
  }
}

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 900,
        margin: "auto",
      }}
    >
      <h1>Pipeline Testing</h1>

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

      <p>{confidence}</p>

      <hr />

      <h2>QR Test</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleQR}
      />

      <h3>Decoded URL</h3>

      <p>{qrUrl}</p>
    </div>
  );
}

export default UploadPage;