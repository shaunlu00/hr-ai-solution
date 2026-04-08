'use client';

import { useState, useMemo } from 'react';
import AiChatPanel from '@/components/ai/AiChatPanel';
import { MessageCircle, X } from 'lucide-react';

/* ════════════════════════════════════════════
   模拟数据
   ════════════════════════════════════════════ */
const EMPLOYEE = { id: '90001', name: '张三', role: '后端开发工程师', dept: '技术研发部' };

interface TimelineTask {
  key: string;
  icon: string;
  title: string;
  timeTag: string;
  aiGuide: string;
  goal: string;
  illus: string;
  defaultDone?: boolean;
}

const TIMELINE_TASKS: TimelineTask[] = [
  {
    key: 'onboarding-info',
    icon: '🧾',
    title: '入职信息采集',
    timeTag: 'D+1 推送',
    aiGuide: 'AI指导：自动提示需补齐的入职基础信息与材料清单。',
    goal: '确保入职资料完整、可追溯、可审核。',
    illus: '证件、表单、上传流程引导示意图。',
    defaultDone: true,
  },
  {
    key: 'probation-goal',
    icon: '🎯',
    title: '试用期目标制定',
    timeTag: '入职后前两周',
    aiGuide: 'AI指导：结合岗位JD与员工角色，生成30/60/90天参考目标。',
    goal: '明确阶段产出，提升融入与成长效率。',
    illus: '目标看板、里程碑进度、团队协作场景。',
    defaultDone: true,
  },
  {
    key: 'policy-learning',
    icon: '📘',
    title: '公司规章制度熟悉',
    timeTag: '入职首周',
    aiGuide: 'AI指导：按主题梳理制度要点，提供重点问答与学习建议。',
    goal: '确保合规认知、流程理解与行为一致性。',
    illus: '制度手册、知识卡片、问答机器人形象。',
  },
  {
    key: 'facility-guide',
    icon: '🏢',
    title: '公司设施介绍',
    timeTag: '入职首周',
    aiGuide: 'AI指导：提供食堂、健身房、通勤、停车等设施使用指引。',
    goal: '帮助新员工快速熟悉办公与生活支持资源。',
    illus: '园区地图、通勤线路、生活设施图标集。',
  },
  {
    key: 'probation-feedback',
    icon: '✅',
    title: '试用期完成情况反馈',
    timeTag: '转正前一个月',
    aiGuide: 'AI指导：辅助员工与主管回顾试用期目标达成情况。',
    goal: '支撑转正评估，形成阶段性成长闭环。',
    illus: '成果复盘、能力雷达图、转正流程引导图。',
  },
  {
    key: 'investment-declaration',
    icon: '📈',
    title: '投资行为申报',
    timeTag: '入职前两周',
    aiGuide: 'AI指导：提示候选人完成投资办企业、本人及家属证券/封闭式基金相关信息申报，并自动识别异常项。',
    goal: '在入职前完成投资行为与利益冲突风险识别，降低后续合规风险。',
    illus: '投资关系图谱、申报清单、风险提示卡片。',
  },
];

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

/* ════════════════════════════════════════════
   页面组件
   ════════════════════════════════════════════ */
