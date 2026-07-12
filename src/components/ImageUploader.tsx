import { useState } from "react";

function ImageUploader() {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
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
      <h2>🖼 Upload Screenshot</h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {image && (
        <>
          <p>{image.name}</p>

          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            width={300}
          />
        </>
      )}
    </div>
  );
}

export default ImageUploader;