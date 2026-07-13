import {
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";

import type { InvestigationReport } from "../types/schema";
import reportData from "../fixtures/report.json";

import { MetricCard } from "../components/report/MetricCard";
import { EvidenceItem } from "../components/report/EvidenceItem";
import { RecommendationItem } from "../components/report/RecommendationItem";

import { getScoreClass, getThreatClass } from "../utils/report";

import "./ReportPage.css";

const report = reportData as InvestigationReport;

export default function ReportPage() {
  const {
    caseId,
    trustScore,
    threatLevel,
    evidence,
    recommendations,
    timestamp,
  } = report;

  const formattedTimestamp = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));

  return (
    <div className="report-dashboard">
      <div className="report-container">
        <header className="report-header">
          <div className="header-title-group">
            <ShieldCheckIcon className="header-icon" />

            <div>
              <h1 className="report-title">Pocket Detective</h1>
              <div className="report-timestamp">{formattedTimestamp}</div>
            </div>
          </div>

          <div className="case-badge">CASE #{caseId}</div>
        </header>

        <main className="report-main">
          <section className="metrics-section">
            <MetricCard
              label="Trust Score"
              value={trustScore}
              valueClassName={getScoreClass(trustScore)}
              suffix="/100"
            />

            <MetricCard
              label="Threat Level"
              value={threatLevel.toUpperCase()}
              valueClassName={getThreatClass(threatLevel)}
            />
          </section>

          <section className="content-section">
            <div className="section-header">
              <ClipboardDocumentListIcon className="section-icon" />
              <h2 className="section-title">Evidence</h2>
            </div>

            <div className="list-container">
              {evidence.length > 0 ? (
                evidence.map((item) => (
                  <EvidenceItem
                    key={item.id}
                    evidence={item}
                  />
                ))
              ) : (
                <div className="empty-state">
                  No evidence documented for this case.
                </div>
              )}
            </div>
          </section>

          <section className="content-section">
            <div className="section-header">
              <ExclamationTriangleIcon className="section-icon" />
              <h2 className="section-title">Recommendations</h2>
            </div>

            <div className="list-container">
              {recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => (
                  <RecommendationItem
                    key={index}
                    recommendation={recommendation}
                  />
                ))
              ) : (
                <div className="empty-state">
                  No recommendations at this time.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}