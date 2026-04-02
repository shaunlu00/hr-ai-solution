interface AiPredictionGaugeProps {
  value: number;       // 0-100
  label: string;
  size?: number;
}

export default function AiPredictionGauge({ value, label, size = 120 }: AiPredictionGaugeProps) {
  const radius = 45;
  const circumference = Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 70 ? '#22c55e' : value >= 40 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size * 0.65} viewBox="0 0 120 78">
        {/* Background arc */}
        <path
          d="M 10 70 A 50 50 0 0 1 110 70"
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d="M 10 70 A 50 50 0 0 1 110 70"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease' }}
        />
        {/* Value text */}
        <text x="60" y="60" textAnchor="middle" className="text-2xl font-bold" fill={color} fontSize="22">
          {value}%
        </text>
      </svg>
      <p className="text-xs text-muted mt-1">{label}</p>
    </div>
  );
}
