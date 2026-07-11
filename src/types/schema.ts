/**
 * ============================================================
 * 🔒 FROZEN CONTRACT
 * ============================================================
 * Pocket Detective – Shared Data Contract
 * Version: 1.0.0
 *
 * All modules build against these interfaces.
 *
 * Changes require:
 * 1. Team discussion (2-minute sync)
 * 2. Increment SCHEMA_VERSION (Semantic Versioning)
 * 3. Update all affected modules
 *
 * Runtime validation:
 * Skipped for hackathon speed.
 * TypeScript compile-time checks are sufficient for the MVP.
 *
 * Future Improvement:
 * Add Zod schema validation for runtime safety.
 * ============================================================
 */

// ============================================================
// Common Types
// ============================================================

/** Unix timestamp in milliseconds */
export type UnixMs = number;

/** Current schema version */
export const SCHEMA_VERSION = "1.0.0";

/** Supported input sources */
export const SOURCE_TYPES = [
  "sms",
  "email",
  "chat",
  "screenshot",
  "qr",
  "url",
] as const;

export type SourceType = (typeof SOURCE_TYPES)[number];

/** Threat levels */
export const THREAT_LEVELS = [
  "Safe",
  "Low",
  "Medium",
  "High",
] as const;

export type ThreatLevel = (typeof THREAT_LEVELS)[number];

/** Evidence generation source */
export const EVIDENCE_SOURCES = [
  "rule",
  "classifier",
] as const;

export type EvidenceSource = (typeof EVIDENCE_SOURCES)[number];

// ============================================================
// Stage 1 → Input Pipeline
// Produced by Component 1
// ============================================================

export interface NormalizedInput {
  /** Where the content came from */
  sourceType: SourceType;

  /** Extracted or entered text */
  rawText: string;

  /** URL from QR code or direct URL input */
  rawUrl?: string;

  /** Capture time */
  timestamp: UnixMs;
}

// ============================================================
// Stage 2 → Entity Extraction
// Used internally by the Detection Engine
// ============================================================

export interface ExtractedEntities {
  urls: string[];
  domains: string[];
  phrases: string[];
  brandMentions: string[];
}

// ============================================================
// Stage 3 → Detection Evidence
// Produced by Component 2
// ============================================================

export interface EvidenceItem {
  /** Unique identifier */
  id: string;

  /** Human-readable badge */
  label: string;

  /** Rule weight */
  weight: number;

  /** Match confidence (0–1) */
  confidence: number;

  /**
   * Character positions inside rawText.
   * Format: [start, end)
   */
  matchedSpan?: [start: number, end: number];

  /** Rule Engine or Local AI */
  source: EvidenceSource;
}

// ============================================================
// Timeline
// ============================================================

export interface TimelineStep {
  title: string;
  description: string;
}

// ============================================================
// Stage 4 → Final Investigation Report
// ============================================================

export interface InvestigationReport {
  /** Unique report ID */
  caseId: string;

  /** Trust score (0–100) */
  trustScore: number;

  /** Overall risk */
  threatLevel: ThreatLevel;

  /** Triggered evidence */
  evidence: EvidenceItem[];

  /** Investigation timeline */
  timeline: TimelineStep[];

  /** Recommended actions */
  recommendations: string[];

  /** Report generation time */
  timestamp: UnixMs;

  /**
   * Optional confidence from
   * on-device AI classifier.
   */
  aiConfidence?: number;
}

// ============================================================
// Local History (IndexedDB)
// ============================================================

export interface HistoryEntry {
  caseId: string;

  timestamp: UnixMs;

  sourceType: SourceType;

  trustScore: number;

  threatLevel: ThreatLevel;

  /**
   * Short preview only.
   * Never store full sensitive text.
   */
  preview: string;
}

// ============================================================
// Trust Score Engine
// ============================================================

export type EvidenceList = EvidenceItem[];

export interface ComputeTrustScoreResult {
  /** Final score (0–100) */
  score: number;

  /** Sum before normalization */
  rawWeightedSum: number;

  /** Maximum possible weight */
  maxPossibleWeight: number;
}

export type ComputeTrustScore = (
  evidence: EvidenceList
) => ComputeTrustScoreResult;