export default function OnboardingPage() {
  const [doneSet, setDoneSet] = useState<Set<string>>(() => {
    const s = new Set<string>();
    TIMELINE_TASKS.filter(t => t.defaultDone).forEach(t => s.add(t.key));
    return s;
  });
  const [chatOpen, setChatOpen] = useState(false);

  const courses = useMemo(() => buildCourses(EMPLOYEE.role), []);
  const doneCount = doneSet.size;

  const toggleDone = (key: string) => {
    setDoneSet(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ── Hero ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-700 to-purple-600 px-6 py-5 text-white">
        {/* decorative blobs */}
        <div className="absolute -right-10 -top-10 w-44 h-44 rounded-full bg-white/15 blur-sm" />
        <div className="absolute right-28 -bottom-8 w-28 h-28 rounded-full bg-white/15 blur-sm" />
        <h1 className="relative text-xl font-extrabold mb-1.5">新员工AI助手 · 成长时间轴</h1>
        <p className="relative text-sm opacity-95 max-w-2xl leading-relaxed">从入职到试用期结束，按时间自动推送关键任务。每个节点都提供AI指导和专属页面入口，帮助新员工更快融入、更稳成长。</p>
        <p className="relative text-xs opacity-80 mt-2">成就进度：{doneCount} / {TIMELINE_TASKS.length} 已完成　当前员工：{EMPLOYEE.name}（{EMPLOYEE.role}）</p>
      </div>

      {/* ── AI推荐在线课程 ── */}
      <div className="bg-white border border-border rounded-2xl p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">📚 AI推荐在线课程</h2>
            <p className="text-xs text-muted mt-1">当前员工：{EMPLOYEE.name}。结合岗位（{EMPLOYEE.role}）与入职阶段生成推荐课程，建议按顺序学习。</p>
          </div>
          <button className="shrink-0 text-xs font-semibold text-blue-800 border border-indigo-200 bg-indigo-50 rounded-lg px-3 py-1.5 hover:bg-indigo-100">进入云端学院</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {courses.map((c, i) => (
            <div key={i} className="border border-indigo-100 rounded-xl bg-gradient-to-b from-white to-blue-50/40 p-3.5">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <h3 className="text-[13px] font-bold text-slate-900 leading-snug">{c.name}</h3>
                <span className="shrink-0 text-[11px] font-semibold text-indigo-700 border border-indigo-200 bg-indigo-50 rounded-full px-2 py-0.5">{c.fit}</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed"><strong>建议时长：</strong>{c.duration}</p>
              <p className="text-xs text-slate-600 leading-relaxed"><strong>AI推荐理由：</strong>{c.reason}</p>
              <button className="mt-2.5 text-xs font-semibold text-blue-800 border border-blue-200 bg-blue-50 rounded-lg px-2.5 py-1 hover:bg-blue-100">查看课程</button>
            </div>
          ))}
        </div>
      </div>

      {/* ── 成长时间轴 ── */}
      <div className="relative pl-6">
        {/* 竖线 */}
        <div className="absolute left-[15px] top-0 bottom-0 w-[3px] rounded-full bg-gradient-to-b from-blue-300 to-purple-300" />

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

                {/* 头部 */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2.5">
                    <span className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-lg">{task.icon}</span>
                    <h2 className="text-[15px] font-bold text-slate-900">{task.title}</h2>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 flex-wrap justify-end">
                    {done && (
                      <span className="text-xs font-bold text-blue-800 bg-gradient-to-r from-blue-100 to-blue-200 border border-blue-300 rounded-full px-2.5 py-0.5 shadow-sm">🏅 已完成</span>
                    )}
                    <span className="text-xs font-semibold text-indigo-800 bg-purple-50 border border-purple-200 rounded-full px-2.5 py-0.5">{task.timeTag}</span>
                  </div>
                </div>

                {/* 内容 */}
                <p className="text-[13px] text-slate-700 leading-relaxed mb-0.5">{task.aiGuide}</p>
                <p className="text-[13px] text-slate-700 leading-relaxed"><strong className="text-blue-900">目标：</strong>{task.goal}</p>

                {/* 插图建议 */}
                <div className="mt-2.5 rounded-xl border border-dashed border-blue-200 bg-gradient-to-r from-blue-50/60 to-purple-50/40 px-3 py-2 text-xs text-slate-500">
                  插图建议：{task.illus}
                </div>

                {/* 操作 */}
                <div className="flex items-center gap-2 mt-3">
                  <button className="text-xs font-semibold text-blue-800 border border-indigo-200 bg-indigo-50 rounded-lg px-3 py-1.5 hover:bg-indigo-100">进入页面</button>
                  <button
                    onClick={() => toggleDone(task.key)}
                    className={`text-xs font-semibold rounded-lg px-3 py-1.5 border ${
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
          className="fixed right-5 bottom-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/95 backdrop-blur border border-indigo-200 shadow-lg text-sm font-bold text-blue-900 hover:shadow-xl transition"
        >
          <MessageCircle className="w-4 h-4" /> AI助手
        </button>
      )}

      {/* ── 浮动 AI 助手面板 ── */}
      {chatOpen && (
        <div className="fixed right-4 bottom-4 z-50 w-[360px] animate-slide-in-right">
          <div className="relative">
            <button
              onClick={() => setChatOpen(false)}
              className="absolute -top-2.5 -right-2.5 z-10 w-6 h-6 rounded-full bg-white border border-border shadow flex items-center justify-center hover:bg-slate-50"
            >
              <X className="w-3.5 h-3.5" />
            </button>
            <AiChatPanel
              title="AI新员工助手"
              placeholder="输入问题，例如：入职需要提交哪些证件？"
              initialMessages={[
                {
                  id: '1',
                  role: 'ai',
                  content: `你好，我是 AI 新员工助手。\n你可以随时问：入职需要准备什么？试用期怎么考核？考勤请假规则？保密与竞业要求？\n\n当前员工：${EMPLOYEE.name}（${EMPLOYEE.role}），已完成 ${doneCount}/${TIMELINE_TASKS.length} 项成长任务。`,
                  timestamp: '09:00',
                },
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
}
