'use client';

import { useState } from 'react';
import { PIPELINE_STAGES } from '@/lib/constants';
import {
  Megaphone, FileSearch, CalendarClock, Bot, Users, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, Target, GraduationCap, ArrowRight, Sparkles,
  Zap, Clock, TrendingUp, ChevronDown, ChevronUp,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Megaphone, FileSearch, CalendarClock, Bot, Users, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, Target, GraduationCap,
};

// 每个阶段的 AI 与 HR 协作详情
const STAGE_COLLABORATION: {
  key: string;
  aiRole: string;
  hrRole: string;
  aiTasks: string[];
  hrTasks: string[];
  collaborationMode: 'ai-driven' | 'ai-assisted' | 'human-driven';
  modeLabel: string;
  efficiencyGain: string;
  qualityGain: string;
  workflow: { actor: 'ai' | 'hr'; action: string }[];
  highlight: string;
}[] = [
  {
    key: 'job-posting',
    aiRole: '智能JD生成引擎',
    hrRole: '需求确认与发布',
    aiTasks: ['基于岗位画像自动生成JD', '分析市场关键词优化匹配度', '多渠道自动分发', '预测岗位吸引力评分'],
    hrTasks: ['确认岗位需求与HC', '审核AI生成的JD内容', '确认发布渠道与预算'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '生成JD从2小时缩短至5分钟',
    qualityGain: '简历匹配精准度提升18%',
    workflow: [
      { actor: 'hr', action: '提出招聘需求' },
      { actor: 'ai', action: '智能生成结构化JD' },
      { actor: 'ai', action: '市场关键词优化' },
      { actor: 'hr', action: '审核确认后发布' },
    ],
    highlight: 'AI根据岗位画像和市场趋势自动生成高质量JD，HR只需审核确认',
  },
  {
    key: 'resume-screening',
    aiRole: '智能简历评估系统',
    hrRole: '结果复核与决策',
    aiTasks: ['NLP解析简历关键信息', '多维度评分（技能/经验/学历/稳定性）', '识别加分项与风险点', '生成候选人AI摘要'],
    hrTasks: ['复核AI筛选结果', '对边界候选人做最终判断', '标记特殊需求'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '筛选500份简历从3天缩短至30分钟',
    qualityGain: '优质候选人漏筛率降低65%',
    workflow: [
      { actor: 'ai', action: '批量解析和评分' },
      { actor: 'ai', action: '生成推荐/待定/不推荐分组' },
      { actor: 'hr', action: '复核AI推荐结果' },
      { actor: 'hr', action: '对待定候选人做判断' },
    ],
    highlight: 'AI完成批量筛选和多维评分，HR聚焦在边界决策上',
  },
  {
    key: 'interview-scheduling',
    aiRole: '智能调度引擎',
    hrRole: '异常介入处理',
    aiTasks: ['读取候选人和面试官日历', '智能匹配空闲时段', '自动发送面试邀请', '处理改期和冲突'],
    hrTasks: ['处理候选人特殊需求', '协调VIP候选人面试', '确认线下面试安排'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '约面耗时从2小时/人缩短至2分钟/人',
    qualityGain: '候选人体验满意度提升40%',
    workflow: [
      { actor: 'ai', action: '分析日历空闲时段' },
      { actor: 'ai', action: '推荐最优面试时间' },
      { actor: 'ai', action: '自动发送邀请确认' },
      { actor: 'hr', action: '处理异常或特殊需求' },
    ],
    highlight: 'AI全自动完成90%的约面工作，HR只处理异常场景',
  },
  {
    key: 'ai-interview',
    aiRole: 'AI面试官',
    hrRole: '质量监督与反馈',
    aiTasks: ['结构化出题与追问', '实时分析回答质量', '情绪识别（自信/紧张/真诚）', '生成面试报告与评分'],
    hrTasks: ['设定面试题目框架', '审阅AI面试报告', '对AI评分进行校准'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '初面产能从4人/天提升至无限并发',
    qualityGain: '面试评价一致性提升90%',
    workflow: [
      { actor: 'hr', action: '配置面试题库与权重' },
      { actor: 'ai', action: '实施结构化面试' },
      { actor: 'ai', action: '情绪分析 + 能力评估' },
      { actor: 'ai', action: '生成详细面试报告' },
      { actor: 'hr', action: '审阅报告并校准' },
    ],
    highlight: 'AI面试官实现7×24小时无限并发面试，标准化评估消除人为偏见',
  },
  {
    key: 'second-interview',
    aiRole: '面试辅助引擎',
    hrRole: '面试执行与评价',
    aiTasks: ['生成候选人画像报告', '推荐面试关注点', '提供对标数据参考', '实时辅助记录要点'],
    hrTasks: ['主导面试流程', '深度评估软技能', '判断团队匹配度', '做出面试决策'],
    collaborationMode: 'human-driven',
    modeLabel: '人工主导',
    efficiencyGain: '面试准备时间缩短70%',
    qualityGain: '面试决策有据可依，减少直觉判断',
    workflow: [
      { actor: 'ai', action: '生成候选人画像报告' },
      { actor: 'ai', action: '推荐面试关注点' },
      { actor: 'hr', action: '执行面试并深度评估' },
      { actor: 'hr', action: '做出面试决策' },
    ],
    highlight: 'HR主导面试，AI提供数据支撑和候选人洞察',
  },
  {
    key: 'grading',
    aiRole: '智能定级引擎',
    hrRole: '审核确认与调整',
    aiTasks: ['多维能力评估建模', '历史数据对标分析', '推荐候选人级别', '生成定级理由报告'],
    hrTasks: ['审核AI定级建议', '结合团队需求调整', '确认最终级别'],
    collaborationMode: 'ai-assisted',
    modeLabel: 'AI辅助',
    efficiencyGain: '定级决策时间从1天缩短至10分钟',
    qualityGain: '定级准确度提升35%，内部公平性增强',
    workflow: [
      { actor: 'ai', action: '综合能力评估' },
      { actor: 'ai', action: '历史对标匹配' },
      { actor: 'ai', action: '推荐级别与置信度' },
      { actor: 'hr', action: '审核并确认级别' },
    ],
    highlight: 'AI提供数据驱动的定级建议，HR根据实际情况做最终决策',
  },
  {
    key: 'salary',
    aiRole: '薪酬测算引擎',
    hrRole: '薪资方案确认',
    aiTasks: ['市场薪酬数据分析', '内部公平性对标', '多因素薪资测算', '推荐薪资范围'],
    hrTasks: ['审核AI薪资建议', '考虑特殊因素调整', '确认薪资方案'],
    collaborationMode: 'ai-assisted',
    modeLabel: 'AI辅助',
    efficiencyGain: '薪酬测算从半天缩短至5分钟',
    qualityGain: '薪资竞争力评估准确率92%',
    workflow: [
      { actor: 'ai', action: '获取市场薪酬数据' },
      { actor: 'ai', action: '分析内部薪酬结构' },
      { actor: 'ai', action: '推荐薪资范围' },
      { actor: 'hr', action: '审核并确认方案' },
    ],
    highlight: 'AI自动获取市场数据并测算推荐薪资，确保外部竞争力和内部公平性',
  },
  {
    key: 'approval',
    aiRole: '审批助手',
    hrRole: '审批决策',
    aiTasks: ['自动汇总候选人全流程数据', '生成结构化审批摘要', '智能路由审批流', '催办与进度跟踪'],
    hrTasks: ['审阅AI汇总报告', '执行审批决策', '处理异常审批'],
    collaborationMode: 'ai-assisted',
    modeLabel: 'AI辅助',
    efficiencyGain: '审批材料准备时间缩短80%',
    qualityGain: '审批信息完整性100%，减少退回率',
    workflow: [
      { actor: 'ai', action: '汇总全流程数据' },
      { actor: 'ai', action: '生成审批摘要' },
      { actor: 'hr', action: '审阅并做出决策' },
      { actor: 'ai', action: '跟踪进度与催办' },
    ],
    highlight: 'AI自动汇总所有候选人数据，审批人一目了然快速决策',
  },
  {
    key: 'offer',
    aiRole: 'Offer生成引擎',
    hrRole: 'Offer审核与发放',
    aiTasks: ['个性化Offer内容生成', '入职概率预测', '竞争Offer分析', '最优吸引策略推荐'],
    hrTasks: ['审核Offer内容', '确认薪酬福利', '与候选人沟通', '处理谈判'],
    collaborationMode: 'ai-assisted',
    modeLabel: 'AI辅助',
    efficiencyGain: 'Offer生成从2小时缩短至3分钟',
    qualityGain: 'Offer接受率提升22%',
    workflow: [
      { actor: 'ai', action: '生成个性化Offer' },
      { actor: 'ai', action: '预测入职概率' },
      { actor: 'hr', action: '审核并确认Offer' },
      { actor: 'hr', action: '与候选人沟通' },
    ],
    highlight: 'AI预测入职概率并推荐差异化吸引策略，提高Offer接受率',
  },
  {
    key: 'background-check',
    aiRole: '自动化背调引擎',
    hrRole: '异常结果处理',
    aiTasks: ['自动发起多维度背调', '学历/工作经历自动验证', '实时进度追踪', '风险预警'],
    hrTasks: ['处理异常背调结果', '联系前雇主确认', '做出风险决策'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '背调周期从5天缩短至1天',
    qualityGain: '背调覆盖率从60%提升至100%',
    workflow: [
      { actor: 'ai', action: '自动发起各项核查' },
      { actor: 'ai', action: '学历/信用/犯罪记录验证' },
      { actor: 'ai', action: '实时进度监控与预警' },
      { actor: 'hr', action: '处理异常与风险决策' },
    ],
    highlight: 'AI自动化完成标准背调流程，HR只处理异常和风险决策',
  },
  {
    key: 'candidate-pool',
    aiRole: '人才保温引擎',
    hrRole: '关系维护策略',
    aiTasks: ['候选人跳槽意向预测', '智能标签与分类', '自动发送保温内容', '匹配新岗位机会'],
    hrTasks: ['制定保温策略', '重点候选人人工维护', '确认再次触达时机'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '人才库激活率提升150%',
    qualityGain: '高潜力候选人触达及时性提升80%',
    workflow: [
      { actor: 'ai', action: '持续监测跳槽意向' },
      { actor: 'ai', action: '智能匹配新岗位' },
      { actor: 'ai', action: '自动发送保温内容' },
      { actor: 'hr', action: '重点候选人维护' },
    ],
    highlight: 'AI持续追踪人才池动态，自动识别最佳触达时机',
  },
  {
    key: 'onboarding',
    aiRole: 'AI入职管家',
    hrRole: '入职体验保障',
    aiTasks: ['自动创建系统账号', '申请设备和工位', '生成入职文件包', '智能培训排期'],
    hrTasks: ['签署劳动合同', '安排Buddy', '确认入职体验', '处理特殊需求'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '入职准备从3天缩短至10分钟',
    qualityGain: '新员工首日体验满意度98%',
    workflow: [
      { actor: 'ai', action: '自动创建账号与申请设备' },
      { actor: 'ai', action: '生成入职文件与培训安排' },
      { actor: 'hr', action: '签署合同与安排Buddy' },
      { actor: 'hr', action: '确认入职体验' },
    ],
    highlight: 'AI自动完成所有标准化入职流程，HR关注人性化体验',
  },
  {
    key: 'probation',
    aiRole: '试用期评估引擎',
    hrRole: '导师辅导与决策',
    aiTasks: ['自动设定考核目标', '持续追踪工作数据', '月度能力评估', '预测转正概率'],
    hrTasks: ['制定培养计划', '定期面谈辅导', '收集360度反馈', '做出转正决策'],
    collaborationMode: 'ai-assisted',
    modeLabel: 'AI辅助',
    efficiencyGain: '试用期评估工作量减少60%',
    qualityGain: '试用期淘汰精准度提升45%',
    workflow: [
      { actor: 'ai', action: '设定量化考核目标' },
      { actor: 'ai', action: '持续追踪与评估' },
      { actor: 'hr', action: '面谈辅导与反馈' },
      { actor: 'hr', action: '综合决策转正' },
    ],
    highlight: 'AI客观追踪数据指标，HR关注人才培养和发展',
  },
  {
    key: 'training',
    aiRole: '个性化学习引擎',
    hrRole: '培训体系管理',
    aiTasks: ['基于能力画像推荐课程', '自适应学习路径', '学习效果评估', '智能匹配学习伙伴'],
    hrTasks: ['管理课程资源', '组织线下培训', '评估培训效果', '优化培训体系'],
    collaborationMode: 'ai-driven',
    modeLabel: 'AI主导',
    efficiencyGain: '课程匹配准确率95%',
    qualityGain: '新员工上手速度提升40%',
    workflow: [
      { actor: 'ai', action: '分析能力画像' },
      { actor: 'ai', action: '生成个性化学习路径' },
      { actor: 'ai', action: '追踪学习效果' },
      { actor: 'hr', action: '组织线下培训与评估' },
    ],
    highlight: 'AI实现千人千面的个性化学习推荐，大幅加速新员工成长',
  },
];

const MODE_STYLES = {
  'ai-driven': { bg: 'bg-indigo-50', text: 'text-indigo-600', border: 'border-indigo-200', icon: '🤖' },
  'ai-assisted': { bg: 'bg-amber-50', text: 'text-amber-600', border: 'border-amber-200', icon: '🤝' },
  'human-driven': { bg: 'bg-sky-50', text: 'text-sky-600', border: 'border-sky-200', icon: '👤' },
};

export default function AiCollaborationPage() {
  const [expandedStage, setExpandedStage] = useState<string | null>(STAGE_COLLABORATION[0].key);

  const modeCount = {
    'ai-driven': STAGE_COLLABORATION.filter(s => s.collaborationMode === 'ai-driven').length,
    'ai-assisted': STAGE_COLLABORATION.filter(s => s.collaborationMode === 'ai-assisted').length,
    'human-driven': STAGE_COLLABORATION.filter(s => s.collaborationMode === 'human-driven').length,
  };

  return (
    <div className="p-6 space-y-8 animate-fade-in">
      {/* 页面标题区 */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          人机协作全景图
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          AI × HR：智能协作，提质增效
        </h1>
        <p className="text-sm text-muted leading-relaxed">
          覆盖招聘全流程 14 个环节，AI智能体与HR紧密协作。AI负责数据处理、模式识别和自动化执行，
          HR聚焦决策判断、关系维护和人性化服务，实现 <span className="font-semibold text-accent">「AI提效 + 人工提质」</span> 的最佳协同范式。
        </p>
      </div>

      {/* 协作模式概览 */}
      <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
        {([
          { mode: 'ai-driven' as const, label: 'AI主导 · 人工复核', desc: 'AI独立完成主要工作，HR审核确认', count: modeCount['ai-driven'] },
          { mode: 'ai-assisted' as const, label: 'AI辅助 · 人工决策', desc: 'AI提供数据与建议，HR做最终决策', count: modeCount['ai-assisted'] },
          { mode: 'human-driven' as const, label: '人工主导 · AI赋能', desc: 'HR执行核心工作，AI提供支撑', count: modeCount['human-driven'] },
        ]).map(item => {
          const style = MODE_STYLES[item.mode];
          return (
            <div key={item.mode} className={`rounded-xl border ${style.border} ${style.bg} p-4 text-center`}>
              <span className="text-2xl">{style.icon}</span>
              <p className={`text-sm font-semibold mt-2 ${style.text}`}>{item.label}</p>
              <p className="text-[11px] text-muted mt-1">{item.desc}</p>
              <p className={`text-2xl font-bold mt-2 ${style.text}`}>{item.count} <span className="text-xs font-normal text-muted">个环节</span></p>
            </div>
          );
        })}
      </div>

      {/* 流程时间线 */}
      <div className="space-y-3">
        {STAGE_COLLABORATION.map((stage, index) => {
          const stageInfo = PIPELINE_STAGES.find(s => s.key === stage.key);
          const Icon = stageInfo ? iconMap[stageInfo.icon] : null;
          const isExpanded = expandedStage === stage.key;
          const modeStyle = MODE_STYLES[stage.collaborationMode];

          return (
            <div key={stage.key} className="relative">
              {/* 连接线 */}
              {index < STAGE_COLLABORATION.length - 1 && (
                <div className="absolute left-[27px] top-[60px] bottom-[-12px] w-px bg-gradient-to-b from-border to-transparent z-0" />
              )}

              <div className={`relative z-10 bg-white rounded-xl border transition-all ${
                isExpanded ? 'border-accent/30 shadow-md shadow-accent/5' : 'border-border hover:border-accent/20'
              }`}>
                {/* 折叠头部 */}
                <button
                  onClick={() => setExpandedStage(isExpanded ? null : stage.key)}
                  className="w-full flex items-center gap-4 px-5 py-4 text-left"
                >
                  {/* 序号 + 图标 */}
                  <div
                    className="w-[54px] h-[54px] rounded-xl flex flex-col items-center justify-center shrink-0 relative"
                    style={{ backgroundColor: `${stageInfo?.color}12`, color: stageInfo?.color }}
                  >
                    <span className="text-[10px] font-bold opacity-50">{String(index + 1).padStart(2, '0')}</span>
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>

                  {/* 标题 + 简介 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm font-semibold text-foreground">{stageInfo?.label}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${modeStyle.bg} ${modeStyle.text} border ${modeStyle.border}`}>
                        {modeStyle.icon} {stage.modeLabel}
                      </span>
                    </div>
                    <p className="text-xs text-muted">{stage.highlight}</p>
                  </div>

                  {/* 效率指标 */}
                  <div className="hidden lg:flex items-center gap-4 shrink-0">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span className="text-muted">{stage.efficiencyGain}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      <span className="text-muted">{stage.qualityGain}</span>
                    </div>
                  </div>

                  {isExpanded
                    ? <ChevronUp className="w-4 h-4 text-muted shrink-0" />
                    : <ChevronDown className="w-4 h-4 text-muted shrink-0" />}
                </button>

                {/* 展开内容 */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-0 animate-fade-in">
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-center gap-6">
                        {/* AI侧 */}
                        <div className="w-52 shrink-0">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
                              <Bot className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-indigo-600">AI 智能体</p>
                              <p className="text-[10px] text-muted">{stage.aiRole}</p>
                            </div>
                          </div>
                          <ul className="space-y-1.5">
                            {stage.aiTasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* 协作流程 */}
                        <div className="w-80 shrink-0">
                          <p className="text-xs font-semibold text-foreground mb-3 text-center">协作流程</p>
                          <div className="space-y-2">
                            {stage.workflow.map((step, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                                  step.actor === 'ai'
                                    ? 'bg-indigo-100 text-indigo-600'
                                    : 'bg-emerald-100 text-emerald-600'
                                }`}>
                                  {i + 1}
                                </span>
                                <div className={`flex-1 px-2.5 py-1.5 rounded-lg text-xs ${
                                  step.actor === 'ai'
                                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
                                    : 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                }`}>
                                  <span className="font-medium">{step.actor === 'ai' ? 'AI' : 'HR'}：</span>
                                  {step.action}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* HR侧 */}
                        <div className="w-52 shrink-0">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                              <UserCheck className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-emerald-600">HR 团队</p>
                              <p className="text-[10px] text-muted">{stage.hrRole}</p>
                            </div>
                          </div>
                          <ul className="space-y-1.5">
                            {stage.hrTasks.map((task, i) => (
                              <li key={i} className="flex items-start gap-1.5 text-xs text-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                                {task}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* 效能提升 */}
                      <div className="mt-4 grid grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                          <div className="w-9 h-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                            <Clock className="w-4.5 h-4.5 text-amber-600" />
                          </div>
                          <div>
                            <p className="text-[10px] text-amber-600 font-medium">⚡ 效率提升</p>
                            <p className="text-xs font-semibold text-foreground">{stage.efficiencyGain}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50/50 border border-green-100">
                          <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                            <TrendingUp className="w-4.5 h-4.5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-[10px] text-green-600 font-medium">📈 质量提升</p>
                            <p className="text-xs font-semibold text-foreground">{stage.qualityGain}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 总结 */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-emerald-50 rounded-xl border border-indigo-100 p-6">
        <div className="text-center max-w-2xl mx-auto">
          <h3 className="text-base font-bold text-foreground mb-2">协作理念</h3>
          <p className="text-sm text-muted leading-relaxed mb-4">
            AI不是替代HR，而是成为HR最强大的智能助手。AI承担重复性、数据密集型工作，
            让HR回归人才判断、关系维护和战略决策的核心价值。
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-3xl font-bold text-indigo-600">{modeCount['ai-driven']}</p>
              <p className="text-xs text-muted mt-1">AI主导环节</p>
              <p className="text-[10px] text-indigo-500">自动化程度最高</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-amber-600">{modeCount['ai-assisted']}</p>
              <p className="text-xs text-muted mt-1">AI辅助环节</p>
              <p className="text-[10px] text-amber-500">数据驱动决策</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-sky-600">{modeCount['human-driven']}</p>
              <p className="text-xs text-muted mt-1">人工主导环节</p>
              <p className="text-[10px] text-sky-500">AI全面赋能</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
