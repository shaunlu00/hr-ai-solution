'use client';

import { useState } from 'react';
import AiChatPanel from '@/components/ai/AiChatPanel';
import {
  CheckCircle2, Clock, AlertCircle, GraduationCap, Briefcase, Brain,
  Star, TrendingUp, Sparkles, Award, Target, Lightbulb, Shield,
  ThumbsUp, ThumbsDown, MessageSquare, ChevronRight,
} from 'lucide-react';

/* ================================================================
   Page-local approval candidates with comprehensive AI summaries
   ================================================================ */
interface ApprovalCandidate {
  id: string; name: string; avatar: string; gender: string; age: number;
  position: string; department: string; level: string; salary: string; aiScore: number;
  education: { degree: string; school: string; major: string; year: number };
  currentCompany: string; currentTitle: string; experience: number; skills: string[];
  educationSummary: string;
  workHistory: { company: string; title: string; period: string; highlights: string }[];
  aiInterview: {
    score: number; summary: string;
    dimensions: { name: string; score: number }[];
    emotion: { confidence: number; enthusiasm: number; honesty: number };
  };
  humanInterview: { score: number; interviewer: string; summary: string };
  strengths: string[];
  developmentSuggestions: string[];
  approvalFlow: { name: string; approver: string; status: string; date: string; comment: string }[];
}

