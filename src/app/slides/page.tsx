'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Sparkles, Bot, Users, ChevronLeft, ChevronRight, Maximize, Minimize,
  Megaphone, FileSearch, CalendarClock, Award, DollarSign, ClipboardCheck,
  Send, ShieldCheck, Heart, UserCheck, Target, GraduationCap,
  Zap, TrendingUp, Clock, BrainCircuit, ArrowRight, CheckCircle2,
  AlertTriangle, BarChart3, PieChart as PieChartIcon, Layers,
  Rocket, Shield, Eye, Lightbulb, Cpu, HandshakeIcon,
} from 'lucide-react';

/* ================================================================
   slide 数据 & 类型
   ================================================================ */

const TOTAL_SLIDES = 13;

/* ================================================================
   主组件
   ================================================================ */
export default function SlidesPage() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(TOTAL_SLIDES - 1, c + 1)), []);

  /* 键盘导航 */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); next(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
      if (e.key === 'Escape' && isFullscreen) toggleFullscreen();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev, isFullscreen]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const slides = [
    <SlideCover key={0} />,
    <SlideChallenges key={1} />,
    <SlideSolutionOverview key={2} />,
    <SlidePipeline key={3} />,
    <SlideCollaborationModel key={4} />,
    <SlideDeepDive1 key={5} />,
    <SlideDeepDive2 key={6} />,
    <SlideDeepDive3 key={7} />,
    <SlideAiAgents key={8} />,
    <SlideOperationsData key={9} />,
    <SlideROI key={10} />,
    <SlideRoadmap key={11} />,
    <SlideSummary key={12} />,
  ];

  return (
    <div className={`relative w-full ${isFullscreen ? 'h-screen bg-white' : ''}`}>
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-foreground">
            AI人才引进方案 · 汇报演示
          </span>
          <span className="text-xs text-muted px-2 py-0.5 rounded-full bg-accent/10 text-accent">
            {current + 1} / {TOTAL_SLIDES}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={prev} disabled={current === 0}
            className="p-1.5 rounded-lg border border-border hover:bg-accent-light disabled:opacity-30 transition">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={next} disabled={current === TOTAL_SLIDES - 1}
            className="p-1.5 rounded-lg border border-border hover:bg-accent-light disabled:opacity-30 transition">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button onClick={toggleFullscreen}
            className="p-1.5 rounded-lg border border-border hover:bg-accent-light transition ml-2">
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 幻灯片区域 */}
      <div className="relative bg-white rounded-2xl border border-border shadow-lg overflow-hidden"
        style={{ aspectRatio: '16 / 9' }}>
        <div className="absolute inset-0 overflow-hidden">
          {slides[current]}
        </div>
      </div>

      {/* 底部导航点 */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-border hover:bg-muted'
            }`} />
        ))}
      </div>

      {/* 缩略图预览 */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
        {[
          '封面', '现状与挑战', '方案概述', '14阶段流程', '协作模式',
          '筛选与面试', '定级定薪', 'Offer到入职', 'AI智能体矩阵',
          '运营数据', '投资回报', '实施路线图', '总结与展望',
        ].map((label, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
              i === current
                ? 'bg-accent text-white shadow-sm'
                : 'bg-slate-50 text-muted hover:bg-accent-light hover:text-accent border border-border'
            }`}>
            {i + 1}. {label}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   公用子组件
   ================================================================ */

function SlideTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-foreground leading-tight">{children}</h2>
      {sub && <p className="text-sm text-muted mt-1">{sub}</p>}
    </div>
  );
}

function MetricCard({ icon, label, value, sub, color = '#6366f1' }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4 flex items-start gap-3">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + '15', color }}>
        {icon}
      </div>
      <div>
        <p className="text-[11px] text-muted">{label}</p>
        <p className="text-xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-[10px] text-muted">{sub}</p>}
      </div>
    </div>
  );
}

