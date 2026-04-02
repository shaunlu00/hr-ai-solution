import { Lightbulb, AlertTriangle, CheckCircle, Info } from 'lucide-react';

type SuggestionType = 'suggestion' | 'warning' | 'success' | 'info';

interface AiSuggestionCardProps {
  type?: SuggestionType;
  title: string;
  content: string;
  actions?: { label: string; onClick?: () => void }[];
}

const TYPE_CONFIG: Record<SuggestionType, { icon: React.ReactNode; color: string; bg: string }> = {
  suggestion: { icon: <Lightbulb className="w-4 h-4" />, color: '#6366f1', bg: '#eef2ff' },
  warning: { icon: <AlertTriangle className="w-4 h-4" />, color: '#f59e0b', bg: '#fffbeb' },
  success: { icon: <CheckCircle className="w-4 h-4" />, color: '#22c55e', bg: '#f0fdf4' },
  info: { icon: <Info className="w-4 h-4" />, color: '#3b82f6', bg: '#eff6ff' },
};

export default function AiSuggestionCard({ type = 'suggestion', title, content, actions }: AiSuggestionCardProps) {
  const cfg = TYPE_CONFIG[type];

  return (
    <div className="rounded-xl border p-4" style={{ borderColor: cfg.color + '30', backgroundColor: cfg.bg + '80' }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: cfg.color + '20', color: cfg.color }}>
          {cfg.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-foreground mb-1">{title}</h4>
          <p className="text-xs text-muted leading-relaxed">{content}</p>
          {actions && actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition"
                  style={{
                    backgroundColor: i === 0 ? cfg.color : 'transparent',
                    color: i === 0 ? '#fff' : cfg.color,
                    border: i === 0 ? 'none' : `1px solid ${cfg.color}40`,
                  }}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
