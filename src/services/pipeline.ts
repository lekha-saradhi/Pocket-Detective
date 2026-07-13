import { extractText } from "./ocr";
import { decodeQR } from "./qr";
import { normalizeInput } from "./normalize";

import type { NormalizedInput } from "../types/schema";

/**
 * Process plain text input
 */
export function processText(text: string): NormalizedInput {
  return normalizeInput("sms", text);
}

/**
 * Process screenshot/image
 */
export async function processImage(
  image: File | Blob
): Promise<NormalizedInput> {
  const result = await extractText(image);

  return normalizeInput(
    "screenshot",
    result.text
  );
}

/**
 * Process QR Code
 */
export async function processQR(
  image: File | Blob
): Promise<NormalizedInput> {
  const result = await decodeQR(image);

  return normalizeInput(
    "qr",
    "",
    result.url
  );
}