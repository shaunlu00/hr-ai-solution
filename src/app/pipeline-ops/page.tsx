'use client';

import { useState } from 'react';
import { PIPELINE_STAGES } from '@/lib/constants';
import { mockCandidateJourneys, mockCandidates } from '@/lib/mock-data';
import { CompletionMethod, PipelineStage } from '@/lib/types';
import { Bot, UserCheck, PenLine, User, Info, ChevronDown, Filter, Zap, Shield, Eye, Loader } from 'lucide-react';

// 完成方式配置
const METHOD_CONFIG: Record<CompletionMethod, { label: string; shortLabel: string; color: string; bgColor: string; icon: React.ReactNode; desc: string }> = {
  'ai-auto': {
    label: 'AI智能体',
    shortLabel: 'AI智能体',
    color: '#6366f1',
    bgColor: '#eef2ff',
    icon: <Bot className="w-4 h-4" />,
    desc: 'AI智能体独立完成，无需人工介入',
  },
  'ai-human-confirm': {
    label: 'AI+人工复核',
    shortLabel: 'AI+人工复核',
    color: '#22c55e',
    bgColor: '#f0fdf4',
    icon: (
      <span className="inline-flex items-center gap-0.5">
        <Bot className="w-3.5 h-3.5" />
        <UserCheck className="w-3.5 h-3.5" />
      </span>
    ),
    desc: 'AI智能体处理，人工复核确认',
  },
  'ai-human-correction': {
    label: 'AI+人工修正',
    shortLabel: 'AI+人工修正',
    color: '#f59e0b',
    bgColor: '#fffbeb',
    icon: (
      <span className="inline-flex items-center gap-0.5">
        <Bot className="w-3.5 h-3.5" />
        <PenLine className="w-3.5 h-3.5" />
      </span>
    ),
    desc: 'AI智能体处理，人工修正调整',
  },
  'human-manual': {
    label: '人工执行',
    shortLabel: '人工执行',
    color: '#64748b',
    bgColor: '#f1f5f9',
    icon: <User className="w-4 h-4" />,
    desc: '由HR或面试官手动执行完成',
  },
};

// 简短阶段名用于表头
const SHORT_STAGES: PipelineStage[] = [
  'job-posting', 'resume-screening', 'interview-scheduling', 'ai-interview',
  'second-interview', 'grading', 'salary', 'approval',
  'offer', 'background-check', 'candidate-pool', 'onboarding',
  'probation', 'training',
];

