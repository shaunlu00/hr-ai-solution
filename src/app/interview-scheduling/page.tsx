'use client';

import { mockCandidates } from '@/lib/mock-data';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import AiChatPanel from '@/components/ai/AiChatPanel';
import { CalendarDays, Clock, Video, MapPin } from 'lucide-react';

export default function InterviewSchedulingPage() {
  const candidates = mockCandidates.filter(c => ['interview-scheduling', 'ai-interview'].includes(c.stage));

  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="success"
        title="自动约面完成"
        content="AI已为 8 位候选人自动协调面试时间。其中 6 位候选人确认了AI推荐的时间段，2 位需要人工确认调整。平均约面耗时 < 2 分钟/人。"
        actions={[{ label: '查看排期' }]}
      />

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">面试排期</h3>
          </div>
          <div className="divide-y divide-border">
            {[
              { name: '张明远', avatar: '👨‍💻', date: '03-25 14:00', type: 'AI面试', method: 'video', status: '已确认' },
              { name: '陈雨桐', avatar: '👩‍🎓', date: '03-26 10:00', type: 'AI面试', method: 'video', status: '已确认' },
              { name: '赵晓萌', avatar: '👩‍💼', date: '03-27 15:00', type: 'AI面试', method: 'video', status: '待确认' },
              { name: '李思颖', avatar: '👩‍💻', date: '03-28 09:00', type: 'AI面试', method: 'video', status: '已确认' },
            ].map((item, i) => (
              <div key={i} className="p-4 hover:bg-slate-50/50 transition flex items-center gap-3">
                <span className="text-xl">{item.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <div className="flex items-center gap-3 text-[10px] text-muted mt-0.5">
                    <span className="flex items-center gap-0.5"><CalendarDays className="w-3 h-3" /> {item.date}</span>
                    <span className="flex items-center gap-0.5"><Video className="w-3 h-3" /> {item.method}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                  item.status === '已确认' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                }`}>{item.status}</span>
              </div>
            ))}
          </div>
        </div>

        <AiChatPanel
          title="约面调度助手"
          placeholder="输入候选人姓名或需求..."
          initialMessages={[
            { id: '1', role: 'ai', content: '我已分析了候选人和面试官的日历空闲时段。有 3 位候选人可在本周完成AI初面，需要我为你安排吗？', timestamp: '09:00' },
          ]}
        />
      </div>
    </div>
  );
}
