import { openDB } from "idb";
import type { InvestigationReport } from "../types/schema";

const DB_NAME = "PocketDetectiveDB";
const STORE_NAME = "reports";

export const dbPromise = openDB(DB_NAME, 1, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, {
        keyPath: "caseId",
      });
    }
  },
});

export async function saveReport(report: InvestigationReport) {
  const db = await dbPromise;
  await db.put(STORE_NAME, report);
}

export async function getReports(): Promise<InvestigationReport[]> {
  const db = await dbPromise;
  const reports = await db.getAll(STORE_NAME);

  // Show newest reports first
  return reports.sort((a, b) => b.timestamp - a.timestamp);
}

export async function getReport(caseId: string) {
  const db = await dbPromise;
  return db.get(STORE_NAME, caseId);
}

export async function deleteReport(caseId: string) {
  const db = await dbPromise;
  await db.delete(STORE_NAME, caseId);
}

export async function clearHistory() {
  const db = await dbPromise;
  await db.clear(STORE_NAME);
}