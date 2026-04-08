'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

/* ════════════════════════════════════════════
   模拟数据
   ════════════════════════════════════════════ */
interface Candidate {
  id: string;
  name: string;
  position: string;
  level: string;
  // 简历客观信息
  school: string;
  degree: string;
  major: string;
  yearsExp: number;
  currentCompany: string;
  currentSalary: number; // K/月
  expectedSalary: number;
  certifications: string[];
  // 面试综合评价
  interviewScore: number;
  techScore: number;
  commScore: number;
  leaderScore: number;
  interviewSummary: string;
  // 内部薪酬基准
  internalAvg: number;
  internalMin: number;
  internalMax: number;
  internalCount: number;
  // 市场数据
  marketP25: number;
  marketP50: number;
  marketP75: number;
  marketP90: number;
  marketSource: string;
}

const CANDIDATES: Candidate[] = [
  {
    id: 'c1', name: '张明远', position: '后端开发工程师', level: 'P7（高级工程师）',
    school: '浙江大学', degree: '硕士', major: '计算机科学与技术', yearsExp: 8,
    currentCompany: '字节跳动', currentSalary: 38, expectedSalary: 45,
    certifications: ['AWS Solutions Architect', 'K8s CKA'],
    interviewScore: 91, techScore: 93, commScore: 88, leaderScore: 85,
    interviewSummary: '技术功底扎实，系统设计能力出色，高并发场景经验丰富。沟通表达清晰，有一定团队管理经验。属于目标人才，建议积极争取。',
    internalAvg: 36, internalMin: 30, internalMax: 42, internalCount: 47,
    marketP25: 30, marketP50: 36, marketP75: 43, marketP90: 50,
    marketSource: '数据来源：薪酬报告 2025Q4（互联网/后端/高级，一线城市）',
  },
  {
    id: 'c2', name: '李思颖', position: '产品经理', level: 'P6（资深产品经理）',
    school: '北京大学', degree: '本科', major: '信息管理与信息系统', yearsExp: 5,
    currentCompany: '美团', currentSalary: 28, expectedSalary: 35,
    certifications: ['PMP', 'NPDP'],
    interviewScore: 86, techScore: 80, commScore: 92, leaderScore: 78,
    interviewSummary: '产品感觉好，用户洞察能力强，商业化思维突出。数据分析功底可进一步加强。沟通技巧优秀，适合跨部门协作角色。',
    internalAvg: 28, internalMin: 23, internalMax: 33, internalCount: 32,
    marketP25: 24, marketP50: 29, marketP75: 35, marketP90: 40,
    marketSource: '数据来源：薪酬报告 2025Q4（互联网/产品/资深，一线城市）',
  },
  {
    id: 'c3', name: '王浩宇', position: '算法工程师', level: 'P7（高级算法专家）',
    school: '清华大学', degree: '博士', major: '人工智能', yearsExp: 6,
    currentCompany: '商汤科技', currentSalary: 50, expectedSalary: 60,
    certifications: ['顶会论文 6 篇（NeurIPS/ICML）'],
    interviewScore: 95, techScore: 98, commScore: 82, leaderScore: 76,
    interviewSummary: '算法能力极为突出，模型优化和工程化落地经验丰富，有多项专利。表达偏学术风格，团队协作需要引导。属于稀缺高端人才，强烈建议发 offer。',
    internalAvg: 48, internalMin: 40, internalMax: 58, internalCount: 18,
    marketP25: 42, marketP50: 50, marketP75: 60, marketP90: 72,
    marketSource: '数据来源：薪酬报告 2025Q4（AI/算法/高级，一线城市）',
  },
];

/* ─── 薪酬档位生成 ─── */
interface SalaryTier {
  label: string;
  amount: number;
  tag: string;
  tagColor: string;
  attractiveness: number; // 0-100
  attractivenessLabel: string;
  reasoning: string;
  negotiationTip: string;
}

