'use client';

import { useState, useMemo, useRef, useCallback } from 'react';
import { X } from 'lucide-react';

/* ════════════════════════════════════════════
   模拟数据
   ════════════════════════════════════════════ */
const EMPLOYEE = { id: '90001', name: '张三', role: '后端开发工程师', dept: '技术研发部' };

interface Course {
  name: string;
  duration: string;
  fit: string;
  reason: string;
}

function buildCourses(role: string): Course[] {
  const common: Course[] = [
    { name: '公司业务全景与组织协同', duration: '45分钟', fit: '基础必修', reason: '快速理解公司核心业务、组织分工与跨团队协作方式。' },
    { name: '招聘业务流程与关键系统操作', duration: '60分钟', fit: '业务必修', reason: '帮助你建立从岗位发布到入职转化的完整流程认知。' },
  ];
  const roleMap: Record<string, Course> = {
    '后端开发工程师': { name: '招聘平台服务架构与核心链路', duration: '50分钟', fit: '岗位强化', reason: '围绕服务治理、稳定性和核心接口链路，贴合后端岗位实战。' },
    '前端开发工程师': { name: '招聘中台前端交互与工程规范', duration: '50分钟', fit: '岗位强化', reason: '聚焦中台页面交互、组件复用与前端工程质量标准。' },
    '算法工程师': { name: '人岗匹配策略与模型评估入门', duration: '55分钟', fit: '岗位强化', reason: '帮助理解匹配策略、评估指标与模型迭代闭环。' },
    '数据分析师': { name: '招聘漏斗分析与数据看板实践', duration: '52分钟', fit: '岗位强化', reason: '覆盖漏斗指标定义、归因分析与业务复盘方法。' },
    '产品经理': { name: '招聘产品路线与需求优先级方法', duration: '48分钟', fit: '岗位强化', reason: '结合招聘场景讲解需求评估、排期和价值验证。' },
  };
  return [...common, roleMap[role] ?? roleMap['后端开发工程师']];
}

const POLICY_EMBED_COURSES: Course[] = [
  { name: '员工手册与劳动纪律要点', duration: '30分钟', fit: '制度必修', reason: '掌握用工基本纪律、考勤请假与违纪处理原则，与员工手册及用工合规要求一致。' },
  { name: '信息安全与保密义务入门', duration: '40分钟', fit: '合规必修', reason: '理解终端安全、数据分级与保密义务，与入职保密承诺及信息安全制度对齐。' },
];

interface TimelineTask {
  key: string;
  icon: string;
  title: string;
  timeTag: string;
  description: string;
  defaultDone?: boolean;
  actions: { label: string; anchor?: string }[];
  embedCourses?: { heading: string; courses: Course[] };
}

/* ════════════════════════════════════════════
   AI 助手知识库
   ════════════════════════════════════════════ */
interface KBItem {
  keywords: string[];
  answer: string;
}

const ASSIST_KB: KBItem[] = [
  {
    keywords: ['入职', '材料', '证件', '证书', '学历', '学位', '体检', '背景调查', '照片', '身份证', '档案', '信息采集'],
    answer: '入职材料（常见清单，具体以公司入职须知为准）：\n- 身份证件/照片\n- 学历与学位证明（如毕业证、学位证、学信网验证等）\n- 与岗位相关的资格/证书（如适用）\n- 个人信息与表单（用于系统建档与发放）\n- 体检相关要求/预约（以通知为准）\n\n建议你：提前把"证件原件/复印件 + 电子扫描件"准备齐，能显著减少入职延误。',
  },
  {
    keywords: ['试用期', '转正', '考核', '绩效', '目标', '多久', '考察'],
    answer: '试用期与转正一般遵循公司制度与劳动合同约定，常见做法是：\n- 设定阶段目标（如前期适应、关键项目交付、协作与能力指标）\n- 主管在阶段节点进行评估与反馈\n- 满足要求后进入/完成转正评审\n\n建议你把"目标-里程碑-验收标准"整理出来，这样沟通会更高效。',
  },
  {
    keywords: ['考勤', '请假', '迟到', '早退', '旷工', '打卡', '加班', '缺勤', '病假', '事假'],
    answer: '考勤/请假/迟到旷工通常以公司考勤制度为准，通用原则：\n- 请假一般需要提前申请，紧急情况按时效补报\n- 迟到/早退需按规定说明并遵循补签/审批流程\n- 旷工可能影响绩效与纪律记录\n- 加班/调休通常需要审批与工时记录\n\n如果你能描述你的具体场景（例如：时间、原因、所属类型），我可以帮你整理更贴近的合规沟通要点。',
  },
  {
    keywords: ['保密', '竞业', '竞业限制', '知识产权', '保密协议', '数据', '文档', '合规'],
    answer: '公司通常要求员工遵守保密义务与合规要求（例如：保密协议、数据与知识产权管理等）。\n关于"竞业限制"等条款，一般以劳动合同/补充协议约定为准。\n\n建议你：如果你关心细则（适用范围/期限/补偿方式），把问题具体化后提给 HRBP 或查阅正式制度文件，避免理解偏差。',
  },
  {
    keywords: ['制度', '规章制度', '手册', '哪里查看', '学习', '培训', '入职须知'],
    answer: '制度学习建议：\n1) 先看"入职须知/制度手册"的目录，按优先级抓重点\n2) 结合你当前阶段（入职首周/试用期）做主题式学习\n3) 对不理解的条款做问题清单，带去和主管/HR 沟通确认\n\n提示：最终以公司正式制度与通知为准。',
  },
];

