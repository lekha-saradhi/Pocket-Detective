import { createWorker } from "tesseract.js"


export interface OCRResult {

       text:string ;
        confidence: number;
}

export async function extractText(

  image: File | Blob

): Promise<OCRResult> {

  const worker = await createWorker("eng");

  try {

    const {

      data: { text, confidence },

    } = await worker.recognize(image);

    return {

      text: text.trim(),

      confidence,

    };

  } finally {

    await worker.terminate();

  }

}
