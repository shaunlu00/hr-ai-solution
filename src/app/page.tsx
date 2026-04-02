'use client';

import { PIPELINE_STAGES } from '@/lib/constants';
import { mockCandidates, mockJobs, pipelineStats } from '@/lib/mock-data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Briefcase, Clock, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const COLORS = ['#6366f1', '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#f97316', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1'];

export default function DashboardPage() {
  // 看板数据
  const barData = PIPELINE_STAGES.map((stage, i) => ({
    name: stage.shortLabel,
    value: pipelineStats[stage.key]?.count || 0,
    fill: COLORS[i],
  }));

  const totalCandidates = Object.values(pipelineStats).reduce((a, b) => a + b.count, 0);
  const activeJobs = mockJobs.filter(j => j.status === 'published').length;

  // 部门分布饼图
  const deptData = [
    { name: '技术研发部', value: 45 },
    { name: 'AI平台部', value: 30 },
    { name: '产品设计部', value: 15 },
    { name: '其他', value: 10 },
  ];
  const PIE_COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#94a3b8'];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 顶部统计卡片 */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
          <div className="flex items-center gap-2 mb-3 opacity-80">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-medium">AI处理效率</span>
          </div>
          <p className="text-3xl font-bold">94.2%</p>
          <p className="text-xs opacity-70 mt-1">较上月 +2.3%</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-2 mb-3 text-muted">
            <Users className="w-4 h-4" />
            <span className="text-xs font-medium">候选人总数</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{totalCandidates}</p>
          <p className="text-xs text-success mt-1">↑ 12 本周新增</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-2 mb-3 text-muted">
            <Briefcase className="w-4 h-4" />
            <span className="text-xs font-medium">在招岗位</span>
          </div>
          <p className="text-3xl font-bold text-foreground">{activeJobs}</p>
          <p className="text-xs text-muted mt-1">3 个部门</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-5 card-hover">
          <div className="flex items-center gap-2 mb-3 text-muted">
            <Clock className="w-4 h-4" />
            <span className="text-xs font-medium">平均招聘周期</span>
          </div>
          <p className="text-3xl font-bold text-foreground">18<span className="text-lg ml-1">天</span></p>
          <p className="text-xs text-success mt-1">↓ 较传统缩短40%</p>
        </div>
      </div>

      {/* Pipeline看板 */}
      <div className="bg-white rounded-xl border border-border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">招聘流程看板</h3>
          <Link href="/pipeline-ops" className="text-xs text-accent hover:underline flex items-center gap-1">
            查看全流程运营看板 <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {PIPELINE_STAGES.map((stage, i) => {
            const stat = pipelineStats[stage.key];
            return (
              <Link
                key={stage.key}
                href={`/${stage.key}`}
                className="min-w-[100px] p-3 rounded-xl border border-border bg-slate-50/50 hover:bg-white hover:shadow-sm transition card-hover text-center shrink-0"
              >
                <div className="w-8 h-8 rounded-lg mx-auto mb-2 flex items-center justify-center text-sm" style={{ backgroundColor: stage.color + '15', color: stage.color }}>
                  {stat?.count || 0}
                </div>
                <p className="text-[10px] font-medium text-foreground">{stage.shortLabel}</p>
                <p className="text-[10px] text-muted">{stat?.label}</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* 图表行 */}
      <div className="grid grid-cols-3 gap-4">
        {/* 各环节人数柱状图 */}
        <div className="col-span-2 bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">各环节候选人分布</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {barData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 部门分布饼图 */}
        <div className="bg-white rounded-xl border border-border p-5">
          <h3 className="text-sm font-semibold text-foreground mb-4">部门需求分布</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={deptData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {deptData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 最近候选人动态 */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h3 className="text-sm font-semibold text-foreground mb-4">重点候选人追踪</h3>
        <div className="space-y-3">
          {mockCandidates.slice(0, 5).map(c => {
            const stage = PIPELINE_STAGES.find(s => s.key === c.stage);
            return (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 transition">
                <span className="text-xl">{c.avatar}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground">{c.name}</p>
                  <p className="text-[10px] text-muted">{c.currentCompany} · {c.currentTitle}</p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: (stage?.color || '#6366f1') + '15', color: stage?.color }}>
                    {stage?.label}
                  </span>
                </div>
                <div className="text-right w-16">
                  <p className="text-sm font-bold" style={{ color: c.aiScore >= 90 ? '#22c55e' : c.aiScore >= 80 ? '#f59e0b' : '#64748b' }}>{c.aiScore}</p>
                  <p className="text-[10px] text-muted">AI评分</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
