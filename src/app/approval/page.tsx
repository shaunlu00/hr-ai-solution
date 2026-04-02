'use client';

import { mockCandidates, mockJobs } from '@/lib/mock-data';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import AiChatPanel from '@/components/ai/AiChatPanel';
import { CheckCircle2, Clock, AlertCircle, FileText } from 'lucide-react';

export default function ApprovalPage() {
  const candidate = mockCandidates.find(c => c.stage === 'approval');

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="success"
        title="AI审批摘要"
        content="AI已为审批人生成决策摘要：候选人整体表现优秀（AI评分92），定级P7合理，薪资在预算范围内。建议快速审批以抢占优质人才。"
        actions={[{ label: '快速审批' }, { label: '查看完整报告' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">审批流程</h3>
          </div>
          <div className="p-5">
            {/* 审批流 */}
            <div className="space-y-4">
              {[
                { name: 'HR初审', approver: '王HR', status: 'approved', date: '03-25 10:00', comment: '候选人条件符合岗位要求，建议通过' },
                { name: '部门负责人', approver: '刘总监', status: 'approved', date: '03-25 14:30', comment: '技术能力突出，团队协作评价好，同意' },
                { name: 'VP审批', approver: '陈VP', status: 'pending', date: '-', comment: '' },
                { name: 'CEO审批', approver: '张CEO', status: 'waiting', date: '-', comment: '' },
              ].map((step, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    step.status === 'approved' ? 'bg-green-100 text-green-600' :
                    step.status === 'pending' ? 'bg-amber-100 text-amber-600' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {step.status === 'approved' ? <CheckCircle2 className="w-4 h-4" /> :
                     step.status === 'pending' ? <Clock className="w-4 h-4" /> :
                     <AlertCircle className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 pb-4 border-b border-border last:border-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-foreground">{step.name} · {step.approver}</p>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                        step.status === 'approved' ? 'bg-green-50 text-green-600' :
                        step.status === 'pending' ? 'bg-amber-50 text-amber-600' :
                        'bg-slate-50 text-slate-400'
                      }`}>
                        {step.status === 'approved' ? '已通过' : step.status === 'pending' ? '审批中' : '待审批'}
                      </span>
                    </div>
                    {step.comment && <p className="text-[11px] text-muted mt-1">{step.comment}</p>}
                    {step.date !== '-' && <p className="text-[10px] text-muted/60 mt-0.5">{step.date}</p>}
                  </div>
                </div>
              ))}
            </div>

            {/* 候选人摘要 */}
            {candidate && (
              <div className="mt-5 p-4 rounded-lg bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span className="text-xs font-semibold text-accent">AI生成审批摘要</span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  候选人{candidate.name}，应聘{mockJobs.find(j => j.id === candidate.appliedJobId)?.title ?? '目标岗位'}。{candidate.education.school}{candidate.education.degree}学历，
                  {candidate.yearsOfExperience}年工作经验，现任{candidate.currentCompany}{candidate.currentTitle}。
                  AI综合评分{candidate.aiScore}分，{candidate.resumeSummary}。建议级别P7，薪资范围35-40K。
                </p>
              </div>
            )}
          </div>
        </div>

        <AiChatPanel
          title="审批助手"
          placeholder="询问候选人详情..."
          initialMessages={[
            { id: '1', role: 'ai', content: '我已整理好审批材料。该候选人AI评分92，面试表现优秀，薪资在预算范围内。需要我详细说明哪个方面？', timestamp: '10:00' },
          ]}
        />
      </div>
    </div>
  );
}
