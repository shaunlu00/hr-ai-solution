interface AiScoreBarProps {
  score: number;
  label?: string;
  max?: number;
  showLabel?: boolean;
}

export default function AiScoreBar({ score, label, max = 100, showLabel = true }: AiScoreBarProps) {
  const pct = Math.min((score / max) * 100, 100);
  const color = pct >= 80 ? '#22c55e' : pct >= 60 ? '#f59e0b' : '#ef4444';

  return (
    <div className="flex items-center gap-2">
      {showLabel && label && <span className="text-xs text-muted w-16 shrink-0">{label}</span>}
      <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="text-xs font-semibold w-8 text-right" style={{ color }}>{score}</span>
    </div>
  );
}
