'use client';

import { mockCandidates, mockJobs } from '@/lib/mock-data';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Shield, CheckCircle2, Clock, XCircle, AlertTriangle } from 'lucide-react';

export default function BackgroundCheckPage() {
  const candidate = mockCandidates.find(c => c.stage === 'background-check');

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="info"
        title="AI背调进度"
        content="已完成 5/7 项背调，预计今日完成全部核实。目前未发现异常信息。学历验证已通过，工作经历核实中。"
      />

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center gap-3">
          <Shield className="w-5 h-5 text-accent" />
          <div>
            <h3 className="text-sm font-semibold text-foreground">背景调查 — {candidate?.name}</h3>
            <p className="text-xs text-muted">应聘: {mockJobs.find(j => j.id === candidate?.appliedJobId)?.title ?? '目标岗位'}</p>
          </div>
        </div>
        <div className="p-5 space-y-3">
          {[
            { item: '身份信息核实', status: 'passed', detail: '身份证号码、姓名、年龄均核实一致', icon: CheckCircle2, color: 'text-green-500' },
            { item: '学历验证', status: 'passed', detail: `${candidate?.education.school} ${candidate?.education.major} ${candidate?.education.degree} — 学信网验证通过`, icon: CheckCircle2, color: 'text-green-500' },
            { item: '工作经历核实', status: 'passed', detail: `${candidate?.currentCompany} 在职信息核实一致，任职时间匹配`, icon: CheckCircle2, color: 'text-green-500' },
            { item: '犯罪记录查询', status: 'passed', detail: '无犯罪记录', icon: CheckCircle2, color: 'text-green-500' },
            { item: '信用记录查询', status: 'passed', detail: '信用良好，无不良记录', icon: CheckCircle2, color: 'text-green-500' },
            { item: '前雇主评价', status: 'in-progress', detail: '正在联系前直属上级进行工作表现评价', icon: Clock, color: 'text-amber-500' },
            { item: '竞业协议排查', status: 'in-progress', detail: '正在确认是否存在竞业限制条款', icon: Clock, color: 'text-amber-500' },
          ].map((check, i) => {
            const Icon = check.icon;
            return (
              <div key={i} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50">
                <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${check.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{check.item}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                      check.status === 'passed' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                    }`}>
                      {check.status === 'passed' ? '已通过' : '进行中'}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted mt-0.5">{check.detail}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
