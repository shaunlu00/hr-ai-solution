'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles, Bot, Users, ChevronLeft, ChevronRight, Maximize, Minimize, Download,
  Megaphone, FileSearch, CalendarClock, Award, DollarSign, ClipboardCheck,
  Send, ShieldCheck, Heart, UserCheck, Target, GraduationCap,
  Zap, TrendingUp, TrendingDown, Clock, BrainCircuit, ArrowRight, CheckCircle2,
  AlertTriangle, BarChart3, PieChart as PieChartIcon, Layers,
  Rocket, Shield, Eye, Lightbulb, Cpu, HandshakeIcon, Radar, Briefcase, Building2,
  Globe, Star, Brain, MapPin, Search, Map,
  Box,
  Boxes,
} from 'lucide-react';

/* ================================================================
   slide 数据 & 类型
   ================================================================ */

const TOTAL_SLIDES = 15;

/* ================================================================
   主组件
   ================================================================ */
export default function SlidesPage() {
  const [current, setCurrent] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exporting, setExporting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(() => setCurrent(c => Math.max(0, c - 1)), []);
  const next = useCallback(() => setCurrent(c => Math.min(TOTAL_SLIDES - 1, c + 1)), []);

  const handleExport = async () => {
    setExporting(true);
    try {
      const { exportSlidesToPPTX } = await import('@/lib/export-pptx');
      await exportSlidesToPPTX();
    } catch (err) {
      console.error('Export failed:', err);
    } finally {
      setExporting(false);
    }
  };

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
      containerRef.current?.requestFullscreen();
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
    <SlideSolutionOverview key={1} />,
    <SlideTalentRadarOverview key={2} />,
    <SlideTalentTrends key={3} />,
    <SlideTalentStrategyInsights key={4} />,
    <SlideTalentProfile key={5} />,
    <SlideStrategicRecommendations key={6} />,
    <SlideTalentMap key={7} />,
    <SlideRecruitmentPipeline key={8} />,
    <SlideCollaborationModel key={9} />,
    <SlideJobPostingScreening key={10} />,
    <SlideInterviews key={11} />,
    <SlideGradingSalary key={12} />,
    <SlideTrainingGrowth key={13} />,
    <SlideSummary key={14} />,
  ];

  return (
    <div ref={containerRef} className={`relative w-full ${isFullscreen ? 'h-screen bg-white' : ''}`}>
      {/* 全屏模式：纯净演示 */}
      {isFullscreen ? (
        <>
          <div className="absolute inset-0 overflow-hidden">
            {slides[current]}
          </div>
          {/* 悬浮控制栏 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-xl bg-black/60 backdrop-blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300 z-50">
            <button onClick={prev} disabled={current === 0}
              className="p-1.5 rounded-lg text-white/80 hover:text-white disabled:opacity-30 transition">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs text-white/80 tabular-nums">
              {current + 1} / {TOTAL_SLIDES}
            </span>
            <button onClick={next} disabled={current === TOTAL_SLIDES - 1}
              className="p-1.5 rounded-lg text-white/80 hover:text-white disabled:opacity-30 transition">
              <ChevronRight className="w-5 h-5" />
            </button>
            <div className="w-px h-5 bg-white/20" />
            <button onClick={toggleFullscreen}
              className="p-1.5 rounded-lg text-white/80 hover:text-white transition">
              <Minimize className="w-4 h-4" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* 顶部工具栏 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-foreground">
                AI方案 · 汇报演示
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
                <Maximize className="w-4 h-4" />
              </button>
              <button onClick={handleExport} disabled={exporting}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border hover:bg-accent-light disabled:opacity-50 transition ml-1 text-sm font-medium text-foreground">
                <Download className="w-4 h-4" />
                {exporting ? '导出中...' : '导出PPT'}
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
              '封面', '方案概述', '人才战略雷达', '人才趋势分析', '战略洞察', '人才画像', 'AI战略建议', '人才地图',
              'AI招聘全流程', 'AI HR协作模式', '岗位发布与筛选', '约面与面试', '定级与定薪', '培养与培训', '总结与展望',
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
        </>
      )}
    </div>
  );
}

/* ================================================================
   公用子组件
   ================================================================ */

function SlideTitle({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-6">
      <h2 className="text-3xl font-bold text-foreground leading-tight">{children}</h2>
      {sub && <p className="text-base text-muted mt-1.5">{sub}</p>}
    </div>
  );
}

function MetricCard({ icon, label, value, sub, color = '#6366f1' }: {
  icon: React.ReactNode; label: string; value: string; sub?: string; color?: string;
}) {
  return (
    <div className="rounded-xl border border-border p-4 flex items-start gap-3">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ backgroundColor: color + '15', color }}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        {sub && <p className="text-[11px] text-muted">{sub}</p>}
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
          AI 赋能 HR 解决方案
        </h1>
        <p className="text-xl text-white/80 mb-2">
          战略支撑 + 招聘提质增效 · 双轮驱动
        </p>
        <p className="text-sm text-white/50 mb-12">
          Part I · AI赋能HR战略决策　｜　Part II · AI赋能招聘全流程提质增效
        </p>

        {/* 两大板块 */}
        <div className="flex items-center gap-6">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-white/70">
              <Radar className="w-5 h-5" />
              <span className="text-xs font-medium">Part I</span>
            </div>
            <p className="text-xl font-bold text-white">AI 战略支撑</p>
            <p className="text-xs text-white/60 mt-1">人才趋势分析 · 人才地图</p>
          </div>
          <div className="text-white/40 text-2xl font-light">+</div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-5 text-center">
            <div className="flex items-center justify-center gap-2 mb-2 text-white/70">
              <Zap className="w-5 h-5" />
              <span className="text-xs font-medium">Part II</span>
            </div>
            <p className="text-xl font-bold text-white">AI 招聘提质增效</p>
            <p className="text-xs text-white/60 mt-1">14阶段全流程 · AI×HR协作</p>
          </div>
        </div>
      </div>

      {/* 底部 */}
      <div className="relative z-10 text-center py-6">
        <p className="text-xs text-white/40">HR · AI解决方案</p>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 2: 方案概述
   ================================================================ */
function SlideSolutionOverview() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="AI赋能HR两大核心场景：战略支撑 + 招聘提质增效">🎯 方案概述</SlideTitle>

      <div className="flex-1 flex gap-6">
        {/* Part I：AI战略支撑 */}
        <div className="flex-1 flex flex-col">
          <div className="rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 border-2 border-sky-200 p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl bg-sky-100 flex items-center justify-center">
                <Radar className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-sky-500 uppercase tracking-wide">Part I</p>
                <h3 className="text-xl font-bold text-sky-700">AI赋能HR · 战略支撑</h3>
              </div>
            </div>
            <p className="text-sm text-sky-600/80 mb-4 leading-relaxed">
              AI作为HR的<strong>战略智囊</strong>，通过人才市场洞察和竞争情报分析，
              为HR提供前瞻性人才战略建议，从「被动招人」转向「主动布局」。
            </p>
            <div className="space-y-2.5 flex-1">
              {[
                { icon: <TrendingUp className="w-6 h-6" />, title: '人才趋势分析', desc: 'AI采集国内外多家顶级同业公司JD，洞察行业人才需求变化与战略转移信号', metric: '国内外同业机构 · 上千条JD' },
                { icon: <Map className="w-6 h-6" />, title: '人才地图', desc: '猎头AI智能体挖掘同行业顶尖人才，构建精准目标人才库并持续追踪更新', metric: '高级人才追踪 · 多类信息源' },
                { icon: <Brain className="w-6 h-6" />, title: 'AI研判与战略建议', desc: '基于数据自动生成紧急行动、战略布局、成本优化建议，HR评审决策', metric: '预测战略信号' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-white/80 border border-sky-100">
                  <div className="w-10 h-10 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-sky-700">{item.title}</p>
                    <p className="text-sm text-sky-600/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    <p className="text-[12px] text-sky-500 mt-1.5 px-2 py-0.5 rounded bg-sky-50 inline-block">{item.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part II：AI招聘提质增效 */}
        <div className="flex-1 flex flex-col">
          <div className="rounded-xl bg-gradient-to-br from-violet-50 to-purple-50 border-2 border-violet-200 p-6 flex-1 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-14 h-14 rounded-xl bg-violet-100 flex items-center justify-center">
                <Zap className="w-7 h-7 text-violet-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-violet-500 uppercase tracking-wide">Part II</p>
                <h3 className="text-xl font-bold text-violet-700">AI赋能HR · 招聘提质增效</h3>
              </div>
            </div>
            <p className="text-sm text-violet-600/80 mb-4 leading-relaxed">
              AI深度嵌入招聘<strong>14个关键环节</strong>，通过<strong>AI×HR协作</strong>，
              实现事务性工作自动化，让HR回归人才判断和决策的核心价值。
            </p>
            <div className="space-y-2.5 flex-1">
              {[
                { icon: <Layers className="w-6 h-6" />, title: '14阶段全流程', desc: '从岗位发布到新员工培训，AI全程赋能每个关键环节，实现端到端智能化', metric: '14环节 · 全流程覆盖' },
                { icon: <HandshakeIcon className="w-6 h-6" />, title: 'AI×HR协作模式', desc: 'AI主导、AI辅助、人工主导三种范式因环节制宜，人机最优分工', metric: '3种协作模式 · 按需适配' },
                { icon: <Bot className="w-6 h-6" />, title: '13个AI智能体', desc: '专属AI智能体集群，7×24小时无限并发，消除偏见，标准化评估', metric: '13个Agent' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-3.5 rounded-lg bg-white/80 border border-violet-100">
                  <div className="w-10 h-10 rounded-lg bg-violet-100 flex items-center justify-center text-violet-600 shrink-0">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-violet-700">{item.title}</p>
                    <p className="text-sm text-violet-600/70 mt-0.5 leading-relaxed">{item.desc}</p>
                    <p className="text-[12px] text-violet-500 mt-1.5 px-2 py-0.5 rounded bg-violet-50 inline-block">{item.metric}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 底部核心理念 */}
      <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-5 text-white flex items-center justify-between">
        <div>
          <p className="text-base font-bold mb-1">核心理念</p>
          <p className="text-sm text-white/80">
            AI不是替代，是成为HR最强大的智能助手。<span className="font-semibold text-white">「AI提效 + 人工提质」</span>的最佳协同范式
          </p>
        </div>
        <div className="flex items-center gap-6 shrink-0 ml-8">
          {[
            { label: '战略洞察', icon: <Radar className="w-4 h-4" /> },
            { label: '全流程覆盖', icon: <Layers className="w-4 h-4" /> },
            { label: '人机协作', icon: <HandshakeIcon className="w-4 h-4" /> },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-white/80 text-sm">
              {item.icon}<span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 3: 人才战略雷达 — 整体方案
   ================================================================ */
function SlideTalentRadarOverview() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="Part I · AI赋能HR战略决策：从被动招人到主动布局">🛰️ 人才战略雷达方案</SlideTitle>

      <div className="flex-1 flex gap-6">
        {/* 左：方案核心 */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-200 p-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-100 flex items-center justify-center">
                <Radar className="w-7 h-7 text-sky-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-sky-700">什么是人才战略雷达？</h3>
                <p className="text-sm text-sky-500">AI-powered Talent Strategic Radar</p>
              </div>
            </div>
            <p className="text-base text-sky-700/80 leading-relaxed mb-4">
              JD的变化本质上是企业<strong>战略重心转移的预警信号</strong>。
              AI持续采集分析各大投行、券商、金融科技公司的招聘JD和公开信息，
              自动识别人才需求趋势、构建人才技能图谱、挖掘高端目标人才、并给出战略行动建议。
            </p>
            <div className="p-3 rounded-lg bg-white/80 border border-sky-100">
              <p className="text-sm text-sky-700 font-semibold">
                不仅是招聘工具，更是HR的战略<strong>「雷达」</strong>与<strong>「导航仪」</strong>
              </p>
            </div>
          </div>

          {/* 三个核心能力 */}
          <div className="grid grid-cols-4 gap-3 flex-1">
            {[
              {
                icon: <TrendingUp className="w-6 h-6" />,
                title: '趋势洞察',
                desc: '实时采集多家机构JD，分析岗位需求增长趋势和技能变迁',
                color: '#6366f1',
                metrics: '48家机构 · 1,247条JD',
                details: [
                  { label: '头部券商', value: '12家' },
                  { label: '金融科技', value: '10家' },
                  { label: '外资投行', value: '6家' },
                ],
              },
              {
                icon: <Boxes className="w-6 h-6" />,
                title: '人才需求画像',
                desc: '分析提取各类人才所需技能和素质要求',
                color: '#f69149',
                metrics: '5个新岗位 · 14个新岗位技能',
                details: [
                  { label: '硬技能', value: '3个' },
                  { label: '软技能', value: '10个' },
                  { label: '特征标签', value: '6个' },
                ],
              },
              {
                icon: <Map className="w-6 h-6" />,
                title: '人才地图',
                desc: '猎头AI智能体全网搜索，构建目标人才库并持续追踪更新',
                color: '#0ea5e9',
                metrics: '156人追踪 · 12类信息源',
                details: [
                  { label: '高匹配(≥90)', value: '23人' },
                  { label: '重点追踪', value: '15人' },
                  { label: '主动接触', value: '8人' },
                ],
              },
              {
                icon: <Brain className="w-6 h-6" />,
                title: '战略建议',
                desc: 'AI基于数据自动研判，输出紧急行动、战略布局、成本优化建议',
                color: '#8b5cf6',
                metrics: '23个战略信号 · 87.3%准确',
                details: [
                  { label: '紧急行动', value: '5项' },
                  { label: '战略布局', value: '8项' },
                  { label: '成本优化', value: '3项' },
                ],
              },
            ].map((item, i) => (
              <div key={i} className="rounded-xl border-2 p-4 flex flex-col"
                style={{ borderColor: item.color + '30', backgroundColor: item.color + '05' }}>
                <div className="w-15 h-15 rounded-xl mb-3 flex items-center justify-center"
                  style={{ backgroundColor: item.color + '15', color: item.color }}>
                  {item.icon}
                </div>
                <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-muted leading-relaxed mb-3">{item.desc}</p>
                <div className="space-y-1.5 flex-1">
                  {item.details.map((d, j) => (
                    <div key={j} className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/80">
                      <span className="text-[13px] text-muted">{d.label}</span>
                      <span className="text-[13px] font-bold" style={{ color: item.color }}>{d.value}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[12px] font-medium mt-3 px-2 py-1.5 rounded-lg text-center"
                  style={{ backgroundColor: item.color + '10', color: item.color }}>
                  {item.metrics}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 右：工作流 + 核心价值 */}
        <div className="w-[280px] flex flex-col gap-4">
          <div className="rounded-xl border border-border p-5 flex-1">
            <h4 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-indigo-500" /> AI工作流
            </h4>
            <div className="space-y-3.5">
              {[
                { step: '01', label: '数据采集', desc: '全网JD、年报、ESG报告', icon: <Globe className="w-4 h-4" />, color: '#6366f1' },
                { step: '02', label: '趋势分析', desc: '岗位需求变化、技能迭代', icon: <TrendingUp className="w-4 h-4" />, color: '#0ea5e9' },
                { step: '03', label: '人才挖掘', desc: '目标人才搜索、画像匹配', icon: <Search className="w-4 h-4" />, color: '#8b5cf6' },
                { step: '04', label: '战略研判', desc: '行动建议、薪酬策略', icon: <Brain className="w-4 h-4" />, color: '#d946ef' },
                { step: '05', label: '持续更新', desc: '7×24小时监控迭代', icon: <Zap className="w-4 h-4" />, color: '#22c55e' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color + '12', color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-[13px] text-muted">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-sky-500 to-indigo-600 p-5 text-white">
            <p className="text-base font-bold mb-3 text-center">核心价值</p>
            <div className="space-y-1">
              {[
                { from: '被动招人', to: '主动布局', icon: '🎯' },
                { from: '凭经验', to: '数据驱动', icon: '📊' },
                { from: '信息滞后', to: '实时洞察', icon: '⚡' },
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10">
                  <span className="text-sm">{t.icon}</span>
                  <span className="text-sm text-white/70">从{t.from}</span>
                  <ArrowRight className="w-3 h-3 text-white/50" />
                  <span className="text-sm font-semibold text-white">{t.to}</span>
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
   Slide 4: 人才趋势分析
   ================================================================ */
function SlideTalentTrends() {
  const hotPositions = [
    { role: 'AI量化研究员', growth: '+142%', demand: 58, color: '#6366f1', companies: '中金/华泰/招商/东方', skills: ['Python', '深度学习', 'Alpha策略'], salary: '80-150万' },
    { role: '金融大模型工程师', growth: '+218%', demand: 45, color: '#8b5cf6', companies: '中信/平安/蚂蚁/百度', skills: ['LLM', 'RAG', 'Fine-tuning'], salary: '100-200万' },
    { role: '合规科技经理', growth: '+192%', demand: 35, color: '#f59e0b', companies: '国泰君安/广发/海通', skills: ['RegTech', 'NLP', '风控建模'], salary: '60-120万' },
    { role: '数据工程负责人', growth: '+89%', demand: 42, color: '#0ea5e9', companies: '华泰/国信/东方财富', skills: ['Spark', '数据湖', '实时计算'], salary: '70-130万' },
    { role: '风控模型专家', growth: '+76%', demand: 28, color: '#22c55e', companies: '高盛/摩根/瑞银/中金', skills: ['Risk ML', '压力测试', '信用评级'], salary: '90-180万' },
    { role: 'ESG分析师', growth: '+156%', demand: 32, color: '#ec4899', companies: '中金/高盛/摩根/汇丰', skills: ['ESG评级', '碳中和', '数据治理'], salary: '50-100万' },
  ];

  const monitorData = [
    { company: '中金公司', total: 127, aiJobs: 34, change: '+18%', color: '#6366f1' },
    { company: '中信证券', total: 112, aiJobs: 22, change: '+12%', color: '#0ea5e9' },
    { company: '国泰海通', total: 85, aiJobs: 19, change: '+31%', color: '#f59e0b' },
    { company: '招商证券', total: 76, aiJobs: 16, change: '+22%', color: '#22c55e' },
    { company: '瑞银集团', total: 64, aiJobs: 15, change: '+28%', color: '#ec4899' },
    { company: '高盛(亚太)', total: 53, aiJobs: 14, change: '+35%', color: '#14b8a6' },
  ];

  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="AI智能体采集分析多家机构招聘JD，洞察行业人才需求变化">📊 人才趋势分析</SlideTitle>

      <div className="flex-1 flex gap-5">
        {/* 左侧：同业招聘岗位监控 */}
        <div className="w-[400px] flex flex-col gap-3">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <Eye className="w-4 h-4 text-indigo-500" />
            同业招聘岗位监控
          </h3>

          <div className="grid grid-cols-2 gap-2">
            {[
              { icon: <Eye className="w-5 h-5" />, label: '监控机构', value: '48家', color: '#6366f1' },
              { icon: <Search className="w-5 h-5" />, label: '月采集JD', value: '1,247', color: '#0ea5e9' },
              { icon: <Zap className="w-5 h-5" />, label: '战略信号', value: '23个', color: '#f59e0b' },
              { icon: <TrendingUp className="w-5 h-5" />, label: '预测准确', value: '87.3%', color: '#22c55e' },
            ].map((m, i) => (
              <div key={i} className="rounded-lg border border-border p-2.5 text-center">
                <div className="w-7 h-7 rounded-lg mx-auto mb-1 flex items-center justify-center"
                  style={{ backgroundColor: m.color + '12', color: m.color }}>
                  {m.icon}
                </div>
                <p className="text-[13px] text-muted">{m.label}</p>
                <p className="text-base font-bold" style={{ color: m.color }}>{m.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-border p-3 flex-1">
            <h4 className="text-base font-semibold text-foreground mb-2 flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-indigo-500" />
              重点机构JD动态
            </h4>
            <div className="space-y-1.5">
              {monitorData.map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-1.5 py-2 rounded-lg bg-slate-50">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <span className="text-[13px] font-medium text-foreground w-16 truncate">{c.company}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-slate-200">
                    <div className="h-full rounded-full" style={{ width: `${(c.aiJobs / 40) * 100}%`, backgroundColor: c.color }} />
                  </div>
                  <span className="text-[13px] text-muted w-8 text-right">{c.aiJobs}</span>
                  <span className="text-[13px] font-bold w-8 text-right" style={{ color: c.color }}>{c.change}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
            <p className="text-[13px] text-indigo-600 leading-relaxed">
              <strong>监控覆盖：</strong>头部券商12家 · 公私募8家 · 外资投行6家 · 金融科技10家 · 互联网大厂12家
            </p>
          </div>
        </div>

        {/* 右侧：热门岗位趋势 */}
        <div className="flex-1 flex flex-col gap-3">
          <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-500" />
            近3个月需求激增岗位
          </h3>
          <div className="grid grid-cols-3 gap-2.5 flex-1">
            {hotPositions.map((pos, i) => (
              <div key={i} className="rounded-xl border border-border p-3.5 flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-base font-bold text-foreground">{pos.role}</h4>
                  <span className="text-sm font-bold px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: pos.color + '15', color: pos.color }}>
                    {pos.growth}
                  </span>
                </div>
                <div className="flex items-center gap-1 mb-2">
                  <BarChart3 className="w-3 h-3 text-muted" />
                  <span className="text-sm text-muted">在招 {pos.demand} 个岗位</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                  <div className="h-1.5 rounded-full" style={{ width: `${Math.min((pos.demand / 60) * 100, 100)}%`, backgroundColor: pos.color }} />
                </div>
                <div className="flex flex-wrap gap-1 mb-2">
                  {pos.skills.map((sk, j) => (
                    <span key={j} className="text-[13px] px-1.5 py-0.5 rounded bg-slate-100 text-muted">{sk}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                  <span className="text-[13px] text-muted">{pos.companies}</span>
                  <span className="text-[13px] font-semibold" style={{ color: pos.color }}>{pos.salary}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-100 p-3">
            <div className="flex items-start gap-3">
              <Bot className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-sky-700 mb-1">AI洞察摘要</p>
                <p className="text-[13px] text-sky-600/80 leading-relaxed">
                  金融大模型工程师需求增长218%为所有岗位之最，AI量化、合规科技紧随其后。LLM/RAG技能成为新标配，行业正从传统金融IT向AI-first转型。
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 5: 人才规划战略洞察
   ================================================================ */
function SlideTalentStrategyInsights() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="基于同业JD数据，从公司、地域、业务条线三维度洞察人才布局方向">🔭 人才规划战略洞察</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-5">
        {/* 公司维度 */}
        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Building2 className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-indigo-700">公司维度</h3>
              <p className="text-[12px] text-indigo-400">同业人才战略对标</p>
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            {[
              { company: '中金公司', strategy: '全面押注AI量化，3个月新增34个AI岗', tag: 'AI-first', color: '#6366f1' },
              { company: '摩根士丹利', strategy: '重仓金融科技，数据平台团队扩编50%', tag: '数据驱动', color: '#8b5cf6' },
              { company: '中信证券', strategy: '布局大模型研究院，招揽NLP/LLM人才', tag: 'LLM布局', color: '#0ea5e9' },
              { company: '国泰海通', strategy: '合规科技优先，RegTech岗位增长192%', tag: '合规科技', color: '#f59e0b' },
              { company: '瑞银集团', strategy: '亚太区风控量化团队扩编，VP级需求旺盛', tag: '风控量化', color: '#ec4899' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-white border border-indigo-100">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-bold text-foreground">{item.company}</p>
                  <span className="text-[12px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: item.color + '15', color: item.color }}>{item.tag}</span>
                </div>
                <p className="text-[12px] text-muted leading-relaxed">{item.strategy}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-indigo-100/50 text-center">
            <p className="text-[12px] text-indigo-600 font-medium">🔑 启示：头部机构已将AI人才定位为核心战略资源</p>
          </div>
        </div>

        {/* 地域维度 */}
        <div className="rounded-xl border-2 border-emerald-200 bg-emerald-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 flex items-center justify-center">
              <Globe className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-emerald-700">地域维度</h3>
              <p className="text-[12px] text-emerald-400">人才供给热力分布</p>
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            {[
              { region: '上海', focus: '量化投研、资管科技', supply: '高', growth: '+135%', bar: 90, color: '#6366f1' },
              { region: '北京', focus: '大模型、监管科技', supply: '高', growth: '+120%', bar: 80, color: '#8b5cf6' },
              { region: '深圳', focus: '金融科技、数据平台', supply: '中', growth: '+95%', bar: 63, color: '#0ea5e9' },
              { region: '新加坡', focus: '国际风控、合规', supply: '中', growth: '+85%', bar: 57, color: '#22c55e' },
              { region: '香港', focus: '投行科技、ESG', supply: '中', growth: '+65%', bar: 43, color: '#f59e0b' },
            ].map((r, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-white border border-emerald-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-bold text-foreground">{r.region}</span>
                  <span className="text-[12px] font-bold" style={{ color: r.color }}>{r.growth}</span>
                </div>
                <p className="text-[12px] text-muted mb-1.5">{r.focus}</p>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className="h-full rounded-full" style={{ width: `${r.bar}%`, backgroundColor: r.color }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-emerald-100/50 text-center">
            <p className="text-[12px] text-emerald-600 font-medium">🔑 启示：沪京深三地人才密度最高，新加坡为出海首选</p>
          </div>
        </div>

        {/* 业务条线维度 */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
              <Layers className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-700">业务条线</h3>
              <p className="text-[12px] text-amber-400">各条线AI人才需求</p>
            </div>
          </div>
          <div className="space-y-1.5 flex-1">
            {[
              { line: '量化投研', demand: 58, trend: '爆发增长', priority: '最高', desc: 'AI策略研发、因子挖掘、组合优化', color: '#6366f1' },
              { line: '金融科技', demand: 45, trend: '快速增长', priority: '高', desc: '大模型应用、交易系统、智能客服', color: '#8b5cf6' },
              { line: '风控合规', demand: 35, trend: '持续增长', priority: '高', desc: '实时风控、反洗钱、监管报送', color: '#f59e0b' },
              { line: '资产管理', demand: 28, trend: '稳步增长', priority: '中', desc: '智能投顾、FOF组合、客户画像', color: '#0ea5e9' },
              { line: '投资银行', demand: 22, trend: '新兴需求', priority: '中', desc: 'IPO智能审核、估值模型、尽调AI', color: '#22c55e' },
            ].map((item, i) => (
              <div key={i} className="p-3 rounded-lg bg-white border border-amber-100">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">{item.line}</span>
                    <span className="text-[12px] px-1.5 py-0.5 rounded-full font-medium" style={{ backgroundColor: item.color + '15', color: item.color }}>{item.trend}</span>
                  </div>
                  <span className="text-sm font-bold" style={{ color: item.color }}>{item.demand}岗</span>
                </div>
                <p className="text-[12px] text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-amber-100/50 text-center">
            <p className="text-[12px] text-amber-600 font-medium">🔑 启示：量化投研和金融科技占据AI人才需求60%以上</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white flex items-center justify-between">
        <div className="flex items-start gap-3">
          <Sparkles className="w-5 h-5 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold mb-0.5">AI综合研判</p>
            <p className="text-sm text-white/80">行业AI化转型加速，量化投研与大模型应用为两大引擎。建议优先锁定沪京核心人才，同步关注新加坡国际化布局窗口。</p>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0 ml-6">
          {[{ v: '48家', l: '机构监控' }, { v: '1,247', l: 'JD采集/月' }, { v: '6大', l: '城市覆盖' }].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-lg font-bold">{s.v}</p>
              <strong><p className="text-[11px] text-white/60">{s.l}</p></strong>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 6: 构建人才画像
   ================================================================ */
function SlideTalentProfile() {
  const profileTypes = [
    {
      role: 'AI量化研究员',
      color: '#6366f1',
      hardSkills: ['Python/C++', '深度学习框架', '因子挖掘与组合优化', '金融时间序列分析', '大规模数据处理'],
      softSkills: ['独立研究能力', '快速学习迭代', '压力下决策'],
      traits: ['数学/统计学科背景', '对市场敏感度高', '强数据直觉'],
      exp: '5-12年',
      edu: '硕士+（数学/统计/CS）',
    },
    {
      role: '金融大模型工程师',
      color: '#8b5cf6',
      hardSkills: ['LLM微调与部署', 'RAG架构设计', 'Prompt Engineering', '向量数据库', '金融NLP'],
      softSkills: ['跨团队协作', '业务理解力', '创新思维'],
      traits: ['对前沿技术的热情', '工程落地能力强', '能将技术转化为业务价值'],
      exp: '3-10年',
      edu: '硕士+（CS/AI）',
    },
    {
      role: '合规科技经理',
      color: '#f59e0b',
      hardSkills: ['RegTech平台建设', 'NLP文本审查', '风控模型开发', '监管报送自动化', 'AML/KYC系统'],
      softSkills: ['法规敏感度', '沟通协调能力', '风险意识'],
      traits: ['法律+技术复合背景', '严谨细致', '关注监管动态'],
      exp: '5-10年',
      edu: '法律/CS复合学位',
    },
    {
      role: '风控模型专家',
      color: '#22c55e',
      hardSkills: ['Risk ML模型', '压力测试框架', '信用评级系统', 'VaR/CVaR计算', '实时风控引擎'],
      softSkills: ['严谨分析思维', '全局视角', '危机处理能力'],
      traits: ['对尾部风险极度敏感', '量化思维强', '能在模糊中做决策'],
      exp: '8-15年',
      edu: '硕士+（统计/金融工程）',
    },
  ];

  const closedLoop = [
    { icon: <Target className="w-4 h-4" />, label: '招聘筛选', desc: '精准匹配候选人', color: '#0ea5e9' },
    { icon: <Users className="w-4 h-4" />, label: '人才盘点', desc: '能力差距Gap分析', color: '#f59e0b' },
    { icon: <GraduationCap className="w-4 h-4" />, label: '培训发展', desc: '定向能力提升', color: '#22c55e' },
    { icon: <TrendingUp className="w-4 h-4" />, label: '持续迭代', desc: '画像动态更新', color: '#ec4899' },
  ];

  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="通过分析同业岗位与人才战略，提取各类人才所需软硬件技能与特征，形成人才标准闭环">🎯 构建人才需求画像</SlideTitle>

      <div className="flex-1 flex gap-5">
        {/* 左侧：人才画像卡片 */}
        <div className="flex-1 grid grid-cols-4 gap-3">
          {profileTypes.map((p, i) => (
            <div key={i} className="rounded-xl border-2 p-4 flex flex-col"
              style={{ borderColor: p.color + '30', backgroundColor: p.color + '05' }}>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: p.color }}>
                  {i + 1}
                </div>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-foreground">{p.role}</h4>
                  <p className="text-[12px] text-muted">{p.exp} · {p.edu}</p>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-[12px] font-semibold text-foreground mb-1">硬技能</p>
                <div className="flex flex-wrap gap-1">
                  {p.hardSkills.map((s, j) => (
                    <span key={j} className="text-[12px] px-1.5 py-0.5 rounded-full font-medium"
                      style={{ backgroundColor: p.color + '12', color: p.color }}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="text-[12px] font-semibold text-foreground mb-1">软技能</p>
                <div className="flex flex-wrap gap-1">
                  {p.softSkills.map((s, j) => (
                    <span key={j} className="text-[12px] px-1.5 py-0.5 rounded bg-slate-100 text-muted">{s}</span>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-2 border-t border-border/40">
                <p className="text-[12px] font-semibold text-foreground mb-1">特征</p>
                <div className="space-y-0.5">
                  {p.traits.map((t, j) => (
                    <p key={j} className="text-[12px] text-muted flex items-start gap-1">
                      <span style={{ color: p.color }}>•</span> {t}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 右侧：数据来源 + 闭环流程 */}
        <div className="w-[300px] flex flex-col gap-4">
          <div className="rounded-xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-200 p-4">
            <h4 className="text-sm font-bold text-indigo-700 mb-3 flex items-center gap-2">
              <Brain className="w-5 h-5 text-indigo-500" />
              画像构建逻辑
            </h4>
            <div className="space-y-2">
              {[
                { label: '数据源', value: '同业机构JD + 行业报告', icon: '📊' },
                { label: 'AI提取', value: '岗位要求、技能标签、软素质', icon: '🧠' },
                { label: '交叉验证', value: '多源数据对比、专家评审', icon: '✅' },
                { label: '动态更新', value: '每月跟踪JD变化自动迭代', icon: '🔄' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white/80 border border-indigo-100">
                  <span className="text-sm shrink-0">{item.icon}</span>
                  <div>
                    <p className="text-[12px] font-semibold text-foreground">{item.label}</p>
                    <p className="text-[12px] text-muted">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border p-4 flex-1">
            <h4 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <Layers className="w-5 h- text-violet-500" />
              人才需求画像应用闭环
            </h4>
            <div className="space-y-2">
              {closedLoop.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: item.color + '12', color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-semibold text-foreground">{item.label}</p>
                    <p className="text-[12px] text-muted">{item.desc}</p>
                  </div>
                  {i < closedLoop.length - 1 && (
                    <ChevronRight className="w-3 h-3 text-muted/40 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 p-4 text-white text-center">
            <p className="text-sm font-semibold mb-1">画像价值</p>
            <p className="text-[12px] text-white/80 leading-relaxed">
              统一人才标准 · 消除主观偏差 · 打通招聘-盘点-培训全链路
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 7: AI研判与战略建议
   ================================================================ */
function SlideStrategicRecommendations() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="基于人才趋势和人才地图数据，AI给出战略行动建议">🧠 AI研判与战略建议</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-5">
        {/* 紧急行动 */}
        <div className="rounded-xl border-2 border-red-200 bg-red-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-red-700">紧急行动</h3>
              <p className="text-[13px] text-red-400">建议立即启动</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            <div className="p-3 rounded-lg bg-white border border-red-100">
              <p className="text-sm font-semibold text-foreground mb-1">加速AI量化人才招聘</p>
              <p className="text-[13px] text-muted leading-relaxed">中金、华泰已全面布局，建议立即启动3-5名AI量化研究员招聘，从东方证券、幻方量化定向挖猎</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">影响：高</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">立即</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white border border-red-100">
              <p className="text-sm font-semibold text-foreground mb-1">抢占金融大模型赛道</p>
              <p className="text-[13px] text-muted leading-relaxed">LLM/RAG技能需求6个月增长218%，建议组建5人金融大模型团队，从百度、字节招聘</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">影响：高</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">1个月内</span>
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white border border-red-100">
              <p className="text-sm font-semibold text-foreground mb-1">启动ESG人才储备</p>
              <p className="text-[13px] text-muted leading-relaxed">ESG分析师需求增长156%，头部外资行已建立专职团队，建议提前布局2-3名ESG人才</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">影响：中</span>
                <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-red-50 text-red-500 font-medium">2个月内</span>
              </div>
            </div>
          </div>
        </div>

        {/* 战略布局 */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
              <Target className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-700">战略布局</h3>
              <p className="text-[13px] text-amber-400">3-6个月规划</p>
            </div>
          </div>
          <div className="space-y-3 flex-1">
            <div className="p-3 rounded-lg bg-white border border-amber-100">
              <p className="text-sm font-semibold text-foreground mb-1">建立合规科技人才储备</p>
              <p className="text-[13px] text-muted leading-relaxed">监管科技需求增长192%，供给不足。提前储备3-4名RegTech人才</p>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-500 font-medium">3个月内</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-amber-100">
              <p className="text-sm font-semibold text-foreground mb-1">把握外资人才回流窗口</p>
              <p className="text-[13px] text-muted leading-relaxed">瑞银、摩根亚太区频繁调整，VP级人才有回流意愿，主动接触</p>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-500 font-medium">持续关注</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-amber-100">
              <p className="text-sm font-semibold text-foreground mb-1">构建校企合作管道</p>
              <p className="text-[13px] text-muted leading-relaxed">清华、北大AI毕业生供不应求，建立联合培养/实习项目锁定未来人才</p>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-500 font-medium">6个月内</span>
            </div>
            <div className="p-3 rounded-lg bg-white border border-amber-100">
              <p className="text-sm font-semibold text-foreground mb-1">建设内部AI能力中心</p>
              <p className="text-[13px] text-muted leading-relaxed">组建AI CoE团队，沉淀金融AI能力，支撑业务持续创新</p>
              <span className="text-[11px] px-1.5 py-0.5 rounded-full bg-amber-50 text-amber-500 font-medium">6个月内</span>
            </div>
          </div>
        </div>

        {/* 成本优化 + 地域洞察 */}
        <div className="flex flex-col gap-4">
          <div className="rounded-xl border-2 border-green-200 bg-green-50/30 p-5">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-green-700">成本优化</h3>
                <p className="text-[13px] text-green-400">薪酬策略建议</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-white border border-green-100">
                <p className="text-sm font-semibold text-foreground">调整关键岗位薪酬带宽</p>
                <p className="text-[13px] text-muted">AI量化市场价80-150万，对标P75</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-green-100">
                <p className="text-sm font-semibold text-foreground">关注中小券商隐藏人才</p>
                <p className="text-[13px] text-muted">华林/国信等机构性价比高</p>
              </div>
              <div className="p-2.5 rounded-lg bg-white border border-green-100">
                <p className="text-sm font-semibold text-foreground">灵活用工+远程协作</p>
                <p className="text-[13px] text-muted">海外人才可考虑远程模式，降低30%成本</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border p-4 flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-sky-500" />
              地域人才热力
            </h4>
            <div className="space-y-2">
              {[
                { region: '大陆(北上深)', growth: '+120%', color: '#6366f1' },
                { region: '新加坡', growth: '+85%', color: '#22c55e' },
                { region: '香港', growth: '+65%', color: '#0ea5e9' },
                { region: '美国', growth: '+45%', color: '#ec4899' },
                { region: '日本', growth: '+30%', color: '#f59e0b' },
              ].map((r, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-[13px] text-muted w-20">{r.region}</span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100">
                    <div className="h-full rounded-full" style={{ width: `${parseInt(r.growth) / 1.5}%`, backgroundColor: r.color }} />
                  </div>
                  <span className="text-[13px] font-bold w-10 text-right" style={{ color: r.color }}>{r.growth}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted px-6 py-2 rounded-full bg-indigo-50 text-indigo-600 inline-block">
          💡 以上建议由AI基于多家机构JD、年报/ESG报告、以及外部信息源自动分析生成
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 7: 人才地图
   ================================================================ */
function SlideTalentMap() {
  const talents = [
    { name: '张明远', company: '东方证券', title: '量化投资总监', score: 96, urgency: 'high', skill: 'AI量化', color: '#6366f1', exp: '12年', edu: '北大数学', highlight: '管理30人量化团队，年化收益Top3' },
    { name: '李思涵', company: '兴业证券', title: '金融科技架构师', score: 93, urgency: 'high', skill: '微服务', color: '#0ea5e9', exp: '10年', edu: '清华CS', highlight: '主导交易系统微服务化改造' },
    { name: 'David Chen', company: '瑞银(亚太)', title: 'VP-Risk Analytics', score: 95, urgency: 'medium', skill: 'Risk ML', color: '#8b5cf6', exp: '15年', edu: 'MIT Stats', highlight: '全球风控模型架构设计者' },
    { name: '王珊珊', company: '国信证券', title: 'NLP技术负责人', score: 92, urgency: 'high', skill: 'LLM/RAG', color: '#ec4899', exp: '8年', edu: '浙大AI', highlight: '金融大模型落地第一人' },
    { name: '陈建国', company: '华林证券', title: '数据工程总监', score: 89, urgency: 'medium', skill: '数据平台', color: '#f59e0b', exp: '11年', edu: '中科大', highlight: 'PB级数据湖架构经验' },
    { name: '赵伟', company: '长江证券', title: '合规科技负责人', score: 88, urgency: 'medium', skill: 'RegTech', color: '#22c55e', exp: '9年', edu: '复旦法律+CS', highlight: '搭建智能合规审查系统' },
  ];

  const companyInsights = [
    { company: '兴业证券', strength: '交易系统', count: 2, color: '#0ea5e9' },
    { company: '国信证券', strength: 'NLP应用', count: 2, color: '#8b5cf6' },
    { company: '华林证券', strength: '数据平台', count: 1, color: '#f59e0b' },
    { company: '瑞银集团', strength: '风险量化', count: 2, color: '#ec4899' },
    { company: '长江证券', strength: '合规科技', count: 1, color: '#22c55e' },
  ];

  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="猎头AI智能体挖掘同行业公司顶尖人才，构建精准目标人才库">🗺️ 人才地图</SlideTitle>
      {/* 核心指标 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: <Eye className="w-5 h-5" />, label: '监控公司', value: '48家', sub: '覆盖券商/基金/外资行', color: '#6366f1' },
          { icon: <Users className="w-5 h-5" />, label: '待挖掘人才', value: '156人', sub: '本月新增 32人', color: '#0ea5e9' },
          { icon: <Star className="w-5 h-5" />, label: '高匹配度(≥90)', value: '23人', sub: '值得重点关注', color: '#f59e0b' },
          { icon: <Target className="w-5 h-5" />, label: '信息源覆盖', value: '12类', sub: 'LinkedIn/专利/论文/社区...', color: '#22c55e' },
        ].map((card, i) => (
          <div key={i} className="rounded-xl border border-border p-4 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: card.color + '12', color: card.color }}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-muted">{card.label}</p>
                <p className="text-xl font-bold text-foreground">{card.value}</p>
                <p className="text-[11px] text-muted">{card.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-1 flex gap-6 mt-6">
        {/* 左侧：目标人才 */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-2.5 flex-1">
            {talents.map((t, i) => (
              <div key={i} className="rounded-xl border border-border p-3.5 flex flex-col">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm"
                    style={{ backgroundColor: t.color }}>
                    {t.score}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <p className="text-base font-bold text-foreground truncate">{t.name}</p>
                      {t.urgency === 'high' && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-500 shrink-0">重点</span>
                      )}
                    </div>
                    <p className="text-[12px] text-muted truncate">{t.title} · {t.company}</p>
                  </div>
                </div>
                <p className="text-[12px] text-foreground/70 leading-relaxed mb-2">{t.highlight}</p>
                <div className="flex items-center gap-2 mt-auto">
                  <span className="inline-block text-[12px] px-1.5 py-0.5 rounded-full"
                    style={{ backgroundColor: t.color + '12', color: t.color }}>
                    {t.skill}
                  </span>
                  <span className="text-[12px] text-muted">{t.exp}</span>
                  <span className="text-[12px] text-muted">{t.edu}</span>
                </div>
              </div>
            ))}
          </div>

          {/* AI工作机制 */}
          <div className="rounded-xl bg-gradient-to-r from-violet-50 to-indigo-50 border border-violet-100 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Brain className="w-4 h-4 text-violet-600" />
              <span className="text-sm font-semibold text-violet-700">猎头AI智能体工作机制</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: <Globe className="w-3.5 h-3.5" />, text: '全网信息采集' },
                { icon: <BarChart3 className="w-3.5 h-3.5" />, text: '公司绩效分析' },
                { icon: <Brain className="w-3.5 h-3.5" />, text: '人才画像匹配' },
                { icon: <Zap className="w-3.5 h-3.5" />, text: '持续追踪更新' },
              ].map((s, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[13px] text-violet-700 bg-white/60 rounded-lg px-2 py-1.5">
                  <span className="text-violet-500 shrink-0">{s.icon}</span>{s.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧：公司洞察 + 指标 */}
        <div className="w-[280px] flex flex-col gap-4">
          <div className="rounded-xl border border-border p-4 flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-500" />
              公司维度洞察
            </h4>
            <div className="space-y-2">
              {companyInsights.map((c, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{c.company}</p>
                    <p className="text-[12px] text-muted">{c.strength}</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: c.color }}>{c.count}人</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-r from-violet-500 to-indigo-500 p-4 text-white text-center">
            <p className="text-sm font-semibold mb-2">信息来源</p>
            <p className="text-[12px] opacity-80 leading-relaxed">LinkedIn · 技术社区 · 论文库 · 专利库 · 行业论坛 · GitHub · 年报</p>
          </div>
        </div>
      </div>
    </div>
  );
}



/* ================================================================
   Slide 8: AI招聘全流程方案整体描述
   ================================================================ */
function SlideRecruitmentPipeline() {
  const stages = [
    { icon: <Megaphone className="w-10 h-10" />, label: '岗位发布', color: '#6366f1', mode: 'AI主导' },
    { icon: <FileSearch className="w-10 h-10" />, label: '简历筛选', color: '#8b5cf6', mode: 'AI主导' },
    { icon: <CalendarClock className="w-10 h-10" />, label: '自动约面', color: '#a855f7', mode: 'AI主导' },
    { icon: <Bot className="w-10 h-10" />, label: 'AI面试', color: '#d946ef', mode: 'AI主导' },
    { icon: <Users className="w-10 h-10" />, label: '二轮面试', color: '#ec4899', mode: '人工主导' },
    { icon: <Award className="w-10 h-10" />, label: '候选人定级', color: '#f43f5e', mode: 'AI辅助' },
    { icon: <DollarSign className="w-10 h-10" />, label: '候选人定薪', color: '#f97316', mode: 'AI辅助' },
    { icon: <ClipboardCheck className="w-10 h-10" />, label: '入职审批', color: '#eab308', mode: 'AI辅助' },
    { icon: <Send className="w-10 h-10" />, label: 'Offer发放', color: '#84cc16', mode: 'AI辅助' },
    { icon: <ShieldCheck className="w-10 h-10" />, label: '候选人背调', color: '#22c55e', mode: 'AI主导' },
    { icon: <Heart className="w-10 h-10" />, label: '保温池', color: '#14b8a6', mode: 'AI主导' },
    { icon: <UserCheck className="w-10 h-10" />, label: '入职引导', color: '#06b6d4', mode: 'AI主导' },
    { icon: <Target className="w-10 h-10" />, label: '试用期培养', color: '#3b82f6', mode: 'AI辅助' },
    { icon: <GraduationCap className="w-10 h-10" />, label: '新员工培训', color: '#6366f1', mode: 'AI主导' },
  ];

  const modeColor: Record<string, string> = {
    'AI主导': '#6366f1', 'AI辅助': '#f59e0b', '人工主导': '#3b82f6',
  };

  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="Part II · AI赋能招聘全流程：从岗位发布到新员工培训，AI全程提质增效">🔄 AI招聘全流程方案</SlideTitle>

      {/* 流程图 */}
      <div className="flex-1 flex flex-col justify-center mt-20">
        {/* 上排 7个 */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {stages.slice(0, 7).map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center border-2 shadow-sm"
                  style={{ backgroundColor: s.color + '12', borderColor: s.color + '40', color: s.color }}>
                  {s.icon}
                </div>
                <p className="text-sm font-semibold text-foreground mt-1.5">{s.label}</p>
                <span className="text-[12px] px-1.5 py-0.5 rounded-full mt-0.5 font-medium"
                  style={{ backgroundColor: modeColor[s.mode] + '12', color: modeColor[s.mode] }}>
                  {s.mode}
                </span>
              </div>
              {i < 6 && <ArrowRight className="w-10 h-10 text-border shrink-0 mt-[-40px] ml-[-25px]" />}
            </div>
          ))}
        </div>

        {/* 连接箭头 */}
        <div className="flex justify-center my-2">
          <div className="w-px h-10 bg-border" />
        </div>

        {/* 下排 7个 */}
        <div className="flex items-center justify-center gap-1.5 mb-2">
          {stages.slice(7, 14).map((s, i) => (
            <div key={i} className="flex items-center gap-8">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center border-2 shadow-sm"
                  style={{ backgroundColor: s.color + '12', borderColor: s.color + '40', color: s.color }}>
                  {s.icon}
                </div>
                <p className="text-sm font-semibold text-foreground mt-1.5">{s.label}</p>
                <span className="text-[12px] px-1.5 py-0.5 rounded-full mt-0.5 font-medium"
                  style={{ backgroundColor: modeColor[s.mode] + '12', color: modeColor[s.mode] }}>
                  {s.mode}
                </span>
              </div>
              {i < 6 && <ArrowRight className="w-10 h-10 text-border shrink-0 mt-[-40px] ml-[-25px]" />}
            </div>
          ))}
        </div>

        {/* 图例 */}
        <div className="flex items-center justify-center gap-6 mt-10">
          {[
            { mode: 'AI主导', count: 8, desc: 'AI独立完成，HR复核', color: '#6366f1' },
            { mode: 'AI辅助', count: 5, desc: 'AI提供建议，HR决策', color: '#f59e0b' },
            { mode: '人工主导', count: 1, desc: 'HR执行，AI赋能', color: '#3b82f6' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 ml-15">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-base font-semibold" style={{ color: item.color }}>{item.mode}</span>
              <span className="text-sm text-muted">({item.count}个环节 · {item.desc})</span>
            </div>
          ))}
        </div>

        {/* 核心价值 */}
        <div className="flex items-center justify-center gap-4 mt-8">
          {[
            { icon: <Zap className="w-5 h-5" />, label: '招聘周期缩短', color: '#f59e0b' },
            { icon: <TrendingUp className="w-5 h-5" />, label: 'HR效能提升', color: '#22c55e' },
            { icon: <Clock className="w-5 h-5" />, label: '评价客观科学', color: '#3b82f6' },
            { icon: <Shield className="w-5 h-5" />, label: '候选人满意度提升', color: '#8b5cf6' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-50 border border-border">
              <span style={{ color: item.color }}>{item.icon}</span>
              <span className="text-sm font-semibold text-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 9: AI×HR协作模式
   ================================================================ */
function SlideCollaborationModel() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="三种协作范式，因环节制宜">🤝 AI × HR 协作模式</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-5">
        {/* AI主导 */}
        <div className="rounded-xl border-2 border-indigo-200 bg-indigo-50/50 p-5 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl">🤖</span>
            <h3 className="text-lg font-bold text-indigo-700 mt-2">AI主导 · 人工复核</h3>
            <p className="text-sm text-indigo-500 mt-1">8个环节 · 自动化程度最高</p>
          </div>
          <div className="space-y-2 flex-1">
            {['岗位发布', '简历筛选', '自动约面', 'AI面试', '候选人背调', '保温池', '入职引导', '新员工培训'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-indigo-700 bg-white/80 rounded-lg px-3 py-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />{s}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-indigo-200 text-center">
            <strong><p className="text-[13px] text-indigo-500">AI完成90%+工作，HR审核确认</p></strong>
          </div>
        </div>

        {/* AI辅助 */}
        <div className="rounded-xl border-2 border-amber-200 bg-amber-50/50 p-5 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl">🤝</span>
            <h3 className="text-lg font-bold text-amber-700 mt-2">AI辅助 · 人工决策</h3>
            <p className="text-sm text-amber-500 mt-1">5个环节 · 数据驱动决策</p>
          </div>
          <div className="space-y-2 flex-1">
            {['候选人定级', '候选人定薪', '入职审批', 'Offer发放', '试用期培养'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-700 bg-white/80 rounded-lg px-3 py-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />{s}
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-amber-200 text-center">
            <strong><p className="text-[13px] text-amber-500">AI提供数据与建议，HR做最终决策</p></strong>
          </div>
        </div>

        {/* 人工主导 */}
        <div className="rounded-xl border-2 border-sky-200 bg-sky-50/50 p-5 flex flex-col">
          <div className="text-center mb-4">
            <span className="text-3xl">👤</span>
            <h3 className="text-lg font-bold text-sky-700 mt-2">人工主导 · AI赋能</h3>
            <p className="text-sm text-sky-500 mt-1">1个环节 · 深度人际交互</p>
          </div>
          <div className="space-y-2 flex-1">
            {['二轮面试'].map((s, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-sky-700 bg-white/80 rounded-lg px-3 py-2.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />{s}
              </div>
            ))}
            <div className="mt-2 p-3 rounded-lg bg-white/80 text-sm text-sky-700 space-y-1.5">
              <p className="font-semibold">为什么人工主导？</p>
              <p className="text-sm text-sky-600">二轮面试需要深度评估软技能、团队文化匹配度和领导力潜质，这些需要资深面试官的人际洞察力。</p>
              <p className="text-sm text-sky-600">AI提供候选人画像报告和面试关注点建议，让面试官有据可依。</p>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-sky-200 text-center">
            <strong><p className="text-[13px] text-sky-500">HR执行核心评估，AI提供全面支撑</p></strong>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 10: 岗位发布 + 简历筛选
   ================================================================ */
function SlideJobPostingScreening() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="AI核心能力展示：智能发布 + 精准筛选">📋 岗位发布 & 简历筛选</SlideTitle>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* 岗位发布 */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-15 h-15 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Megaphone className="w-10 h-10 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-indigo-700">AI岗位发布</h3>
              <p className="text-sm text-indigo-500">智能JD生成 · AI主导</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['智能JD生成优化', '多渠道一键发布', '竞品JD对标分析', 'SEO关键词优化'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-indigo-700 bg-white rounded-lg px-2.5 py-2">
                  <Zap className="w-5 h-5 text-indigo-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-indigo-100 mt-5">
              <p className="text-sm text-muted mb-2">AI如何优化JD</p>
              {[
                { label: '岗位精准度', pct: 95 },
                { label: '关键词覆盖', pct: 92 },
                { label: '吸引力评分', pct: 88 },
                { label: '合规性检查', pct: 98 },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 mt-3">
                  <span className="text-[12px] text-muted w-16">{d.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-indigo-100">
                    <div className="h-full rounded-full bg-indigo-500" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-[12px] font-semibold text-indigo-600 w-8 text-right">{d.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">发布效率</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">简历投递量</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>

        {/* 简历筛选 */}
        <div className="rounded-xl border border-purple-100 bg-purple-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-15 h-15 rounded-xl bg-purple-100 flex items-center justify-center">
              <FileSearch className="w-10 h-10 text-purple-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-purple-700">AI简历筛选</h3>
              <p className="text-sm text-purple-500">智能评估系统 · AI主导</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['NLP解析关键信息', '多维度评分', '加分项/风险点识别', '生成AI摘要'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-purple-700 bg-white rounded-lg px-2.5 py-2">
                  <Zap className="w-5 h-5 text-purple-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-purple-100 mt-5">
              <p className="text-sm text-muted mb-2">评估维度示例</p>
              {[
                { label: '技能匹配度', pct: 92 },
                { label: '经验相关度', pct: 85 },
                { label: '学历匹配', pct: 95 },
                { label: '稳定性', pct: 78 },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 mt-3">
                  <span className="text-[12px] text-muted w-16">{d.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-purple-100">
                    <div className="h-full rounded-full bg-purple-500" style={{ width: `${d.pct}%` }} />
                  </div>
                  <span className="text-[12px] font-semibold text-purple-600 w-8 text-right">{d.pct}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">筛选效率</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-2">
              <Eye className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">漏筛率</span>
              <TrendingDown className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 11: 自动约面 + AI面试 + 二轮面试
   ================================================================ */
function SlideInterviews() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="从智能约面到深度面试，AI全程赋能面试环节">🎤 自动约面 · AI面试 · 二轮面试</SlideTitle>

      <div className="flex-1 grid grid-cols-3 gap-5">
        {/* 自动约面 */}
        <div className="rounded-xl border border-violet-100 bg-violet-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-xl bg-violet-100 flex items-center justify-center">
              <CalendarClock className="w-6 h-6 text-violet-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-violet-700">自动约面</h3>
              <strong><p className="text-[12px] text-violet-400">AI主导 · HR复核</p></strong>
            </div>
          </div>
          <div className="space-y-3 flex-1 mt-10">
            {['多方日程自动协调', '候选人偏好学习', '冲突检测与重排', '自动发送确认通知', '面试用品准备提醒'].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-violet-700 bg-white rounded-lg px-2.5 py-1.5 border border-violet-50">
                <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />{t}
              </div>
            ))}
          </div>
          <div className="p-2 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center gap-1">
            <span className="text-sm text-violet-600 font-semibold">日程协调耗时</span>
            <TrendingDown className="w-3.5 h-3.5 text-purple-500" />
          </div>
        </div>

        {/* AI面试 */}
        <div className="rounded-xl border border-pink-100 bg-pink-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-xl bg-pink-100 flex items-center justify-center">
              <Bot className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-pink-700">AI面试官</h3>
              <p className="text-[12px] text-pink-400">AI主导 · 结构化评估</p>
            </div>
          </div>
          <div className="space-y-3 flex-1 mt-10">
            <div className="grid grid-cols-2 gap-1.5">
              {['结构化出题追问', '实时能力评估', '情绪识别分析', '面试报告生成'].map((t, i) => (
                <div key={i} className="flex items-center gap-1 text-sm text-pink-700 bg-white rounded-lg px-2 py-1.5">
                  <Zap className="w-3.5 h-3.5 text-pink-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 mt-5 rounded-lg bg-white border border-pink-100">
              <p className="text-[12px] text-muted mb-1.5">能力评估示例</p>
              {[
                { label: '专业能力', pct: 92, color: '#6366f1' },
                { label: '沟通表达', pct: 85, color: '#22c55e' },
                { label: '逻辑思维', pct: 88, color: '#3b82f6' },
                { label: '文化匹配', pct: 78, color: '#f59e0b' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-1.5 mt-4">
                  <span className="text-[12px] text-muted w-12">{d.label}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-pink-100">
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                  </div>
                  <span className="text-[12px] font-semibold w-6 text-right" style={{ color: d.color }}>{d.pct}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-1.5">
            <div className="p-2 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center gap-1">
              <span className="text-sm font-bold text-amber-600">面试产能</span>
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            </div>
            <div className="p-2 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center gap-1">
              <span className="text-sm font-bold text-green-600">一致性</span>
              <TrendingUp className="w-3.5 h-3.5 text-green-500" />
            </div>
          </div>
        </div>

        {/* 二轮面试 */}
        <div className="rounded-xl border border-sky-100 bg-sky-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-sky-700">二轮面试</h3>
              <p className="text-[12px] text-sky-400">人工主导 · AI赋能</p>
            </div>
          </div>
          <div className="space-y-3 flex-1 mt-10">
            {['AI生成候选人画像报告', 'AI标注面试关注要点', '软技能深度评估', '团队文化匹配评估', '领导力潜质判断'].map((t, i) => (
              <div key={i} className="flex items-center gap-1.5 text-sm text-sky-700 bg-white rounded-lg px-2.5 py-1.5 border border-sky-50">
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-400 shrink-0" />{t}
              </div>
            ))}
            <div className="p-2.5 rounded-lg bg-white border border-sky-100 mt-1">
              <p className="text-xs font-semibold text-sky-700 mb-1">为什么人工主导？</p>
              <p className="text-[12px] text-sky-600/80 leading-relaxed">
                深度评估软技能与文化匹配需要资深面试官的人际洞察力。AI提供全面数据支撑，让面试官有据可依。
              </p>
            </div>
          </div>
          <div className="mt-3 p-2.5 rounded-lg bg-sky-100/50 text-center flex items-center justify-center gap-1">
            <span className="text-sm text-sky-600 font-semibold">面试官效率</span>
            <TrendingUp className="w-3.5 h-3.5 text-sky-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 12: 候选人定级 + 候选人定薪
   ================================================================ */
function SlideGradingSalary() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="数据驱动的科学决策，兼顾公平性与竞争力">⚖️ 候选人定级 & 候选人定薪</SlideTitle>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* 定级 */}
        <div className="rounded-xl border border-red-100 bg-red-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-15 h-15 rounded-xl bg-red-100 flex items-center justify-center">
              <Award className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-red-700">AI智能定级</h3>
              <p className="text-sm text-red-400">AI辅助 · HR最终决策</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['多维度能力画像', '行业对标分析', '内部公平性校验', 'AI定级建议'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-xs text-red-700 bg-white rounded-lg px-2.5 py-2">
                  <Zap className="w-5 h-5 text-red-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-red-100">
              <p className="text-sm font-semibold text-foreground mt-3">评估因素（示例）</p>
              {[
                { name: '学历背景', w: '20%', s: 95 },
                { name: '工作经验', w: '30%', s: 82 },
                { name: '技术能力', w: '30%', s: 92 },
                { name: '项目成果', w: '20%', s: 88 },
              ].map((f, i) => (
                <div key={i} className="flex items-center gap-1.5 mt-4">
                  <span className="text-xs text-muted w-14">{f.name}</span>
                  <span className="text-[12px] text-muted w-6">{f.w}</span>
                  <div className="flex-1 h-1.5 rounded-full bg-red-100">
                    <div className="h-full rounded-full bg-red-400" style={{ width: `${f.s}%` }} />
                  </div>
                  <span className="text-sm font-semibold text-red-600 w-6 text-right">{f.s}</span>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-red-100 text-center">
              <p className="text-sm text-muted">AI建议级别</p>
              <p className="text-2xl font-bold text-red-600">VP2</p>
              <p className="text-sm text-muted">置信度 88%</p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">定级准确度</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">内部公平性</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>

        {/* 定薪 */}
        <div className="rounded-xl border border-orange-100 bg-orange-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-15 h-15 rounded-xl bg-orange-100 flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-base font-bold text-orange-700">AI薪酬测算</h3>
              <p className="text-sm text-orange-400">AI辅助 · HR确认</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['市场薪酬对标', '分位值智能推荐', '调薪因素分析', '成本预算评估'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-orange-700 bg-white rounded-lg px-2.5 py-2">
                  <Zap className="w-5 h-5 text-orange-400 shrink-0" />{t}
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-white border border-orange-100">
              <p className="text-sm font-semibold text-foreground mb-2">薪资分位参考（K/月）</p>
              <div className="relative h-20 flex items-end gap-1.5 px-2">
                {[
                  { label: 'P25', val: 38, h: 48 },
                  { label: 'P50', val: 45, h: 57 },
                  { label: 'AI推荐', val: 47, h: 60, highlight: true },
                  { label: 'P75', val: 55, h: 70 },
                ].map((b, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <span className={`text-[14px] font-bold ${b.highlight ? 'text-orange-600' : 'text-muted'}`}>{b.val}K</span>
                    <div className={`w-full rounded-t-md ${b.highlight ? 'bg-orange-500' : 'bg-orange-200'}`}
                      style={{ height: `${b.h}%` }} />
                    <span className="text-[12px] text-muted mt-0.5">{b.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-3 rounded-lg bg-white border border-orange-100 text-sm">
              <p className="font-semibold text-foreground mb-2">调薪因素分析</p>
              {[
                { name: '8年经验', impact: '+5%', pos: true },
                { name: '本科学历', impact: '-3%', pos: false },
                { name: '大厂背景', impact: '+4%', pos: true },
                { name: '管理经验', impact: '+3%', pos: true },
              ].map((f, i) => (
                <div key={i} className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted">{f.name}</span>
                  <span className={`text-xs font-semibold ${f.pos ? 'text-green-600' : 'text-red-500'}`}>{f.impact}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
              <DollarSign className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">薪酬竞争力</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">测算效率</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 13: 试用期培养 + 新员工培训
   ================================================================ */
function SlideTrainingGrowth() {
  return (
    <div className="h-screen-100vh px-10 py-20 flex flex-col">
      <SlideTitle sub="AI全程陪伴新员工成长，缩短融入周期">🎓 试用期培养 & 新员工培训</SlideTitle>

      <div className="flex-1 grid grid-cols-2 gap-6">
        {/* 试用期培养 */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-15 h-15 rounded-xl bg-blue-100 flex items-center justify-center">
              <Target className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-blue-700">AI试用期培养</h3>
              <p className="text-sm text-blue-400">AI辅助 · 主管决策</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['入职30/60/90天目标', '导师智能匹配', '绩效实时追踪', '风险预警提醒'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-blue-700 bg-white rounded-lg px-2.5 py-2">
                  <Zap className="w-3.5 h-3.5 text-blue-400 shrink-0" />{t}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-white border border-blue-100">
              <p className="text-sm font-semibold text-foreground mb-2">试用期成长追踪</p>
              {[
                { label: '任务完成率', pct: 85, color: '#3b82f6' },
                { label: '技能掌握度', pct: 72, color: '#6366f1' },
                { label: '团队融入度', pct: 90, color: '#22c55e' },
                { label: '主管满意度', pct: 88, color: '#f59e0b' },
              ].map((d, i) => (
                <div key={i} className="flex items-center gap-2 mb-2.5">
                  <span className="text-[12px] text-muted w-16">{d.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-blue-100">
                    <div className="h-full rounded-full" style={{ width: `${d.pct}%`, backgroundColor: d.color }} />
                  </div>
                  <span className="text-[12px] font-semibold w-8 text-right" style={{ color: d.color }}>{d.pct}%</span>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-white border border-blue-100">
              <p className="text-sm font-semibold text-foreground mb-1">AI智能提醒</p>
              <div className="space-y-1">
                {[
                  '✅ 第30天：完成基础培训，融入评估达标',
                  '⚠️ 第45天：代码贡献低于同期，建议加强指导',
                  '📊 第60天：中期评估报告自动生成',
                ].map((t, i) => (
                  <p key={i} className="text-[12px] text-blue-600/80">{t}</p>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
              <Target className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">试用期通过率</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">融入周期</span>
              <TrendingDown className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>

        {/* 新员工培训 */}
        <div className="rounded-xl border border-indigo-100 bg-indigo-50/30 p-5 flex flex-col">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-15 h-15 rounded-xl bg-indigo-100 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <h3 className="text-base font-bold text-indigo-700">AI培训推荐</h3>
              <p className="text-sm text-indigo-400">AI主导 · 个性化学习</p>
            </div>
          </div>

          <div className="space-y-3 flex-1">
            <div className="grid grid-cols-2 gap-2">
              {['能力短板诊断', '个性化学习路径', '学习效果评估', '学习伙伴匹配'].map((t, i) => (
                <div key={i} className="flex items-center gap-1.5 text-sm text-indigo-700 bg-white rounded-lg px-2.5 py-2">
                  <Zap className="w-3.5 h-3.5 text-indigo-400 shrink-0" />{t}
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-white border border-indigo-100">
              <p className="text-sm font-semibold text-foreground mb-2">个性化培训计划示例</p>
              <div className="space-y-2">
                {[
                  { week: '第1周', content: '公司文化与制度', status: '✅ 已完成', color: '#22c55e' },
                  { week: '第2周', content: '业务系统与工具', status: '✅ 已完成', color: '#22c55e' },
                  { week: '第3周', content: '岗位专业技能', status: '🔄 进行中', color: '#3b82f6' },
                  { week: '第4周', content: '项目实战演练', status: '⏳ 待开始', color: '#94a3b8' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded bg-indigo-50/50">
                    <span className="text-[12px] font-semibold text-indigo-600 w-10">{item.week}</span>
                    <span className="text-[12px] text-foreground flex-1">{item.content}</span>
                    <span className="text-[12px]" style={{ color: item.color }}>{item.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white border border-indigo-100">
              <p className="text-sm font-semibold text-foreground mb-1">AI学习伙伴</p>
              <p className="text-[12px] text-indigo-600/80 leading-relaxed">
                根据新员工的能力画像和学习风格，AI自动匹配团队中最合适的学习伙伴/导师，加速知识传递。
              </p>
            </div>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-100 flex items-center justify-center gap-2">
              <GraduationCap className="w-4 h-4 text-amber-600" />
              <span className="text-sm font-bold text-amber-700">课程匹配度</span>
              <TrendingUp className="w-4 h-4 text-amber-500" />
            </div>
            <div className="p-2.5 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">上手速度</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Slide 14: 总结与展望
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

        {/* 两部分核心价值 */}
        <div className="grid grid-cols-2 gap-6 mb-10 w-full max-w-3xl">
          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 text-center">
            <p className="text-xs text-white/60 mb-1">Part I</p>
            <h3 className="text-lg font-bold text-white mb-3">AI战略支撑</h3>
            <div className="space-y-2">
              {[
                { icon: <Radar className="w-4 h-4" />, text: '人才趋势分析 · 前瞻市场动态' },
                { icon: <Map className="w-4 h-4" />, text: '人才地图 · 精准定位目标人才' },
                { icon: <Brain className="w-4 h-4" />, text: 'AI战略建议 · 数据驱动决策' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 justify-center text-sm text-white/80">
                  {item.icon}<span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-5 text-center">
            <p className="text-xs text-white/60 mb-1">Part II</p>
            <h3 className="text-lg font-bold text-white mb-3">AI招聘提质增效</h3>
            <div className="space-y-2">
              {[
                { icon: <Zap className="w-4 h-4" />, text: '14环节全流程AI赋能' },
                { icon: <Users className="w-4 h-4" />, text: 'AI+HR三级协作模式' },
                { icon: <TrendingUp className="w-4 h-4" />, text: '招聘周期缩短' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 justify-center text-sm text-white/80">
                  {item.icon}<span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
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
        <p className="text-sm text-white/60">感谢聆听</p>
        <p className="text-xs text-white/30 mt-1">HR X AI解决 · 2026</p>
      </div>
    </div>
  );
}
