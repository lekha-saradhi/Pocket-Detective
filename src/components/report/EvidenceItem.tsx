import { DocumentTextIcon } from "@heroicons/react/24/outline";
import type { InvestigationReport } from "../../types/schema";

type Evidence = InvestigationReport["evidence"][0];

interface EvidenceItemProps {
  evidence: Evidence;
}

export function EvidenceItem({
  evidence,
}: EvidenceItemProps) {
  return (
    <div className="list-item">
      <div className="item-icon-container">
        <DocumentTextIcon className="item-icon" />
      </div>

      <div className="item-content">
        <h3 className="item-title">
          {evidence.label}
        </h3>

        <div className="item-metadata">
          <span className="metadata-tag">
            {evidence.source.toUpperCase()}
          </span>

          <span className="metadata-tag">
            {evidence.weight} pts
          </span>

          <span className="metadata-tag">
            {Math.round(evidence.confidence * 100)}% confidence
          </span>
        </div>
      </div>
    </div>
  );
}