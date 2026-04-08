// ============================================================
// AI人才引进方案 - 核心类型定义
// ============================================================

/** 招聘流程阶段 */
export type PipelineStage =
  | 'talent-insights'   // 人才战略雷达
  | 'job-posting'       // 岗位发布
  | 'resume-screening'  // 简历筛选
  | 'interview-scheduling' // 自动约面
  | 'interviewer-assignment' // 面试官分配
  | 'interviewer'       // 面试官端
  | 'candidate'         // 候选人端
  | 'interview-calendar' // 面试日历
  | 'grading'           // 候选人定级
  | 'salary'            // 候选人定薪
  | 'approval'          // 入职审批
  | 'offer'             // Offer发放
  | 'background-check'  // 候选人背调
  | 'candidate-pool'    // 候选人保温池
  | 'onboarding'        // 入职引导
  | 'probation'         // 试用期培养
  | 'training';         // 新员工培训

export interface StageInfo {
  key: PipelineStage;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  color: string;
}

/** 候选人 */
export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  gender: '男' | '女';
  age: number;
  phone: string;
  email: string;
  education: Education;
  currentCompany: string;
  currentTitle: string;
  yearsOfExperience: number;
  expectedSalary: string;
  skills: string[];
  stage: PipelineStage;
  aiScore: number;           // AI综合评分 0-100
  resumeHighlights: string[];  // 加分项
  resumeRisks: string[];       // 减分项
  resumeSummary: string;       // AI摘要
  appliedJobId: string;
  appliedDate: string;
  status: 'active' | 'rejected' | 'withdrawn' | 'hired';
}

export interface Education {
  degree: '博士' | '硕士' | '本科' | '大专';
  school: string;
  major: string;
  graduationYear: number;
}

/** 岗位 */
export interface Job {
  id: string;
  title: string;
  department: string;
  level: string;
  headcount: number;
  salary: string;
  location: string;
  status: 'draft' | 'published' | 'closed';
  requirements: string[];
  responsibilities: string[];
  jdContent: string;
  createdAt: string;
  publishedAt?: string;
  applicantCount: number;
  budget: string;
}

/** AI面试记录 */
export interface InterviewRecord {
  id: string;
  candidateId: string;
  jobId: string;
  round: 1 | 2;
  type: 'ai' | 'human';
  interviewerId?: string;
  scheduledAt: string;
  duration: number;        // 分钟
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  questions: InterviewQuestion[];
  overallScore: number;
  evaluation: string;
  recommendation: 'strong-yes' | 'yes' | 'neutral' | 'no' | 'strong-no';
  emotionAnalysis?: EmotionAnalysis;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  followUp?: string;
  score: number;
  category: '专业能力' | '项目经验' | '团队协作' | '学习能力' | '价值观';
}

export interface EmotionAnalysis {
  confidence: number;
  enthusiasm: number;
  nervousness: number;
  honesty: number;
  summary: string;
}

/** 定级 */
export interface GradingResult {
  candidateId: string;
  aiSuggestedLevel: string;
  aiConfidence: number;
  factors: GradingFactor[];
  historicalComparison: HistoricalComparison[];
  hrbpAdjustedLevel?: string;
  hrbpComment?: string;
  status: 'pending' | 'confirmed' | 'adjusted';
}

export interface GradingFactor {
  name: string;
  weight: number;
  score: number;
  detail: string;
}

export interface HistoricalComparison {
  name: string;
  level: string;
  education: string;
  experience: number;
  similarity: number;
}

/** 定薪 */
export interface SalaryResult {
  candidateId: string;
  level: string;
  salaryMin: number;
  salaryMax: number;
  aiRecommended: number;
  marketP25: number;
  marketP50: number;
  marketP75: number;
  internalAvg: number;
  factors: SalaryFactor[];
  finalSalary?: number;
}

export interface SalaryFactor {
  name: string;
  impact: 'positive' | 'neutral' | 'negative';
  detail: string;
  adjustment: number; // 百分比调整
}

