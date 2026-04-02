'use client';

import { mockSalaryResults, mockCandidates } from '@/lib/mock-data';
import AiFeedbackLoop from '@/components/ai/AiFeedbackLoop';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { DollarSign, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export default function SalaryPage() {
  const result = mockSalaryResults[0];
  const candidate = mockCandidates.find(c => c.id === result.candidateId);

  const chartData = [
    { name: '市场P25', value: result.marketP25 / 1000 },
    { name: '内部均值', value: result.internalAvg / 1000 },
    { name: '市场P50', value: result.marketP50 / 1000 },
    { name: 'AI推荐', value: result.aiRecommended / 1000 },
    { name: '市场P75', value: result.marketP75 / 1000 },
  ];

  const ImpactIcon = { positive: TrendingUp, negative: TrendingDown, neutral: Minus };

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="suggestion"
        title="AI定薪建议"
        content={`结合市场数据和内部公平性分析，AI建议${candidate?.name}（${result.level}）薪资为 ${(result.aiRecommended/1000).toFixed(0)}K/月。该薪资位于市场P50-P75之间，具有较好的竞争力。`}
      />

      <div className="grid grid-cols-3 gap-4">
        {/* 薪资对比图 */}
        <div className="col-span-2 bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">薪资市场对标</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} unit="K" />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} formatter={(value) => [`${Number(value)}K`, '月薪']} />
              <ReferenceLine y={result.aiRecommended / 1000} stroke="#6366f1" strokeDasharray="5 5" label={{ value: 'AI推荐', fill: '#6366f1', fontSize: 10 }} />
              <Bar dataKey="value" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-2 text-xs text-muted">
            <span>区间: {result.salaryMin/1000}K - {result.salaryMax/1000}K</span>
            <span className="font-semibold text-accent">AI推荐: {result.aiRecommended/1000}K</span>
          </div>
        </div>

        {/* 调薪因素 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-1.5">
            <DollarSign className="w-4 h-4 text-accent" /> 调薪因素
          </h3>
          <div className="space-y-3">
            {result.factors.map((f, i) => {
              const Icon = ImpactIcon[f.impact];
              const color = f.impact === 'positive' ? '#22c55e' : f.impact === 'negative' ? '#ef4444' : '#64748b';
              return (
                <div key={i} className="p-3 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-3.5 h-3.5" style={{ color }} />
                    <span className="text-xs font-medium text-foreground">{f.name}</span>
                    <span className="ml-auto text-xs font-bold" style={{ color }}>
                      {f.adjustment > 0 ? '+' : ''}{f.adjustment}%
                    </span>
                  </div>
                  <p className="text-[10px] text-muted">{f.detail}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AiFeedbackLoop
        aiDecision={`AI建议薪资 ${result.aiRecommended/1000}K/月（级别 ${result.level}），位于区间 ${result.salaryMin/1000}K-${result.salaryMax/1000}K 中上位。考虑了8年大厂经验（+5%）、管理经验（+3%）、本科学历（-3%）等因素。`}
        aiConfidence={85}
      />
    </div>
  );
}
