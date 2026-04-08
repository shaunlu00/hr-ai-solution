'use client';

import { useState, useMemo } from 'react';
import { Sparkles } from 'lucide-react';

/* ════════════════════════════════════════════
   模拟数据 & AI 目标生成
   ════════════════════════════════════════════ */
const EMPLOYEE = { id: '90001', name: '张三', dept: '技术研发部', job: '后端开发工程师（招聘系统）' };
const JD_EXCERPT = '负责招聘系统核心服务设计与开发，保障高可用与高并发，推动业务目标落地。';

interface GoalBlock {
  label: string;         // 30天 / 60天 / 90天
  objective: string;
  actions: string[];
  acceptance: string;
  collaboration: string;
}

function buildAiGoals(): GoalBlock[] {
  const focus = JD_EXCERPT.slice(0, 44);
  return [
    {
      label: '30天建议',
      objective: `完成${EMPLOYEE.job}岗位基础上手，建立业务全链路认知与个人学习地图。`,
      actions: [
        '完成入职课程、系统权限与工具链配置，确保可独立开展日常工作。',
        '梳理岗位核心流程、上下游接口人与协作节奏，形成流程图或清单。',
        `围绕JD重点"${focus}..."整理《岗位认知与问题清单》并与导师对齐。`,
      ],
      acceptance: '提交1份结构化上手文档（含流程、风险点、待确认问题）并完成首次评审。',
      collaboration: '建议每周与导师/主管进行一次15-30分钟对齐，及时消除认知偏差。',
    },
    {
      label: '60天建议',
      objective: '从"了解业务"进入"独立交付"，能稳定承担中小任务或专项优化。',
      actions: [
        '独立负责至少1个中小需求（或专项改进），完成方案、实施、验证闭环。',
        '在交付过程中沉淀可复用模板（如测试清单、复盘模板、协作规范）。',
        '主动参与跨团队沟通，完成至少1次关键评审或方案共创。',
      ],
      acceptance: '需求按期上线/交付，关键质量指标达标，并获得导师或协作方正向反馈。',
      collaboration: '建议与产品、研发、测试或运营建立固定沟通窗口，减少信息损耗。',
    },
    {
      label: '90天建议',
      objective: '形成岗位价值输出，在核心指标或效率质量上产出可量化成果。',
      actions: [
        '围绕岗位核心指标主导1次优化（效率、质量、稳定性或转化至少其一）。',
        '完成1份阶段复盘：问题-动作-结果-后续计划，沉淀方法论。',
        '明确下一阶段成长计划，提出可执行的季度目标建议。',
      ],
      acceptance: '形成至少1项量化改进结果，并沉淀1份可复用实践文档供团队复用。',
      collaboration: '建议由主管参与90天评估会，确认转正前的差距项与提升路径。',
    },
  ];
}

/* ════════════════════════════════════════════
   页面组件
   ════════════════════════════════════════════ */
export default function ProbationPage() {
  const aiGoals = useMemo(buildAiGoals, []);

  const [goal30, setGoal30] = useState('');
  const [goal60, setGoal60] = useState('');
  const [goal90, setGoal90] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submittedAt, setSubmittedAt] = useState('');

  const handleSave = () => {
    // In a real app this would persist to backend
    alert('已保存草稿。');
  };

  const handleSubmit = () => {
    if (!goal30.trim() || !goal60.trim() || !goal90.trim()) {
      alert('请完整填写30/60/90天目标后再提交。');
      return;
    }
    const now = new Date().toLocaleString();
    setSubmitted(true);
    setSubmittedAt(now);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* ── 员工概要 ── */}
      <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 gap-x-6 text-[13px]">
          <div><span className="text-muted">员工：</span><strong>{EMPLOYEE.name}</strong></div>
          <div><span className="text-muted">部门 / 岗位：</span><strong>{EMPLOYEE.dept} / {EMPLOYEE.job}</strong></div>
          <div>
            <span className="text-muted">当前状态：</span>
            {submitted
              ? <span className="ml-1 text-[11px] font-bold rounded-full px-2.5 py-0.5 bg-green-50 text-green-800 border border-green-200">已填写提交</span>
              : <span className="ml-1 text-[11px] font-bold rounded-full px-2.5 py-0.5 bg-slate-100 text-slate-600 border border-slate-200">待填写</span>}
          </div>
          <div><span className="text-muted">提交时间：</span><strong>{submittedAt || '-'}</strong></div>
        </div>

        {/* ── AI 参考目标建议 ── */}
        <div className="mt-4 rounded-xl border border-dashed border-blue-200 bg-gradient-to-br from-blue-50/60 to-white p-4">
          <h3 className="text-sm font-bold text-blue-900 flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-blue-600" />
            AI参考目标建议（基于员工情况与岗位JD生成）
          </h3>
          <p className="text-xs text-slate-500 mb-3">以下为参考内容，员工可在下方表单按实际情况调整后提交。</p>

          <div className="space-y-3">
            {aiGoals.map((g, i) => (
              <div key={i} className="rounded-xl border border-blue-100 bg-white p-3.5">
                <h4 className="text-[13px] font-bold text-blue-900 mb-2">{g.label}</h4>
                <p className="text-[13px] text-slate-700 mb-1.5"><strong>关键目标：</strong>{g.objective}</p>
                <ul className="list-disc pl-5 text-[13px] text-slate-700 space-y-1 mb-1.5">
                  {g.actions.map((a, j) => <li key={j} className="leading-relaxed">{a}</li>)}
                </ul>
                <p className="text-[13px] text-slate-700 mb-0.5"><strong>验收标准：</strong>{g.acceptance}</p>
                <p className="text-[13px] text-slate-700"><strong>协作建议：</strong>{g.collaboration}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 目标填写表单 ── */}
      <div className="bg-white rounded-2xl border border-border p-4 shadow-sm">
        <h2 className="text-base font-bold text-slate-800 mb-3">目标填写</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-muted mb-1.5">30天目标</label>
            <textarea
              value={goal30}
              onChange={e => setGoal30(e.target.value)}
              placeholder="例如：完成入职培训、熟悉系统架构、独立处理1个需求"
              className="w-full min-h-[100px] rounded-lg border border-border px-3 py-2 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1.5">60天目标</label>
            <textarea
              value={goal60}
              onChange={e => setGoal60(e.target.value)}
              placeholder="例如：独立负责模块迭代、优化关键指标"
              className="w-full min-h-[100px] rounded-lg border border-border px-3 py-2 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-xs text-muted mb-1.5">90天目标</label>
          <textarea
            value={goal90}
            onChange={e => setGoal90(e.target.value)}
            placeholder="例如：承担核心功能Owner，形成可复用方法论"
            className="w-full min-h-[100px] rounded-lg border border-border px-3 py-2 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs text-muted mb-1.5">补充说明</label>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="填写资源诉求、协作计划等"
            className="w-full min-h-[100px] rounded-lg border border-border px-3 py-2 text-[13px] resize-y focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="px-4 py-2 text-xs font-semibold rounded-lg border border-indigo-200 bg-indigo-50 text-blue-900 hover:bg-indigo-100"
          >
            保存草稿
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            提交目标
          </button>
          {submitted && (
            <span className="text-xs text-green-700 font-semibold">✓ 已提交试用期目标</span>
          )}
        </div>
      </div>
    </div>
  );
}
