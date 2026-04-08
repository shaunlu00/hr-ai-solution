'use client';

import { useState, useMemo, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from 'lucide-react';

/* ─── 数据类型 ─── */
interface Slot {
  id: number;
  weekday: number;
  dateLabel: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'reserved' | 'confirmed';
  candidateName: string | null;
  meetingNo: string | null;
}

interface WeeklyItem {
  name: string;
  profile: string;
  jobName: string;
  status: 'pending' | 'reserved' | 'confirmed';
  schedule: string;
  interviewers: string[];
}

const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

const DEMO_WEEKLY: WeeklyItem[] = [
  { name: '张晨', profile: '北京大学 · 硕士', jobName: '后端开发工程师（招聘系统）', status: 'reserved', schedule: '本周三 10:00-11:00', interviewers: ['刘梅', '赵静'] },
  { name: '王琳', profile: '浙江大学 · 本科', jobName: '前端开发工程师（招聘中台）', status: 'confirmed', schedule: '本周四 14:00-15:00', interviewers: ['高鹏'] },
  { name: '李越', profile: '复旦大学 · 硕士', jobName: '高级后端工程师（交易平台）', status: 'pending', schedule: '待候选人预约', interviewers: ['王伟', '钱程'] },
];

/* ─── 日期工具 ─── */
function toDateInCurrentWeek(weekday: number) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const diff = weekday - now.getDay();
  const d = new Date(now); d.setDate(now.getDate() + diff + (diff < 0 ? 7 : 0));
  return d;
}
function ymd(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function dateFromKey(key: string) { const [y, m, d] = key.split('-').map(Number); return new Date(y, m - 1, d); }
function buildDateLabel(weekday: number) { const d = toDateInCurrentWeek(weekday); return `${ymd(d)} 周${WEEK_NAMES[d.getDay()]}`; }
function buildDateLabelFromDate(d: Date) { return `${ymd(d)} 周${WEEK_NAMES[d.getDay()]}`; }

/* ─── 初始演示数据 ─── */
function createDemoSlots(): Slot[] {
  const slots: Slot[] = [];
  let id = 1;
  for (let wd = 1; wd <= 5; wd++) {
    slots.push({ id: id++, weekday: wd, dateLabel: buildDateLabel(wd), startTime: '10:00', endTime: '11:00', status: 'available', candidateName: null, meetingNo: null });
  }
  slots.push({ id: id++, weekday: 3, dateLabel: buildDateLabel(3), startTime: '10:00', endTime: '11:00', status: 'reserved', candidateName: '张晨', meetingNo: null });
  slots.push({ id: id++, weekday: 4, dateLabel: buildDateLabel(4), startTime: '14:00', endTime: '15:00', status: 'confirmed', candidateName: '王琳', meetingNo: '821-123-456' });
  return slots;
}

function statusLabel(s: Slot['status']) {
  return s === 'available' ? '✅ 可用' : s === 'reserved' ? '⏳ 待确认' : '📌 已确认';
}
function statusCls(s: Slot['status']) {
  return s === 'available' ? 'text-blue-700 bg-blue-50' : s === 'reserved' ? 'text-amber-800 bg-amber-50' : 'text-green-800 bg-green-50';
}
function weeklyStatusCls(s: string) {
  return s === 'confirmed' ? 'text-green-800 bg-green-50 border-green-200' : s === 'reserved' ? 'text-amber-800 bg-amber-50 border-amber-200' : 'text-slate-600 bg-slate-50 border-slate-200';
}
function weeklyStatusText(s: string) { return s === 'confirmed' ? '已确认' : s === 'reserved' ? '待确认' : '待预约'; }

export default function InterviewerPage() {
  const [slots, setSlots] = useState<Slot[]>(createDemoSlots);
  const [nextId, setNextId] = useState(100);
  const [logs, setLogs] = useState<string[]>([]);

  // Single slot form
  const [weekday, setWeekday] = useState(1);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('11:00');

  // Batch form
  const [batchType, setBatchType] = useState<'week' | 'month'>('week');
  const [batchMonth, setBatchMonth] = useState(() => ymd(new Date()).slice(0, 7));
  const [batchStart, setBatchStart] = useState('09:00');
  const [batchEnd, setBatchEnd] = useState('10:00');
  const [batchWeekdays, setBatchWeekdays] = useState<number[]>([1, 2, 3, 4, 5]);

  // Calendar
  const [calMonth, setCalMonth] = useState(() => new Date());
  const [calSelectedKey, setCalSelectedKey] = useState('');

  const addLog = useCallback((msg: string) => {
    setLogs(prev => [...prev.slice(-30), `${new Date().toLocaleTimeString()} - ${msg}`]);
  }, []);

  const addSlot = () => {
    if (!startTime || !endTime || startTime >= endTime) return;
    const label = buildDateLabel(weekday);
    const newSlot: Slot = { id: nextId, weekday, dateLabel: label, startTime, endTime, status: 'available', candidateName: null, meetingNo: null };
    setSlots(prev => [...prev, newSlot]);
    setNextId(prev => prev + 1);
    addLog(`同步推送新时段：${label} ${startTime}-${endTime}`);
  };

  const batchAdd = () => {
    if (!batchStart || !batchEnd || batchStart >= batchEnd || batchWeekdays.length === 0) return;
    if (batchType === 'month' && !batchMonth) return;
    const dates: Date[] = [];
    if (batchType === 'week') {
      const start = new Date(); start.setHours(0, 0, 0, 0);
      for (let i = 0; i < 7; i++) { const d = new Date(start); d.setDate(start.getDate() + i); dates.push(d); }
    } else {
      const [year, month] = batchMonth.split('-').map(Number);
      const first = new Date(year, month - 1, 1);
      const nextFirst = new Date(year, month, 1);
      for (let d = new Date(first); d < nextFirst; d.setDate(d.getDate() + 1)) dates.push(new Date(d));
    }
    const existingKeys = new Set(slots.map(s => `${s.dateLabel}|${s.startTime}|${s.endTime}`));
    let added = 0, skipped = 0, id = nextId;
    const newSlots: Slot[] = [];
    dates.forEach(d => {
      if (!batchWeekdays.includes(d.getDay())) return;
      const label = buildDateLabelFromDate(d);
      const key = `${label}|${batchStart}|${batchEnd}`;
      if (existingKeys.has(key)) { skipped++; return; }
      newSlots.push({ id: id++, weekday: d.getDay(), dateLabel: label, startTime: batchStart, endTime: batchEnd, status: 'available', candidateName: null, meetingNo: null });
      existingKeys.add(key);
      added++;
    });
    setSlots(prev => [...prev, ...newSlots]);
    setNextId(id);
    addLog(`批量发布完成：新增 ${added} 条，跳过重复 ${skipped} 条`);
  };

  const confirmSlot = (slotId: number) => {
    setSlots(prev => prev.map(s => s.id === slotId && s.status === 'reserved' ? { ...s, status: 'confirmed' } : s));
    const slot = slots.find(s => s.id === slotId);
    if (slot) addLog(`面试官已确认：${slot.dateLabel} ${slot.startTime}-${slot.endTime}`);
  };

  const createMeeting = (slotId: number) => {
    const no = `${800 + Math.floor(Math.random() * 200)}-${100 + Math.floor(Math.random() * 900)}-${100 + Math.floor(Math.random() * 900)}`;
    setSlots(prev => prev.map(s => s.id === slotId && s.status === 'confirmed' ? { ...s, meetingNo: no } : s));
    addLog(`已创建腾讯会议：${no}`);
  };

  // Calendar data
  const groupedByDate = useMemo(() => {
    const g: Record<string, Slot[]> = {};
    slots.forEach(s => { const key = s.dateLabel.slice(0, 10); if (!g[key]) g[key] = []; g[key].push(s); });
    return g;
  }, [slots]);

  const calFirst = new Date(calMonth.getFullYear(), calMonth.getMonth(), 1);
  const calStart = new Date(calFirst); calStart.setDate(1 - calFirst.getDay());

  const calCells = useMemo(() => {
    const cells: { key: string; date: Date; count: number; isCurrentMonth: boolean }[] = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(calStart); d.setDate(calStart.getDate() + i);
      const key = ymd(d);
      cells.push({ key, date: d, count: groupedByDate[key]?.length ?? 0, isCurrentMonth: d.getMonth() === calMonth.getMonth() });
    }
    return cells;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calMonth, groupedByDate]);

  const selectedSlots = (groupedByDate[calSelectedKey] ?? []).sort((a, b) => a.startTime.localeCompare(b.startTime));
  const selectedDate = calSelectedKey ? dateFromKey(calSelectedKey) : new Date();

  const pendingConfirm = slots.filter(s => s.status === 'reserved' || s.status === 'confirmed');

  const toggleBatchWeekday = (wd: number) => {
    setBatchWeekdays(prev => prev.includes(wd) ? prev.filter(w => w !== wd) : [...prev, wd]);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="grid grid-cols-[340px_1fr] gap-4 items-start max-lg:grid-cols-1">
        {/* 左侧：日历 + 本周待面 */}
        <div className="bg-white rounded-xl border border-border p-4 space-y-4">
          <h2 className="text-sm font-bold">📅 面试日历视图</h2>
          <p className="text-xs text-muted">按日期展示当前已发布日程。</p>

          {/* 月历导航 */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{calMonth.getFullYear()}年{calMonth.getMonth() + 1}月</span>
            <div className="flex gap-1">
              <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() - 1, 1))} className="p-1 border border-border rounded hover:bg-slate-50"><ChevronLeft className="w-3.5 h-3.5" /></button>
              <button onClick={() => { const now = new Date(); setCalMonth(new Date(now.getFullYear(), now.getMonth(), 1)); setCalSelectedKey(ymd(now)); }} className="px-2 py-0.5 text-xs border border-border rounded hover:bg-slate-50">今天</button>
              <button onClick={() => setCalMonth(new Date(calMonth.getFullYear(), calMonth.getMonth() + 1, 1))} className="p-1 border border-border rounded hover:bg-slate-50"><ChevronRight className="w-3.5 h-3.5" /></button>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] text-muted">
            {WEEK_NAMES.map(w => <div key={w}>{w}</div>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {calCells.map(cell => (
              <button key={cell.key} type="button" onClick={() => setCalSelectedKey(cell.key)} className={`relative border rounded-lg min-h-[46px] p-1 text-left text-xs transition ${cell.isCurrentMonth ? '' : 'text-slate-300'} ${calSelectedKey === cell.key ? 'border-blue-600 shadow-sm ring-1 ring-blue-100' : 'border-border hover:border-slate-300'}`}>
                <div>{cell.date.getDate()}</div>
                {cell.count > 0 && <div className="absolute right-1 bottom-1 text-[10px] rounded-full px-1 bg-blue-100 text-blue-800 border border-blue-200">🎯{cell.count}</div>}
              </button>
            ))}
          </div>

          {/* 选中日期详情 */}
          {calSelectedKey && (
            <div className="border-t border-border pt-3">
              <p className="text-xs text-muted mb-1">📅 {calSelectedKey} 周{WEEK_NAMES[selectedDate.getDay()]}（{selectedSlots.length} 条）</p>
              {selectedSlots.length === 0 ? <p className="text-xs text-muted">🕒 该日期暂无日程</p> : (
                <div className="space-y-1">
                  {selectedSlots.map(s => (
                    <div key={s.id} className="text-xs">⏱ {s.startTime}-{s.endTime} | {statusLabel(s.status)}{s.candidateName ? ` | ${s.candidateName}` : ''}</div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 本周待面试 */}
          <div className="border-t border-border pt-3">
            <h3 className="text-sm font-bold mb-1">👥 本周待面试人员</h3>
            <p className="text-xs text-muted mb-2">仅展示已指定给当前面试官的候选人。</p>
            <div className="space-y-2">
              {DEMO_WEEKLY.map(item => (
                <div key={item.name} className="border border-border rounded-lg p-2">
                  <div className="text-xs font-bold">{item.name}</div>
                  <div className="text-[11px] text-muted">{item.profile} · {item.jobName}</div>
                  {item.interviewers.length > 0 && <div className="text-[11px] text-muted">面试官：{item.interviewers.join('、')}</div>}
                  <div className="text-[11px] text-muted">预约时段：{item.schedule}</div>
                  <span className={`inline-block mt-1 text-[11px] rounded-full px-2 py-0.5 border ${weeklyStatusCls(item.status)}`}>{weeklyStatusText(item.status)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 右侧 */}
        <div className="space-y-4">
          {/* 设置空闲时段 */}
          <div className="bg-white rounded-xl border border-border p-4">
            <h2 className="text-sm font-bold mb-1">🧩 设置每周空闲时段</h2>
            <p className="text-xs text-muted mb-3">添加后会同步推送到候选人端的可抢占列表。</p>
            <div className="flex gap-2 flex-wrap items-end mb-3">
              <select value={weekday} onChange={e => setWeekday(Number(e.target.value))} className="border border-border rounded-lg px-2 py-1.5 text-sm">
                <option value={1}>周一</option><option value={2}>周二</option><option value={3}>周三</option>
                <option value={4}>周四</option><option value={5}>周五</option><option value={6}>周六</option><option value={0}>周日</option>
              </select>
              <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} className="border border-border rounded-lg px-2 py-1.5 text-sm" />
              <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} className="border border-border rounded-lg px-2 py-1.5 text-sm" />
              <button onClick={addSlot} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium"><Plus className="w-3.5 h-3.5" /> 添加时段</button>
            </div>
            <div className="border border-dashed border-border rounded-lg p-2 max-h-64 overflow-auto bg-slate-50/50 space-y-1.5">
              {slots.length === 0 && <div className="text-xs text-muted py-3 text-center">暂无时段</div>}
              {slots.map(s => (
                <div key={s.id} className="flex items-center justify-between border border-border rounded-lg px-2.5 py-2 bg-white text-xs">
                  <div>{s.dateLabel} {s.startTime}-{s.endTime}</div>
                  <span className={`text-xs rounded-full px-2 py-0.5 font-bold ${statusCls(s.status)}`}>{statusLabel(s.status)}</span>
                </div>
              ))}
            </div>

            {/* 批量设置 */}
            <div className="border-t border-border mt-4 pt-3">
              <h3 className="text-sm font-bold mb-1">批量设置空闲日程</h3>
              <p className="text-xs text-muted mb-2">支持一次性发布整周或整月空闲时间。</p>
              <div className="flex gap-2 flex-wrap items-end mb-2">
                <select value={batchType} onChange={e => setBatchType(e.target.value as 'week' | 'month')} className="border border-border rounded-lg px-2 py-1.5 text-sm">
                  <option value="week">整周（未来7天）</option>
                  <option value="month">整月（选择月份）</option>
                </select>
                {batchType === 'month' && <input type="month" value={batchMonth} onChange={e => setBatchMonth(e.target.value)} className="border border-border rounded-lg px-2 py-1.5 text-sm" />}
                <input type="time" value={batchStart} onChange={e => setBatchStart(e.target.value)} className="border border-border rounded-lg px-2 py-1.5 text-sm" />
                <input type="time" value={batchEnd} onChange={e => setBatchEnd(e.target.value)} className="border border-border rounded-lg px-2 py-1.5 text-sm" />
                <button onClick={batchAdd} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-sm font-medium"><CalendarDays className="w-3.5 h-3.5" /> 批量添加</button>
              </div>
              <div className="flex flex-wrap gap-3 mb-1">
                {[1, 2, 3, 4, 5, 6, 0].map(wd => (
                  <label key={wd} className="flex items-center gap-1 text-xs text-slate-700">
                    <input type="checkbox" checked={batchWeekdays.includes(wd)} onChange={() => toggleBatchWeekday(wd)} className="accent-blue-600" />
                    周{WEEK_NAMES[wd]}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 待确认与已确认 */}
          <div className="bg-white rounded-xl border border-border p-4">
            <h2 className="text-sm font-bold mb-1">🧾 待确认与已确认日程</h2>
            <p className="text-xs text-muted mb-3">候选人抢占后进入待确认。确认后可一键创建腾讯会议。</p>
            <div className="border border-dashed border-border rounded-lg p-2 max-h-64 overflow-auto bg-slate-50/50 space-y-1.5">
              {pendingConfirm.length === 0 && <div className="text-xs text-muted py-3 text-center">暂无待处理预约</div>}
              {pendingConfirm.map(s => (
                <div key={s.id} className="flex items-center justify-between gap-2 border border-border rounded-lg px-2.5 py-2 bg-white text-xs">
                  <div>
                    <div>{s.dateLabel} {s.startTime}-{s.endTime}{s.candidateName ? `（候选人：${s.candidateName}）` : ''}</div>
                    {s.meetingNo && <div className="text-muted mt-0.5">腾讯会议：{s.meetingNo}</div>}
                  </div>
                  <div className="flex items-center gap-2">
                    {s.status === 'reserved' && (
                      <button onClick={() => confirmSlot(s.id)} className="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-medium">✅ 确认面试</button>
                    )}
                    {s.status === 'confirmed' && (
                      <button onClick={() => createMeeting(s.id)} className="px-2 py-0.5 rounded-lg border border-border hover:bg-slate-50">{s.meetingNo ? '🔁 重新生成' : '📞 创建腾讯会议'}</button>
                    )}
                    <span className={`rounded-full px-2 py-0.5 font-bold ${statusCls(s.status)}`}>{statusLabel(s.status)}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 日志 */}
            <div className="border-t border-border mt-3 pt-2 max-h-32 overflow-auto">
              <div className="text-xs font-semibold mb-1">推送/状态日志：</div>
              {logs.length === 0 ? <div className="text-xs text-muted">暂无日志</div> : logs.slice(-12).map((l, i) => <div key={i} className="text-xs text-slate-600">{l}</div>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
