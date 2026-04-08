'use client';

import { useState } from 'react';
import { mockAiAgents, mockAgentDailyTasks, mockAgentMonthlyStats } from '@/lib/mock-data';
import {
  Bot, CheckCircle, PenLine, XCircle, Clock, Zap,
  DollarSign, Activity, TrendingUp, ChevronDown, Coins,
  Megaphone, FileSearch, CalendarClock, Award, ClipboardCheck,
  Send, ShieldCheck, Heart, UserCheck, GraduationCap,
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Megaphone, FileSearch, CalendarClock, Bot, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, GraduationCap,
};

const STATUS_COLOR: Record<string, { label: string; color: string; bg: string }> = {
  online: { label: '在线', color: '#22c55e', bg: '#f0fdf4' },
  busy: { label: '忙碌', color: '#f59e0b', bg: '#fffbeb' },
  idle: { label: '空闲', color: '#94a3b8', bg: '#f1f5f9' },
  offline: { label: '离线', color: '#ef4444', bg: '#fef2f2' },
};

const RESULT_CONFIG = {
  correct: { label: '正确', color: '#22c55e', icon: <CheckCircle className="w-3.5 h-3.5" /> },
  corrected: { label: 'HR修正', color: '#f59e0b', icon: <PenLine className="w-3.5 h-3.5" /> },
  rejected: { label: 'HR否决', color: '#ef4444', icon: <XCircle className="w-3.5 h-3.5" /> },
};

const PIE_COLORS = ['#22c55e', '#f59e0b', '#ef4444'];