/** 审批 */
export interface ApprovalRecord {
  id: string;
  candidateIds: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  approvedAt?: string;
  approverName: string;
  aiSummary: string;
  comments?: string;
}

/** Offer */
export interface OfferRecord {
  id: string;
  candidateId: string;
  salary: number;
  level: string;
  startDate: string;
  status: 'draft' | 'sent' | 'accepted' | 'declined' | 'expired';
  sentAt?: string;
  respondedAt?: string;
  joinProbability: number;  // AI预测入职概率
  offerContent: string;
}

/** 背调 */
export interface BackgroundCheck {
  id: string;
  candidateId: string;
  status: 'pending' | 'in-progress' | 'completed' | 'alert';
  items: BackgroundCheckItem[];
  overallResult: 'pass' | 'warning' | 'fail';
  completedAt?: string;
}

export interface BackgroundCheckItem {
  category: '学历验真' | '学位验真' | '工作履历' | '股票账户' | '征信记录' | '竞业限制';
  status: 'pending' | 'verified' | 'warning' | 'failed';
  detail: string;
  source: string;
}

/** 入职待办 */
export interface OnboardingTask {
  id: string;
  candidateId: string;
  title: string;
  category: '信息补充' | '资料提交' | '设备准备' | '培训安排' | '团队介绍';
  status: 'pending' | 'in-progress' | 'completed';
  dueDate: string;
  description: string;
}

/** 培养目标 */
export interface ProbationGoal {
  id: string;
  candidateId: string;
  title: string;
  description: string;
  milestone: string;
  progress: number;
  dueDate: string;
  mentorComment?: string;
}

/** 课程推荐 */
export interface CourseRecommendation {
  id: string;
  title: string;
  category: string;
  duration: string;
  difficulty: '入门' | '进阶' | '高级';
  matchScore: number;
  reason: string;
  platform: string;
  coverImage: string;
}

/** 聊天消息 */
export interface ChatMessage {
  id: string;
  role: 'ai' | 'user' | 'system';
  content: string;
  timestamp: string;
  typing?: boolean;
}

// ============================================================
// 全流程运营看板
// ============================================================

/** 任务完成方式 */
export type CompletionMethod =
  | 'ai-auto'            // AI智能体自动执行
  | 'ai-human-confirm'   // AI智能体+人工确认
  | 'ai-human-correction' // AI智能体+人工修正
  | 'human-manual';       // 人工任务执行

/** 候选人在某个阶段的完成记录 */
export interface StageCompletion {
  stage: PipelineStage;
  method: CompletionMethod;
  completedAt?: string;
  aiAgentName?: string;
  note?: string;
}

/** 候选人全流程旅程 */
export interface CandidateJourney {
  candidateId: string;
  candidateName: string;
  avatar: string;
  appliedJob: string;
  currentStage: PipelineStage;
  completedStages: StageCompletion[];
}

// ============================================================
// AI智能体运营看板
// ============================================================

/** AI智能体信息 */
export interface AiAgent {
  id: string;
  name: string;
  icon: string;
  stage: PipelineStage;
  description: string;
  status: 'online' | 'busy' | 'idle' | 'offline';
}

/** 智能体每日任务记录 */
export interface AgentDailyTask {
  id: string;
  agentId: string;
  taskType: string;
  candidateName: string;
  startedAt: string;
  completedAt: string;
  result: 'correct' | 'corrected' | 'rejected';
  correctionNote?: string;
  tokensUsed: number;
}

/** 智能体月度统计 */
export interface AgentMonthlyStats {
  agentId: string;
  month: string;            // e.g. '2026-03'
  totalTasks: number;
  correctTasks: number;
  correctedTasks: number;
  rejectedTasks: number;
  accuracy: number;          // 百分比
  timeSavedHours: number;    // 节约人工时效（小时）
  tokensUsed: number;
  estimatedCost: number;     // 预计费用（元）
}
