'use client';

import { mockCandidates } from '@/lib/mock-data';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { Users, Star, CalendarDays } from 'lucide-react';

export default function SecondInterviewPage() {
  const candidate = mockCandidates.find(c => c.stage === 'second-interview');

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="info"
        title="二轮面试准备"
        content="AI已为面试官生成候选人画像报告，包括AI初面表现、技术能力分析、关注点建议。建议在二轮面试中重点考察候选人的团队协作和业务理解能力。"
        actions={[{ label: '查看面试指南' }, { label: '下载候选人报告' }]}
      />

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">待二轮面试候选人</h3>
        </div>
        {candidate && (
          <div className="p-5">
            <div className="flex items-start gap-4">
              <span className="text-3xl">{candidate.avatar}</span>
              <div className="flex-1">
                <h4 className="text-base font-semibold text-foreground">{candidate.name}</h4>
                <p className="text-xs text-muted">{candidate.currentCompany} · {candidate.currentTitle} · {candidate.yearsOfExperience}年经验</p>
                <div className="mt-3 grid grid-cols-3 gap-4">
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-muted">AI面试评分</p>
                    <p className="text-xl font-bold text-accent">{candidate.aiScore}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-muted">学历背景</p>
                    <p className="text-sm font-medium text-foreground">{candidate.education.school} · {candidate.education.degree}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-50">
                    <p className="text-[10px] text-muted">期望薪资</p>
                    <p className="text-sm font-medium text-foreground">{candidate.expectedSalary}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-xs font-medium text-foreground mb-1">AI面试官建议关注点：</p>
                  <ul className="text-[11px] text-muted space-y-1">
                    <li>• 对SaaS领域的了解深度需进一步确认</li>
                    <li>• 建议考察产品方法论与数据驱动决策能力</li>
                    <li>• 了解从美团离职的真实动机</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