export default function AiAgentOpsPage() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [taskFilter, setTaskFilter] = useState<'all' | 'correct' | 'corrected' | 'rejected'>('all');

  const agents = mockAiAgents;
  const dailyTasks = mockAgentDailyTasks;
  const monthlyStats = mockAgentMonthlyStats;

  // 当日汇总
  const todayTotal = dailyTasks.length;
  const todayCorrect = dailyTasks.filter(t => t.result === 'correct').length;
  const todayCorrected = dailyTasks.filter(t => t.result === 'corrected').length;
  const todayRejected = dailyTasks.filter(t => t.result === 'rejected').length;
  const todayTokens = dailyTasks.reduce((a, t) => a + t.tokensUsed, 0);
  const todayAccuracy = todayTotal > 0 ? ((todayCorrect / todayTotal) * 100).toFixed(1) : '0';

  // 月度汇总
  const monthTotalTasks = monthlyStats.reduce((a, s) => a + s.totalTasks, 0);
  const monthTimeSaved = monthlyStats.reduce((a, s) => a + s.timeSavedHours, 0);
  const monthTokens = monthlyStats.reduce((a, s) => a + s.tokensUsed, 0);
  const monthCost = monthlyStats.reduce((a, s) => a + s.estimatedCost, 0);
  const monthAvgAccuracy = monthlyStats.length > 0
    ? (monthlyStats.reduce((a, s) => a + s.accuracy, 0) / monthlyStats.length).toFixed(1)
    : '0';

  // 选中的 Agent 的统计
  const selectedAgentInfo = selectedAgent ? agents.find(a => a.id === selectedAgent) : null;
  const selectedDailyTasks = selectedAgent
    ? dailyTasks.filter(t => t.agentId === selectedAgent)
    : dailyTasks;
  const selectedMonthly = selectedAgent
    ? monthlyStats.find(s => s.agentId === selectedAgent)
    : null;

  // 筛选任务
  const filteredTasks = selectedDailyTasks.filter(t => taskFilter === 'all' || t.result === taskFilter);

  // 月度柱状图数据
  const barData = monthlyStats.map(s => {
    const agent = agents.find(a => a.id === s.agentId);
    return {
      name: agent?.name.replace('Agent', '') || s.agentId,
      正确: s.correctTasks,
      修正: s.correctedTasks,
      否决: s.rejectedTasks,
    };
  });

  // 月度饼图数据
  const pieData = [
    { name: '正确完成', value: monthlyStats.reduce((a, s) => a + s.correctTasks, 0) },
    { name: 'HR修正', value: monthlyStats.reduce((a, s) => a + s.correctedTasks, 0) },
    { name: 'HR否决', value: monthlyStats.reduce((a, s) => a + s.rejectedTasks, 0) },
  ];

  return (
    <div className="p-6 space-y-6 animate-fade-in py-0">
      {/* 当日概览 */}
      <div className="grid grid-cols-6 gap-4">
        <StatCard icon={<Activity className="w-4 h-4" />} label="当日任务总量" value={todayTotal} suffix="个" color="#6366f1" />
        <StatCard icon={<CheckCircle className="w-4 h-4" />} label="正确完成" value={todayCorrect} suffix="个" color="#22c55e" />
        <StatCard icon={<PenLine className="w-4 h-4" />} label="HR修正" value={todayCorrected} suffix="个" color="#f59e0b" />
        <StatCard icon={<XCircle className="w-4 h-4" />} label="HR否决" value={todayRejected} suffix="个" color="#ef4444" />
        <StatCard icon={<TrendingUp className="w-4 h-4" />} label="当日准确率" value={todayAccuracy} suffix="%" color="#8b5cf6" />
        <StatCard icon={<Zap className="w-4 h-4" />} label="当日Token" value={(todayTokens / 1000).toFixed(1)} suffix="K" color="#ec4899" />
      </div>

      {/* Agent 状态卡片网格 */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">智能体工作状态</h3>
        <div className="grid grid-cols-4 gap-3">
          {agents.map(agent => {
            const Icon = iconMap[agent.icon];
            const statusCfg = STATUS_COLOR[agent.status];
            const agentDayTasks = dailyTasks.filter(t => t.agentId === agent.id);
            const agentMonthly = monthlyStats.find(s => s.agentId === agent.id);
            const isSelected = selectedAgent === agent.id;

            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(isSelected ? null : agent.id)}
                className={`bg-white rounded-xl border p-4 text-left transition-all card-hover ${
                  isSelected ? 'ring-2 ring-accent border-accent' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-accent-light flex items-center justify-center text-accent">
                      {Icon ? <Icon className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-foreground">{agent.name}</p>
                      <p className="text-[10px] text-muted truncate max-w-[140px]">{agent.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ backgroundColor: statusCfg.bg, color: statusCfg.color }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: statusCfg.color }} />
                    {statusCfg.label}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border/50">
                  <div>
                    <p className="text-[10px] text-muted">今日</p>
                    <p className="text-sm font-bold text-foreground">{agentDayTasks.length}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted">月任务</p>
                    <p className="text-sm font-bold text-foreground">{agentMonthly?.totalTasks || 0}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted">准确率</p>
                    <p className="text-sm font-bold" style={{ color: (agentMonthly?.accuracy || 0) >= 90 ? '#22c55e' : (agentMonthly?.accuracy || 0) >= 80 ? '#f59e0b' : '#ef4444' }}>
                      {agentMonthly?.accuracy || 0}%
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 当日任务明细 */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">
            {selectedAgentInfo ? `${selectedAgentInfo.name} · 当日任务明细` : '全部智能体 · 当日任务明细'}
          </h3>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={taskFilter}
                onChange={e => setTaskFilter(e.target.value as typeof taskFilter)}
                className="h-7 pl-2.5 pr-7 rounded-lg border border-border bg-background text-[11px] appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/20"
              >
                <option value="all">全部结果</option>
                <option value="correct">正确</option>
                <option value="corrected">HR修正</option>
                <option value="rejected">HR否决</option>
              </select>
              <ChevronDown className="w-3 h-3 text-muted absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            {selectedAgent && (
              <button onClick={() => setSelectedAgent(null)} className="text-xs text-accent hover:underline">查看全部</button>
            )}
          </div>
        </div>
        <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
          <table className="w-full">
            <thead className="bg-slate-50 sticky top-0 z-10">
              <tr>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">时间</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">智能体</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">任务类型</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">候选人</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">耗时</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">Token</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">结果</th>
                <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">备注</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.map(task => {
                const agent = agents.find(a => a.id === task.agentId);
                const resultCfg = RESULT_CONFIG[task.result];
                return (
                  <tr key={task.id} className="border-b border-border/30 hover:bg-slate-50/50 transition">
                    <td className="px-4 py-2.5 text-xs text-muted whitespace-nowrap">
                      <span className="font-mono">{task.startedAt}</span>
                      <span className="text-muted/50 mx-1">→</span>
                      <span className="font-mono">{task.completedAt}</span>
                    </td>
                    <td className="px-4 py-2.5">
                      <span className="text-xs font-medium text-foreground">{agent?.name || task.agentId}</span>
                    </td>
                    <td className="px-4 py-2.5 text-xs text-foreground">{task.taskType}</td>
                    <td className="px-4 py-2.5 text-xs font-medium text-foreground">{task.candidateName}</td>
                    <td className="px-4 py-2.5 text-xs text-muted whitespace-nowrap">
                      <Clock className="w-3 h-3 inline mr-1" />
                      {calculateDuration(task.startedAt, task.completedAt)}
                    </td>
                    <td className="px-4 py-2.5 text-xs text-muted font-mono">{task.tokensUsed.toLocaleString()}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{ backgroundColor: resultCfg.color + '18', color: resultCfg.color }}
                      >
                        {resultCfg.icon}
                        {resultCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-[11px] text-muted max-w-[200px] truncate">
                      {task.correctionNote || '-'}
                    </td>
                  </tr>
                );
              })}
              {filteredTasks.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-sm text-muted">暂无匹配的任务记录</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 月度统计区域 */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">📊 3月份工作统计汇总</h3>

        {/* 月度概览 4 卡片 */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3 opacity-80">
              <Activity className="w-4 h-4" />
              <span className="text-xs font-medium">月度任务总量</span>
            </div>
            <p className="text-3xl font-bold">{monthTotalTasks}</p>
            <p className="text-xs opacity-70 mt-1">平均准确率 {monthAvgAccuracy}%</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3 opacity-80">
              <Clock className="w-4 h-4" />
              <span className="text-xs font-medium">节约人工时效</span>
            </div>
            <p className="text-3xl font-bold">{monthTimeSaved}<span className="text-lg ml-1">h</span></p>
            <p className="text-xs opacity-70 mt-1">≈ {(monthTimeSaved / 8).toFixed(0)} 个工作日</p>
          </div>
          <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3 opacity-80">
              <Zap className="w-4 h-4" />
              <span className="text-xs font-medium">Token消耗</span>
            </div>
            <p className="text-3xl font-bold">{(monthTokens / 1000000).toFixed(2)}<span className="text-lg ml-1">M</span></p>
            <p className="text-xs opacity-70 mt-1">约 {(monthTokens / 1000).toFixed(0)}K tokens</p>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3 opacity-80">
              <Coins className="w-4 h-4" />
              <span className="text-xs font-medium">预计费用</span>
            </div>
            <p className="text-3xl font-bold">¥{monthCost.toFixed(0)}</p>
            <p className="text-xs opacity-70 mt-1">平均 ¥{(monthCost / monthTotalTasks).toFixed(2)}/任务</p>
          </div>
        </div>

        {/* 图表区 */}
        <div className="grid grid-cols-3 gap-4">
          {/* 各Agent任务量柱状图 */}
          <div className="col-span-2 bg-white rounded-xl border border-border p-5">
            <h4 className="text-xs font-semibold text-foreground mb-4">各智能体月度任务量分布</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{ fontSize: 10 }} interval={0} angle={-30} textAnchor="end" height={60} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Bar dataKey="正确" stackId="a" fill="#22c55e" radius={[0, 0, 0, 0]} />
                <Bar dataKey="修正" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                <Bar dataKey="否决" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 任务结果饼图 */}
          <div className="bg-white rounded-xl border border-border p-5">
            <h4 className="text-xs font-semibold text-foreground mb-4">月度任务结果构成</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="45%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(1)}%`}
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 各Agent月度详情表格 */}
        <div className="bg-white rounded-xl border border-border overflow-hidden mt-4">
          <div className="px-5 py-4 border-b border-border">
            <h4 className="text-xs font-semibold text-foreground">各智能体月度效能明细</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-4 py-2.5 text-[11px] font-semibold text-muted">智能体</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">总任务</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">正确</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">修正</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">否决</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">准确率</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">节约时效</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">Token用量</th>
                  <th className="text-center px-4 py-2.5 text-[11px] font-semibold text-muted">预计费用</th>
                </tr>
              </thead>
              <tbody>
                {monthlyStats.map(stat => {
                  const agent = agents.find(a => a.id === stat.agentId);
                  const Icon = agent ? iconMap[agent.icon] : null;
                  return (
                    <tr key={stat.agentId} className="border-b border-border/30 hover:bg-slate-50/50 transition">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded flex items-center justify-center bg-accent-light text-accent">
                            {Icon ? <Icon className="w-3 h-3" /> : <Bot className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-medium text-foreground">{agent?.name || stat.agentId}</span>
                        </div>
                      </td>
                      <td className="text-center px-4 py-3 text-xs font-semibold text-foreground">{stat.totalTasks}</td>
                      <td className="text-center px-4 py-3 text-xs text-green-600 font-medium">{stat.correctTasks}</td>
                      <td className="text-center px-4 py-3 text-xs text-amber-600 font-medium">{stat.correctedTasks}</td>
                      <td className="text-center px-4 py-3 text-xs text-red-600 font-medium">{stat.rejectedTasks}</td>
                      <td className="text-center px-4 py-3">
                        <span className={`text-xs font-bold ${stat.accuracy >= 90 ? 'text-green-600' : stat.accuracy >= 80 ? 'text-amber-600' : 'text-red-600'}`}>
                          {stat.accuracy}%
                        </span>
                        <div className="mt-1 h-1 bg-slate-100 rounded-full overflow-hidden mx-2">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${stat.accuracy}%`,
                              backgroundColor: stat.accuracy >= 90 ? '#22c55e' : stat.accuracy >= 80 ? '#f59e0b' : '#ef4444',
                            }}
                          />
                        </div>
                      </td>
                      <td className="text-center px-4 py-3 text-xs text-foreground font-medium">{stat.timeSavedHours}h</td>
                      <td className="text-center px-4 py-3 text-xs text-muted font-mono">{(stat.tokensUsed / 1000).toFixed(1)}K</td>
                      <td className="text-center px-4 py-3 text-xs text-foreground font-medium">¥{stat.estimatedCost.toFixed(2)}</td>
                    </tr>
                  );
                })}
                {/* 合计行 */}
                <tr className="bg-slate-50 font-semibold">
                  <td className="px-4 py-3 text-xs text-foreground">合计</td>
                  <td className="text-center px-4 py-3 text-xs text-foreground">{monthTotalTasks}</td>
                  <td className="text-center px-4 py-3 text-xs text-green-600">{monthlyStats.reduce((a, s) => a + s.correctTasks, 0)}</td>
                  <td className="text-center px-4 py-3 text-xs text-amber-600">{monthlyStats.reduce((a, s) => a + s.correctedTasks, 0)}</td>
                  <td className="text-center px-4 py-3 text-xs text-red-600">{monthlyStats.reduce((a, s) => a + s.rejectedTasks, 0)}</td>
                  <td className="text-center px-4 py-3 text-xs text-accent">{monthAvgAccuracy}%</td>
                  <td className="text-center px-4 py-3 text-xs text-foreground">{monthTimeSaved}h</td>
                  <td className="text-center px-4 py-3 text-xs text-muted font-mono">{(monthTokens / 1000).toFixed(1)}K</td>
                  <td className="text-center px-4 py-3 text-xs text-foreground">¥{monthCost.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// 工具函数：计算时长
function calculateDuration(start: string, end: string): string {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  const diff = (eh * 60 + em) - (sh * 60 + sm);
  if (diff < 60) return `${diff}min`;
  return `${Math.floor(diff / 60)}h${diff % 60}min`;
}

// 统计小卡片组件
function StatCard({ icon, label, value, suffix, color }: {
  icon: React.ReactNode; label: string; value: string | number; suffix: string; color: string;
}) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 card-hover">
      <div className="flex items-center gap-1.5 mb-2">
        <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: color + '15', color }}>
          {icon}
        </div>
        <span className="text-[10px] text-muted font-medium">{label}</span>
      </div>
      <div className="flex items-baseline gap-0.5">
        <span className="text-xl font-bold" style={{ color }}>{value}</span>
        <span className="text-xs text-muted">{suffix}</span>
      </div>
    </div>
  );
}