function buildTiers(c: Candidate): SalaryTier[] {
  const base = c.internalAvg;
  // AI adjustment based on interview + resume
  const abilityFactor = (c.interviewScore - 80) / 100; // +0.xx
  const expFactor = Math.min(c.yearsExp - 5, 5) * 0.01;
  const degreeFactor = c.degree === '博士' ? 0.06 : c.degree === '硕士' ? 0.03 : 0;
  const aiAdj = abilityFactor + expFactor + degreeFactor;
  const aiRec = Math.round(base * (1 + aiAdj));

  const tiers: SalaryTier[] = [
    {
      label: '保守档',
      amount: c.internalMin + Math.round((c.internalAvg - c.internalMin) * 0.3),
      tag: '低于基准',
      tagColor: 'text-amber-700 bg-amber-50 border-amber-200',
      attractiveness: 20,
      attractivenessLabel: '吸引力较低',
      reasoning: `该档位处于内部同岗位薪酬下游区间，低于市场 P25（${c.marketP25}K）。对候选人吸引力不足，存在较高拒 Offer 风险。`,
      negotiationTip: '不建议以此档位报价。如预算受限，需搭配签字费、股票等长期激励，并强调职业发展空间和团队优势。',
    },
    {
      label: '基准档',
      amount: c.internalAvg,
      tag: '内部基准',
      tagColor: 'text-blue-700 bg-blue-50 border-blue-200',
      attractiveness: 50,
      attractivenessLabel: '吸引力中等',
      reasoning: `该档位与内部同岗位同级别薪酬均值持平（${c.internalCount}人样本），接近市场 P50（${c.marketP50}K），维持内部公平性。`,
      negotiationTip: '可作为起始报价。沟通时强调公司福利、晋升通道、技术平台等综合价值，引导候选人关注 Total Package。',
    },
    {
      label: 'AI 推荐档',
      amount: aiRec,
      tag: 'AI 推荐',
      tagColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
      attractiveness: 75,
      attractivenessLabel: '吸引力较高',
      reasoning: `AI 综合面试评分（${c.interviewScore}/100）、${c.yearsExp}年经验、${c.degree}学历、市场对标数据，在基准基础上调整 ${aiAdj > 0 ? '+' : ''}${(aiAdj * 100).toFixed(0)}%。该薪资兼顾竞争力与成本控制。`,
      negotiationTip: `以此作为核心报价，向候选人展示薪资的数据依据和科学性。可提供"${aiRec}K 基本 + 绩效奖金"结构，提升接受概率。`,
    },
    {
      label: '竞争档',
      amount: Math.round(c.marketP75),
      tag: '市场 P75',
      tagColor: 'text-green-700 bg-green-50 border-green-200',
      attractiveness: 90,
      attractivenessLabel: '吸引力很高',
      reasoning: `该档位达到市场 P75 水平，超过 75% 的同岗位薪酬。对于面试评分 ${c.interviewScore} 分的候选人，具有很强的吸引力。`,
      negotiationTip: '适用于关键岗位或稀缺人才的抢夺性报价。沟通时突出"诚意薪资"定位，快速锁定候选人意向。注意需审批流。',
    },
    {
      label: '极具竞争力档',
      amount: Math.round(c.marketP90),
      tag: '市场 P90',
      tagColor: 'text-purple-700 bg-purple-50 border-purple-200',
      attractiveness: 98,
      attractivenessLabel: '极具吸引力',
      reasoning: `该档位超越 90% 的市场同岗位薪酬，远超内部基准 ${Math.round((c.marketP90 / c.internalAvg - 1) * 100)}%。仅适用于业务核心且极难替代的人才。`,
      negotiationTip: '慎用此档位，需 VP 级审批。建议拆分为"基本工资 + 签字费 + 期权"结构，降低固定成本占比。',
    },
  ];
  return tiers;
}

/* ─── 能力雷达 ─── */
function RadarBar({ label, score, color }: { label: string; score: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-slate-600 w-16 text-right shrink-0">{label}</span>
      <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden relative">
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-slate-700">{score}</span>
      </div>
    </div>
  );
}

