import { CheckCircleIcon } from "@heroicons/react/24/outline";

interface RecommendationItemProps {
  recommendation: string;
}

export function RecommendationItem({
  recommendation,
}: RecommendationItemProps) {
  return (
    <div className="list-item">
      <div className="item-icon-container">
        <CheckCircleIcon className="item-icon" />
      </div>

      <div className="item-content">
        <p className="item-description">{recommendation}</p>
      </div>
    </div>
  );
}