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

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
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

      if (!code) {
        reject(new Error("QR Code not found"));
        return;
      }

      resolve({
        url: code.data,
      });
    };

    img.onerror = () => reject(new Error("Failed to load image"));

    img.src = URL.createObjectURL(image);
  });
}