function StageIcon({ icon, color, label, size = 'md' }: {
  icon: React.ReactNode; color: string; label: string; size?: 'sm' | 'md';
}) {
  const dim = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const textSize = size === 'sm' ? 'text-[9px]' : 'text-[10px]';
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${dim} rounded-xl flex items-center justify-center`}
        style={{ backgroundColor: color + '15', color }}>
        {icon}
      </div>
      <span className={`${textSize} text-muted font-medium text-center leading-tight`}>{label}</span>
    </div>
  );
}

/* ================================================================
   Slide 1: 封面
   ================================================================ */
function SlideCover() {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-16">
        {/* Logo */}
        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 border border-white/30">
          <Sparkles className="w-10 h-10 text-white" />
        </div>

        {/* 标题 */}
        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          AI 人才引进方案
        </h1>
        <p className="text-xl text-white/80 mb-2">
          智能化招聘全流程解决方案
        </p>
        <p className="text-sm text-white/50 mb-12">
          AI × HR 深度协作 · 覆盖招聘14个关键环节 · 提效降本增质
        </p>

        {/* 核心数字 */}
        <div className="flex items-center gap-8">
          {[
            { num: '14', label: '全流程环节', icon: <Layers className="w-4 h-4" /> },
            { num: '12', label: 'AI智能体', icon: <Bot className="w-4 h-4" /> },
            { num: '94.2%', label: 'AI处理效率', icon: <Zap className="w-4 h-4" /> },
            { num: '40%', label: '周期缩短', icon: <Clock className="w-4 h-4" /> },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="flex items-center justify-center gap-1.5 mb-1 text-white/60">
                {item.icon}
                <span className="text-xs">{item.label}</span>
              </div>
              <p className="text-3xl font-bold text-white">{item.num}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 底部 */}
      <div className="relative z-10 text-center py-6">
        <p className="text-xs text-white/40">2026年度 · AI智能招聘管理平台</p>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 2: 招聘现状与挑战
   ================================================================ */
function SlideChallenges() {
  const challenges = [
    {
      icon: <Clock className="w-5 h-5" />,
      title: '招聘周期过长',
      desc: '传统招聘平均周期30+天，优秀候选人流失率高',
      metric: '30天+',
      color: '#ef4444',
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'HR工作负荷大',
      desc: '大量重复性事务占据HR 70%以上时间，难以聚焦核心判断',
      metric: '70%',
      color: '#f59e0b',
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: '筛选精准度不足',
      desc: '人工筛选简历遗漏率高，优质候选人容易被错过',
      metric: '35%漏筛',
      color: '#f97316',
    },
    {
      icon: <BarChart3 className="w-5 h-5" />,
      title: '决策缺少数据支撑',
      desc: '定级定薪依赖个人经验，缺乏市场数据和内部对标',
      metric: '主观判断',
      color: '#8b5cf6',
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: '评价标准不一致',
      desc: '不同面试官评分标准差异大，难以保证公平性',
      metric: '偏差±20%',
      color: '#ec4899',
    },
    {
      icon: <AlertTriangle className="w-5 h-5" />,
      title: '候选人体验差',
      desc: '响应慢、流程不透明，影响雇主品牌和Offer接受率',
      metric: '满意度62%',
      color: '#64748b',
    },
  ];

  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="传统招聘模式面临的核心痛点">📋 招聘现状与挑战</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-4">
        {challenges.map((c, i) => (
          <div key={i} className="rounded-xl border border-border p-5 flex flex-col hover:shadow-md transition">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: c.color + '12', color: c.color }}>
                {c.icon}
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
              </div>
            </div>
            <p className="text-xs text-muted flex-1">{c.desc}</p>
            <div className="mt-3 pt-3 border-t border-border">
              <span className="text-lg font-bold" style={{ color: c.color }}>{c.metric}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted px-8 py-2 rounded-full bg-red-50 text-red-500 inline-block">
          💡 核心问题：大量重复性工作消耗HR精力，缺乏数据驱动的科学决策手段
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 3: 方案概述
   ================================================================ */
function SlideSolutionOverview() {
  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="AI × HR 深度协作，覆盖招聘全链路">🎯 方案概述</SlideTitle>

      <div className="flex-1 flex gap-6">
        {/* 左侧：核心理念 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Bot className="w-5 h-5 text-indigo-600" />
              <h3 className="text-sm font-bold text-indigo-700">AI 智能体集群</h3>
            </div>
            <p className="text-xs text-indigo-600/70 mb-3">12个专属AI智能体，覆盖招聘全流程每一个关键环节</p>
            <ul className="space-y-1.5">
              {['数据密集型任务自动处理', '7×24小时无限并发', '结构化评估消除偏见', '实时数据分析与预测'].map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-indigo-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-5 flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Users className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-emerald-700">HR 核心价值</h3>
            </div>
            <p className="text-xs text-emerald-600/70 mb-3">HR从事务中解放，回归人才判断和战略决策的核心价值</p>
            <ul className="space-y-1.5">
              {['专注高价值决策判断', '候选人关系维护', '团队文化匹配评估', '招聘策略优化'].map((t, i) => (
                <li key={i} className="flex items-center gap-2 text-xs text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />{t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 右侧：核心价值 */}
        <div className="w-[320px] flex flex-col gap-4">
          <div className="rounded-xl border border-border p-5">
            <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" /> 方案核心价值
            </h3>
            <div className="space-y-3">
              {[
                { icon: <Zap className="w-4 h-4" />, label: '效率跃升', value: '招聘周期缩短40%', color: '#f59e0b' },
                { icon: <TrendingUp className="w-4 h-4" />, label: '质量提升', value: '优质候选人漏筛率降65%', color: '#22c55e' },
                { icon: <Clock className="w-4 h-4" />, label: '成本优化', value: 'HR事务性工作减少75%', color: '#3b82f6' },
                { icon: <Shield className="w-4 h-4" />, label: '体验改善', value: '候选人满意度提升40%', color: '#8b5cf6' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-50">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: item.color + '15', color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-muted">{item.label}</p>
                    <p className="text-xs font-semibold text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-5 text-white">
            <p className="text-sm font-bold mb-1">核心理念</p>
            <p className="text-xs text-white/80 leading-relaxed">
              AI不是替代HR，而是成为HR最强大的智能助手。<br />
              <span className="font-semibold text-white">「AI提效 + 人工提质」</span>的最佳协同范式
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 4: 全流程14阶段一览
   ================================================================ */
function SlidePipeline() {
  const stages = [
    { icon: <Megaphone className="w-4 h-4" />, label: '岗位发布', color: '#6366f1', mode: 'AI主导' },
    { icon: <FileSearch className="w-4 h-4" />, label: '简历筛选', color: '#8b5cf6', mode: 'AI主导' },
    { icon: <CalendarClock className="w-4 h-4" />, label: '自动约面', color: '#a855f7', mode: 'AI主导' },
    { icon: <Bot className="w-4 h-4" />, label: 'AI面试', color: '#d946ef', mode: 'AI主导' },
    { icon: <Users className="w-4 h-4" />, label: '二轮面试', color: '#ec4899', mode: '人工主导' },
    { icon: <Award className="w-4 h-4" />, label: '候选人定级', color: '#f43f5e', mode: 'AI辅助' },
    { icon: <DollarSign className="w-4 h-4" />, label: '候选人定薪', color: '#f97316', mode: 'AI辅助' },
    { icon: <ClipboardCheck className="w-4 h-4" />, label: '入职审批', color: '#eab308', mode: 'AI辅助' },
    { icon: <Send className="w-4 h-4" />, label: 'Offer发放', color: '#84cc16', mode: 'AI辅助' },
    { icon: <ShieldCheck className="w-4 h-4" />, label: '候选人背调', color: '#22c55e', mode: 'AI主导' },
    { icon: <Heart className="w-4 h-4" />, label: '保温池', color: '#14b8a6', mode: 'AI主导' },
    { icon: <UserCheck className="w-4 h-4" />, label: '入职引导', color: '#06b6d4', mode: 'AI主导' },
    { icon: <Target className="w-4 h-4" />, label: '试用期培养', color: '#3b82f6', mode: 'AI辅助' },
    { icon: <GraduationCap className="w-4 h-4" />, label: '新员工培训', color: '#6366f1', mode: 'AI主导' },
  ];

  const modeColor: Record<string, string> = {
    'AI主导': '#6366f1', 'AI辅助': '#f59e0b', '人工主导': '#3b82f6',
  };

  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="从岗位发布到新员工培训，AI全程赋能">🔄 招聘全流程 14 阶段</SlideTitle>

      {/* 流程图 */}
      <div className="flex-1 flex flex-col justify-center">
        {/* 上排 7个 */}
        <div className="flex items-center justify-center gap-2 mb-2">
          {stages.slice(0, 7).map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-sm"
                  style={{ backgroundColor: s.color + '12', borderColor: s.color + '40', color: s.color }}>
                  {s.icon}
                </div>
                <p className="text-[10px] font-semibold text-foreground mt-1.5">{s.label}</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full mt-0.5 font-medium"
                  style={{ backgroundColor: modeColor[s.mode] + '12', color: modeColor[s.mode] }}>
                  {s.mode}
                </span>
              </div>
              {i < 6 && <ArrowRight className="w-4 h-4 text-border shrink-0 mt-[-20px]" />}
            </div>
          ))}
        </div>

        {/* 连接箭头 */}
        <div className="flex justify-center my-2">
          <div className="w-px h-6 bg-border" />
        </div>

        {/* 下排 7个 */}
        <div className="flex items-center justify-center gap-2">
          {stages.slice(7, 14).map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center border-2 shadow-sm"
                  style={{ backgroundColor: s.color + '12', borderColor: s.color + '40', color: s.color }}>
                  {s.icon}
                </div>
                <p className="text-[10px] font-semibold text-foreground mt-1.5">{s.label}</p>
                <span className="text-[9px] px-1.5 py-0.5 rounded-full mt-0.5 font-medium"
                  style={{ backgroundColor: modeColor[s.mode] + '12', color: modeColor[s.mode] }}>
                  {s.mode}
                </span>
              </div>
              {i < 6 && <ArrowRight className="w-4 h-4 text-border shrink-0 mt-[-20px]" />}
            </div>
          ))}
        </div>

        {/* 图例 */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {[
            { mode: 'AI主导', count: 8, desc: 'AI独立完成，HR复核', color: '#6366f1' },
            { mode: 'AI辅助', count: 5, desc: 'AI提供建议，HR决策', color: '#f59e0b' },
            { mode: '人工主导', count: 1, desc: 'HR执行，AI赋能', color: '#3b82f6' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-xs font-semibold" style={{ color: item.color }}>{item.mode}</span>
              <span className="text-[10px] text-muted">({item.count}个环节 · {item.desc})</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 5: AI×HR协作模式
   ================================================================ */
function SlideCollaborationModel() {
  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="三种协作范式，因环节制宜">🤝 AI × HR 协作模式</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-5">
        {/* AI主导 */}
        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-5 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl">🤖</span>
            <h3 className="text-base font-bold text-indigo-700 mt-2">AI主导 · 人工复核</h3>
            <p className="text-[11px] text-indigo-500 mt-1">8个环节 · 自动化程度最高</p>
          </div>
          <div className="space-y-2 flex-1">
            {['岗位发布', '简历筛选', '自动约面', 'AI面试', '候选人背调', '保温池', '入职引导', '新员工培训'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-indigo-700 bg-white/80 rounded-lg px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />{s}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-indigo-200 text-center">
            <p className="text-[10px] text-indigo-500">AI完成90%+工作，HR审核确认</p>
          </div>
        </div>

        {/* AI辅助 */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-5 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl">🤝</span>
            <h3 className="text-base font-bold text-amber-700 mt-2">AI辅助 · 人工决策</h3>
            <p className="text-[11px] text-amber-500 mt-1">5个环节 · 数据驱动决策</p>
          </div>
          <div className="space-y-2 flex-1">
            {['候选人定级', '候选人定薪', '入职审批', 'Offer发放', '试用期培养'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-amber-700 bg-white/80 rounded-lg px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />{s}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-amber-200 text-center">
            <p className="text-[10px] text-amber-500">AI提供数据与建议，HR做最终决策</p>
          </div>
        </div>

        {/* 人工主导 */}
        <div className="rounded-xl border-2 border-sky-200 bg-sky-50/50 p-5 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl">👤</span>
            <h3 className="text-base font-bold text-sky-700 mt-2">人工主导 · AI赋能</h3>
            <p className="text-[11px] text-sky-500 mt-1">1个环节 · 深度人际交互</p>
          </div>
          <div className="space-y-2 flex-1">
            {['二轮面试'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-sky-700 bg-white/80 rounded-lg px-3 py-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />{s}
              </div>
            ))}
            <div className="mt-2 p-3 rounded-lg bg-white/80 text-xs text-sky-700 space-y-1.5">
              <p className="font-semibold">为什么人工主导？</p>
              <p className="text-[11px] text-sky-600">二轮面试需要深度评估软技能、团队文化匹配度和领导力潜质，这些需要资深面试官的人际洞察力。</p>
              <p className="text-[11px] text-sky-600">AI提供候选人画像报告和面试关注点建议，让面试官有据可依。</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-sky-200 text-center">
            <p className="text-[10px] text-sky-500">HR执行核心评估，AI提供全面支撑</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 6: 重点环节 — 智能筛选与AI面试
   ================================================================ */
function SlideDeepDive1() {
  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="AI核心能力展示：从海量简历到精准评估">🔍 重点环节：智能筛选 & AI面试</SlideTitle>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* 简历筛选 */}
        <div className="rounded-xl border border-purple-100 bg-purple-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileSearch className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-purple-700">AI简历筛选</h3>
              <p className="text-[10px] text-purple-500">智能评估系统 · AI主导</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['NLP解析关键信息', '多维度评分', '加分项/风险点识别', '生成AI摘要'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-purple-700 bg-white rounded-lg px-2 py-1.5">
                  <Zap className="w-3 h-3 text-purple-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-purple-100">
              <p className="text-[10px] text-muted mb-2">评估维度示例</p>
              {[
                { label: '技能匹配度', pct: 92 },
                { label: '经验相关度', pct: 85 },
                { label: '学历匹配', pct: 95 },
                { label: '稳定性', pct: 78 },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-muted w-16">{d.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-purple-100">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-[10px] font-semibold text-purple-600 w-8 text-right">{d.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-center">
              <p className="text-[10px] text-amber-600">⚡ 效率</p>
              <p className="text-xs font-bold text-foreground">3天→30分钟</p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 border border-green-100 text-center">
              <p className="text-[10px] text-green-600">📈 质量</p>
              <p className="text-xs font-bold text-foreground">漏筛率↓65%</p>
            </div>
          </div>
        </div>

        {/* AI面试 */}
        <div className="rounded-xl border border-pink-100 bg-pink-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
              <Bot className="w-5 h-5 text-pink-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-pink-700">AI面试官</h3>
              <p className="text-[10px] text-pink-500">智能面试系统 · AI主导</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['结构化出题追问', '实时能力评估', '情绪识别分析', '面试报告生成'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[11px] text-pink-700 bg-white rounded-lg px-2 py-1.5">
                  <Zap className="w-3 h-3 text-pink-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-pink-100">
              <p className="text-[10px] text-muted mb-2">情绪分析示例 — 张明远</p>
              {[
                { label: '自信度', pct: 88, color: '#6366f1' },
                { label: '热情度', pct: 85, color: '#22c55e' },
                { label: '真诚度', pct: 92, color: '#3b82f6' },
                { label: '紧张度', pct: 20, color: '#f59e0b' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 mb-1.5">
                  <span className="text-[10px] text-muted w-12">{d.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-pink-100">
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                  </div>
                  <span className="text-[10px] font-semibold w-8 text-right" style={{ color: d.color }}>{d.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-100 text-center">
              <p className="text-[10px] text-amber-600">⚡ 效率</p>
              <p className="text-xs font-bold text-foreground">无限并发</p>
            </div>
            <div className="p-2 rounded-lg bg-green-50 border border-green-100 text-center">
              <p className="text-[10px] text-green-600">📈 质量</p>
              <p className="text-xs font-bold text-foreground">一致性↑90%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 7: 重点环节 — 定级定薪与审批
   ================================================================ */
function SlideDeepDive2() {
  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="数据驱动的科学决策，兼顾公平性与竞争力">⚖️ 重点环节：定级定薪 & 审批</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-5">
        {/* 定级 */}
        <div className="rounded-xl border border-red-100 bg-red-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
              <Award className="w-4.5 h-4.5 text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-red-700">智能定级</h3>
              <p className="text-[9px] text-red-400">AI辅助 · HR决策</p>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="p-2.5 rounded-lg bg-white border border-red-100 text-xs">
              <p className="font-semibold text-foreground mb-1.5">评估因素（示例）</p>
              {[
                { name: '学历背景', w: '20%', s: 95 },
                { name: '工作经验', w: '30%', s: 82 },
                { name: '技术能力', w: '30%', s: 92 },
                { name: '项目成果', w: '20%', s: 88 },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10px] text-muted w-14">{f.name}</span>
                  <span className="text-[9px] text-muted w-6">{f.w}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-red-100">
                    <div className="h-full rounded-full bg-red-400" style={{ width: `${f.s}%` }} />
                  </div>
                  <span className="text-[10px] font-semibold text-red-600 w-6 text-right">{f.s}</span>
                </div>
              ))}
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-red-100 text-center">
              <p className="text-[10px] text-muted">AI建议级别</p>
              <p className="text-xl font-bold text-red-600">P7</p>
              <p className="text-[10px] text-muted">置信度 88%</p>
            </div>
          </div>
          <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-100 text-center">
            <p className="text-[10px] text-amber-600">⚡ 1天→10分钟 · 准确度↑35%</p>
          </div>
        </div>

        {/* 定薪 */}
        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
              <DollarSign className="w-4.5 h-4.5 text-orange-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-orange-700">薪酬测算</h3>
              <p className="text-[9px] text-orange-400">AI辅助 · HR确认</p>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="p-2.5 rounded-lg bg-white border border-orange-100">
              <p className="text-[10px] font-semibold text-foreground mb-2">薪资分位参考（K/月）</p>
              <div className="relative h-16 flex items-end gap-1 px-2">
                {[
                  { label: 'P25', val: 38, h: 48 },
                  { label: 'P50', val: 45, h: 57 },
                  { label: 'AI推荐', val: 47, h: 60, highlight: true },
                  { label: 'P75', val: 55, h: 70 },
                ].map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <span className={`text-[9px] font-bold ${b.highlight ? 'text-orange-600' : 'text-muted'}`}>{b.val}K</span>
                    <div className={`w-full rounded-t-md ${b.highlight ? 'bg-orange-500' : 'bg-orange-200'}`}
                      style={{ height: `${b.h}%` }} />
                    <span className="text-[8px] text-muted mt-0.5">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-2.5 rounded-lg bg-white border border-orange-100 text-xs">
              <p className="font-semibold text-foreground mb-1.5">调薪因素</p>
              {[
                { name: '8年经验', impact: '+5%', pos: true },
                { name: '本科学历', impact: '-3%', pos: false },
                { name: '大厂背景', impact: '+4%', pos: true },
                { name: '管理经验', impact: '+3%', pos: true },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between mb-0.5">
                  <span className="text-[10px] text-muted">{f.name}</span>
                  <span className={`text-[10px] font-semibold ${f.pos ? 'text-green-600' : 'text-red-500'}`}>{f.impact}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-100 text-center">
            <p className="text-[10px] text-amber-600">⚡ 半天→5分钟 · 竞争力评估准确率92%</p>
          </div>
        </div>

        {/* 审批 */}
        <div className="rounded-xl border border-yellow-100 bg-yellow-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-100 flex items-center justify-center">
              <ClipboardCheck className="w-4.5 h-4.5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-yellow-700">智能审批</h3>
              <p className="text-[9px] text-yellow-500">AI辅助 · 人工决策</p>
            </div>
          </div>
          <div className="space-y-2 flex-1">
            <div className="p-2.5 rounded-lg bg-white border border-yellow-100 text-xs">
              <p className="font-semibold text-foreground mb-2">AI审批摘要示例</p>
              <div className="text-[10px] text-muted leading-relaxed p-2 bg-yellow-50 rounded-lg">
                候选人孙悦然，应聘产品经理岗位。9年产品经验，京东产品专家。AI面试综合评分90分，定级P7，建议薪资42K。
                <span className="font-semibold text-yellow-700">建议录用。</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {['全流程数据汇总', '结构化摘要', '智能审批路由', '催办与跟踪'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] text-yellow-700 bg-white rounded-lg px-2 py-1.5 border border-yellow-100">
                  <CheckCircle2 className="w-3 h-3 text-yellow-400 shrink-0" />{t}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-2 p-2 rounded-lg bg-amber-50 border border-amber-100 text-center">
            <p className="text-[10px] text-amber-600">⚡ 准备时间↓80% · 信息完整性100%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 8: 重点环节 — Offer到入职
   ================================================================ */
function SlideDeepDive3() {
  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="从Offer发放到新员工融入，全程AI陪伴">📬 重点环节：Offer → 入职 → 成长</SlideTitle>

      <div className="flex-1 grid grid-cols-4 gap-4">
        {[
          {
            icon: <Send className="w-5 h-5" />,
            title: 'Offer发放',
            color: '#84cc16',
            mode: 'AI辅助',
            features: ['个性化Offer生成', '入职概率预测', '竞争Offer分析', '吸引策略推荐'],
            metric1: { label: '生成时间', value: '2h→3min' },
            metric2: { label: '接受率', value: '↑22%' },
          },
          {
            icon: <ShieldCheck className="w-5 h-5" />,
            title: '候选人背调',
            color: '#22c55e',
            mode: 'AI主导',
            features: ['多维度自动核查', '学历/工作验证', '实时进度追踪', '风险预警'],
            metric1: { label: '周期', value: '5天→1天' },
            metric2: { label: '覆盖率', value: '60%→100%' },
          },
          {
            icon: <UserCheck className="w-5 h-5" />,
            title: '入职引导',
            color: '#06b6d4',
            mode: 'AI主导',
            features: ['自动创建账号', '设备工位申请', '入职文件包生成', '培训智能排期'],
            metric1: { label: '准备时间', value: '3天→10min' },
            metric2: { label: '首日满意度', value: '98%' },
          },
          {
            icon: <GraduationCap className="w-5 h-5" />,
            title: '培训成长',
            color: '#6366f1',
            mode: 'AI主导',
            features: ['能力画像分析', '个性化学习路径', '学习效果评估', '学习伙伴匹配'],
            metric1: { label: '课程匹配率', value: '95%' },
            metric2: { label: '上手速度', value: '↑40%' },
          },
        ].map((item, i) => (
          <div key={i} className="rounded-xl border p-4 flex flex-col"
            style={{ borderColor: item.color + '30', backgroundColor: item.color + '05' }}>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: item.color + '15', color: item.color }}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold" style={{ color: item.color }}>{item.title}</h3>
                <p className="text-[9px] text-muted">{item.mode}</p>
              </div>
            </div>

            <div className="space-y-1.5 flex-1">
              {item.features.map((f, j) => (
                <div key={j} className="flex items-center gap-1.5 text-[10px] text-foreground bg-white rounded px-2 py-1"
                  style={{ borderLeft: `2px solid ${item.color}30` }}>
                  <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: item.color + '80' }} />
                  {f}
                </div>
              ))}
            </div>

            <div className="mt-3 grid grid-cols-2 gap-1.5">
              <div className="p-1.5 rounded-lg bg-white text-center border" style={{ borderColor: item.color + '20' }}>
                <p className="text-[9px] text-muted">{item.metric1.label}</p>
                <p className="text-[11px] font-bold text-foreground">{item.metric1.value}</p>
              </div>
              <div className="p-1.5 rounded-lg bg-white text-center border" style={{ borderColor: item.color + '20' }}>
                <p className="text-[9px] text-muted">{item.metric2.label}</p>
                <p className="text-[11px] font-bold text-foreground">{item.metric2.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted px-6 py-2 rounded-full bg-green-50 text-green-600 inline-block">
          🎯 从Offer到上手，AI全程陪伴候选人完成身份转变，大幅缩短融入周期
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 9: 12个AI智能体
   ================================================================ */
function SlideAiAgents() {
  const agents = [
    { name: 'JD生成', icon: <Megaphone className="w-4 h-4" />, color: '#6366f1', acc: '75.0%', tasks: 12 },
    { name: '简历筛选', icon: <FileSearch className="w-4 h-4" />, color: '#8b5cf6', acc: '86.7%', tasks: 286 },
    { name: '约面调度', icon: <CalendarClock className="w-4 h-4" />, color: '#a855f7', acc: '90.6%', tasks: 64 },
    { name: 'AI面试', icon: <Bot className="w-4 h-4" />, color: '#d946ef', acc: '92.1%', tasks: 38 },
    { name: '定级评估', icon: <Award className="w-4 h-4" />, color: '#f43f5e', acc: '77.3%', tasks: 22 },
    { name: '薪酬测算', icon: <DollarSign className="w-4 h-4" />, color: '#f97316', acc: '83.3%', tasks: 18 },
    { name: '审批汇总', icon: <ClipboardCheck className="w-4 h-4" />, color: '#eab308', acc: '93.3%', tasks: 15 },
    { name: 'Offer生成', icon: <Send className="w-4 h-4" />, color: '#84cc16', acc: '90.0%', tasks: 10 },
    { name: '背调核查', icon: <ShieldCheck className="w-4 h-4" />, color: '#22c55e', acc: '100%', tasks: 8 },
    { name: '候选人保温', icon: <Heart className="w-4 h-4" />, color: '#14b8a6', acc: '98.3%', tasks: 120 },
    { name: '入职引导', icon: <UserCheck className="w-4 h-4" />, color: '#06b6d4', acc: '96.0%', tasks: 25 },
    { name: '培训推荐', icon: <GraduationCap className="w-4 h-4" />, color: '#6366f1', acc: '93.3%', tasks: 30 },
  ];

  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="12个专属AI智能体，覆盖招聘全生命周期">🤖 AI智能体矩阵</SlideTitle>

      <div className="flex-1 grid grid-cols-4 gap-3">
        {agents.map((agent, i) => (
          <div key={i} className="rounded-xl border border-border p-3 flex items-start gap-3 hover:shadow-sm transition">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: agent.color + '12', color: agent.color }}>
              {agent.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-foreground">{agent.name}Agent</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-muted">准确率</span>
                <span className="text-xs font-bold" style={{ color: agent.color }}>{agent.acc}</span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[10px] text-muted">月任务</span>
                <span className="text-xs font-semibold text-foreground">{agent.tasks}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 汇总 */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        <MetricCard icon={<Bot className="w-5 h-5" />} label="智能体总数" value="12个" sub="覆盖14个环节" color="#6366f1" />
        <MetricCard icon={<Zap className="w-5 h-5" />} label="3月总任务量" value="648次" sub="日均21.6次" color="#f59e0b" />
        <MetricCard icon={<TrendingUp className="w-5 h-5" />} label="平均准确率" value="89.7%" sub="持续学习优化" color="#22c55e" />
        <MetricCard icon={<Clock className="w-5 h-5" />} label="节约时间" value="597h" sub="约75个工作日" color="#3b82f6" />
      </div>
    </div>
  );
}

/* ================================================================
   Slide 10: 运营数据
   ================================================================ */
function SlideOperationsData() {
  const stageData = [
    { name: '发布', candidates: 3, color: '#6366f1' },
    { name: '筛选', candidates: 42, color: '#8b5cf6' },
    { name: '约面', candidates: 8, color: '#a855f7' },
    { name: 'AI面', candidates: 5, color: '#d946ef' },
    { name: '复面', candidates: 3, color: '#ec4899' },
    { name: '定级', candidates: 2, color: '#f43f5e' },
    { name: '定薪', candidates: 2, color: '#f97316' },
    { name: '审批', candidates: 1, color: '#eab308' },
    { name: 'Offer', candidates: 1, color: '#84cc16' },
    { name: '背调', candidates: 1, color: '#22c55e' },
    { name: '保温', candidates: 15, color: '#14b8a6' },
    { name: '入职', candidates: 2, color: '#06b6d4' },
    { name: '试用', candidates: 3, color: '#3b82f6' },
    { name: '培训', candidates: 5, color: '#6366f1' },
  ];

  const maxVal = Math.max(...stageData.map(s => s.candidates));

  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="实时招聘数据全景，数据驱动运营优化">📊 运营数据概览</SlideTitle>

      <div className="flex-1 flex gap-6">
        {/* 左侧：Pipeline漏斗 */}
        <div className="flex-1 rounded-xl border border-border p-5">
          <h3 className="text-xs font-semibold text-foreground mb-4">各环节候选人分布</h3>
          <div className="space-y-1.5">
            {stageData.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-[10px] text-muted w-8 text-right shrink-0">{s.name}</span>
                <div className="flex-1 h-5 bg-slate-50 rounded-full overflow-hidden">
                  <div className="h-full rounded-full flex items-center justify-end pr-2 transition-all"
                    style={{ width: `${Math.max((s.candidates / maxVal) * 100, 8)}%`, backgroundColor: s.color }}>
                    <span className="text-[10px] text-white font-bold">{s.candidates}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 右侧：核心指标 */}
        <div className="w-[300px] flex flex-col gap-4">
          <div className="rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 p-5 text-white">
            <p className="text-xs opacity-80 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> AI处理效率</p>
            <p className="text-4xl font-bold mt-1">94.2%</p>
            <p className="text-xs opacity-60 mt-1">较上月 +2.3%</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[10px] text-muted">候选人总数</p>
              <p className="text-2xl font-bold text-foreground">93</p>
              <p className="text-[10px] text-success">↑12 本周新增</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[10px] text-muted">在招岗位</p>
              <p className="text-2xl font-bold text-foreground">3</p>
              <p className="text-[10px] text-muted">3个部门</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[10px] text-muted">平均周期</p>
              <p className="text-2xl font-bold text-foreground">18<span className="text-sm">天</span></p>
              <p className="text-[10px] text-success">↓较传统40%</p>
            </div>
            <div className="rounded-xl border border-border p-3 text-center">
              <p className="text-[10px] text-muted">Offer接受率</p>
              <p className="text-2xl font-bold text-foreground">85%</p>
              <p className="text-[10px] text-success">↑22%</p>
            </div>
          </div>

          {/* 任务方式分布 */}
          <div className="rounded-xl border border-border p-4">
            <p className="text-xs font-semibold text-foreground mb-3">任务完成方式分布</p>
            <div className="space-y-2">
              {[
                { label: 'AI智能体', pct: 52, color: '#6366f1' },
                { label: 'AI+确认', pct: 25, color: '#22c55e' },
                { label: 'AI+修正', pct: 12, color: '#f59e0b' },
                { label: '人工执行', pct: 11, color: '#64748b' },
              ].map((m, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[10px] text-muted w-14">{m.label}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: `${m.pct}%`, backgroundColor: m.color }} />
                  </div>
                  <span className="text-[10px] font-semibold w-8 text-right" style={{ color: m.color }}>{m.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 11: 投资回报
   ================================================================ */
function SlideROI() {
  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="低成本、高回报的AI赋能方案">💰 投资回报分析</SlideTitle>

      <div className="flex-1 flex gap-6">
        {/* 左侧：成本分析 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-xl border border-border p-5">
            <h3 className="text-xs font-semibold text-foreground mb-4">3月AI智能体运营成本</h3>
            <div className="space-y-2">
              {[
                { name: 'AI面试Agent', cost: 105.30, tokens: '702K', color: '#d946ef' },
                { name: '简历筛选Agent', cost: 98.13, tokens: '654K', color: '#8b5cf6' },
                { name: '候选人保温Agent', cost: 21.60, tokens: '144K', color: '#14b8a6' },
                { name: '约面调度Agent', cost: 17.76, tokens: '118K', color: '#a855f7' },
                { name: '其他8个Agent', cost: 57.64, tokens: '384K', color: '#64748b' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: a.color }} />
                  <span className="text-xs text-foreground flex-1">{a.name}</span>
                  <span className="text-[10px] text-muted">{a.tokens} tokens</span>
                  <span className="text-xs font-bold text-foreground w-16 text-right">¥{a.cost}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">月度总计</span>
                <span className="text-base font-bold text-accent">¥300.43</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-5">
            <h3 className="text-xs font-semibold text-green-700 mb-3">对比：传统方式人力成本</h3>
            <div className="flex items-center justify-between">
              <div className="text-center">
                <p className="text-[10px] text-muted">AI方案月成本</p>
                <p className="text-xl font-bold text-green-600">¥300</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">VS</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-muted">等效人力月成本</p>
                <p className="text-xl font-bold text-red-500">¥75,000</p>
                <p className="text-[10px] text-muted">（约3名全职HR）</p>
              </div>
            </div>
            <div className="mt-3 text-center">
              <span className="inline-block px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                成本仅为传统方式的 0.4%
              </span>
            </div>
          </div>
        </div>

        {/* 右侧：效益指标 */}
        <div className="w-[320px] flex flex-col gap-4">
          <div className="rounded-xl border border-border p-5">
            <h3 className="text-xs font-semibold text-foreground mb-4">关键效益指标</h3>
            <div className="space-y-4">
              {[
                { label: '节约工时', value: '597小时/月', sub: '约75个工作日', pct: 95, color: '#6366f1' },
                { label: '招聘周期缩短', value: '40%', sub: '30天→18天', pct: 40, color: '#22c55e' },
                { label: 'HR效能提升', value: '3.5倍', sub: '事务性工作减少75%', pct: 75, color: '#f59e0b' },
                { label: '候选人满意度', value: '提升40%', sub: '响应速度大幅提升', pct: 40, color: '#8b5cf6' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground font-medium">{item.label}</span>
                    <span className="text-xs font-bold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, backgroundColor: item.color }} />
                  </div>
                  <p className="text-[10px] text-muted mt-0.5">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-5 text-white text-center">
            <p className="text-sm font-bold mb-1">投资回报率</p>
            <p className="text-4xl font-bold">250x</p>
            <p className="text-xs text-white/70 mt-1">AI投入产出比</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 12: 实施路线图
   ================================================================ */
function SlideRoadmap() {
  const phases = [
    {
      phase: '第一阶段',
      time: '第1-2月',
      title: '基础建设',
      color: '#6366f1',
      items: ['部署AI简历筛选引擎', '上线AI面试系统', '接入自动约面调度', '建立数据基线'],
      goal: '实现招聘前端自动化',
    },
    {
      phase: '第二阶段',
      time: '第3-4月',
      title: '深度整合',
      color: '#8b5cf6',
      items: ['上线智能定级定薪', '部署审批智能摘要', '启动Offer生成引擎', '接入背调自动化'],
      goal: '实现决策环节AI赋能',
    },
    {
      phase: '第三阶段',
      time: '第5-6月',
      title: '全面覆盖',
      color: '#d946ef',
      items: ['上线入职引导AI管家', '部署培训推荐引擎', '启动保温池智能运营', '上线全流程运营看板'],
      goal: '实现全流程AI覆盖',
    },
    {
      phase: '第四阶段',
      time: '第7月+',
      title: '持续优化',
      color: '#ec4899',
      items: ['智能体准确率持续提升', '新场景扩展（校招/内推）', '跨系统数据打通', '建设AI招聘知识库'],
      goal: '持续迭代优化效果',
    },
  ];

  return (
    <div className="h-full p-10 flex flex-col">
      <SlideTitle sub="分阶段推进，渐进式落地，稳步实现全面AI化">🗺️ 实施路线图</SlideTitle>

      <div className="flex-1 flex flex-col justify-center">
        {/* 时间线 */}
        <div className="grid grid-cols-4 gap-4">
          {phases.map((p, i) => (
            <div key={i} className="relative">
              {/* 连接线 */}
              {i < phases.length - 1 && (
                <div className="absolute top-5 left-[calc(50%+24px)] right-[-16px] h-0.5"
                  style={{ backgroundColor: p.color + '30' }} />
              )}

              <div className="rounded-xl border-2 p-5 flex flex-col h-full"
                style={{ borderColor: p.color + '40', backgroundColor: p.color + '05' }}>
                {/* 头部 */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: p.color }}>
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-xs font-bold" style={{ color: p.color }}>{p.phase}</p>
                    <p className="text-[10px] text-muted">{p.time}</p>
                  </div>
                </div>

                <h4 className="text-sm font-bold text-foreground mb-2">{p.title}</h4>

                <div className="space-y-1.5 flex-1">
                  {p.items.map((item, j) => (
                    <div key={j} className="flex items-center gap-1.5 text-[11px] text-foreground">
                      <CheckCircle2 className="w-3 h-3 shrink-0" style={{ color: p.color + '80' }} />
                      {item}
                    </div>
                  ))}
                </div>

                <div className="mt-3 pt-2 border-t" style={{ borderColor: p.color + '20' }}>
                  <p className="text-[10px] font-semibold" style={{ color: p.color }}>🎯 {p.goal}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 底部里程碑 */}
        <div className="mt-6 flex items-center justify-center gap-8">
          {[
            { milestone: '前端自动化', time: '第2月末', icon: <Rocket className="w-4 h-4" /> },
            { milestone: '决策AI化', time: '第4月末', icon: <Lightbulb className="w-4 h-4" /> },
            { milestone: '全面覆盖', time: '第6月末', icon: <Cpu className="w-4 h-4" /> },
            { milestone: '持续优化', time: '长期', icon: <TrendingUp className="w-4 h-4" /> },
          ].map((m, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xs text-muted">
                <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  {m.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{m.milestone}</p>
                  <p className="text-[10px]">{m.time}</p>
                </div>
              </div>
              {i < 3 && <ArrowRight className="w-4 h-4 text-border" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 13: 总结与展望
   ================================================================ */
function SlideSummary() {
  return (
    <div className="h-full flex flex-col relative overflow-hidden">
      {/* 背景 */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
      <div className="absolute inset-0 opacity-5"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 30%, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-16">
        <h2 className="text-3xl font-bold text-white mb-8">总结与展望</h2>

        {/* 核心成果 */}
        <div className="grid grid-cols-4 gap-6 mb-10">
          {[
            { icon: <Bot className="w-6 h-6" />, num: '12', label: 'AI智能体', sub: '覆盖全流程' },
            { icon: <Zap className="w-6 h-6" />, num: '40%', label: '周期缩短', sub: '30天→18天' },
            { icon: <TrendingUp className="w-6 h-6" />, num: '597h', label: '月节约工时', sub: '约75工作日' },
            { icon: <Shield className="w-6 h-6" />, num: '250x', label: '投资回报率', sub: '成本仅¥300/月' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mx-auto mb-3 text-white border border-white/20">
                {item.icon}
              </div>
              <p className="text-2xl font-bold text-white">{item.num}</p>
              <p className="text-xs text-white/80 font-medium">{item.label}</p>
              <p className="text-[10px] text-white/50">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* 核心理念 */}
        <div className="max-w-2xl text-center mb-8">
          <div className="inline-block px-6 py-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
            <p className="text-lg text-white font-medium leading-relaxed">
              AI不是替代HR，而是成为HR最强大的<span className="font-bold text-yellow-300">智能助手</span>
            </p>
            <p className="text-sm text-white/70 mt-1">
              AI承担重复性、数据密集型工作 → HR回归人才判断、关系维护和战略决策
            </p>
          </div>
        </div>

        {/* 三要点 */}
        <div className="flex items-center gap-6">
          {[
            { icon: '🤖', text: 'AI提效：事务性工作自动化' },
            { icon: '👤', text: '人工提质：聚焦高价值决策' },
            { icon: '🤝', text: '协同增效：1+1 > 2的最佳范式' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 border border-white/20">
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm text-white font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center py-6">
        <p className="text-sm text-white/60">感谢聆听 · 期待交流</p>
        <p className="text-xs text-white/30 mt-1">AI人才引进方案 · 2026</p>
      </div>
    </div>
  );
}
