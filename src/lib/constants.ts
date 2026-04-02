import { StageInfo } from './types';

export const PIPELINE_STAGES: StageInfo[] = [
  { key: 'job-posting', label: '岗位发布', shortLabel: '发布', icon: 'Megaphone', description: 'AI智能生成岗位JD', color: '#6366f1' },
  { key: 'resume-screening', label: '简历筛选', shortLabel: '筛选', icon: 'FileSearch', description: 'AI评分与初筛', color: '#8b5cf6' },
  { key: 'interview-scheduling', label: '自动约面', shortLabel: '约面', icon: 'CalendarClock', description: 'AI智能体自动约面', color: '#a855f7' },
  { key: 'ai-interview', label: 'AI面试', shortLabel: 'AI面', icon: 'Bot', description: 'AI面试官智能面试', color: '#d946ef' },
  { key: 'second-interview', label: '二轮面试', shortLabel: '复面', icon: 'Users', description: '面试官二轮面试', color: '#ec4899' },
  { key: 'grading', label: '候选人定级', shortLabel: '定级', icon: 'Award', description: 'AI辅助智能定级', color: '#f43f5e' },
  { key: 'salary', label: '候选人定薪', shortLabel: '定薪', icon: 'DollarSign', description: 'AI薪酬区间测算', color: '#f97316' },
  { key: 'approval', label: '入职审批', shortLabel: '审批', icon: 'ClipboardCheck', description: 'AI汇总提交审批', color: '#eab308' },
  { key: 'offer', label: 'Offer发放', shortLabel: 'Offer', icon: 'Send', description: 'AI生成Offer与预测', color: '#84cc16' },
  { key: 'background-check', label: '候选人背调', shortLabel: '背调', icon: 'ShieldCheck', description: 'AI自动化背调', color: '#22c55e' },
  { key: 'candidate-pool', label: '保温池', shortLabel: '保温', icon: 'Heart', description: 'AI候选人关怀服务', color: '#14b8a6' },
  { key: 'onboarding', label: '入职引导', shortLabel: '入职', icon: 'UserCheck', description: 'AI入职服务引导', color: '#06b6d4' },
  { key: 'probation', label: '试用期培养', shortLabel: '试用', icon: 'Target', description: 'AI生成培养目标', color: '#3b82f6' },
  { key: 'training', label: '新员工培训', shortLabel: '培训', icon: 'GraduationCap', description: 'AI推荐课程学习', color: '#6366f1' },
];
