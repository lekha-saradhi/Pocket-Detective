import type {
  NormalizedInput,
  SourceType,
} from "../types/schema";
/**
 * Creates a normalized input object
 * that follows the shared schema.
 */
export function normalizeInput(
  sourceType: SourceType,
  rawText: string,
  rawUrl?: string
): NormalizedInput {
  return {
    sourceType,
    rawText,
    rawUrl,
    timestamp: Date.now(),
  };
}