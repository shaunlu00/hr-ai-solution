'use client';

import { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

/* ─── 类型 ─── */
interface InterviewSlot {
  id: number;
  name: string;
  dateKey: string;          // YYYY-MM-DD
  startTime: string;
  endTime: string;
  result: 'pass' | 'fail' | 'pending' | null;
  meetingNo: string;
}

const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六'];
const SCHOOL_POOL = ['清华大学', '北京大学', '复旦大学', '上海交通大学', '浙江大学', '中国科学技术大学', '中山大学', '华中科技大学'];
const DEGREE_POOL = ['本科', '硕士', '博士'];
const DEPT_POOL = ['技术研发部', '数据平台部', '产品与运营部', '人力科技部', '算法平台部'];
const JOB_POOL = ['后端开发工程师', '前端开发工程师', '算法工程师', '数据分析师', '测试开发工程师', '产品经理'];

function ymd(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function dateFromKey(key: string) { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d); }
function hashCode(s: string) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function isWeekend(d: Date) { return d.getDay() === 0 || d.getDay() === 6; }

function dateWithBusinessDayOffset(offset: number) {
  const d = new Date(); d.setHours(0, 0, 0, 0);
  let moved = 0;
  while (moved < offset) { d.setDate(d.getDate() + 1); if (!isWeekend(d)) moved++; }
  while (isWeekend(d)) d.setDate(d.getDate() + 1);
  return d;
}

function generateMeetingNo(seed: number) {
  return `${800 + (seed % 200)}-${100 + ((seed * 3) % 900)}-${100 + ((seed * 7) % 900)}`;
}

/* ─── 固定面试数据 ─── */
const FIXED_INTERVIEWS: { key: string; name: string; bdayOffset: number; start: string; end: string; result: 'pass' | 'fail' | 'pending' }[] = [
  { key: 'f-c001-a', name: '张晨', bdayOffset: 0, start: '09:30', end: '10:30', result: 'pass' },
  { key: 'f-c002-a', name: '王琳', bdayOffset: 0, start: '10:45', end: '11:45', result: 'pending' },
  { key: 'f-c003-a', name: '李越', bdayOffset: 0, start: '14:00', end: '15:00', result: 'fail' },
  { key: 'f-c004-a', name: '赵宁', bdayOffset: 1, start: '09:00', end: '10:00', result: 'pass' },
  { key: 'f-c005-a', name: '陈思', bdayOffset: 1, start: '13:30', end: '14:30', result: 'pending' },
  { key: 'f-c006-a', name: '周凡', bdayOffset: 2, start: '10:00', end: '11:00', result: 'pass' },
  { key: 'f-c001-b', name: '张晨', bdayOffset: 2, start: '15:00', end: '16:00', result: 'pending' },
  { key: 'f-c002-b', name: '王琳', bdayOffset: 3, start: '09:30', end: '10:30', result: 'fail' },
  { key: 'f-c003-b', name: '李越', bdayOffset: 3, start: '16:00', end: '17:00', result: 'pass' },
  { key: 'f-c004-b', name: '赵宁', bdayOffset: 4, start: '11:00', end: '12:00', result: 'pending' },
  { key: 'f-c005-b', name: '陈思', bdayOffset: 4, start: '14:30', end: '15:30', result: 'pass' },
];

function buildInitialSlots(): InterviewSlot[] {
  return FIXED_INTERVIEWS.map((item, idx) => {
    const d = dateWithBusinessDayOffset(item.bdayOffset);
    return {
      id: idx + 1,
      name: item.name,
      dateKey: ymd(d),
      startTime: item.start,
      endTime: item.end,
      result: item.result,
      meetingNo: generateMeetingNo(hashCode(item.key)),
    };
  });
}

function profileOf(name: string, id: number) {
  const seed = hashCode(`${name}-${id}`);
  const matchScore = 55 + (seed % 41);
  return {
    avatarText: name.slice(0, 1),
    school: SCHOOL_POOL[seed % SCHOOL_POOL.length],
    degree: DEGREE_POOL[seed % DEGREE_POOL.length],
    dept: DEPT_POOL[seed % DEPT_POOL.length],
    job: JOB_POOL[seed % JOB_POOL.length],
    matchScore,
  };
}

function matchLevelText(score: number) { return score >= 85 ? '特别优秀' : score >= 70 ? '较匹配' : score >= 50 ? '一般匹配' : '不太匹配'; }
function resultLabel(r: string | null) { return r === 'pass' ? '面试通过' : r === 'fail' ? '面试不通过' : r === 'pending' ? '面试结果待定' : ''; }
function stampCls(r: string | null) { return r === 'pass' ? 'border-green-600 text-green-700' : r === 'fail' ? 'border-red-600 text-red-600' : r === 'pending' ? 'border-amber-600 text-amber-700' : ''; }
function actionCls(type: string) {
  return type === 'pass' ? 'border-green-200 text-green-800 bg-green-50 hover:bg-green-100' : type === 'fail' ? 'border-red-200 text-red-700 bg-red-50 hover:bg-red-100' : type === 'pending' ? 'border-amber-200 text-amber-800 bg-amber-50 hover:bg-amber-100' : 'border-border hover:bg-slate-50';
}

export default function InterviewCalendarPage() {
  const [slots, setSlots] = useState<InterviewSlot[]>(buildInitialSlots);
  const [calMonth, setCalMonth] = useState(() => new Date());
  const [selectedKey, setSelectedKey] = useState('');

  const groupedByDate = useMemo(() => {
    const g: Record<string, InterviewSlot[]> = {};
    slots.forEach(s => { if (!g[s.dateKey]) g[s.dateKey] = []; g[s.dateKey].push(s); });
    return g;
  }, [slots]);

  // Init selected key to first populated date
  const allKeys = useMemo(() => Object.keys(groupedByDate).sort(), [groupedByDate]);
  const activeKey = selectedKey || allKeys[0] || ymd(new Date());

  const calFirst = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1);
  const calStart = new Date(calFirst); calStart.setDate(1 - calFirst.getDay());

  const calCells = useMemo(() => {
    const cells: { key: string; date: Date; count: number; isCurrent: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(calStart); d.setDate(calStart.getDate() + i);
      const key = ymd(d);
      cells.push({ key, date: d, count: groupedByDate[key]?.length ?? 0, isCurrent: d.getMonth() === calMonth.getMonth() });
    }
    return cells;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calMonth, groupedByDate]);

  const selectedSlots = (groupedByDate[activeKey] ?? []).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const selectedDate = dateFromKey(activeKey);

  const updateResult = useCallback((slotId: number, result: 'pass' | 'fail' | 'pending') => {
    setSlots(prev => prev.map(s => s.id === slotId ? { ...s, result } : s));
  }, []);

  return (
    <div className="space-y-4 animate-fade-in">
      <p className="text-xs text-muted">左侧切换月历选择日期；右侧展示候选人面试卡片，可标记面试结果。</p>

      <div className="grid grid-cols-[380px_1fr] gap-4 items-start max-lg:grid-cols-1">
        {/* 左侧月历 */}
        <div className="bg-white rounded-xl border border-border p-3">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold">{calMonth.getFullYear()}年{calMonth.getMonth() + 1}月</span>
            <div className="flex gap-1">
              <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))} className="p-1 border border-border rounded hover:bg-slate-50"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button onClick={() => { const now = new Date(); setCalMonth(new Date(now.getFullYear(), now.getMonth(), 1)); setSelectedKey(ymd(now)); }} className="px-2 py-0.5 text-xs border border-border rounded hover:bg-slate-50">今天</button>
              <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))} className="p-1 border border-border rounded hover:bg-slate-50"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted mb-1">
            {WEEK_NAMES.map(w => <div key={w}>{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calCells.map(cell => (
              <button key={cell.key} type="button" onClick={() => setSelectedKey(cell.key)} className={`relative border rounded-lg min-h-[50px] p-1 text-left text-xs transition ${cell.isCurrent ? '' : 'text-slate-300'} ${activeKey === cell.key ? 'border-blue-600 shadow-sm ring-1 ring-blue-100' : 'border-border hover:border-slate-300'}`}>
                <div>{cell.date.getDate()}</div>
                {cell.count > 0 && <div className="absolute right-1 bottom-1 text-[10px] rounded-full px-1 bg-blue-100 text-blue-800 border border-blue-200">🎯 {cell.count}人</div>}
              </button>
            ))}
          </div>
        </div>

        {/* 右侧卡片 */}
        <div className="bg-white rounded-xl border border-border p-3">
          <h2 className="text-base font-bold mb-3">📅 {activeKey} 周{WEEK_NAMES[selectedDate.getDay()]}（{selectedSlots.length} 位候选人）</h2>
          {selectedSlots.length === 0 ? (
            <div className="border border-dashed border-border rounded-lg p-5 text-sm text-muted text-center">🕒 该日期暂无已确认候选人。</div>
          ) : (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-3">
              {selectedSlots.map(slot => {
                const p = profileOf(slot.name, slot.id);
                return (
                  <div key={slot.id} className="relative border border-border rounded-xl p-3 bg-white">
                    {/* 面试结果印章 */}
                    {slot.result && (
                      <div className={`absolute top-2 right-2 text-[11px] font-extrabold border-2 rounded-md px-1.5 py-0.5 rotate-[14deg] ${stampCls(slot.result)}`}>
                        {resultLabel(slot.result)}
                      </div>
                    )}
                    {/* 头像 + 姓名 */}
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                        {p.avatarText}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{slot.name}</div>
                        <div className="text-xs text-muted">{p.job}</div>
                      </div>
                    </div>
                    {/* 标签 */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      <span className="text-xs rounded-full px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600">{p.degree}</span>
                      <span className="text-xs rounded-full px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600">{p.school}</span>
                      <span className="text-xs rounded-full px-2 py-0.5 bg-slate-100 border border-slate-200 text-slate-600">{p.dept}</span>
                    </div>
                    {/* 信息行 */}
                    <div className="space-y-0.5 text-[13px] text-slate-700">
                      <div>面试时间：{slot.startTime} - {slot.endTime}</div>
                      <div>应聘岗位：{p.job}</div>
                      <div>应聘部门：{p.dept}</div>
                      <div>最高学历：{p.degree}</div>
                      <div>毕业院校：{p.school}</div>
                      <div>AI面试匹配度：<strong>{p.matchScore}%</strong>（{matchLevelText(p.matchScore)}）</div>
                      <div>候选人简历：<span className="text-blue-600 underline cursor-pointer">查看详细简历</span></div>
                      <div>AI面试测评报告：<span className="text-blue-600 underline cursor-pointer">查看报告</span></div>
                      <div>腾讯会议：{slot.meetingNo}</div>
                    </div>
                    {/* 操作按钮 */}
                    <div className="flex flex-wrap gap-1.5 mt-2.5">
                      <button onClick={() => updateResult(slot.id, 'pass')} className={`px-2 py-0.5 text-xs rounded-lg border transition ${actionCls('pass')}`}>面试通过</button>
                      <button onClick={() => updateResult(slot.id, 'fail')} className={`px-2 py-0.5 text-xs rounded-lg border transition ${actionCls('fail')}`}>面试不通过</button>
                      <button onClick={() => updateResult(slot.id, 'pending')} className={`px-2 py-0.5 text-xs rounded-lg border transition ${actionCls('pending')}`}>结果待定</button>
                      <button className={`px-2 py-0.5 text-xs rounded-lg border transition ${actionCls('adjust')}`}>安排调整</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
