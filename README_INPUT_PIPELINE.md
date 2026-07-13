# Pocket Detective - Input Pipeline

## Module Owner

Pipeline Branch: `pipeline`

---

# Overview

This module handles all user input before it reaches the Detection Engine.

Supported inputs:

- Plain Text
- Screenshot (OCR)
- QR Code

Every input is converted into a common `NormalizedInput` object using the shared schema.

---

# Folder Structure

```
src/
│
├── services/
│   ├── normalize.ts
│   ├── ocr.ts
│   ├── qr.ts
│   ├── url.ts
│   └── pipeline.ts
│
└── types/
    └── schema.ts
```

---

# Services

## normalize.ts

Creates a NormalizedInput object.

Example

```ts
normalizeInput(
    "sms",
    "Hello World"
);
```

Returns

```ts
{
    sourceType: "sms",
    rawText: "Hello World",
    timestamp: ...
}
```

---

## ocr.ts

Extracts text from an uploaded image using Tesseract.js.

Example

```ts
const result = await extractText(file);
```

Returns

```ts
{
    text: "...",
    confidence: 94.23
}
```

---

## qr.ts

Decodes a QR Code image.

Example

```ts
const result = await decodeQR(file);
```

Returns

```ts
{
    url: "https://example.com"
}
```

---

## url.ts

Extracts URLs from OCR text.

Example

```ts
extractUrls(text);
```

Returns

```ts
[
    "https://google.com",
    "www.github.com"
]
```

---

## pipeline.ts

Main entry point for the module.

### Process Text

```ts
const result = processText(text);
```

### Process Screenshot

```ts
const result = await processImage(file);
```

### Process QR

```ts
const result = await processQR(file);
```

---

# Returned Object

All functions return a shared schema object.

```ts
{
    sourceType,
    rawText,
    rawUrl,
    timestamp
}
```

---

# Dependencies

```
tesseract.js
jsqr
```

Install

```bash
npm install tesseract.js
npm install jsqr
```

---

# Notes

- OCR returns extracted text and confidence.
- QR service returns decoded URL.
- URL extraction is performed from OCR text.
- All outputs follow the shared schema (`schema.ts`).
- Pipeline services are independent of the UI.
- UI components should call `pipeline.ts` instead of individual services whenever possible.

---

# Status

- ✅ OCR
- ✅ QR Decoder
- ✅ URL Extraction
- ✅ Input Normalization
- ✅ Pipeline Integration
- ✅ Tested