const SUGGESTION_CHIPS = [
  { label: '入职材料', q: '入职需要准备哪些材料？' },
  { label: '试用期/转正', q: '试用期一般多久？转正怎么考核？' },
  { label: '考勤请假', q: '考勤/请假/迟到旷工的基本规则是什么？' },
  { label: '保密/竞业', q: '公司有哪些保密与竞业要求？' },
  { label: '制度查询', q: '规章制度在哪里查看？学习建议是什么？' },
];

function getKBAnswer(question: string): string {
  const q = question.toLowerCase().replace(/\s+/g, '');
  for (const item of ASSIST_KB) {
    if (item.keywords.some(k => q.includes(k))) return item.answer;
  }
  return '我可以先帮你回答新员工常见制度类问题（入职材料、试用期/转正、考勤请假、保密/竞业等）。\n\n为了更准确，请你补充：\n- 你关心的主题（例如：考勤/入职材料/转正/保密）\n- 你的具体场景（如入职时间、岗位类型）\n\n提示：最终以公司正式制度与通知为准。';
}

/* ════════════════════════════════════════════
   课程卡片组件
   ════════════════════════════════════════════ */
function CourseCard({ c }: { c: Course }) {
  return (
    <div className="border border-indigo-100 rounded-xl bg-gradient-to-b from-white to-blue-50/40 p-3">
      <div className="flex items-center justify-between gap-2 mb-1.5">
        <h3 className="text-[13px] font-bold text-slate-900 leading-snug">{c.name}</h3>
        <span className="shrink-0 text-[11px] font-semibold text-indigo-700 border border-indigo-200 bg-indigo-50 rounded-full px-2 py-0.5">{c.fit}</span>
      </div>
      <p className="text-xs text-slate-600 leading-relaxed"><strong>建议时长：</strong>{c.duration}</p>
      <p className="text-xs text-slate-600 leading-relaxed"><strong>AI推荐理由：</strong>{c.reason}</p>
      <button className="mt-2 text-xs font-semibold text-blue-800 border border-blue-200 bg-blue-50 rounded-lg px-2.5 py-1 hover:bg-blue-100">查看课程</button>
    </div>
  );
}

/* ════════════════════════════════════════════
   页面组件
   ════════════════════════════════════════════ */
