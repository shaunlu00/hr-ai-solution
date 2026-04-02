'use client';

import { mockCandidates } from '@/lib/mock-data';
import AiScoreBar from '@/components/ai/AiScoreBar';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { Database, Heart, Clock, Phone, Star } from 'lucide-react';

export default function CandidatePoolPage() {
  const poolCandidates = mockCandidates.filter(c => c.stage === 'candidate-pool' || c.aiScore < 80);

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="suggestion"
        title="AI人才保温建议"
        content="人才池中有 23 位候选人，AI已识别出 5 位高潜力候选人近期可能有跳槽意向。建议本周重点维护，发送岗位更新和公司动态。"
        actions={[{ label: '查看高潜力候选人' }, { label: '批量发送保温邮件' }]}
      />

      <div className="grid grid-cols-4 gap-3">
        {[
          { label: '总人才数', value: '238', icon: Database, color: '#6366f1' },
          { label: '活跃候选人', value: '67', icon: Heart, color: '#22c55e' },
          { label: '近期可触达', value: '31', icon: Phone, color: '#f59e0b' },
          { label: '高潜力', value: '12', icon: Star, color: '#ef4444' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-xl border border-border p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${s.color}10` }}>
                <s.icon className="w-4 h-4" style={{ color: s.color }} />
              </div>
              <span className="text-xs text-muted">{s.label}</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="text-sm font-semibold text-foreground">人才池候选人</h3>
        </div>
        <div className="divide-y divide-border">
          {mockCandidates.map(c => (
            <div key={c.id} className="p-4 hover:bg-slate-50/50 transition flex items-center gap-4">
              <span className="text-xl">{c.avatar}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">{c.name}</span>
                  <span className="text-[10px] text-muted">{c.currentCompany} · {c.currentTitle}</span>
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {c.skills.slice(0, 3).map(s => (
                    <span key={s} className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-muted">{s}</span>
                  ))}
                </div>
              </div>
              <div className="w-28 shrink-0">
                <AiScoreBar score={c.aiScore} label="AI评分" />
              </div>
              <div className="text-right shrink-0">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  c.aiScore >= 85 ? 'bg-green-50 text-green-600' :
                  c.aiScore >= 70 ? 'bg-amber-50 text-amber-600' :
                  'bg-slate-50 text-slate-500'
                }`}>
                  {c.aiScore >= 85 ? '高潜力' : c.aiScore >= 70 ? '待观察' : '储备中'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
