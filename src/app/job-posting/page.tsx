'use client';

import { mockJobs } from '@/lib/mock-data';
import StatusBadge from '@/components/ui/StatusBadge';
import AiChatPanel from '@/components/ai/AiChatPanel';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { Sparkles, MapPin, DollarSign, Users } from 'lucide-react';

export default function JobPostingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* AI JD生成建议 */}
      <AiSuggestionCard
        type="suggestion"
        title="AI建议：优化高级前端工程师JD"
        content="根据市场分析，建议在JD中增加「微前端架构经验」和「性能优化经验」等关键词，可提升简历匹配精准度约18%。"
        actions={[{ label: '采纳建议' }, { label: '查看详情' }]}
      />

      {/* 岗位列表 */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">在招岗位列表</h3>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/90 transition">
            <Sparkles className="w-3.5 h-3.5" />
            AI生成新岗位JD
          </button>
        </div>
        <div className="divide-y divide-border">
          {mockJobs.map(job => (
            <div key={job.id} className="p-5 hover:bg-slate-50/50 transition">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{job.title}</h4>
                  <p className="text-xs text-muted mt-0.5">{job.department} · {job.level}</p>
                </div>
                <StatusBadge status={job.status || 'draft'} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted mb-3">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> HC: {job.headcount}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.requirements.slice(0, 3).map((req, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-muted">{req}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="text-accent font-medium">{job.applicantCount} 人投递</span>
                <span className="text-muted">预算: {job.budget}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Chat */}
      <div className="grid grid-cols-2 gap-4">
        <AiChatPanel
          title="JD生成助手"
          placeholder="描述岗位需求，AI帮你生成JD..."
          initialMessages={[
            { id: '1', role: 'ai', content: '你好！我是JD生成助手。请告诉我岗位的基本信息（职位名称、部门、级别、核心职责），我将为你智能生成结构化JD。', timestamp: '09:00' },
          ]}
        />
        <div className="space-y-4">
          <AiSuggestionCard
            type="info"
            title="市场洞察"
            content="当前「高级前端工程师」岗位市场供需比为 1:3.2，建议适当放宽学历要求或提升薪资竞争力以吸引更多优质候选人。"
          />
          <AiSuggestionCard
            type="success"
            title="JD质量评估"
            content="「算法工程师」岗位JD评分 92/100。关键词覆盖率高，职责描述清晰，薪资范围合理。"
          />
        </div>
      </div>
    </div>
  );
}