export default function OnboardingPage() {
  /* ── 课程数据 ── */
  const courses = useMemo(() => buildCourses(EMPLOYEE.role), []);
  const proSupplement: Course = { name: '高效会议与汇报表达', duration: '35分钟', fit: '职业能力', reason: '与岗位专业课形成互补，提升任务推进与阶段性汇报质量。' };

  /* ── 时间轴任务（依赖 courses） ── */
  const TIMELINE_TASKS: TimelineTask[] = useMemo(() => [
    {
      key: 'neo-0', icon: '🏢', title: '园区环境与设施指引', timeTag: 'T+1', defaultDone: true,
      description: '依据行政与园区安全管理要求配置，帮助新员工掌握办公区通行、会议室与公共设施使用规范，降低环境与安全风险，属于入职当周应完成的基础适应环节。',
      actions: [{ label: '查看' }],
    },
    {
      key: 'neo-1', icon: '📖', title: '规章制度学习', timeTag: 'T+1', defaultDone: true,
      description: '依据合规、内控与信息安全管理要求，新员工须完成公司制度学习与云端学院必修内容，形成可追溯的学习记录，作为后续岗位授权与业务开展的前置条件。',
      actions: [{ label: '查看' }],
      embedCourses: { heading: '云端学院 · 本环节推荐', courses: POLICY_EMBED_COURSES },
    },
    {
      key: 'neo-2', icon: '📋', title: '新员工信息采集', timeTag: 'T+1', defaultDone: true,
      description: '依据人事档案、用工合规与发薪报税管理要求，集中采集身份、联系、紧急联系人、银行卡等关键信息，用于开通权限、签署合同与薪酬发放，须保证真实、完整、及时。',
      actions: [{ label: '查看' }],
    },
    {
      key: 'neo-3', icon: '🌱', title: '新员工培养', timeTag: 'T+1',
      description: '依据公司新员工培养制度，在入职初期完成应知应会、岗位资格申请与云端学院必修通用课程，形成「制度—资格—学习」闭环，为后续专业培养与试用期考核打底。',
      actions: [{ label: '应知应会' }, { label: '资格申请' }, { label: '必修通用课程', anchor: 'coursePanelAnchor' }],
      embedCourses: { heading: '云端学院 · 必修通用推荐（与上方学院区联动）', courses: courses.slice(0, 2) },
    },
    {
      key: 'neo-4', icon: '🎯', title: '试用期目标制定', timeTag: 'T+3',
      description: '依据试用期管理与绩效制度，新人须在入职后短期内与导师、上级对齐试用期目标与关键成果，经审批后生效，作为阶段复盘与转正评审的重要依据。',
      actions: [{ label: '制定试用期目标' }],
    },
    {
      key: 'neo-5', icon: '📚', title: '专业课程推荐', timeTag: 'T+5',
      description: '依据部门能力模型与任职资格标准，在通用必修之外推送差异化专业课程，与岗位任务相匹配，支撑业务上手与胜任力提升（具体内容因部门而异）。',
      actions: [{ label: '专业课程', anchor: 'coursePanelAnchor' }],
      embedCourses: { heading: '云端学院 · 岗位专业推荐（随员工岗位变化）', courses: [courses[2], proSupplement] },
    },
    {
      key: 'neo-6', icon: '📅', title: '入司30日成长历程回顾', timeTag: 'T+30',
      description: '依据阶段性培养计划，在入司满月节点同步课程完成度与实践任务进展，支持新人与导师对照目标进行第一次系统复盘，及时纠偏。',
      actions: [{ label: '云端学院课程完成情况', anchor: 'coursePanelAnchor' }, { label: '实践成长任务追踪' }],
    },
    {
      key: 'neo-7', icon: '📈', title: '入司60日成长历程回顾', timeTag: 'T+60',
      description: '在第二成长节点延续阶段复盘机制，对照部门差异化实践任务与课程要求，检验胜任力发展曲线，为后续冲刺与转正准备提供数据与事实依据。',
      actions: [{ label: '云端学院课程完成情况', anchor: 'coursePanelAnchor' }, { label: '实践成长任务追踪' }],
    },
    {
      key: 'neo-8', icon: '🏅', title: '入司90日成长历程回顾', timeTag: 'T+90',
      description: '在试用期中段关键节点，汇总课程与实践完成情况，强化对岗位产出与行为表现的共识，为试用期末综合评议积累材料。',
      actions: [{ label: '云端学院课程完成情况', anchor: 'coursePanelAnchor' }, { label: '实践成长任务追踪' }],
    },
    {
      key: 'neo-9', icon: '✅', title: '入司150日成长历程回顾', timeTag: 'T+150',
      description: '依据试用期收尾与转正管理制度，在约定节点汇总试用期完成情况、课程与实践轨迹，进入导师评价、上级审批与 HRBP 办结等综合流程，形成闭环。',
      actions: [{ label: '试用期完成情况反馈' }, { label: '云端学院课程完成情况', anchor: 'coursePanelAnchor' }, { label: '实践成长任务追踪' }],
    },
  ], [courses, proSupplement]);

  /* ── 完成状态 ── */
  const [doneSet, setDoneSet] = useState<Set<string>>(() => {
    const s = new Set<string>();
    TIMELINE_TASKS.filter(t => t.defaultDone).forEach(t => s.add(t.key));
    return s;
  });

  const doneCount = doneSet.size;

  const toggleDone = (key: string) => {
    setDoneSet(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  /* ── AI 助手面板状态 ── */
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([
    { role: 'bot', text: '你好，我是 AI 新员工助手。\n你可以随时问：入职需要准备什么？试用期怎么考核？考勤请假规则？保密与竞业要求？\n\n为了更贴合你的情况，也可以告诉我你的入职阶段（入职首周/试用期中/转正前）。' },
  ]);
  const [chatInput, setChatInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  }, []);

  const handleAsk = useCallback((question: string) => {
    const q = question.trim();
    if (!q) return;
    setChatMessages(prev => [...prev, { role: 'user', text: q }]);
    setChatInput('');
    // 模拟延迟
    setTimeout(() => {
      const answer = getKBAnswer(q);
      setChatMessages(prev => [...prev, { role: 'bot', text: answer }]);
      scrollToBottom();
    }, 450);
    scrollToBottom();
  }, [scrollToBottom]);

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-purple-600 px-6 py-5 text-white">
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/15 blur-sm" />
        <div className="absolute right-28 -bottom-8 w-28 h-28 rounded-full bg-white/15 blur-sm" />
        <h1 className="relative text-xl font-extrabold mb-1.5">新员工AI助手 · 成长时间轴</h1>
        <p className="relative text-sm opacity-95 max-w-2xl leading-relaxed">
          以 <strong>T</strong> 为员工入职日期，系统在 T+1、T+5、T+30/T+60/T+90、T+150 等节点自动推送信息与任务；每节点含 AI 说明、字段填写与审批链（演示口径）。
        </p>
        <p className="relative text-xs opacity-80 mt-2">成就进度：{doneCount} / {TIMELINE_TASKS.length} 已完成</p>
      </div>

      {/* ── 云端学院 · 课程与完成度 ── */}
      <div id="coursePanelAnchor" className="bg-white border border-border rounded-2xl p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">📚 云端学院 · 课程与完成度</h2>
            <p className="text-xs text-muted mt-1">当前员工：{EMPLOYEE.name}。T+1 推送必修通用课；T+5 起按部门推送专业课程（当前示例岗位：{EMPLOYEE.role}）。T+30/T+60/T+90 与 T+150 将同步云端学院完成度（演示）。</p>
          </div>
          <button className="shrink-0 text-xs font-semibold text-blue-800 border border-indigo-200 bg-indigo-50 rounded-lg px-3 py-1.5 hover:bg-indigo-100">进入云端学院</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {courses.map((c, i) => (
            <CourseCard key={i} c={c} />
          ))}
        </div>
      </div>

      {/* ── 新员工培养任务清单 ── */}
      <div className="relative pl-6">
        {/* 竖线 */}
        <div className="absolute left-[15px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-blue-300 to-purple-300" />

        <h2 className="ml-3.5 text-[17px] font-black text-blue-900 tracking-tight mb-1.5">新员工培养任务清单</h2>
        <p className="ml-3.5 text-[13px] text-slate-500 leading-relaxed max-w-3xl mb-3.5">
          <strong>T</strong> 为员工入职日。每张卡片分三行呈现：<strong>①</strong> 图标、标题、推送节点与完成状态；<strong>②</strong> 本环节目的与制度依据说明；<strong>③</strong> 本环节涉及的操作入口。成就进度统计下方 {TIMELINE_TASKS.length} 个节点。
        </p>

        <div className="space-y-3.5">
          {TIMELINE_TASKS.map(task => {
            const done = doneSet.has(task.key);
            return (
              <article
                key={task.key}
                className={`relative ml-3 rounded-2xl border p-4 shadow-sm transition-all ${
                  done
                    ? 'border-blue-300 bg-gradient-to-b from-white to-blue-50/60 shadow-blue-100/60'
                    : 'border-border bg-white'
                }`}
              >
                {/* 时间轴圆点 */}
                <div className={`absolute -left-[27px] top-5 w-3 h-3 rounded-full border-[3px] ${
                  done ? 'border-blue-600 bg-white shadow-[0_0_0_3px_#dbeafe]' : 'border-indigo-400 bg-white shadow-[0_0_0_3px_#eef2ff]'
                }`} />

                {/* R1: 图标 + 标题 + 时间标签 + 状态 */}
                <div className="flex items-start justify-between gap-3 flex-wrap mb-2.5">
                  <div className="flex items-center gap-2.5 min-w-0 flex-1">
                    <span className={`w-[34px] h-[34px] shrink-0 rounded-xl flex items-center justify-center text-lg border ${
                      done ? 'bg-blue-50 border-blue-300' : 'bg-indigo-50 border-indigo-200'
                    }`}>{task.icon}</span>
                    <h2 className="text-[17px] font-bold text-slate-900 leading-tight">{task.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                    <span className="text-xs font-semibold text-indigo-800 bg-purple-50 border border-purple-200 rounded-full px-2.5 py-0.5">{task.timeTag}</span>
                    <span className={`text-xs font-extrabold rounded-full px-2.5 py-0.5 border ${
                      done
                        ? 'text-blue-800 bg-gradient-to-r from-blue-100 to-blue-200 border-blue-300 shadow-sm'
                        : 'text-orange-800 bg-orange-50 border-orange-300'
                    }`}>
                      {done ? '已完成' : '未完成'}
                    </span>
                  </div>
                </div>

                {/* R2: 说明 */}
                <p className="text-[13px] text-slate-600 leading-relaxed">{task.description}</p>

                {/* 嵌入课程推荐 */}
                {task.embedCourses && (
                  <div className="mt-3 pt-3 border-t border-dashed border-blue-200">
                    <h4 className="text-xs font-black text-indigo-700 tracking-wide mb-2">{task.embedCourses.heading}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {task.embedCourses.courses.map((ec, i) => (
                        <CourseCard key={i} c={ec} />
                      ))}
                    </div>
                  </div>
                )}

                {/* R3: 操作 */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  <div className="flex items-center gap-2 flex-wrap flex-1">
                    {task.actions.map((a, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          if (a.anchor) document.getElementById(a.anchor)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="text-xs font-semibold text-blue-800 border border-indigo-200 bg-indigo-50 rounded-lg px-3 py-1.5 hover:bg-indigo-100"
                      >
                        {a.label}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => toggleDone(task.key)}
                    className={`shrink-0 text-xs font-semibold rounded-lg px-3 py-1.5 border ${
                      done
                        ? 'text-blue-800 border-blue-300 bg-blue-50 hover:bg-blue-100'
                        : 'text-slate-600 border-border bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    {done ? '取消完成' : '标记完成'}
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* ── 浮动 AI 助手按钮 ── */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed right-5 top-[118px] z-40 inline-flex items-center gap-2 px-3 py-2.5 rounded-full bg-white/95 backdrop-blur border border-indigo-200 shadow-lg text-sm font-black text-blue-900 hover:shadow-xl transition"
        >
          🤖 AI助手
        </button>
      )}

      {/* ── AI 助手侧边抽屉 ── */}
      {chatOpen && (
        <aside className="fixed right-2.5 top-[118px] z-50 w-[340px] max-h-[calc(100vh-150px)] flex flex-col bg-white border border-border rounded-2xl shadow-xl overflow-hidden animate-slide-in-right">
          {/* Head */}
          <div className="px-3.5 py-3 bg-gradient-to-br from-blue-700 to-purple-600 text-white flex justify-between items-start gap-3">
            <div>
              <div className="text-[15px] font-black leading-tight">🤖 AI新员工助手</div>
              <div className="text-xs font-bold mt-1.5 opacity-90">随时解答规章制度/入职须知等常见问题</div>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              className="shrink-0 text-xs font-black text-white border border-white/35 bg-white/15 rounded-lg px-2.5 py-1.5 hover:bg-white/25"
            >
              关闭
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-blue-50/30">
            {chatMessages.map((msg, i) => (
              <div
                key={i}
                className={`rounded-xl px-2.5 py-2 text-[13px] leading-relaxed border whitespace-pre-wrap break-words ${
                  msg.role === 'user'
                    ? 'ml-auto max-w-[90%] bg-indigo-50 border-indigo-200 font-extrabold'
                    : 'max-w-[95%] bg-white border-border'
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion Chips */}
          <div className="px-3 pt-2.5 pb-0 flex gap-2 flex-wrap">
            {SUGGESTION_CHIPS.map((chip, i) => (
              <button
                key={i}
                onClick={() => handleAsk(chip.q)}
                className="text-xs font-black text-slate-700 border border-border bg-white rounded-full px-2.5 py-1.5 hover:bg-slate-50 active:scale-[0.98] transition-transform"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-white flex gap-2 items-center">
            <input
              type="text"
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleAsk(chatInput); }}
              placeholder="输入问题，例如：入职需要提交哪些证件？"
              className="flex-1 border border-border rounded-lg px-2.5 py-2 text-[13px] outline-none focus:ring-2 focus:ring-indigo-200 bg-white"
            />
            <button
              onClick={() => handleAsk(chatInput)}
              disabled={!chatInput.trim()}
              className="shrink-0 text-[13px] font-black text-blue-800 border border-indigo-200 bg-indigo-50 rounded-lg px-3 py-2 hover:bg-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              发送
            </button>
          </div>
        </aside>
      )}
    </div>
  );
}
