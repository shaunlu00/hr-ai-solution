'use client';

import { mockCandidates, mockJobs } from '@/lib/mock-data';
import AiPredictionGauge from '@/components/ai/AiPredictionGauge';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import AiChatPanel from '@/components/ai/AiChatPanel';
import { FileCheck, Mail, DollarSign, CalendarCheck } from 'lucide-react';

export default function OfferPage() {
  const candidate = mockCandidates.find(c => c.stage === 'offer');

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="suggestion"
        title="AI Offer建议"
        content="基于候选人画像和市场数据，AI已生成个性化Offer。建议在Offer中突出「技术发展空间」和「期权激励」，这是该候选人最关注的因素。预计接受概率 82%。"
        actions={[{ label: '查看Offer详情' }, { label: '发送Offer' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        {/* Offer内容 */}
        <div className="col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">Offer详情</h3>
          </div>
          {candidate && (
            <div className="p-5 space-y-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{candidate.avatar}</span>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{candidate.name}</h4>
                  <p className="text-xs text-muted">{mockJobs.find(j => j.id === candidate.appliedJobId)?.title ?? '目标岗位'} · P7</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-1.5 mb-2">
                    <DollarSign className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-foreground">薪资方案</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">38K × 15薪</p>
                  <p className="text-[10px] text-muted mt-1">年薪约 57万 + 签字费 5万</p>
                </div>
                <div className="p-4 rounded-lg bg-slate-50">
                  <div className="flex items-center gap-1.5 mb-2">
                    <CalendarCheck className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs font-medium text-foreground">入职安排</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">04-15</p>
                  <p className="text-[10px] text-muted mt-1">试用期 3个月，五险一金全额缴纳</p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-slate-50">
                <div className="flex items-center gap-1.5 mb-2">
                  <FileCheck className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-medium text-foreground">福利亮点</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs text-muted">
                  <p>✅ 补充商业保险</p>
                  <p>✅ 弹性工作制</p>
                  <p>✅ 年度体检</p>
                  <p>✅ 15天年假</p>
                  <p>✅ 股票期权</p>
                  <p>✅ 培训预算</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 入职概率 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <AiPredictionGauge value={82} label="入职概率" />
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">薪资满意度</span>
                <span className="text-success font-medium">高</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">职业发展匹配</span>
                <span className="text-success font-medium">高</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">竞争Offer风险</span>
                <span className="text-warning font-medium">中</span>
              </div>
            </div>
          </div>
          <AiChatPanel
            title="Offer助手"
            placeholder="输入Offer相关问题..."
            initialMessages={[
              { id: '1', role: 'ai', content: '该候选人同时持有阿里的Offer（40K×16薪），建议在股权和发展空间方面做差异化吸引。', timestamp: '10:00' },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