export default function PipelineOpsPage() {
  const [selectedCell, setSelectedCell] = useState<{ candidateId: string; stage: PipelineStage } | null>(null);
  const [filterMethod, setFilterMethod] = useState<CompletionMethod | 'all'>('all');
  const [filterJob, setFilterJob] = useState<string>('all');

  const journeys = mockCandidateJourneys;

  // 统计方法分布
  const methodStats = {
    'ai-auto': 0,
    'ai-human-confirm': 0,
    'ai-human-correction': 0,
    'human-manual': 0,
  };
  journeys.forEach(j => j.completedStages.forEach(s => { methodStats[s.method]++; }));
  const totalCompleted = Object.values(methodStats).reduce((a, b) => a + b, 0);

  // 筛选
  const filteredJourneys = journeys.filter(j => {
    if (filterJob !== 'all' && j.appliedJob !== filterJob) return false;
    return true;
  });

  const uniqueJobs = [...new Set(journeys.map(j => j.appliedJob))];

  // 获取某个候选人在某个阶段的完成信息
  const getStageInfo = (candidateId: string, stage: PipelineStage) => {
    const journey = journeys.find(j => j.candidateId === candidateId);
    if (!journey) return null;

    const completed = journey.completedStages.find(s => s.stage === stage);
    if (completed) return { type: 'completed' as const, ...completed };

    if (journey.currentStage === stage) return { type: 'current' as const };

    // 检查是否为未来阶段
    const stageIdx = SHORT_STAGES.indexOf(stage);
    const currentIdx = SHORT_STAGES.indexOf(journey.currentStage);
    if (stageIdx > currentIdx) return { type: 'future' as const };

    return null;
  };

  return (
    <div className="p-6 space-y-6 animate-fade-in">
      {/* 图例与总统计 */}
      <div className="grid grid-cols-4 gap-4">
        {(Object.entries(METHOD_CONFIG) as [CompletionMethod, typeof METHOD_CONFIG[CompletionMethod]][]).map(([key, cfg]) => {
          const count = methodStats[key];
          const pct = totalCompleted > 0 ? ((count / totalCompleted) * 100).toFixed(1) : '0';
          return (
            <button
              key={key}
              onClick={() => setFilterMethod(filterMethod === key ? 'all' : key)}
              className={`bg-white rounded-xl border p-4 text-left transition-all card-hover ${
                filterMethod === key ? 'ring-2 ring-offset-1' : 'border-border'
              }`}
              style={{ borderColor: filterMethod === key ? cfg.color : undefined, ['--tw-ring-color' as string]: cfg.color }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: cfg.bgColor, color: cfg.color }}>
                  {cfg.icon}
                </div>
                <span className="text-xs font-medium text-muted">{cfg.label}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold" style={{ color: cfg.color }}>{count}</span>
                <span className="text-xs text-muted">次 · {pct}%</span>
              </div>
              <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cfg.color }} />
              </div>
              <p className="text-[10px] text-muted mt-1.5">{cfg.desc}</p>
            </button>
          );
        })}
      </div>

      {/* 协作模式洞察 */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-xl border border-indigo-100 p-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/80 flex items-center justify-center text-indigo-500 shrink-0 mt-0.5">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1">人机协作洞察</h3>
            <div className="grid grid-cols-3 gap-4 text-xs">
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-indigo-500" />
                <span className="text-muted">AI自动化率</span>
                <span className="font-semibold text-indigo-600">{totalCompleted > 0 ? ((methodStats['ai-auto'] / totalCompleted) * 100).toFixed(1) : 0}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-green-500" />
                <span className="text-muted">人工参与率</span>
                <span className="font-semibold text-green-600">
                  {totalCompleted > 0 ? (((methodStats['ai-human-confirm'] + methodStats['ai-human-correction'] + methodStats['human-manual']) / totalCompleted) * 100).toFixed(1) : 0}%
                </span>
              </div>
              <div className="flex items-center gap-2">
                <UserCheck className="w-3.5 h-3.5 text-amber-500" />
                <span className="text-muted">人工修正率</span>
                <span className="font-semibold text-amber-600">
                  {totalCompleted > 0 ? ((methodStats['ai-human-correction'] / totalCompleted) * 100).toFixed(1) : 0}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 筛选条件 */}
      <div className="flex items-center gap-3">
        <Filter className="w-4 h-4 text-muted" />
        <div className="relative">
          <select
            value={filterJob}
            onChange={e => setFilterJob(e.target.value)}
            className="h-8 pl-3 pr-8 rounded-lg border border-border bg-white text-xs text-foreground appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
          >
            <option value="all">所有部门</option>
            {uniqueJobs.map(j => <option key={j} value={j}>{j}</option>)}
          </select>
          <ChevronDown className="w-3 h-3 text-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
        {filterMethod !== 'all' && (
          <button
            onClick={() => setFilterMethod('all')}
            className="h-8 px-3 rounded-lg text-xs font-medium text-white transition"
            style={{ backgroundColor: METHOD_CONFIG[filterMethod].color }}
          >
            筛选: {METHOD_CONFIG[filterMethod].shortLabel} ✕
          </button>
        )}
        <span className="text-xs text-muted ml-auto">共 {filteredJourneys.length} 位候选人 · {PIPELINE_STAGES.length} 个环节</span>
      </div>

      {/* 矩阵表格 */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="bg-slate-50 border-b border-border">
                <th className="sticky left-0 z-20 bg-slate-50 text-left px-4 py-3 text-xs font-semibold text-foreground w-48 min-w-48">
                  候选人
                </th>
                {PIPELINE_STAGES.map(stage => (
                  <th key={stage.key} className="px-1.5 py-3 text-center">
                    <div className="text-xs font-semibold text-foreground leading-tight">{stage.shortLabel}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredJourneys.map((journey, idx) => {
                const candidate = mockCandidates.find(c => c.id === journey.candidateId);
                return (
                  <tr
                    key={journey.candidateId}
                    className={`border-b border-border/50 hover:bg-slate-50/50 transition ${idx % 2 === 0 ? '' : 'bg-slate-25'}`}
                  >
                    {/* 候选人信息 */}
                    <td className="sticky left-0 z-10 bg-white px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{journey.avatar}</span>
                        <div>
                          <p className="text-sm font-medium text-foreground">{journey.candidateName}</p>
                          <p className="text-[10px] text-muted">{journey.appliedJob}</p>
                        </div>
                      </div>
                    </td>

                    {/* 各阶段状态 */}
                    {SHORT_STAGES.map(stageKey => {
                      const info = getStageInfo(journey.candidateId, stageKey);

                      if (!info || info.type === 'future') {
                        return (
                          <td key={stageKey} className="px-1.5 py-3.5 text-center">
                            <div className="w-10 h-10 mx-auto rounded-lg bg-slate-50 border border-dashed border-slate-200" />
                          </td>
                        );
                      }

                      if (info.type === 'current') {
                        return (
                          <td key={stageKey} className="px-1.5 py-3.5 text-center">
                            <div className="w-10 h-10 mx-auto rounded-lg bg-accent/10 border-2 border-accent/60 flex items-center justify-center">
                              <Loader className="w-4.5 h-4.5 text-accent animate-spin" style={{ animationDuration: '2.5s' }} />
                            </div>
                          </td>
                        );
                      }

                      // completed
                      const method = info.method as CompletionMethod;
                      const cfg = METHOD_CONFIG[method];

                      // 如果筛选了某种方式，灰化其他方式
                      const dimmed = filterMethod !== 'all' && filterMethod !== method;

                      return (
                        <td key={stageKey} className="px-1.5 py-3.5 text-center">
                          <button
                            onClick={() => setSelectedCell(
                              selectedCell?.candidateId === journey.candidateId && selectedCell?.stage === stageKey
                                ? null
                                : { candidateId: journey.candidateId, stage: stageKey }
                            )}
                            className={`w-10 h-10 mx-auto rounded-lg flex items-center justify-center transition-all cursor-pointer relative group ${dimmed ? 'opacity-20' : 'hover:scale-110'}`}
                            style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
                            title={`${cfg.label}${info.note ? ' · ' + info.note : ''}`}
                          >
                            {cfg.icon}
                            {/* Tooltip on hover */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded-lg bg-foreground text-white text-[10px] text-left hidden group-hover:block z-50 shadow-lg">
                              <p className="font-medium mb-0.5">{cfg.label}</p>
                              {info.completedAt && <p className="opacity-70">完成时间: {info.completedAt}</p>}
                              {info.aiAgentName && <p className="opacity-70">执行Agent: {info.aiAgentName}</p>}
                              {info.note && <p className="opacity-70 mt-0.5">📝 {info.note}</p>}
                            </div>
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 选中的单元格详情 */}
      {selectedCell && (() => {
        const journey = journeys.find(j => j.candidateId === selectedCell.candidateId);
        const stageInfo = journey?.completedStages.find(s => s.stage === selectedCell.stage);
        const stageLabel = PIPELINE_STAGES.find(s => s.key === selectedCell.stage)?.label;
        if (!journey || !stageInfo) return null;
        const cfg = METHOD_CONFIG[stageInfo.method];

        return (
          <div className="bg-white rounded-xl border border-border p-5 animate-fade-in">
            <div className="flex items-center gap-3 mb-3">
              <Info className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">详情：{journey.candidateName} · {stageLabel}</h3>
              <button onClick={() => setSelectedCell(null)} className="ml-auto text-xs text-muted hover:text-foreground">关闭</button>
            </div>
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted mb-1">推进方式</p>
                <div className="flex items-center gap-1.5" style={{ color: cfg.color }}>
                  {cfg.icon}
                  <span className="font-medium text-xs">{cfg.label}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">完成时间</p>
                <p className="text-xs font-medium">{stageInfo.completedAt || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">执行Agent</p>
                <p className="text-xs font-medium">{stageInfo.aiAgentName || '人工执行'}</p>
              </div>
              <div>
                <p className="text-xs text-muted mb-1">备注</p>
                <p className="text-xs font-medium">{stageInfo.note || '无'}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 底部说明 */}
      <div className="flex items-center justify-center gap-6 py-3">
        {(Object.entries(METHOD_CONFIG) as [CompletionMethod, typeof METHOD_CONFIG[CompletionMethod]][]).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-1.5 text-xs text-muted">
            <div className="h-5 min-w-5 px-1 rounded inline-flex items-center justify-center" style={{ backgroundColor: cfg.bgColor, color: cfg.color }}>
              {cfg.icon}
            </div>
            <span>{cfg.shortLabel}</span>
          </div>
        ))}
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <div className="w-5 h-5 rounded-lg bg-accent/10 border-2 border-accent/60 flex items-center justify-center">
            <Loader className="w-3 h-3 text-accent animate-spin" style={{ animationDuration: '2.5s' }} />
          </div>
          <span>当前所处环节</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted">
          <div className="w-5 h-5 rounded-lg bg-slate-50 border border-dashed border-slate-200" />
          <span>未到达</span>
        </div>
      </div>
    </div>
  );
}
