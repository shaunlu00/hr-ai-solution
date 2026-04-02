'use client';

import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Bot } from 'lucide-react';

interface AiFeedbackLoopProps {
  aiDecision: string;
  aiConfidence: number;
  onConfirm?: () => void;
  onAdjust?: (feedback: string) => void;
}

export default function AiFeedbackLoop({ aiDecision, aiConfidence, onConfirm, onAdjust }: AiFeedbackLoopProps) {
  const [feedback, setFeedback] = useState<'confirmed' | 'adjusted' | null>(null);
  const [adjustNote, setAdjustNote] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleConfirm = () => {
    setFeedback('confirmed');
    onConfirm?.();
  };

  const handleAdjust = () => {
    if (!showInput) {
      setShowInput(true);
      return;
    }
    setFeedback('adjusted');
    onAdjust?.(adjustNote);
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 mb-3">
        <Bot className="w-4 h-4 text-accent" />
        <span className="text-xs font-semibold text-foreground">AI 决策建议</span>
        <span className="ml-auto text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
          置信度 {aiConfidence}%
        </span>
      </div>
      <p className="text-sm text-foreground mb-3">{aiDecision}</p>

      {feedback ? (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
          feedback === 'confirmed' ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'
        }`}>
          {feedback === 'confirmed' ? <ThumbsUp className="w-3.5 h-3.5" /> : <MessageSquare className="w-3.5 h-3.5" />}
          {feedback === 'confirmed' ? '已确认AI建议' : '已提交修正反馈'}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <button onClick={handleConfirm} className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-green-50 text-green-700 text-xs font-medium hover:bg-green-100 transition">
              <ThumbsUp className="w-3.5 h-3.5" />
              确认采纳
            </button>
            <button onClick={handleAdjust} className="flex-1 flex items-center justify-center gap-1.5 h-8 rounded-lg bg-amber-50 text-amber-700 text-xs font-medium hover:bg-amber-100 transition">
              <ThumbsDown className="w-3.5 h-3.5" />
              修正调整
            </button>
          </div>
          {showInput && (
            <input
              type="text"
              value={adjustNote}
              onChange={e => setAdjustNote(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleAdjust()}
              placeholder="请输入修正意见..."
              className="w-full h-8 px-3 rounded-lg border border-border bg-background text-xs placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20"
              autoFocus
            />
          )}
        </div>
      )}
    </div>
  );
}
