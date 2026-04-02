'use client';

import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { CheckCircle2, Circle, Clock, Laptop, FileText, Users, BookOpen } from 'lucide-react';

export default function OnboardingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="info"
        title="AI入职管家"
        content="张明远的入职流程已完成 60%。设备申请和系统账号已自动创建，还需完成入职文件签署、团队介绍和岗位培训安排。"
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground">入职清单 — 张明远</h3>
          </div>
          <div className="p-5 space-y-3">
            {[
              { task: '发送入职通知邮件', status: 'done', auto: true, date: '03-28', icon: FileText },
              { task: '创建企业邮箱和系统账号', status: 'done', auto: true, date: '03-28', icon: Laptop },
              { task: '申请工位和设备', status: 'done', auto: true, date: '03-29', icon: Laptop },
              { task: '生成入职文件包', status: 'done', auto: true, date: '03-29', icon: FileText },
              { task: '签署劳动合同', status: 'in-progress', auto: false, date: '预计04-15', icon: FileText },
              { task: '安排入职培训', status: 'pending', auto: true, date: '预计04-15', icon: BookOpen },
              { task: '安排buddy和团队介绍', status: 'pending', auto: false, date: '预计04-16', icon: Users },
              { task: '30天融入计划制定', status: 'pending', auto: true, date: '预计04-16', icon: BookOpen },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg ${
                  item.status === 'done' ? 'bg-green-50/50' : item.status === 'in-progress' ? 'bg-amber-50/50' : 'bg-slate-50'
                }`}>
                  {item.status === 'done' ? <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" /> :
                   item.status === 'in-progress' ? <Clock className="w-4 h-4 text-amber-500 shrink-0" /> :
                   <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
                  <Icon className="w-4 h-4 text-muted shrink-0" />
                  <div className="flex-1">
                    <span className={`text-sm ${item.status === 'done' ? 'text-muted line-through' : 'text-foreground'}`}>
                      {item.task}
                    </span>
                    {item.auto && (
                      <span className="ml-2 px-1.5 py-0.5 rounded bg-accent/10 text-accent text-[10px] font-medium">AI自动</span>
                    )}
                  </div>
                  <span className="text-[10px] text-muted shrink-0">{item.date}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">入职进度</h3>
            <div className="relative w-32 h-32 mx-auto">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="#6366f1" strokeWidth="8"
                  strokeDasharray={`${0.6 * 264} 264`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-accent">60%</span>
              </div>
            </div>
            <p className="text-center text-xs text-muted mt-2">5/8 任务已完成</p>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">入职信息</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-muted">姓名</span><span className="font-medium">张明远</span></div>
              <div className="flex justify-between"><span className="text-muted">岗位</span><span className="font-medium">高级前端工程师</span></div>
              <div className="flex justify-between"><span className="text-muted">部门</span><span className="font-medium">技术部</span></div>
              <div className="flex justify-between"><span className="text-muted">入职日</span><span className="font-medium">2024-04-15</span></div>
              <div className="flex justify-between"><span className="text-muted">Buddy</span><span className="font-medium">刘晨（高级前端）</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
