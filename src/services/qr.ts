import jsQR from "jsqr";

export interface QRResult {
  url: string;
}

/**
 * Decode QR code from an image
 */
export async function decodeQR(
  image: File | Blob
): Promise<QRResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(image);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Canvas not supported"));
        return;
      }

      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const code = jsQR(
        imageData.data,
        canvas.width,
        canvas.height
      );

      // Free memory
      URL.revokeObjectURL(objectUrl);

      if (!code) {
        resolve({
          url: "",
        });
        return;
      }

      resolve({
        url: code.data,
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image"));
    };

    img.src = objectUrl;
  });
}