'use client';

import { useState, useMemo } from 'react';
import { Filter, CheckSquare, XSquare, Download, Trash2, Users, Link2, Send } from 'lucide-react';

/* ─── 数据定义 ─── */
interface Job {
  id: number;
  name: string;
  jd: string;
  department: string;
}

interface CandidateSeed {
  id: string; name: string; school: string; degree: string;
  years: string; skills: string[];
}

interface Row {
  id: string;
  candidate: CandidateSeed;
  job: Job;
  score: number;
  level: 'excellent' | 'good' | 'medium' | 'low';
  invited: boolean;
}

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

const SCORE_OVERRIDES: Record<string, number> = {
  '1-c001': 90, '1-c002': 80, '1-c004': 60,
  '2-c002': 90, '2-c001': 80, '2-c005': 60,
};

const PRESET_INTERVIEWED = new Set([
  '1-c001', '1-c002', '1-c004', '2-c002', '3-c003',
]);

/* ─── helpers ─── */
function tokenize(text: string) {
  return text.toLowerCase().replace(/[()（），。/]/g, ' ').split(/\s+/).filter(Boolean);
}

function computeScore(job: Job, c: CandidateSeed) {
  const jdTokens = new Set(tokenize(job.jd + ' ' + job.name));
  const resumeTokens = new Set(tokenize(c.skills.join(' ') + ' ' + c.school + ' ' + c.degree));
  let hit = 0;
  jdTokens.forEach(t => { if (resumeTokens.has(t)) hit++; });
  const base = Math.min(70, hit * 12);
  const eduBonus = c.degree === '博士' ? 15 : c.degree === '硕士' ? 10 : 6;
  const yearsNum = parseInt(c.years, 10) || 0;
  const yearsBonus = yearsNum >= 5 ? 10 : yearsNum >= 3 ? 7 : 4;
  return Math.min(98, base + eduBonus + yearsBonus);
}

function levelByScore(score: number): Row['level'] {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 50) return 'medium';
  return 'low';
}

function levelText(level: string) {
  return { excellent: '特别优秀', good: '较匹配', medium: '一般匹配', low: '不太匹配' }[level] ?? '';
}

