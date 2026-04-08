'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Filter, Users, Search, X } from 'lucide-react';

/* ─── 数据定义 ─── */
interface Job { id: number; name: string; jd: string; department: string; }
interface CandidateSeed { id: string; name: string; school: string; degree: string; years: string; skills: string[]; }
interface Interviewer { id: string; name: string; empNo: string; expertise: string; weekInterviewed: number; weekPending: number; interviews: number; }
interface Row { id: string; candidate: CandidateSeed; job: Job; score: number; level: 'excellent' | 'good' | 'medium' | 'low'; invited: boolean; }

const JOBS: Job[] = [
  { id: 1, name: '后端开发工程师（招聘系统）', jd: '负责招聘系统核心服务设计与开发，熟悉Java/Go，具备高并发系统经验，推动业务目标达成。', department: '人力科技部' },
  { id: 2, name: '前端开发工程师（招聘中台）', jd: '负责前端架构演进，熟悉React/Vue工程化，关注用户体验与跨团队协作。', department: '人力科技部' },
  { id: 3, name: '高级后端工程师（交易平台）', jd: '负责交易系统核心链路，熟悉分布式事务与高可用架构。', department: '技术研发部' },
];

const CANDIDATES: CandidateSeed[] = [
  { id: 'c001', name: '张晨', school: '北京大学', degree: '硕士', years: '4年', skills: ['Java', 'Go', 'MySQL', '高并发', '微服务'] },
  { id: 'c002', name: '王琳', school: '浙江大学', degree: '本科', years: '3年', skills: ['React', 'TypeScript', '前端工程化', '性能优化'] },
  { id: 'c003', name: '李越', school: '复旦大学', degree: '硕士', years: '5年', skills: ['Python', '机器学习', '推荐系统', '数据分析'] },
  { id: 'c004', name: '赵宁', school: '上海交通大学', degree: '本科', years: '2年', skills: ['测试开发', '自动化测试', 'CI/CD'] },
  { id: 'c005', name: '陈思', school: '中山大学', degree: '本科', years: '1年', skills: ['行政', '文档', '沟通'] },
  { id: 'c006', name: '周凡', school: '清华大学', degree: '博士', years: '6年', skills: ['算法', 'NLP', '深度学习', '分布式系统'] },
];

const INTERVIEWERS: Interviewer[] = [
  { id: 'iv-lm', name: '刘梅', empNo: 'E65220', expertise: '组织发展 人才寻访', weekInterviewed: 3, weekPending: 1, interviews: 58 },
  { id: 'iv-zj', name: '赵静', empNo: 'E66410', expertise: '人才寻访 沟通评估', weekInterviewed: 2, weekPending: 2, interviews: 46 },
  { id: 'iv-ww', name: '王伟', empNo: 'E78321', expertise: 'Java/微服务', weekInterviewed: 3, weekPending: 2, interviews: 56 },
  { id: 'iv-lq', name: '李强', empNo: 'E79112', expertise: 'Go/云原生', weekInterviewed: 2, weekPending: 1, interviews: 49 },
  { id: 'iv-qc', name: '钱程', empNo: 'E81202', expertise: '推荐系统 大模型应用', weekInterviewed: 4, weekPending: 1, interviews: 71 },
];

const SCORE_OVERRIDES: Record<string, number> = { '1-c001': 90, '1-c002': 80, '1-c004': 60, '2-c002': 90, '2-c001': 80, '2-c005': 60 };
const PRESET_INTERVIEWED = new Set(['1-c001', '1-c002', '1-c004', '2-c002', '3-c003']);
const PRESET_ASSIGNMENTS: Record<string, string[]> = { '1-c001': ['iv-lm'], '1-c002': ['iv-zj'], '3-c006': ['iv-ww'] };

/* ─── helpers ─── */
function tokenize(text: string) { return text.toLowerCase().replace(/[()（），。/]/g, ' ').split(/\s+/).filter(Boolean); }
function computeScore(job: Job, c: CandidateSeed) {
  const jdTokens = new Set(tokenize(job.jd + ' ' + job.name));
  const resumeTokens = new Set(tokenize(c.skills.join(' ') + ' ' + c.school + ' ' + c.degree));
  let hit = 0; jdTokens.forEach(t => { if (resumeTokens.has(t)) hit++; });
  const base = Math.min(70, hit * 12);
  const eduBonus = c.degree === '博士' ? 15 : c.degree === '硕士' ? 10 : 6;
  const yearsNum = parseInt(c.years, 10) || 0;
  return Math.min(98, base + eduBonus + (yearsNum >= 5 ? 10 : yearsNum >= 3 ? 7 : 4));
}
function levelByScore(s: number): Row['level'] { return s >= 85 ? 'excellent' : s >= 70 ? 'good' : s >= 50 ? 'medium' : 'low'; }
function levelText(l: string) { return { excellent: '特别优秀', good: '较匹配', medium: '一般匹配', low: '不太匹配' }[l] ?? ''; }
function hashString(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }

const TIME_OPTIONS = ['2026-04-03 周四 10:00-11:00', '2026-04-04 周五 14:00-15:00', '2026-04-07 周一 09:30-10:30', '2026-04-08 周二 16:00-17:00', '2026-04-10 周四 11:00-12:00'];
const MEETING_OPTIONS = ['821-123-456', '711-908-334', '903-221-778', '665-144-902', '789-332-610'];

function tagCls(level: string) {
  if (level === 'excellent') return 'bg-green-50 text-green-700 border-green-200 font-semibold';
  if (level === 'good') return 'bg-blue-50 text-blue-700 border-blue-200';
  if (level === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function recommendInterviewer(row: Row): Interviewer | null {
  const demand = new Set(tokenize(row.job.jd + ' ' + row.job.name + ' ' + row.candidate.skills.join(' ')));
  let best: { iv: Interviewer; score: number } | null = null;
  INTERVIEWERS.forEach(iv => {
    const exp = new Set(tokenize(iv.expertise));
    let hit = 0; demand.forEach(t => { if (exp.has(t)) hit++; });
    const s = 65 + Math.min(40, hit * 10) - iv.weekPending * 5 - iv.weekInterviewed * 2;
    if (!best || s > best.score) best = { iv, score: s };
  });
  return best?.iv ?? null;
}

/* ─── 面试官多选 Picker ─── */
function InterviewerPicker({ rowId, assigned, onUpdate }: { rowId: string; assigned: string[]; onUpdate: (rowId: string, ids: string[]) => void }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

  const q = query.toLowerCase();
  const filtered = q ? INTERVIEWERS.filter(iv => `${iv.name} ${iv.empNo} ${iv.expertise}`.toLowerCase().includes(q)) : INTERVIEWERS;
  const pickedSet = new Set(assigned);

  const toggle = (id: string) => {
    onUpdate(rowId, pickedSet.has(id) ? assigned.filter(x => x !== id) : [...assigned, id]);
  };

  const ivLabel = (iv: Interviewer) => iv.empNo ? `${iv.name}（${iv.empNo}）` : iv.name;

  return (
    <div ref={ref} className="relative min-w-[180px]">
      <div className="flex flex-wrap gap-1 mb-1 min-h-[22px]">
        {assigned.length === 0 && <span className="text-xs text-muted">未选择</span>}
        {assigned.map(id => {
          const iv = INTERVIEWERS.find(x => x.id === id);
          return (
            <span key={id} className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 border border-indigo-200 bg-indigo-50 text-indigo-800">
              <span className="truncate max-w-[120px]">{iv ? ivLabel(iv) : id}</span>
              <button type="button" onClick={() => toggle(id)} className="hover:text-red-600">×</button>
            </span>
          );
        })}
      </div>
      <div className="relative">
        <input
          className="w-full border border-border rounded-lg px-2 py-1 text-xs"
          placeholder="搜索面试官…"
          value={query}
          onChange={e => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
        />
        {open && filtered.length > 0 && (
          <ul className="absolute left-0 right-0 top-full mt-0.5 bg-white border border-border rounded-lg shadow-lg z-30 max-h-48 overflow-auto text-xs">
            {filtered.map(iv => (
              <li key={iv.id} className={`px-2 py-1.5 cursor-pointer hover:bg-blue-50 border-b border-border/50 ${pickedSet.has(iv.id) ? 'bg-slate-50' : ''}`} onClick={() => toggle(iv.id)}>
                <div className="font-semibold">{ivLabel(iv)}{pickedSet.has(iv.id) && <span className="text-green-700 ml-1">· 已选</span>}</div>
                {iv.expertise && <div className="text-muted text-[11px]">{iv.expertise}</div>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ─── 批量分配弹窗 ─── */
function BulkAssignModal({ selectedCount, onClose, onConfirm }: { selectedCount: number; onClose: () => void; onConfirm: (ids: string[]) => void }) {
  const [picked, setPicked] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const q = query.toLowerCase();
  const filtered = q ? INTERVIEWERS.filter(iv => `${iv.name} ${iv.empNo} ${iv.expertise}`.toLowerCase().includes(q)) : INTERVIEWERS;
  const pickedSet = new Set(picked);

  const toggle = (id: string) => { setPicked(prev => pickedSet.has(id) ? prev.filter(x => x !== id) : [...prev, id]); };
  const ivLabel = (iv: Interviewer) => iv.empNo ? `${iv.name}（${iv.empNo}）` : iv.name;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl border border-border p-5 w-[720px] max-h-[80vh] overflow-auto shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold">批量分配面试官</h3>
          <button onClick={onClose} className="text-muted hover:text-foreground"><X className="w-4 h-4" /></button>
        </div>
        <p className="text-xs text-muted mb-3">将分配给 {selectedCount} 行候选人；请选择 1 个或多个面试官。</p>
        <div className="mb-3">
          <label className="text-xs text-muted font-semibold block mb-1">搜索面试官</label>
          <input className="border border-border rounded-lg px-2.5 py-2 text-sm w-full max-w-md" placeholder="输入姓名/工号/擅长方向…" value={query} onChange={e => setQuery(e.target.value)} />
        </div>
        {filtered.length > 0 && (
          <ul className="border border-border rounded-lg max-h-48 overflow-auto mb-3">
            {filtered.map(iv => (
              <li key={iv.id} className={`px-3 py-2 cursor-pointer hover:bg-blue-50 border-b border-border/50 text-sm ${pickedSet.has(iv.id) ? 'bg-slate-50' : ''}`} onClick={() => toggle(iv.id)}>
                <span className="font-semibold">{ivLabel(iv)}</span>
                {pickedSet.has(iv.id) && <span className="text-green-700 ml-1 text-xs">· 已选</span>}
                {iv.expertise && <span className="text-muted text-xs ml-2">{iv.expertise}</span>}
              </li>
            ))}
          </ul>
        )}
        <div className="flex flex-wrap gap-1.5 mb-3 min-h-[24px]">
          {picked.length === 0 && <span className="text-xs text-muted">未选择</span>}
          {picked.map(id => {
            const iv = INTERVIEWERS.find(x => x.id === id);
            return (
              <span key={id} className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 border border-indigo-200 bg-indigo-50 text-indigo-800">
                {iv ? ivLabel(iv) : id}
                <button type="button" onClick={() => toggle(id)} className="hover:text-red-600">×</button>
              </span>
            );
          })}
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={() => setPicked([])} className="px-3 py-2 rounded-lg border border-border text-sm">清空已选</button>
          <button onClick={() => { if (picked.length === 0) return; onConfirm(picked); }} className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">确认分配</button>
        </div>
      </div>
    </div>
  );
}

/* ─── 页面组件 ─── */
export default function InterviewerAssignmentPage() {
  const [jobFilter, setJobFilter] = useState('');
  const [matchFilter, setMatchFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [assignments, setAssignments] = useState<Record<string, string[]>>(PRESET_ASSIGNMENTS);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const allRows = useMemo<Row[]>(() => {
    const rows: Row[] = [];
    JOBS.forEach(job => {
      CANDIDATES.forEach(c => {
        const key = `${job.id}-${c.id}`;
        const score = SCORE_OVERRIDES[key] ?? computeScore(job, c);
        rows.push({ id: key, candidate: c, job, score, level: levelByScore(score), invited: PRESET_INTERVIEWED.has(key) });
      });
    });
    return rows;
  }, []);

  const filteredRows = useMemo(() => {
    return allRows.filter(r => {
      if (jobFilter && String(r.job.id) !== jobFilter) return false;
      if (matchFilter && r.level !== matchFilter) return false;
      if (keyword) {
        const target = `${r.candidate.name} ${r.candidate.skills.join(' ')} ${r.job.name}`.toLowerCase();
        if (!target.includes(keyword.toLowerCase())) return false;
      }
      return true;
    });
  }, [allRows, jobFilter, matchFilter, keyword]);

  const toggleSelect = (id: string) => { setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; }); };

  const updateAssignment = (rowId: string, ids: string[]) => {
    setAssignments(prev => ({ ...prev, [rowId]: ids }));
  };

  const isConfirmed = (r: Row) => r.invited && r.score >= 85;
  const getTime = (r: Row) => isConfirmed(r) ? TIME_OPTIONS[hashString(r.id) % TIME_OPTIONS.length] : '待确认';
  const getMeeting = (r: Row) => isConfirmed(r) ? MEETING_OPTIONS[hashString(r.id) % MEETING_OPTIONS.length] : '待确认';

  const ivLabel = (iv: Interviewer) => iv.empNo ? `${iv.name}（${iv.empNo}）` : iv.name;

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 筛选区 */}
      <div className="bg-white rounded-xl border border-border p-4">
        <p className="text-xs text-muted mb-3">根据岗位要求自动计算 AI 匹配度，并用标签标识。支持批量勾选后分配面试官。</p>
        <div className="grid grid-cols-[1.4fr_1fr_1fr_auto] gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">岗位</label>
            <select value={jobFilter} onChange={e => setJobFilter(e.target.value)} className="border border-border rounded-lg px-2.5 py-2 text-sm">
              <option value="">全部岗位</option>
              {JOBS.map(j => <option key={j.id} value={j.id}>{j.name}</option>)}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">匹配度等级</label>
            <select value={matchFilter} onChange={e => setMatchFilter(e.target.value)} className="border border-border rounded-lg px-2.5 py-2 text-sm">
              <option value="">全部等级</option>
              <option value="excellent">特别优秀（≥85）</option>
              <option value="good">较匹配（70-84）</option>
              <option value="medium">一般匹配（50-69）</option>
              <option value="low">不太匹配（&lt;50）</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-muted">关键词</label>
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="姓名/技能" className="border border-border rounded-lg px-2.5 py-2 text-sm" />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition">
            <Filter className="w-3.5 h-3.5" /> 筛选
          </button>
        </div>
        <div className="mt-3">
          <button onClick={() => { if (selected.size === 0) return; setShowBulkModal(true); }} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium">
            <Users className="w-3 h-3" /> 批量分配面试官
          </button>
        </div>
      </div>

      {/* 表格区 */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-2 text-xs text-muted border-b border-border">
          当前结果 {filteredRows.length} 人，已选择 {selected.size} 人
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px] text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-600">
                <th className="w-10 px-3 py-2.5" />
                <th className="px-2 py-2.5">候选人</th>
                <th className="px-2 py-2.5">应聘岗位</th>
                <th className="px-2 py-2.5">AI推荐面试官</th>
                <th className="px-2 py-2.5 min-w-[200px]">面试官</th>
                <th className="px-2 py-2.5">面试时间</th>
                <th className="px-2 py-2.5">腾讯会议号</th>
                <th className="px-2 py-2.5">AI初评</th>
                <th className="px-2 py-2.5">标签</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRows.map(r => {
                const recommended = recommendInterviewer(r);
                const rowAssignment = assignments[r.id] ?? [];
                const warningTag = r.level === 'excellent' ? '重点推荐' : r.level === 'low' ? '高风险不匹配' : '';
                return (
                  <tr key={r.id} className="hover:bg-slate-50/60 transition align-top">
                    <td className="px-3 py-2.5">
                      <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggleSelect(r.id)} className="accent-blue-600" />
                    </td>
                    <td className="px-2 py-2.5">
                      <div className="font-semibold">{r.candidate.name}</div>
                      <div className="text-xs text-muted">{r.candidate.school} · {r.candidate.degree} · {r.candidate.years}</div>
                    </td>
                    <td className="px-2 py-2.5">
                      <div>{r.job.name}</div>
                      <div className="text-xs text-muted">{r.job.department}</div>
                    </td>
                    <td className="px-2 py-2.5">
                      {recommended ? (
                        <div>
                          <div className="font-bold text-sm">{ivLabel(recommended)}</div>
                          <div className="text-xs text-muted mt-0.5">{r.job.department} · {recommended.expertise}</div>
                          <button
                            className="mt-1 px-2 py-0.5 text-xs rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-800 hover:bg-indigo-100"
                            disabled={rowAssignment.includes(recommended.id)}
                            onClick={() => {
                              if (!rowAssignment.includes(recommended.id)) {
                                updateAssignment(r.id, [...rowAssignment, recommended.id]);
                              }
                            }}
                          >
                            {rowAssignment.includes(recommended.id) ? '已应用' : '应用'}
                          </button>
                        </div>
                      ) : <span className="text-xs text-muted">未推荐</span>}
                    </td>
                    <td className="px-2 py-2.5">
                      <InterviewerPicker rowId={r.id} assigned={rowAssignment} onUpdate={updateAssignment} />
                    </td>
                    <td className="px-2 py-2.5 text-xs">{getTime(r)}</td>
                    <td className="px-2 py-2.5 text-xs">{getMeeting(r)}</td>
                    <td className="px-2 py-2.5">
                      <span className={`font-bold ${r.score >= 85 ? 'text-green-700' : r.score < 50 ? 'text-red-700' : ''}`}>{r.score}%</span>
                    </td>
                    <td className="px-2 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        <span className={`inline-block text-xs rounded-full px-2 py-0.5 border ${tagCls(r.level)}`}>{levelText(r.level)}</span>
                        {warningTag && <span className="inline-block text-xs rounded-full px-2 py-0.5 border border-red-500 bg-red-600 text-white font-bold">{warningTag}</span>}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredRows.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-8 text-center text-muted text-sm">当前条件下没有匹配候选人。</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 批量分配弹窗 */}
      {showBulkModal && (
        <BulkAssignModal
          selectedCount={selected.size}
          onClose={() => setShowBulkModal(false)}
          onConfirm={(ids) => {
            setAssignments(prev => {
              const next = { ...prev };
              selected.forEach(rowId => { next[rowId] = ids; });
              return next;
            });
            setShowBulkModal(false);
            setSelected(new Set());
          }}
        />
      )}
    </div>
  );
}