const APPROVAL_CANDIDATES: ApprovalCandidate[] = [
  {
    id: 'ap-001', name: '孙悦然', avatar: '👩‍🏫', gender: '女', age: 31,
    position: '信息技术部 · 产品经理', department: '产品设计部', level: ' VP1', salary: '42K', aiScore: 90,
    education: { degree: '本科', school: '武汉大学', major: '信息管理与信息系统', year: 2017 },
    currentCompany: '京东', currentTitle: '产品专家', experience: 9,
    skills: ['产品战略', 'B端产品', '用户增长', '商业化', 'AI产品'],
    educationSummary: '武汉大学本科毕业，信息管理与信息系统专业，具备扎实的数据分析与系统设计基础。在校期间获国家奖学金，参与多个信息系统设计课题。',
    workHistory: [
      { company: '京东', title: '产品专家', period: '2022 - 至今', highlights: '负责京东AI产品线，从0到1打造智能客服产品，DAU突破500万。主导商业化变现策略，年营收增长40%。' },
      { company: '美团', title: '高级产品经理', period: '2019 - 2022', highlights: '负责配送B端产品，优化骑手调度系统，配送效率提升15%。管理5人产品团队。' },
      { company: '小红书', title: '产品经理', period: '2017 - 2019', highlights: '负责社区内容推荐产品，参与推荐算法产品化，用户留存提升8%。' },
    ],
    aiInterview: {
      score: 88,
      summary: '候选人在AI面试中表现成熟稳重，产品思维缜密。能够清晰阐述产品方法论和落地经验，对AI产品有深刻理解。',
      dimensions: [{ name: '产品思维', score: 92 }, { name: '数据驱动', score: 88 }, { name: '沟通表达', score: 90 }, { name: '战略视野', score: 85 }, { name: '团队协作', score: 87 }],
      emotion: { confidence: 90, enthusiasm: 82, honesty: 95 },
    },
    humanInterview: { score: 91, interviewer: '张总监', summary: '产品经验非常丰富，AI产品从0到1完整经验。商业化思维成熟，能将技术转化为商业价值。沟通能力强，逻辑清晰。' },
    strengths: ['9年产品经验，行业资深', '完整的AI产品从0到1经验', '出色的商业化能力，年营收增长40%', '跨团队协作经验丰富', '数据驱动决策习惯良好'],
    developmentSuggestions: ['建议加强技术深度理解，特别是大模型应用', '参与公司技术分享会，增进与技术团队默契', '3个月内完成公司业务全景学习', '可考虑MBA进修提升管理理论'],
    approvalFlow: [
      { name: 'HR初审', approver: '王HR', status: 'approved', date: '03-28', comment: '产品经验丰富，AI方向匹配度高' },
      { name: '部门负责人', approver: '张总监', status: 'approved', date: '03-29', comment: '面试表现优秀，推荐入职' },
      { name: 'VP审批', approver: '陈VP', status: 'pending', date: '-', comment: '' },
    ],
  },
  {
    id: 'ap-002', name: '李思颖', avatar: '👩‍💻', gender: '女', age: 26,
    position: 'AI平台部 · 算法工程师', department: 'AI平台部', level: 'SA3', salary: '55K', aiScore: 95,
    education: { degree: '硕士', school: '清华大学', major: '人工智能', year: 2023 },
    currentCompany: '百度', currentTitle: '算法工程师', experience: 3,
    skills: ['Python', 'PyTorch', 'NLP', 'Transformer', 'LLM'],
    educationSummary: '清华大学人工智能专业硕士，师从知名NLP教授。一作发表ACL、EMNLP顶会论文各1篇，研究预训练语言模型高效微调。本科毕业于浙江大学计算机科学专业。',
    workHistory: [
      { company: '百度', title: '算法工程师', period: '2023 - 至今', highlights: 'NLP团队核心成员，主导大模型Fine-tuning项目，模型效果提升23%。参与文心大模型性能优化。' },
      { company: '微软亚洲研究院', title: '研究实习生', period: '2022 - 2023', highlights: '参与多语言预训练模型研究，贡献被整合到M-BERT改进版本中。' },
    ],
    aiInterview: {
      score: 92,
      summary: '技术基础极为扎实，对NLP前沿技术有深刻理解。能够将学术研究成果落地到工程实践中，综合能力很强。',
      dimensions: [{ name: '专业知识', score: 96 }, { name: '算法能力', score: 94 }, { name: '工程实践', score: 88 }, { name: '学习能力', score: 95 }, { name: '沟通表达', score: 85 }],
      emotion: { confidence: 90, enthusiasm: 92, honesty: 95 },
    },
    humanInterview: { score: 93, interviewer: '刘首席科学家', summary: '学术能力出众，顶会论文质量很高。工程经验扎实。工作年限虽短但成长速度极快，建议P7定级。' },
    strengths: ['清华AI硕士，学术背景顶尖', 'ACL/EMNLP顶会论文一作', '大模型微调效果提升23%', '微软亚研院研究经历', '学习速度极快，成长潜力巨大'],
    developmentSuggestions: ['多参与跨团队合作项目，提升协作能力', '可担任组内技术分享负责人', '半年内主导一个完整算法落地项目', '加强产品思维，了解业务场景'],
    approvalFlow: [
      { name: 'HR初审', approver: '王HR', status: 'approved', date: '03-29', comment: '学术背景优秀，技术能力突出' },
      { name: '部门负责人', approver: '刘首席', status: 'approved', date: '03-29', comment: '强烈推荐，难得的NLP人才' },
      { name: 'VP审批', approver: '陈VP', status: 'approved', date: '03-30', comment: '同意录用' },
      { name: 'CEO审批', approver: '张CEO', status: 'pending', date: '-', comment: '' },
    ],
  },
  {
    id: 'ap-003', name: '张明远', avatar: '👨‍💻', gender: '男', age: 28,
    position: '计划财务部 · 高级前端工程师', department: '技术研发部', level: 'VP2', salary: '45K', aiScore: 92,
    education: { degree: '硕士', school: '北京大学', major: '计算机科学与技术', year: 2022 },
    currentCompany: '字节跳动', currentTitle: '前端开发工程师', experience: 5,
    skills: ['React', 'TypeScript', 'Node.js', 'Webpack', 'GraphQL'],
    educationSummary: '北京大学计算机科学与技术硕士，本科就读于北京航空航天大学软件工程专业。参与多个大规模分布式系统研究项目，获研究生国家奖学金。',
    workHistory: [
      { company: '字节跳动', title: '前端开发工程师', period: '2022 - 至今', highlights: '主导抖音创作者平台前端架构升级，微前端方案拆分为6个子应用。首屏加载优化40%，支撑千万级DAU。' },
      { company: '美团', title: '前端开发', period: '2020 - 2022', highlights: '负责外卖商家端B端产品前端开发，主导React技术栈迁移，开发效率提升30%。' },
    ],
    aiInterview: {
      score: 87,
      summary: '技术能力扎实，项目经验丰富，对前端架构设计有深入理解。性能优化方面展现了很强的系统思维。',
      dimensions: [{ name: '技术深度', score: 90 }, { name: '架构设计', score: 88 }, { name: '性能优化', score: 92 }, { name: '团队协作', score: 82 }, { name: '沟通表达', score: 85 }],
      emotion: { confidence: 88, enthusiasm: 85, honesty: 92 },
    },
    humanInterview: { score: 89, interviewer: '赵技术总监', summary: '前端架构和性能优化经验丰富。字节微前端实践非常有价值。代码质量意识强，工程素养好。' },
    strengths: ['北大硕士，计算机科班出身', '字节跳动5年大厂经验', '微前端架构实践经验丰富', '首屏性能优化40%实战成果', 'React技术栈专精，有开源贡献'],
    developmentSuggestions: ['提升全栈能力，了解后端服务架构', '主导团队前端工程化标准建设', '参与跨部门技术委员会', '加强团队管理能力，为晋升做准备'],
    approvalFlow: [
      { name: 'HR初审', approver: '王HR', status: 'approved', date: '03-28', comment: '技术背景扎实，大厂经验丰富' },
      { name: '部门负责人', approver: '赵总监', status: 'approved', date: '03-29', comment: '架构能力突出，团队急需' },
      { name: 'VP审批', approver: '陈VP', status: 'pending', date: '-', comment: '' },
    ],
  },
  {
    id: 'ap-004', name: '刘子轩', avatar: '👨‍🔬', gender: '男', age: 32,
    position: '人力资源部 · 高级算法工程师', department: 'AI平台部', level: 'D1', salary: '62K', aiScore: 91,
    education: { degree: '博士', school: '中国科学院', major: '模式识别与智能系统', year: 2020 },
    currentCompany: '华为', currentTitle: '高级算法工程师', experience: 6,
    skills: ['Python', 'TensorFlow', 'CV', '目标检测', '模型部署'],
    educationSummary: '中国科学院模式识别与智能系统博士，师从著名CV专家。博士期间发表CVPR论文2篇、ICCV 1篇、IEEE TPAMI 1篇。本科毕业于中国科学技术大学自动化专业。',
    workHistory: [
      { company: '华为', title: '高级算法工程师', period: '2020 - 至今', highlights: '终端视觉算法团队技术专家，主导手机AI摄影算法优化，端侧模型压缩实现2倍加速。获3项AI相关专利。' },
      { company: '商汤科技', title: '算法实习生', period: '2019 - 2020', highlights: '参与自动驾驶感知算法研发，负责行人检测模块优化，检测精度提升5%。' },
    ],
    aiInterview: {
      score: 90,
      summary: '在计算机视觉领域具备深厚学术积累和工业界实践经验。对模型优化和部署有独到见解，能高效将论文成果转化为产品能力。',
      dimensions: [{ name: '学术能力', score: 96 }, { name: 'CV算法', score: 94 }, { name: '工程落地', score: 88 }, { name: '创新思维', score: 90 }, { name: '沟通表达', score: 82 }],
      emotion: { confidence: 85, enthusiasm: 88, honesty: 94 },
    },
    humanInterview: { score: 90, interviewer: '刘首席科学家', summary: '学术实力非常强，CVPR/ICCV论文质量高。华为工程实践扎实，特别是端侧模型优化方面。建议P8定级。' },
    strengths: ['中科院博士，学术实力雄厚', 'CVPR/ICCV/TPAMI多篇顶刊顶会', '3项AI专利，创新能力强', '端侧模型2倍加速实战成果', '学术+工程双轮驱动'],
    developmentSuggestions: ['拓展NLP/多模态方向，拓宽技术面', '可担任AI实验室技术负责人角色', '主导公司AI技术品牌建设', '加强团队管理和人才培养能力'],
    approvalFlow: [
      { name: 'HR初审', approver: '王HR', status: 'approved', date: '03-29', comment: '学术背景顶尖，华为技术专家' },
      { name: '部门负责人', approver: '刘首席', status: 'approved', date: '03-30', comment: '高端人才，强烈推荐P8' },
      { name: 'VP审批', approver: '陈VP', status: 'approved', date: '03-30', comment: '同意P8定级和薪资方案' },
      { name: 'CEO审批', approver: '张CEO', status: 'pending', date: '-', comment: '' },
    ],
  },
];

