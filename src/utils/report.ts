import type { InvestigationReport } from "../types/schema";

export function getScoreClass(score: number): string {
  if (score >= 80) return "color-success";
  if (score >= 50) return "color-warning";
  return "color-danger";
}

export function getThreatClass(
  level: InvestigationReport["threatLevel"]
): string {
  const normalizedLevel = level.toLowerCase();

  if (
    normalizedLevel.includes("high") ||
    normalizedLevel.includes("critical")
  )
    return "color-danger";

  if (
    normalizedLevel.includes("medium") ||
    normalizedLevel.includes("moderate")
  )
    return "color-warning";

  if (
    normalizedLevel.includes("low") ||
    normalizedLevel.includes("safe")
  )
    return "color-success";

  return "color-neutral";
}