'use client';

import { mockGradingResults, mockCandidates } from '@/lib/mock-data';
import AiScoreBar from '@/components/ai/AiScoreBar';
import AiFeedbackLoop from '@/components/ai/AiFeedbackLoop';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { Award, TrendingUp, Users } from 'lucide-react';

export default function GradingPage() {
  const result = mockGradingResults[0];
  const candidate = mockCandidates.find(c => c.id === result.candidateId);

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="suggestion"
        title="AI定级建议"
        content={`基于综合评估，AI建议将${candidate?.name}定级为 ${result.aiSuggestedLevel}，置信度 ${result.aiConfidence}%。该建议参考了候选人的学历、工作经验、技术能力和历史对标数据。`}
      />

      <div className="grid grid-cols-3 gap-4">
        {/* 评估因素 */}
        <div className="col-span-2 bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-accent" /> 定级评估因素
          </h3>
          <div className="space-y-4">
            {result.factors.map(f => (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{f.name} (权重{f.weight}%)</span>
                  <span className="text-xs text-muted">{f.detail}</span>
                </div>
                <AiScoreBar score={f.score} showLabel={false} />
              </div>
            ))}
          </div>
          <div className="mt-5 p-4 rounded-lg bg-accent/5 text-center">
            <p className="text-xs text-muted">AI建议级别</p>
            <p className="text-3xl font-bold text-accent">{result.aiSuggestedLevel}</p>
            <p className="text-xs text-muted mt-1">置信度 {result.aiConfidence}%</p>
          </div>
        </div>

        {/* 历史对标 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
            <TrendingUp className="w-4 h-4 text-accent" /> 历史对标
          </h3>
          <div className="space-y-3">
            {result.historicalComparison.map((h, i) => (
              <div key={i} className="p-3 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-foreground">{h.name}</span>
                  <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[10px] font-bold">{h.level}</span>
                </div>
                <p className="text-[10px] text-muted">{h.education} · {h.experience}年经验</p>
                <div className="mt-1">
                  <AiScoreBar score={h.similarity} label="相似度" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AiFeedbackLoop
        aiDecision={`建议将${candidate?.name}定级为 ${result.aiSuggestedLevel}。综合评估：学历优秀（清华硕士）、技术能力突出（NLP方向）、工作年限略短（3年）但成长潜力大。`}
        aiConfidence={result.aiConfidence}
      />
    </div>
  );
}