/* ================================================================
   Score bar small component
   ================================================================ */
function ScoreBar({ label, score }: { label: string; score: number }) {
  const color = score >= 90 ? 'bg-emerald-500' : score >= 80 ? 'bg-blue-500' : 'bg-amber-500';
  return (
    <div className="flex items-center gap-2 text-[11px]">
      <span className="w-16 text-muted shrink-0">{label}</span>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color} transition-all duration-700`} style={{ width: `${score}%` }} />
      </div>
      <span className="w-7 text-right font-semibold text-foreground">{score}</span>
    </div>
  );
}

/* ================================================================
   Main Page
   ================================================================ */
export default function ApprovalPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = APPROVAL_CANDIDATES[selectedIdx];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* ── 3D Candidate Cards ── */}
      <div className="flex gap-3" style={{ perspective: '1200px' }}>
        {APPROVAL_CANDIDATES.map((c, i) => {
          const isActive = i === selectedIdx;
          return (
            <button
              key={c.id}
              onClick={() => setSelectedIdx(i)}
              className="relative flex-1 rounded-xl border text-left transition-all duration-500 ease-out overflow-hidden"
              style={{
                transform: isActive
                  ? 'translateZ(30px) scale(1.03)'
                  : 'translateZ(-10px) scale(0.97)',
                transformStyle: 'preserve-3d',
                boxShadow: isActive
                  ? '0 20px 40px -12px rgba(59,130,246,0.25), 0 8px 20px -8px rgba(0,0,0,0.1)'
                  : '0 1px 3px rgba(0,0,0,0.06)',
                borderColor: isActive ? 'var(--accent)' : 'var(--border)',
                opacity: isActive ? 1 : 0.75,
                background: isActive
                  ? 'linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #f5f0ff 100%)'
                  : '#ffffff',
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
              )}

              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-xl transition-transform duration-500 ${
                    isActive ? 'scale-110 shadow-md' : ''
                  }`} style={{ background: isActive ? 'linear-gradient(135deg, #dbeafe, #ede9fe)' : '#f1f5f9' }}>
                    {c.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold truncate ${isActive ? 'text-foreground' : 'text-muted'}`}>{c.name}</p>
                    <p className="text-[11px] text-muted truncate">{c.currentCompany} · {c.currentTitle}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] mt-2">
                  <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{c.position}</span>
                  <span className="font-semibold text-foreground">{c.level} · {c.salary}</span>
                </div>            
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Detail Area ── */}
      <div className="grid grid-cols-3 gap-4">
        {/* Left: AI assessment report */}
        <div className="col-span-2 space-y-4">
          {/* Title card */}
          <div className="bg-white rounded-xl border border-border overflow-hidden flex flex-col" style={{ maxHeight: 'calc(100vh - 260px)' }}>
            <div className="px-5 py-3 border-b border-border bg-gradient-to-r from-blue-50/80 to-purple-50/80 flex items-center gap-2 shrink-0">
              <Sparkles className="w-4 h-4 text-accent" />
              <h3 className="text-sm font-semibold text-foreground">AI 综合评估报告</h3>
              <span className="ml-auto text-[10px] text-muted">由审批汇总Agent自动生成</span>
            </div>

            <div className="p-5 space-y-5 overflow-y-auto">
              {/* ── Education ── */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-blue-500" />
                  <h4 className="text-xs font-semibold text-foreground">学历背景</h4>
                </div>
                <div className="ml-6 p-3 rounded-lg bg-slate-50 text-[12px] text-muted leading-relaxed">
                  <p className="font-medium text-foreground mb-1">
                    {selected.education.school} · {selected.education.major} · {selected.education.degree}（{selected.education.year}届）
                  </p>
                  <p>{selected.educationSummary}</p>
                </div>
              </section>

              {/* ── Work History Timeline ── */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-4 h-4 text-indigo-500" />
                  <h4 className="text-xs font-semibold text-foreground">工作经历</h4>
                  <span className="text-[10px] text-muted ml-1">{selected.experience}年经验</span>
                </div>
                <div className="ml-6 space-y-0">
                  {selected.workHistory.map((w, i) => (
                    <div key={i} className="relative pl-5 pb-4 last:pb-0">
                      {/* timeline line */}
                      {i < selected.workHistory.length - 1 && (
                        <div className="absolute left-[7px] top-3 bottom-0 w-px bg-slate-200" />
                      )}
                      <div className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-indigo-400 bg-white" />
                      <div className="p-3 rounded-lg bg-slate-50">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-[12px] font-semibold text-foreground">{w.company} · {w.title}</p>
                          <span className="text-[10px] text-muted">{w.period}</span>
                        </div>
                        <p className="text-[11px] text-muted leading-relaxed">{w.highlights}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* ── AI Interview Report ── */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-4 h-4 text-purple-500" />
                  <h4 className="text-xs font-semibold text-foreground">AI面试测评报告</h4>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 text-[10px] font-semibold">
                    综合得分 {selected.aiInterview.score}
                  </span>
                </div>
                <div className="ml-6 space-y-3">
                  <p className="text-[11px] text-muted leading-relaxed p-3 rounded-lg bg-purple-50/50 border border-purple-100/50">
                    {selected.aiInterview.summary}
                  </p>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 p-3 rounded-lg bg-slate-50">
                    {selected.aiInterview.dimensions.map((d) => (
                      <ScoreBar key={d.name} label={d.name} score={d.score} />
                    ))}
                  </div>
                  {/* Emotion */}
                  <div className="flex items-center gap-4 text-[10px] text-muted">
                    <span>😊 自信度 <b className="text-foreground">{selected.aiInterview.emotion.confidence}%</b></span>
                    <span>🔥 热情度 <b className="text-foreground">{selected.aiInterview.emotion.enthusiasm}%</b></span>
                    <span>🤝 真诚度 <b className="text-foreground">{selected.aiInterview.emotion.honesty}%</b></span>
                  </div>
                </div>
              </section>

              {/* ── Human Interview ── */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-teal-500" />
                  <h4 className="text-xs font-semibold text-foreground">人工面试评价</h4>
                  <span className="ml-auto px-2 py-0.5 rounded-full bg-teal-50 text-teal-600 text-[10px] font-semibold">
                    面试官评分 {selected.humanInterview.score}
                  </span>
                </div>
                <div className="ml-6 p-3 rounded-lg bg-teal-50/50 border border-teal-100/50">
                  <p className="text-[10px] text-muted mb-1">面试官：{selected.humanInterview.interviewer}</p>
                  <p className="text-[11px] text-muted leading-relaxed">{selected.humanInterview.summary}</p>
                </div>
              </section>

              {/* ── Strengths ── */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-semibold text-foreground">候选人加分项</h4>
                </div>
                <div className="ml-6 flex flex-wrap gap-2">
                  {selected.strengths.map((s, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[11px] border border-amber-100">
                      <Award className="w-3 h-3" />
                      {s}
                    </span>
                  ))}
                </div>
              </section>

              {/* ── Development Suggestions ── */}
              <section>
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-4 h-4 text-orange-500" />
                  <h4 className="text-xs font-semibold text-foreground">入职后培养建议</h4>
                </div>
                <div className="ml-6 grid grid-cols-2 gap-2">
                  {selected.developmentSuggestions.map((s, i) => (
                    <div key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-orange-50/50 border border-orange-100/50">
                      <Target className="w-3 h-3 text-orange-400 mt-0.5 shrink-0" />
                      <span className="text-[11px] text-muted leading-relaxed">{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        <div>
        {/* Right: AI Chat */}
        <AiChatPanel
          title="审批助手"
          placeholder="询问候选人详情..."
          initialMessages={[
            {
              id: '1', role: 'ai',
              content: `我已整理好${selected.name}的审批材料。AI综合评分${selected.aiScore}分，建议级别${selected.level}，建议薪资${selected.salary}。${selected.aiInterview.summary} 需要我详细说明哪个方面？`,
              timestamp: '10:00',
            },
          ]}
        />
        {/* ── Minimized Approval Flow ── */}
          <div className="bg-white rounded-xl border border-border p-3 mt-4">
            {/* Action buttons */}
            <div className="flex items-center gap-4 mt-1 ">
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-500 text-white text-xs font-medium hover:bg-emerald-600 transition-colors shadow-sm">
                <ThumbsUp className="w-3.5 h-3.5" /> 审批通过
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-red-500 text-xs font-medium border border-red-200 hover:bg-red-50 transition-colors">
                <ThumbsDown className="w-3.5 h-3.5" /> 驳回
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
