import { useState } from "react";

function QRUploader() {
  const [qrImage, setQrImage] = useState<File | null>(null);

  const handleQRChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setQrImage(e.target.files[0]);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <h2>🔳 Upload QR Code</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleQRChange}
      />

      {qrImage && (
        <>
          <p>{qrImage.name}</p>

          <img
            src={URL.createObjectURL(qrImage)}
            alt="QR Preview"
            width={250}
          />
        </>
      )}
    </div>
  );
}

export default QRUploader;