/* ─── 吸引力指示条 ─── */
function AttractivenessBar({ value, label }: { value: number; label: string }) {
  const color = value >= 90 ? '#8b5cf6' : value >= 70 ? '#22c55e' : value >= 50 ? '#3b82f6' : value >= 30 ? '#f59e0b' : '#ef4444';
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-0.5">
        <span className="text-slate-500">候选人吸引力</span>
        <span className="font-bold" style={{ color }}>{label}</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   页面主体
   ════════════════════════════════════════════ */
export default function SalaryPage() {
  const [selectedId, setSelectedId] = useState(CANDIDATES[0].id);
  const c = CANDIDATES.find(x => x.id === selectedId)!;
  const tiers = buildTiers(c);
  const aiTier = tiers.find(t => t.tag === 'AI 推荐')!;
  const [expandedTier, setExpandedTier] = useState<number | null>(2); // default expand AI 推荐

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 候选人选择 */}
      <div className="flex items-center gap-3 flex-wrap">
        {CANDIDATES.map(cand => (
          <button key={cand.id} onClick={() => { setSelectedId(cand.id); setExpandedTier(2); }}
            className={`px-3 py-1.5 rounded-lg text-sm border transition ${selectedId === cand.id ? 'border-indigo-400 bg-indigo-50 text-indigo-800 font-semibold' : 'border-border hover:bg-slate-50'}`}>
            {cand.name} · {cand.position}
          </button>
        ))}
      </div>

      {/* ─── 第1部分：基本薪酬区间确立 ─── */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="text-sm font-bold mb-0.5">📐 第一步：确立基本薪酬区间</h2>
        <p className="text-xs text-muted mb-4">基于<strong>岗位类型 + 级别 + 公司内部同岗位同级别薪酬均值</strong>，确定基准薪酬区间。</p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="border border-border rounded-xl p-3">
            <div className="text-xs text-muted mb-1">岗位类型</div>
            <div className="text-sm font-semibold">{c.position}</div>
          </div>
          <div className="border border-border rounded-xl p-3">
            <div className="text-xs text-muted mb-1">职级</div>
            <div className="text-sm font-semibold">{c.level}</div>
          </div>
          <div className="border border-border rounded-xl p-3">
            <div className="text-xs text-muted mb-1">内部同岗同级薪酬均值</div>
            <div className="text-sm font-semibold text-indigo-700">{c.internalAvg}K/月 <span className="text-xs font-normal text-muted">（{c.internalCount} 人样本）</span></div>
          </div>
        </div>

        {/* 可视化薪酬区间尺 */}
        <div className="bg-slate-50 rounded-xl p-4 border border-border">
          <div className="flex items-center justify-between text-xs text-muted mb-1.5">
            <span>内部区间</span>
            <span>{c.internalMin}K — {c.internalMax}K</span>
          </div>
          <div className="relative h-8 bg-white rounded-full border border-border overflow-hidden">
            {/* 内部区间 */}
            <div className="absolute top-0 bottom-0 bg-blue-100 border-x-2 border-blue-300 rounded-full"
              style={{ left: `${((c.internalMin - c.marketP25 + 5) / (c.marketP90 - c.marketP25 + 10)) * 100}%`, right: `${100 - ((c.internalMax - c.marketP25 + 5) / (c.marketP90 - c.marketP25 + 10)) * 100}%` }} />
            {/* 均值标记 */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-blue-600"
              style={{ left: `${((c.internalAvg - c.marketP25 + 5) / (c.marketP90 - c.marketP25 + 10)) * 100}%` }}>
              <div className="absolute -top-5 -translate-x-1/2 text-[10px] font-bold text-blue-700 whitespace-nowrap">均值 {c.internalAvg}K</div>
            </div>
            {/* AI推荐标记 */}
            <div className="absolute top-0 bottom-0 w-0.5 bg-indigo-600"
              style={{ left: `${((aiTier.amount - c.marketP25 + 5) / (c.marketP90 - c.marketP25 + 10)) * 100}%` }}>
              <div className="absolute -bottom-5 -translate-x-1/2 text-[10px] font-bold text-indigo-700 whitespace-nowrap">AI {aiTier.amount}K ★</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted mt-5">
            <span>市场 P25: {c.marketP25}K</span>
            <span>市场 P50: {c.marketP50}K</span>
            <span>市场 P75: {c.marketP75}K</span>
            <span>市场 P90: {c.marketP90}K</span>
          </div>
          <p className="text-[10px] text-muted mt-1">📊 {c.marketSource}</p>
        </div>
      </div>

      {/* ─── 第2部分：AI综合评估 ─── */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="text-sm font-bold mb-0.5">🤖 第二步：AI 综合评估候选人</h2>
        <p className="text-xs text-muted mb-4">AI 结合<strong>候选人客观信息（简历）</strong>和<strong>综合能力（面试评价）</strong>，参考市场薪资数据进行定薪建模。</p>

        <div className="grid grid-cols-2 gap-4 max-lg:grid-cols-1">
          {/* 简历客观信息 */}
          <div className="border border-border rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-700 mb-3">📄 简历客观信息</h3>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs">
              <div><span className="text-muted">毕业院校</span><div className="font-semibold">{c.school}</div></div>
              <div><span className="text-muted">学历</span><div className="font-semibold">{c.degree}</div></div>
              <div><span className="text-muted">专业</span><div className="font-semibold">{c.major}</div></div>
              <div><span className="text-muted">工作年限</span><div className="font-semibold">{c.yearsExp} 年</div></div>
              <div><span className="text-muted">目前单位</span><div className="font-semibold">{c.currentCompany}</div></div>
              <div><span className="text-muted">当前薪资</span><div className="font-semibold">{c.currentSalary}K/月</div></div>
              <div><span className="text-muted">期望薪资</span><div className="font-semibold text-indigo-700">{c.expectedSalary}K/月</div></div>
              <div><span className="text-muted">证书/成果</span><div className="font-semibold">{c.certifications.join('、')}</div></div>
            </div>
          </div>

          {/* 面试综合评价 */}
          <div className="border border-border rounded-xl p-4">
            <h3 className="text-xs font-bold text-slate-700 mb-3">🎯 面试综合评价</h3>
            <div className="space-y-2 mb-3">
              <RadarBar label="综合评分" score={c.interviewScore} color="#6366f1" />
              <RadarBar label="技术能力" score={c.techScore} color="#3b82f6" />
              <RadarBar label="沟通表达" score={c.commScore} color="#22c55e" />
              <RadarBar label="领导力" score={c.leaderScore} color="#f59e0b" />
            </div>
            <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2.5 border border-border leading-relaxed">
              <strong>面试官评语：</strong>{c.interviewSummary}
            </div>
          </div>
        </div>

        {/* AI定薪模型说明 */}
        <div className="mt-4 bg-indigo-50/60 border border-indigo-200 rounded-xl p-4">
          <h3 className="text-xs font-bold text-indigo-800 mb-1.5">💡 AI 定薪模型说明</h3>
          <div className="text-xs text-indigo-700 leading-relaxed space-y-1">
            <p>• <strong>基准锚点</strong>：以内部同岗同级别薪酬均值（{c.internalAvg}K）为定薪基准，保证内部公平性。</p>
            <p>• <strong>能力溢价</strong>：面试综合评分 {c.interviewScore}/100（{c.interviewScore >= 90 ? '卓越' : c.interviewScore >= 80 ? '优秀' : '良好'}级），对应能力溢价 {((c.interviewScore - 80) > 0 ? '+' : '')}{c.interviewScore - 80}%。</p>
            <p>• <strong>经验调整</strong>：{c.yearsExp} 年行业经验，{c.degree}学位，综合学历经验调整系数。</p>
            <p>• <strong>市场对标</strong>：参考市场 P25-P90 数据（{c.marketP25}K-{c.marketP90}K），确保外部竞争力。</p>
            <p>• <strong>最终推荐</strong>：AI 推荐薪资 <strong>{aiTier.amount}K/月</strong>，{aiTier.amount > c.internalAvg ? `高于内部基准 ${Math.round((aiTier.amount / c.internalAvg - 1) * 100)}%` : aiTier.amount < c.internalAvg ? `低于内部基准 ${Math.round((1 - aiTier.amount / c.internalAvg) * 100)}%` : '与内部基准持平'}，位于市场 P{aiTier.amount <= c.marketP25 ? '25 以下' : aiTier.amount <= c.marketP50 ? '25-P50' : aiTier.amount <= c.marketP75 ? '50-P75' : '75 以上'} 区间。</p>
          </div>
        </div>
      </div>

      {/* ─── 第3部分：薪酬档位 & 沟通建议 ─── */}
      <div className="bg-white rounded-xl border border-border p-5">
        <h2 className="text-sm font-bold mb-0.5">💰 第三步：薪酬档位与沟通策略</h2>
        <p className="text-xs text-muted mb-4">AI 给出5个薪酬档位，标注对候选人的吸引力及对应的沟通建议，帮助 HR 科学谈薪。</p>

        <div className="space-y-2">
          {tiers.map((tier, idx) => {
            const isExpanded = expandedTier === idx;
            const isAi = tier.tag === 'AI 推荐';
            return (
              <div key={idx} className={`border rounded-xl transition ${isAi ? 'border-indigo-300 bg-indigo-50/30' : 'border-border'}`}>
                <button type="button" onClick={() => setExpandedTier(isExpanded ? null : idx)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className={`text-xs rounded-full px-2 py-0.5 border font-bold shrink-0 ${tier.tagColor}`}>{tier.tag}</span>
                    <span className="text-sm font-bold">{tier.label}</span>
                    {isAi && <span className="text-[10px] bg-indigo-600 text-white rounded-full px-1.5 py-0.5 font-bold">★ 推荐</span>}
                  </div>
                  <span className="text-lg font-extrabold text-indigo-700 shrink-0">{tier.amount}K<span className="text-xs font-normal text-muted">/月</span></span>
                  <ChevronDown className={`w-4 h-4 text-muted transition-transform shrink-0 ${isExpanded ? '' : '-rotate-90'}`} />
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                    <AttractivenessBar value={tier.attractiveness} label={tier.attractivenessLabel} />
                    <div>
                      <p className="text-xs font-bold text-slate-700 mb-0.5">📊 定价依据</p>
                      <p className="text-xs text-slate-600 leading-relaxed">{tier.reasoning}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-700 mb-0.5">🗣️ 沟通建议</p>
                      <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 rounded-lg p-2.5 border border-border">{tier.negotiationTip}</p>
                    </div>
                    <div className="flex gap-4 text-[11px] text-muted">
                      <span>vs 内部基准：{tier.amount > c.internalAvg ? '+' : ''}{Math.round((tier.amount / c.internalAvg - 1) * 100)}%</span>
                      <span>vs 候选人期望（{c.expectedSalary}K）：{tier.amount >= c.expectedSalary ? '✅ 达标' : `⚠️ 差 ${c.expectedSalary - tier.amount}K`}</span>
                      <span>vs 当前薪资（{c.currentSalary}K）：涨幅 {Math.round((tier.amount / c.currentSalary - 1) * 100)}%</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
