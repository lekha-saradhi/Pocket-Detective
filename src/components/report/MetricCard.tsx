interface MetricCardProps {
    label: string;
    value: string | number;
    valueClassName: string;
    suffix?: string;
  }
  
  export function MetricCard({
    label,
    value,
    valueClassName,
    suffix,
  }: MetricCardProps) {
    return (
      <div className="metric-card">
        <h2 className="metric-label">{label}</h2>
  
        <div className="metric-value-container">
          <span className={`metric-value ${valueClassName}`}>
            {value}
          </span>
  
          {suffix && (
            <span className="metric-suffix">{suffix}</span>
          )}
        </div>
      </div>
    );
  }