function hashString(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function interviewStatus(r: Row) {
  if (!r.invited) return { text: '待邀约', cls: 'bg-slate-50 text-slate-600 border-slate-200' };
  if (r.score >= 85) return { text: '已完成', cls: 'bg-green-50 text-green-700 border-green-200' };
  if (r.score >= 60) return { text: '面试中', cls: 'bg-amber-50 text-amber-700 border-amber-200' };
  return { text: '待安排', cls: 'bg-slate-50 text-slate-600 border-slate-200' };
}

function interviewScore(r: Row) {
  if (!r.invited) return null;
  const offset = r.level === 'excellent' ? 4 : r.level === 'good' ? 2 : r.level === 'medium' ? -1 : -4;
  return Math.max(35, Math.min(98, r.score + offset));
}

function interviewResultLevel(score: number | null) {
  if (score === null) return '';
  if (score >= 90) return '卓越';
  if (score >= 80) return '优秀';
  if (score >= 65) return '一般';
  return '不推荐';
}

function interviewResultCls(level: string) {
  if (level === '卓越') return 'bg-green-50 text-green-700 border-green-200';
  if (level === '优秀') return 'bg-blue-50 text-blue-700 border-blue-200';
  if (level === '一般') return 'bg-amber-50 text-amber-700 border-amber-200';
  if (level === '不推荐') return 'bg-red-50 text-red-700 border-red-200';
  return '';
}

const TIME_OPTIONS = ['2026-04-03 周四 10:00-11:00', '2026-04-04 周五 14:00-15:00', '2026-04-07 周一 09:30-10:30', '2026-04-08 周二 16:00-17:00', '2026-04-10 周四 11:00-12:00', '2026-04-12 周六 10:00-11:00'];
const MEETING_OPTIONS = ['821-123-456', '711-908-334', '903-221-778', '665-144-902', '789-332-610', '548-901-233'];

/* ─── 页面组件 ─── */
export default function ResumeScreeningPage() {
  const [jobFilter, setJobFilter] = useState('');
  const [matchFilter, setMatchFilter] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [logs, setLogs] = useState<string[]>([]);
  const [invitedSet, setInvitedSet] = useState<Set<string>>(new Set(PRESET_INTERVIEWED));

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
      r.invited = invitedSet.has(r.id);
      if (jobFilter && String(r.job.id) !== jobFilter) return false;
      if (matchFilter && r.level !== matchFilter) return false;
      if (keyword) {
        const target = `${r.candidate.name} ${r.candidate.skills.join(' ')} ${r.job.name}`.toLowerCase();
        if (!target.includes(keyword.toLowerCase())) return false;
      }
      return true;
    });
  }, [allRows, jobFilter, matchFilter, keyword, invitedSet]);

  const toggleSelect = (id: string) => {
    setSelected(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  };
  const selectAll = () => { setSelected(new Set(filteredRows.map(r => r.id))); };
  const clearSelect = () => { setSelected(new Set()); };

  const pushInvite = () => {
    if (selected.size === 0) return;
    const newLogs: string[] = [];
    const newInvited = new Set(invitedSet);
    allRows.forEach(r => {
      if (!selected.has(r.id) || newInvited.has(r.id)) return;
      newInvited.add(r.id);
      newLogs.push(`${new Date().toLocaleTimeString()} - 已推送AI面试邀请：${r.candidate.name}（${r.job.name}，匹配度${r.score}%）`);
    });
    setInvitedSet(newInvited);
    setLogs(prev => [...prev, ...newLogs]);
    setSelected(new Set());
  };

  const isConfirmed = (r: Row) => invitedSet.has(r.id) && r.score >= 85;
  const getTime = (r: Row) => isConfirmed(r) ? TIME_OPTIONS[hashString(r.id) % TIME_OPTIONS.length] : '待确认';
  const getMeeting = (r: Row) => isConfirmed(r) ? MEETING_OPTIONS[hashString(r.id) % MEETING_OPTIONS.length] : '待确认';

  const tagCls = (level: string) => {
    if (level === 'excellent') return 'bg-green-50 text-green-700 border-green-200 font-semibold';
    if (level === 'good') return 'bg-blue-50 text-blue-700 border-blue-200';
    if (level === 'medium') return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 筛选区 */}
      <div className="bg-white rounded-xl border border-border p-4">
        <p className="text-xs text-muted mb-3">根据岗位要求自动计算 AI 匹配度，并用标签标识。支持批量勾选后一键推送 AI 面试邀请。</p>
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
            <label className="text-xs text-muted">关键词（姓名/技能）</label>
            <input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="如：张三、Java、算法" className="border border-border rounded-lg px-2.5 py-2 text-sm" />
          </div>
          <button className="flex items-center gap-1 px-4 py-2 rounded-lg bg-indigo-50 border border-indigo-200 text-sm font-medium text-indigo-700 hover:bg-indigo-100 transition">
            <Filter className="w-3.5 h-3.5" /> 筛选
          </button>
        </div>
        <div className="mt-3 flex gap-2 flex-wrap">
          <button onClick={selectAll} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-700"><CheckSquare className="w-3 h-3" /> 全选当前结果</button>
          <button onClick={clearSelect} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-700"><XSquare className="w-3 h-3" /> 清空选择</button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-700"><Download className="w-3 h-3" /> 数据导出</button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-700"><Trash2 className="w-3 h-3" /> 删除简历</button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 border border-blue-600 text-xs font-medium text-white"><Users className="w-3 h-3" /> 批量分配面试官</button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-xs font-medium text-indigo-700"><Link2 className="w-3 h-3" /> 生成面试官分配链接</button>
          <button onClick={pushInvite} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 border border-blue-600 text-xs font-medium text-white"><Send className="w-3 h-3" /> 一键推送AI面试邀请</button>
        </div>
      </div>

      {/* 表格区 */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-2 text-xs text-muted border-b border-border">
          当前结果 {filteredRows.length} 人，已选择 {selected.size} 人
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-[13px]">
            <thead>
              <tr className="bg-slate-50 text-left text-slate-600">
                <th className="w-10 px-3 py-2.5" />
                <th className="px-2 py-2.5">候选人</th>
                <th className="px-2 py-2.5">应聘岗位</th>
                <th className="px-2 py-2.5">面试官</th>
                <th className="px-2 py-2.5">面试时间</th>
                <th className="px-2 py-2.5">腾讯会议号</th>
                <th className="px-2 py-2.5">AI初评</th>
                <th className="px-2 py-2.5">标签</th>
                <th className="px-2 py-2.5">AI面试</th>
                <th className="px-2 py-2.5">面试结果</th>
                <th className="px-2 py-2.5">简历</th>
                <th className="px-2 py-2.5">邀请状态</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRows.map(r => {
                const aiStatus = interviewStatus(r);
                const aiScore = interviewScore(r);
                const aiResult = interviewResultLevel(aiScore);
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
                    <td className="px-2 py-2.5 text-xs text-muted">未选择</td>
                    <td className="px-2 py-2.5 text-xs">{getTime(r)}</td>
                    <td className="px-2 py-2.5 text-xs">{getMeeting(r)}</td>
                    <td className="px-2 py-2.5">
                      <span className={`font-bold ${r.score >= 85 ? 'text-green-700' : r.score < 50 ? 'text-red-700' : 'text-foreground'}`}>{r.score}%</span>
                    </td>
                    <td className="px-2 py-2.5">
                      <div className="flex flex-wrap gap-1">
                        <span className={`inline-block text-xs rounded-full px-2 py-0.5 border ${tagCls(r.level)}`}>{levelText(r.level)}</span>
                        {warningTag && <span className="inline-block text-xs rounded-full px-2 py-0.5 border border-red-500 bg-red-600 text-white font-bold">{warningTag}</span>}
                      </div>
                    </td>
                    <td className="px-2 py-2.5">
                      <span className={`inline-block text-xs rounded-full px-2 py-0.5 border ${aiStatus.cls}`}>{aiStatus.text}</span>
                      {aiScore !== null && (
                        <div className="mt-1">
                          <span className={`font-bold text-xs ${aiScore >= 85 ? 'text-green-700' : aiScore < 50 ? 'text-red-700' : ''}`}>{aiScore}%</span>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-2.5">
                      {aiScore !== null ? (
                        <span className={`inline-block text-xs rounded-full px-2 py-0.5 border ${interviewResultCls(aiResult)}`}>{aiResult}</span>
                      ) : '-'}
                    </td>
                    <td className="px-2 py-2.5 text-blue-600 text-xs underline cursor-pointer">查看简历</td>
                    <td className="px-2 py-2.5 text-xs">{invitedSet.has(r.id) ? '已推送' : '待推送'}</td>
                  </tr>
                );
              })}
              {filteredRows.length === 0 && (
                <tr><td colSpan={12} className="px-4 py-8 text-center text-muted text-sm">当前条件下没有匹配候选人。</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 推送日志 */}
        <div className="border-t border-border px-4 py-3 max-h-32 overflow-auto text-xs text-slate-600">
          {logs.length === 0 ? (
            <div className="text-muted">暂无推送记录</div>
          ) : (
            logs.slice(-12).map((l, i) => <div key={i}>{l}</div>)
          )}
        </div>
      </div>
    </div>
  );
}
