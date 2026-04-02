'use client';

import { mockCandidates } from '@/lib/mock-data';
import AiScoreBar from '@/components/ai/AiScoreBar';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import AiFeedbackLoop from '@/components/ai/AiFeedbackLoop';
import { Sparkles, Filter, ArrowUpDown } from 'lucide-react';

export default function ResumeScreeningPage() {
  const candidates = mockCandidates.filter(c => ['resume-screening', 'interview-scheduling', 'ai-interview', 'second-interview', 'grading', 'salary', 'offer', 'background-check', 'approval'].includes(c.stage));

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="suggestion"
        title="AI筛选建议"
        content="本批次共收到42份简历，AI已完成初筛。推荐通过 28 份（66.7%），建议关注 8 份（19.0%），不推荐 6 份（14.3%）。"
        actions={[{ label: '查看推荐' }, { label: '查看全部' }]}
      />

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">候选人列表</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs text-muted hover:bg-slate-50 transition">
              <Filter className="w-3 h-3" /> 筛选
            </button>
            <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border text-xs text-muted hover:bg-slate-50 transition">
              <ArrowUpDown className="w-3 h-3" /> AI评分排序
            </button>
          </div>
        </div>
        <div className="divide-y divide-border">
          {candidates.map(c => (
            <div key={c.id} className="p-5 hover:bg-slate-50/50 transition">
              <div className="flex items-start gap-4">
                <span className="text-2xl">{c.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">{c.name}</h4>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-medium">
                      <Sparkles className="w-2.5 h-2.5 inline mr-0.5" />AI评分 {c.aiScore}
                    </span>
                  </div>
                  <p className="text-xs text-muted">{c.education.school} · {c.education.degree} · {c.currentCompany} {c.currentTitle}</p>
                  <p className="text-xs text-muted mt-1">{c.resumeSummary}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {c.skills.slice(0, 5).map(s => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-muted">{s}</span>
                    ))}
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-success font-medium mb-1">✅ 加分项</p>
                      {c.resumeHighlights.slice(0, 2).map((h, i) => (
                        <p key={i} className="text-[10px] text-muted">• {h}</p>
                      ))}
                    </div>
                    <div>
                      <p className="text-[10px] text-danger font-medium mb-1">⚠️ 风险点</p>
                      {c.resumeRisks.map((r, i) => (
                        <p key={i} className="text-[10px] text-muted">• {r}</p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="w-40 shrink-0 space-y-2">
                  <AiScoreBar score={c.aiScore} label="综合" />
                  <AiScoreBar score={Math.round(c.aiScore * 0.95)} label="技能" />
                  <AiScoreBar score={Math.round(c.aiScore * 0.88)} label="经验" />
                  <AiScoreBar score={Math.round(c.aiScore * 0.92)} label="学历" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AiFeedbackLoop
        aiDecision="建议将陈雨桐（AI评分78）标记为「待观察」。其工作年限偏短（2年），但学历背景好、基础扎实，建议安排技术面试进一步评估。"
        aiConfidence={72}
      />
    </div>
  );
}
