'use client';

import { useState, useMemo } from 'react';
import { X } from 'lucide-react';

/* ════════════════════════════════════════════
   数据类型与模拟数据
   ════════════════════════════════════════════ */
interface CandidateRow {
  id: string;
  name: string;
  dept: string;
  job: string;
  offerNo: string;
  status: 'pending' | 'review' | 'approved';
}

interface DrawerData {
  /* 概要 */
  idNo: string;
  /* AI 背调 */
  investLine: string;
  stockLine: string;
  integrityLine: string;
  eduAiLine: string;
  /* 健康 */
  healthNote: string;
  /* 声明 */
  declRel: boolean;
  declAml: boolean;
  declSec: boolean;
  /* 证件 */
  secPass: boolean;
  fundPass: boolean;
  foreignEdu: boolean;
  gradNo: string;
  degreeNo: string;
  /* 薪酬 */
  compNote: string;
}

const DEPT_POOL = ['技术研发部', '数据平台部', '产品与运营部', '人力科技部', '算法平台部'];
const JOB_POOL = ['后端开发工程师', '前端开发工程师', '算法工程师', '数据分析师', '测试开发工程师', '产品经理'];

function hash(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

const RAW_CANDIDATES = [
  { id: '8002', name: '张三' },
  { id: '8006', name: '何阳' },
  { id: '8009', name: '邱然' },
  { id: '8010', name: '吴桐' },
  { id: '8011', name: '李珂' },
  { id: '8015', name: '周雨欣' },
  { id: '8018', name: '陈思远' },
];

function buildRows(): CandidateRow[] {
  return RAW_CANDIDATES.map(r => {
    const h = hash(`${r.name}-${r.id}`);
    return {
      id: r.id,
      name: r.name,
      dept: DEPT_POOL[h % DEPT_POOL.length],
      job: JOB_POOL[h % JOB_POOL.length],
      offerNo: `OFFER-${r.id}-${100001 + (h % 999)}`,
      status: h % 5 === 0 ? 'approved' : h % 3 === 0 ? 'review' : 'pending',
    };
  });
}

function buildDrawerData(row: CandidateRow): DrawerData {
  const H = hash(`${row.name}|drawer-${row.id}`);
  return {
    idNo: `1101011990${H % 10}${String(100000 + (H % 899999)).padStart(6, '0')}${String(1000 + (H % 8999))}`,
    investLine: H % 11 !== 0
      ? '未识别到该人员作为法定代表人、股东或高管的投资任职企业（来源：公开企业登记与关联图谱，演示）。'
      : '识别到 1 条疑似对外投资/任职记录，已标记为「待人工复核」（演示）。',
    stockLine: H % 5 === 0
      ? '本人及家属证券账户与封闭式基金：与申报存在 1 处差异，已在材料页高亮（演示）。'
      : '本人及家属证券账户与封闭式基金：与多渠道申报交叉核验一致，未见重大异常（演示）。',
    integrityLine: H % 7 === 0
      ? '诚信校验：公开渠道命中需说明事项（裁判文书等），已生成 HRBP 待办（演示）。'
      : '诚信校验：未命中失信被执行人、限制消费等公开记录（演示）。',
    eduAiLine: `学历 AI 校验：与学信网/教育部摘要关键字段比对一致，综合置信度 ${(0.88 + (H % 12) / 100).toFixed(2)}（演示）。`,
    healthNote: '体检结论：未见明显异常（演示）；岗位适配：可胜任当前申报岗位。',
    declRel: H % 5 !== 0,
    declAml: H % 6 !== 0,
    declSec: H % 4 !== 0,
    secPass: H % 3 !== 0,
    fundPass: H % 4 !== 0,
    foreignEdu: H % 7 === 0,
    gradNo: `10${String(1000000 + (H % 8999999))}`,
    degreeNo: `10${String(2000000 + (H % 7999999))}`,
    compNote: '候选人已说明：固定薪酬、绩效奖金构成及近12个月收入水平（演示）。实际以 Offer 与流水为准。',
  };
}

/* ─── 状态组件 ─── */
function StatusPill({ status }: { status: string }) {
  const cls = status === 'approved'
    ? 'bg-green-50 text-green-800 border-green-200'
    : status === 'review'
      ? 'bg-blue-50 text-blue-800 border-blue-200'
      : 'bg-amber-50 text-amber-800 border-amber-200';
  const text = status === 'approved' ? '审核通过' : status === 'review' ? '待审核' : '待补齐';
  return <span className={`text-[11px] font-semibold rounded-full px-2.5 py-0.5 border ${cls}`}>{text}</span>;
}

function UploadPill({ ok, label }: { ok: boolean; label: string }) {
  return ok
    ? <span className="text-[11px] font-semibold rounded-md px-2 py-0.5 bg-green-50 text-green-800 border border-green-200">{label}</span>
    : <span className="text-[11px] font-semibold rounded-md px-2 py-0.5 bg-amber-50 text-amber-800 border border-amber-200">{label}</span>;
}

/* ─── KV 行 ─── */
function KV({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[140px_1fr] gap-x-3 gap-y-1 text-[13px] items-start">
      <span className="text-muted">{label}</span>
      <span className="text-slate-700 leading-relaxed">{children}</span>
    </div>
  );
}

/* ─── 区块 ─── */
function Section({ icon, title, tag, purple, children }: { icon: string; title: string; tag?: string; purple?: boolean; children: React.ReactNode }) {
  return (
    <div className={`border rounded-xl p-4 mb-3 ${purple ? 'border-purple-200 bg-gradient-to-br from-purple-50/60 to-white' : 'border-border bg-white'}`}>
      <h3 className="text-sm font-bold text-slate-800 mb-3 pb-2.5 border-b border-slate-100 flex items-center gap-2.5 flex-wrap">
        <span className="text-base">{icon}</span>
        {title}
        {tag && <span className="text-[11px] font-bold rounded-full px-2 py-0.5 bg-purple-100 text-purple-800 border border-purple-200">{tag}</span>}
      </h3>
      <div className="space-y-2">
        {children}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   页面
   ════════════════════════════════════════════ */
export default function BackgroundCheckPage() {
  const rows = useMemo(buildRows, []);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeRow = activeId ? rows.find(r => r.id === activeId) : null;
  const drawerData = activeRow ? buildDrawerData(activeRow) : null;

  const toggleSelect = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };
  const selectAll = () => setSelected(new Set(rows.map(r => r.id)));
  const clearAll = () => setSelected(new Set());

  const approveCandidate = () => {
    // In a real app this would call an API
    setActiveId(null);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-xs text-muted">集中展示已接收 Offer 的候选人。点击可侧滑审核入职前材料，包括 AI 背调、健康、声明合规、身份学历、从业考试、薪酬等维度。</p>

      {/* 工具栏 */}
      <div className="bg-white rounded-xl border border-border">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-slate-50/60">
          <button onClick={selectAll} className="px-3 py-1 text-xs border border-border rounded-lg hover:bg-white font-semibold">全选</button>
          <button onClick={clearAll} className="px-3 py-1 text-xs border border-border rounded-lg hover:bg-white font-semibold">清空选择</button>
          <button className="px-3 py-1 text-xs border border-indigo-300 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-semibold">批量触发材料补齐流程</button>
          <span className="ml-auto text-xs text-muted">已接收 Offer：<strong>{rows.length}</strong> 人　已勾选：<strong>{selected.size}</strong> 人</span>
        </div>

        {/* 候选人列表 */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-xs text-slate-600 font-bold">
                <th className="px-4 py-2.5 w-10"></th>
                <th className="px-4 py-2.5">候选人</th>
                <th className="px-4 py-2.5">部门</th>
                <th className="px-4 py-2.5">岗位</th>
                <th className="px-4 py-2.5">状态</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id} onClick={() => setActiveId(row.id)} className="border-t border-border hover:bg-blue-50/40 cursor-pointer transition">
                  <td className="px-4 py-2.5">
                    <input type="checkbox" checked={selected.has(row.id)} onChange={() => toggleSelect(row.id)} onClick={e => e.stopPropagation()} className="w-4 h-4 accent-indigo-600" />
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-sm">
                        {row.name[0]}
                      </div>
                      <span className="font-semibold">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-2.5">{row.dept}</td>
                  <td className="px-4 py-2.5">{row.job}</td>
                  <td className="px-4 py-2.5"><StatusPill status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── 右侧抽屉 ─── */}
      {activeRow && drawerData && (
        <>
          {/* 遮罩 */}
          <div className="fixed inset-0 bg-slate-900/35 backdrop-blur-[3px] z-40 animate-fade-in" onClick={() => setActiveId(null)} />

          {/* 抽屉 */}
          <aside className="fixed top-0 right-0 h-screen w-[min(960px,96vw)] bg-white border-l border-border shadow-2xl z-50 flex flex-col animate-slide-in-right">
            {/* 头部 */}
            <div className="flex items-start justify-between gap-3 px-5 py-3.5 border-b border-border bg-gradient-to-b from-slate-50 to-white shrink-0">
              <div>
                <h2 className="text-base font-bold flex items-center gap-2.5">
                  <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-lg shadow-md">📋</span>
                  候选人信息审核
                </h2>
                <p className="text-xs text-muted mt-1">侧滑审核：AI背调、健康状况、声明与合规、身份与学历、从业考试、工作与薪酬材料等维度。</p>
              </div>
              <button onClick={() => setActiveId(null)} className="p-1.5 border border-border rounded-lg hover:bg-slate-50"><X className="w-4 h-4" /></button>
            </div>

            {/* 内容 */}
            <div className="flex-1 overflow-y-auto px-5 py-4 bg-gradient-to-b from-slate-50 to-slate-50/50 space-y-0">
              {/* 提示 */}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200 mb-4">
                <span className="w-9 h-9 rounded-xl bg-white border border-blue-200 flex items-center justify-center text-lg shadow-sm shrink-0">💡</span>
                <p className="text-xs text-blue-900 leading-relaxed">以下为候选人信息审核要点。附件与截图均为演示占位，接入系统后可替换为真实填报与影像件。</p>
              </div>

              {/* 概要 */}
              <Section icon="📌" title="概要">
                <KV label="候选人"><strong>{activeRow.name}</strong></KV>
                <KV label="部门 / 岗位">{activeRow.dept} / {activeRow.job}</KV>
                <KV label="当前状态"><StatusPill status={activeRow.status} /></KV>
              </Section>

              {/* AI 背调 */}
              <Section icon="✨" title="AI背调" tag="自动识别" purple>
                <p className="text-xs text-purple-800 leading-relaxed p-2 rounded-lg bg-purple-100/40 border border-purple-200 mb-2">
                  由 AI / 数字员工等能力自动抓取公开信息与内部规则交叉核验，以下为识别摘要；正式环境可对接企业征信、证券登记、学信网与内部合规库。
                </p>
                <KV label="投资办企业情况">{drawerData.investLine}</KV>
                <KV label="股票与基金核验">{drawerData.stockLine}</KV>
                <KV label="诚信校验">{drawerData.integrityLine}</KV>
                <KV label="学历 AI 校验">{drawerData.eduAiLine}</KV>
              </Section>

              {/* 健康状况 */}
              <Section icon="🩺" title="健康状况">
                <KV label="健康说明">{drawerData.healthNote}</KV>
                <KV label="体检报告">
                  <div className="flex items-center gap-2 flex-wrap">
                    <UploadPill ok label="已上传" />
                    <span className="text-xs text-blue-600 underline">体检报告_{activeRow.name}_2025.pdf（演示）</span>
                  </div>
                </KV>
              </Section>

              {/* 个人声明 */}
              <Section icon="📜" title="个人声明">
                <KV label="亲属回避">{drawerData.declRel ? '已阅读并确认无应回避情形（演示）' : '待候选人补充确认'}</KV>
                <KV label="诚信与反洗钱">{drawerData.declAml ? '已阅读并签署诚信及反洗钱声明（演示）' : '待签署'}</KV>
                <KV label="证券从业要求">{drawerData.declSec ? '已确认知悉岗位证券从业合规要求（演示）' : '待确认'}</KV>
              </Section>

              {/* 身份信息 */}
              <Section icon="🪪" title="身份信息">
                <KV label="证件号码">{drawerData.idNo}</KV>
                <KV label="证件图片上传">
                  <div className="flex gap-2.5 flex-wrap mt-1">
                    <div className="w-28 h-[68px] rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-[11px] text-muted text-center leading-tight">身份证正面<br/>已上传（演示）</div>
                    <div className="w-28 h-[68px] rounded-lg border border-dashed border-slate-300 bg-slate-50 flex items-center justify-center text-[11px] text-muted text-center leading-tight">身份证反面<br/>已上传（演示）</div>
                  </div>
                </KV>
              </Section>

              {/* 学历信息 */}
              <Section icon="🎓" title="学历信息">
                <KV label="是否国外学历">{drawerData.foreignEdu ? '是' : '否'}</KV>
                <KV label="毕业证编号">{drawerData.gradNo}</KV>
                <KV label="学位证编号">{drawerData.degreeNo}</KV>
                <KV label="毕业证图片">
                  <div className="flex items-center gap-2 flex-wrap">
                    <UploadPill ok label="已上传" />
                    <span className="text-xs text-blue-600 underline">毕业证_{activeRow.name}.jpg（演示）</span>
                  </div>
                </KV>
                <KV label="学位证图片">
                  <div className="flex items-center gap-2 flex-wrap">
                    <UploadPill ok label="已上传" />
                    <span className="text-xs text-blue-600 underline">学位证_{activeRow.name}.jpg（演示）</span>
                  </div>
                </KV>
              </Section>

              {/* 证券从业考试 */}
              <Section icon="📈" title="证券从业考试说明">
                <KV label="是否通过考试">{drawerData.secPass ? '是' : '否（演示）'}</KV>
                <KV label="考试通过截图">
                  {drawerData.secPass
                    ? <div className="flex items-center gap-2 flex-wrap"><UploadPill ok label="已上传" /><span className="text-xs text-blue-600 underline">证券从业成绩截图_{activeRow.name}.png（演示）</span></div>
                    : <UploadPill ok={false} label="未通过或未报考" />}
                </KV>
              </Section>

              {/* 基金从业考试 */}
              <Section icon="💹" title="基金从业考试说明">
                <KV label="是否通过考试">{drawerData.fundPass ? '是' : '否（演示）'}</KV>
                <KV label="考试通过截图">
                  {drawerData.fundPass
                    ? <div className="flex items-center gap-2 flex-wrap"><UploadPill ok label="已上传" /><span className="text-xs text-blue-600 underline">基金从业成绩截图_{activeRow.name}.png（演示）</span></div>
                    : <UploadPill ok={false} label="未通过或未报考" />}
                </KV>
              </Section>

              {/* 工作经历证明 */}
              <Section icon="💼" title="工作经历证明材料">
                <KV label="附件上传">
                  <div className="flex items-center gap-2 flex-wrap">
                    <UploadPill ok label="已上传" />
                    <span className="text-xs text-blue-600 underline">离职证明_上家单位_{activeRow.name}.pdf（演示）</span>
                    <span className="text-xs text-blue-600 underline">劳动合同节选.pdf（演示）</span>
                  </div>
                </KV>
              </Section>

              {/* 薪酬说明 */}
              <Section icon="💰" title="薪酬说明及证明材料">
                <KV label="薪酬说明">{drawerData.compNote}</KV>
                <KV label="社保缴纳证明">
                  <div className="flex items-center gap-2 flex-wrap"><UploadPill ok label="已上传" /><span className="text-xs text-blue-600 underline">社保记录_{activeRow.name}.pdf（演示）</span></div>
                </KV>
                <KV label="公积金缴纳证明">
                  <div className="flex items-center gap-2 flex-wrap"><UploadPill ok label="已上传" /><span className="text-xs text-blue-600 underline">公积金缴存证明_{activeRow.name}.pdf（演示）</span></div>
                </KV>
                <KV label="奖金等收入证明">
                  <div className="flex items-center gap-2 flex-wrap"><UploadPill ok label="已上传" /><span className="text-xs text-blue-600 underline">年终奖银行流水节选.pdf（演示）</span></div>
                </KV>
              </Section>

              {/* 审核操作 */}
              <div className="flex gap-3 pt-2 pb-4">
                <button onClick={approveCandidate} disabled={activeRow.status !== 'review'} className="px-4 py-2 text-xs font-semibold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed">✓ 审核通过</button>
                <button disabled={activeRow.status !== 'review'} className="px-4 py-2 text-xs font-semibold rounded-lg border border-border hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed">↩ 审核驳回</button>
              </div>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
