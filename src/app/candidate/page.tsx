'use client';

import { useState, useCallback } from 'react';

/* ─── 数据类型 ─── */
interface Slot {
  id: number;
  dateLabel: string;
  startTime: string;
  endTime: string;
  status: 'available' | 'reserved' | 'confirmed';
  candidateName: string | null;
  meetingNo: string | null;
}

interface AiMessage { role: 'user' | 'bot'; text: string; }

const CANDIDATE_NAME = '张三';

const HRBP = { name: '李晓岚', phone: '15174455457', email: 'hrbp.abc@example.com', dept: '人力科技部' };

const WEEK_NAMES = ['日', '一', '二', '三', '四', '五', '六'];
function toDateInCurrentWeek(wd: number) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  const diff = wd - now.getDay();
  const d = new Date(now); d.setDate(now.getDate() + diff + (diff < 0 ? 7 : 0));
  return d;
}
function ymd(d: Date) { return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function buildDateLabel(wd: number) { const d = toDateInCurrentWeek(wd); return `${ymd(d)} 周${WEEK_NAMES[d.getDay()]}`; }

function createDemoSlots(): Slot[] {
  let id = 1;
  return [
    { id: id++, dateLabel: buildDateLabel(1), startTime: '10:00', endTime: '11:00', status: 'available', candidateName: null, meetingNo: null },
    { id: id++, dateLabel: buildDateLabel(2), startTime: '10:00', endTime: '11:00', status: 'available', candidateName: null, meetingNo: null },
    { id: id++, dateLabel: buildDateLabel(3), startTime: '14:00', endTime: '15:00', status: 'available', candidateName: null, meetingNo: null },
    { id: id++, dateLabel: buildDateLabel(4), startTime: '09:30', endTime: '10:30', status: 'available', candidateName: null, meetingNo: null },
    { id: id++, dateLabel: buildDateLabel(5), startTime: '15:00', endTime: '16:00', status: 'available', candidateName: null, meetingNo: null },
    { id: id++, dateLabel: buildDateLabel(3), startTime: '10:00', endTime: '11:00', status: 'reserved', candidateName: CANDIDATE_NAME, meetingNo: null },
    { id: id++, dateLabel: buildDateLabel(4), startTime: '14:00', endTime: '15:00', status: 'confirmed', candidateName: CANDIDATE_NAME, meetingNo: '821-123-456' },
  ];
}

/* ─── AI FAQ 知识库 ─── */
const AI_KB: { keywords: string[]; answer: string }[] = [
  { keywords: ['offer', '录用', '接收', '签约', '通知'], answer: '一般流程：\n1) 收到录用通知后，确认岗位信息与工作地点。\n2) 按通知要求在规定时间内完成签署/确认。\n3) 关注后续的入职时间安排、体检/材料提交要求。\n\n提示：具体以录用通知书与劳动合同条款为准。' },
  { keywords: ['入职', '材料', '证件', '学历', '身份证', '体检'], answer: '常见入职材料清单：\n- 身份证件/照片\n- 学历与学位证明\n- 相关资格证书\n- 个人银行卡信息\n- 体检证明\n- 背景调查授权材料\n\n建议以"入职须知/材料提交清单"为准。' },
  { keywords: ['试用期', '考核', '转正', '考察'], answer: '试用期通常为 3-6 个月，期间会有工作目标与阶段性考核。\n转正一般需完成约定目标并通过综合评估。\n\n具体期限以正式文件为准。' },
  { keywords: ['保密', '竞业', '知识产权', '合规'], answer: '公司通常要求员工遵守保密义务与合规要求（如保密协议、数据管理规定等）。\n关于竞业限制条款，以劳动合同/补充协议为准。' },
  { keywords: ['考勤', '请假', '迟到', '旷工', '加班'], answer: '考勤与请假以公司制度为准。\n常见原则：\n1) 迟到/早退需按规定说明。\n2) 请假需提前申请。\n3) 旷工会触发纪律处理。\n4) 加班/调休需审批。' },
];

function aiGetAnswer(question: string): string {
  const q = question.toLowerCase().replace(/\s+/g, '');
  for (const item of AI_KB) {
    if (item.keywords.some(k => q.includes(k))) return item.answer;
  }
  return `我可以回答常见的公司政策、规章制度与入职须知问题。\n\n需要人工确认时可联系 HRBP：${HRBP.name}（${HRBP.phone}，${HRBP.email}）。`;
}

const AI_CHIPS = [
  { label: '接受 Offer', q: '如何接受录用通知（Offer）？' },
  { label: '入职材料', q: '入职需要准备哪些材料？' },
  { label: '试用期', q: '试用期一般多久？考核如何进行？' },
  { label: '保密/竞业', q: '公司有哪些保密与竞业要求？' },
  { label: '考勤请假', q: '考勤/请假/迟到旷工的基本规则是什么？' },
];

export default function CandidatePage() {
  const [slots, setSlots] = useState<Slot[]>(createDemoSlots);
  const [aiMessages, setAiMessages] = useState<AiMessage[]>([
    { role: 'bot', text: `你好，我是候选人智能问答机器人。\n我可以回答公司政策/规章制度/入职须知的常规问题。\n需要人工确认时可联系 HRBP：${HRBP.name}（${HRBP.phone}）。` },
  ]);
  const [aiInput, setAiInput] = useState('');

  const reserve = useCallback((slotId: number) => {
    setSlots(prev => prev.map(s => s.id === slotId && s.status === 'available'
      ? { ...s, status: 'reserved', candidateName: CANDIDATE_NAME, meetingNo: null }
      : s
    ));
  }, []);

  const cancelReservation = useCallback((slotId: number) => {
    setSlots(prev => prev.map(s => s.id === slotId && s.status === 'reserved' && s.candidateName === CANDIDATE_NAME
      ? { ...s, status: 'available', candidateName: null, meetingNo: null }
      : s
    ));
  }, []);

  const aiAsk = useCallback((question: string) => {
    if (!question.trim()) return;
    setAiMessages(prev => [...prev, { role: 'user', text: question }]);
    setTimeout(() => {
      setAiMessages(prev => [...prev, { role: 'bot', text: aiGetAnswer(question) }]);
    }, 400);
  }, []);

  const available = slots.filter(s => s.status === 'available');
  const myBookings = slots.filter(s => s.candidateName === CANDIDATE_NAME && (s.status === 'reserved' || s.status === 'confirmed'));

  return (
    <div className="space-y-4 animate-fade-in">
      {/* 可抢占时段 + AI助手 */}
      <div className="bg-white rounded-xl border border-border p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold">🕒 可抢占时段</h2>
          <button className="px-3 py-1 text-xs border border-border rounded-lg hover:bg-slate-50 font-semibold">时间均不匹配</button>
        </div>

        <div className="grid grid-cols-[1fr_340px] gap-4 items-start max-lg:grid-cols-1">
          {/* 左侧：HRBP + 时段列表 */}
          <div>
            {/* HRBP 面板 */}
            <div className="flex items-center gap-3 p-3 border border-border rounded-xl bg-slate-50 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-sm font-bold text-blue-700 border border-blue-200">
                {HRBP.name[0]}
              </div>
              <div>
                <div className="text-sm font-bold">🤝 HRBP：{HRBP.name}</div>
                <div className="flex gap-3 flex-wrap text-xs text-slate-600 font-semibold mt-0.5">
                  <span>📱 {HRBP.phone}</span>
                  <span>✉️ {HRBP.email}</span>
                  <span>🏢 {HRBP.dept}</span>
                </div>
              </div>
            </div>

            <div className="border border-dashed border-border rounded-lg p-2 max-h-56 overflow-auto bg-slate-50/50 space-y-1.5">
              {available.length === 0 && <div className="text-xs text-muted py-4 text-center">⏳ 当前无可抢占时段</div>}
              {available.map(s => (
                <div key={s.id} className="flex items-center justify-between border border-border rounded-lg px-2.5 py-2 bg-white text-xs">
                  <div>🗓️ {s.dateLabel} {s.startTime}-{s.endTime}</div>
                  <button onClick={() => reserve(s.id)} className="px-2 py-0.5 rounded-lg bg-blue-600 text-white font-bold">⚡ 立即抢占</button>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧：AI 助手 */}
          <div className="border border-border rounded-xl bg-slate-50 p-3 flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-sm font-bold">🤖 候选人AI小助手</h3>
            </div>
            <p className="text-xs text-muted font-semibold mb-2">可回答公司政策/规章制度/入职须知的常见问题</p>
            <div className="flex-1 border border-border rounded-lg bg-white p-2 max-h-56 overflow-auto space-y-2 mb-2">
              {aiMessages.map((m, i) => (
                <div key={i} className={`text-xs rounded-lg p-2 border whitespace-pre-wrap ${m.role === 'user' ? 'bg-indigo-50 border-indigo-200 ml-auto max-w-[90%]' : 'bg-slate-50 border-border'}`}>
                  {m.text}
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {AI_CHIPS.map(c => (
                <button key={c.label} onClick={() => aiAsk(c.q)} className="border border-border bg-white rounded-full px-2.5 py-1 text-[11px] font-bold text-slate-600 hover:bg-blue-50 transition">{c.label}</button>
              ))}
            </div>
            <div className="flex gap-2">
              <input value={aiInput} onChange={e => setAiInput(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { aiAsk(aiInput); setAiInput(''); } }} placeholder="输入问题…" className="flex-1 border border-border rounded-lg px-2 py-1.5 text-xs" />
              <button onClick={() => { aiAsk(aiInput); setAiInput(''); }} className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:bg-slate-50">发送</button>
            </div>
          </div>
        </div>
      </div>

      {/* 我的预约进度 */}
      <div className="bg-white rounded-xl border border-border p-4">
        <h2 className="text-sm font-bold mb-1">📌 我的预约进度</h2>
        <p className="text-xs text-muted mb-3">可查看待确认/已确认状态。面试官创建腾讯会议后，可直接入会。</p>
        <div className="border border-dashed border-border rounded-lg p-2 max-h-60 overflow-auto bg-slate-50/50 space-y-1.5">
          {myBookings.length === 0 && <div className="text-xs text-muted py-4 text-center">📭 你还没有预约记录</div>}
          {myBookings.map(s => (
            <div key={s.id} className="flex items-center justify-between gap-2 border border-border rounded-lg px-2.5 py-2 bg-white text-xs">
              <div>
                <div>{s.dateLabel} {s.startTime}-{s.endTime}</div>
                {s.meetingNo && <div className="text-muted mt-0.5">📞 腾讯会议：{s.meetingNo}</div>}
              </div>
              <div className="flex items-center gap-2">
                {s.status === 'reserved' && (
                  <button onClick={() => cancelReservation(s.id)} className="px-2 py-0.5 rounded-lg bg-red-50 border border-red-200 text-red-700 font-bold">取消预约</button>
                )}
                <span className={`rounded-full px-2 py-0.5 font-bold ${s.status === 'reserved' ? 'text-amber-800 bg-amber-50' : 'text-green-800 bg-green-50'}`}>
                  {s.status === 'reserved' ? '⏳ 待确认' : '📌 已确认'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
