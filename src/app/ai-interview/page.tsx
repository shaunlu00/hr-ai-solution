'use client';

import { mockInterviews, mockCandidates } from '@/lib/mock-data';
import AiScoreBar from '@/components/ai/AiScoreBar';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Bot, Clock, MessageSquare, Brain, Eye } from 'lucide-react';

export default function AiInterviewPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="info"
        title="AI面试官洞察"
        content="本轮AI面试共完成 5 场，平均面试时长 47 分钟。候选人整体表现优秀，平均分 89.5。其中张明远和李思颖表现突出，强烈推荐进入二轮。"
      />

      {/* 面试记录 */}
      <div className="space-y-4">
        {mockInterviews.map(iv => {
          const candidate = mockCandidates.find(c => c.id === iv.candidateId);
          if (!candidate) return null;
          return (
            <div key={iv.id} className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                <span className="text-xl">{candidate.avatar}</span>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{candidate.name} · 第{iv.round}轮面试</h4>
                  <div className="flex items-center gap-3 text-[10px] text-muted mt-0.5">
                    <span className="flex items-center gap-0.5"><Bot className="w-3 h-3" /> {iv.type === 'ai' ? 'AI面试官' : '人工面试'}</span>
                    <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {iv.duration}分钟</span>
                    <StatusBadge status={iv.status} />
                  </div>
                </div>
                <div className="ml-auto text-right">
                  <p className="text-2xl font-bold" style={{ color: iv.overallScore >= 85 ? '#22c55e' : '#f59e0b' }}>{iv.overallScore}</p>
                  <p className="text-[10px] text-muted">综合评分</p>
                </div>
              </div>

              {/* 题目与评分 */}
              <div className="p-5">
                <h5 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-accent" /> 面试问答
                </h5>
                <div className="space-y-3">
                  {iv.questions.map((q, i) => (
                    <div key={q.id} className="p-3 rounded-lg bg-slate-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">{q.category}</span>
                        <span className="text-xs font-bold" style={{ color: q.score >= 85 ? '#22c55e' : '#f59e0b' }}>{q.score}分</span>
                      </div>
                      <p className="text-xs font-medium text-foreground mt-1">Q: {q.question}</p>
                      <p className="text-[11px] text-muted mt-1 line-clamp-2">A: {q.answer}</p>
                    </div>
                  ))}
                </div>

                {/* 情绪分析 */}
                {iv.emotionAnalysis && (
                  <div className="mt-4 p-4 rounded-lg bg-purple-50/50 border border-purple-100">
                    <h5 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
                      <Brain className="w-3.5 h-3.5 text-purple-500" /> AI情绪分析
                    </h5>
                    <div className="grid grid-cols-4 gap-3">
                      <AiScoreBar score={iv.emotionAnalysis.confidence} label="自信度" />
                      <AiScoreBar score={iv.emotionAnalysis.enthusiasm} label="热情度" />
                      <AiScoreBar score={100 - iv.emotionAnalysis.nervousness} label="沉稳度" />
                      <AiScoreBar score={iv.emotionAnalysis.honesty} label="真诚度" />
                    </div>
                    <p className="text-[11px] text-muted mt-2">{iv.emotionAnalysis.summary}</p>
                  </div>
                )}

                {/* AI评价 */}
                <div className="mt-4 p-3 rounded-lg bg-accent/5 border border-accent/10">
                  <h5 className="text-xs font-semibold text-accent mb-1 flex items-center gap-1">
                    <Eye className="w-3 h-3" /> AI综合评价
                  </h5>
                  <p className="text-xs text-muted">{iv.evaluation}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
