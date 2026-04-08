'use client';

import { useState } from 'react';
import { mockJobs } from '@/lib/mock-data';
import StatusBadge from '@/components/ui/StatusBadge';
import AiChatPanel from '@/components/ai/AiChatPanel';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { Sparkles, MapPin, Users, X, Loader2 } from 'lucide-react';

export default function JobPostingPage() {
  const [showAiDialog, setShowAiDialog] = useState(false);
  const [aiForm, setAiForm] = useState({ title: '', department: '', level: '', description: '' });
  const [generating, setGenerating] = useState(false);
  const [generatedJD, setGeneratedJD] = useState<string | null>(null);

  const handleGenerate = () => {
    setGenerating(true);
    setGeneratedJD(null);
    setTimeout(() => {
      setGeneratedJD(
        `【${aiForm.title || '未填写岗位'}】\n\n` +
        `部门：${aiForm.department || '未填写'}\n级别：${aiForm.level || '未填写'}\n\n` +
        `岗位职责：\n1. 负责${aiForm.department || '相关'}核心业务的架构设计与开发\n2. 推进工程化建设，提升团队研发效率\n3. 参与技术方案评审与选型决策\n4. 指导初中级工程师技术成长\n\n` +
        `任职要求：\n1. 本科及以上学历，计算机相关专业\n2. ${aiForm.level?.includes('P7') ? '5年' : '3年'}以上相关领域开发经验\n3. 扎实的编程基础与系统设计能力\n4. 良好的沟通协作能力和团队意识\n\n` +
        `${aiForm.description ? `补充说明：${aiForm.description}` : ''}`
      );
      setGenerating(false);
    }, 1500);
  };

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
          <button
            onClick={() => { setShowAiDialog(true); setGeneratedJD(null); }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium hover:bg-accent/90 transition"
          >
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
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> HC: {job.headcount}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.requirements.slice(0, 3).map((req, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] text-muted">{req}</span>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-3 text-xs">
                <span className="text-accent font-medium">{job.applicantCount} 人投递</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI生成岗位JD弹窗 */}
      {showAiDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowAiDialog(false)}>
          <div className="bg-white rounded-xl border border-border w-full max-w-2xl max-h-[85vh] overflow-auto p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-accent" />
                AI智能生成岗位JD
              </h3>
              <button onClick={() => setShowAiDialog(false)} className="p-1 rounded-lg hover:bg-slate-100 transition"><X className="w-4 h-4" /></button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-muted block mb-1">岗位名称</label>
                <input value={aiForm.title} onChange={e => setAiForm(f => ({ ...f, title: e.target.value }))} placeholder="如：高级前端工程师" className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted block mb-1">所属部门</label>
                  <input value={aiForm.department} onChange={e => setAiForm(f => ({ ...f, department: e.target.value }))} placeholder="如：技术研发部" className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
                <div>
                  <label className="text-xs text-muted block mb-1">岗位级别</label>
                  <input value={aiForm.level} onChange={e => setAiForm(f => ({ ...f, level: e.target.value }))} placeholder="如：P6-P7" className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="text-xs text-muted block mb-1">补充描述（可选）</label>
                <textarea value={aiForm.description} onChange={e => setAiForm(f => ({ ...f, description: e.target.value }))} rows={3} placeholder="描述核心职责、技能要求等，AI将据此生成完整JD..." className="w-full border border-border rounded-lg px-3 py-2 text-sm resize-none" />
              </div>
              <button onClick={handleGenerate} disabled={generating || !aiForm.title.trim()} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent/90 transition disabled:opacity-50">
                {generating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {generating ? 'AI生成中...' : '生成JD'}
              </button>
              {generatedJD && (
                <div className="mt-3 p-4 bg-accent-light rounded-lg border border-accent/20">
                  <p className="text-xs font-medium text-accent mb-2">✨ AI生成结果</p>
                  <pre className="text-sm text-foreground whitespace-pre-wrap font-sans leading-relaxed">{generatedJD}</pre>
                  <div className="mt-3 flex gap-2">
                    <button onClick={() => { setShowAiDialog(false); setGeneratedJD(null); }} className="px-3 py-1.5 rounded-lg bg-accent text-white text-xs font-medium">采纳并发布</button>
                    <button onClick={handleGenerate} className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-muted">重新生成</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

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
