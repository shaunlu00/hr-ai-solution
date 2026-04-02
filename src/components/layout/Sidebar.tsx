'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Megaphone, FileSearch, CalendarClock, Bot, Users, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, Target, GraduationCap, LayoutDashboard, Sparkles,
  Kanban, BrainCircuit, Handshake, Presentation,
} from 'lucide-react';
import { PIPELINE_STAGES } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Megaphone, FileSearch, CalendarClock, Bot, Users, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, Target, GraduationCap,
};

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-sidebar-bg text-sidebar-text flex flex-col z-50">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/10">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white leading-tight">AI 人才引进</h1>
            <p className="text-[10px] text-slate-400">智能招聘管理平台</p>
          </div>
        </Link>
      </div>

      {/* Dashboard Link */}
      <div className="px-3 pt-4 pb-2">
        <Link
          href="/"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === '/'
              ? 'bg-sidebar-active text-white'
              : 'hover:bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          <span>招聘总览</span>
        </Link>
        <Link
          href="/pipeline-ops"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === '/pipeline-ops'
              ? 'bg-sidebar-active text-white'
              : 'hover:bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Kanban className="w-4 h-4" />
          <span>全流程运营看板</span>
        </Link>
        <Link
          href="/ai-agent-ops"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === '/ai-agent-ops'
              ? 'bg-sidebar-active text-white'
              : 'hover:bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <BrainCircuit className="w-4 h-4" />
          <span>AI智能体运营看板</span>
        </Link>
        <Link
          href="/ai-collaboration"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === '/ai-collaboration'
              ? 'bg-sidebar-active text-white'
              : 'hover:bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Handshake className="w-4 h-4" />
          <span>AI×HR协作图谱</span>
        </Link>
        <Link
          href="/slides"
          className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all ${
            pathname === '/slides'
              ? 'bg-sidebar-active text-white'
              : 'hover:bg-white/5 text-slate-400 hover:text-white'
          }`}
        >
          <Presentation className="w-4 h-4" />
          <span>方案汇报Slides</span>
        </Link>
      </div>

      {/* Pipeline Stages */}
      <div className="px-3 pt-2 pb-2">
        <p className="px-3 text-[10px] font-medium text-slate-500 uppercase tracking-wider mb-2">
          招聘流程
        </p>
        <nav className="space-y-0.5 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
          {PIPELINE_STAGES.map((stage, index) => {
            const Icon = iconMap[stage.icon];
            const href = `/${stage.key}`;
            const isActive = pathname === href;

            return (
              <Link
                key={stage.key}
                href={href}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all group ${
                  isActive
                    ? 'bg-sidebar-active text-white'
                    : 'hover:bg-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 ${
                    isActive ? 'bg-white/20' : 'bg-white/5 group-hover:bg-white/10'
                  }`}
                  style={{ color: isActive ? '#fff' : stage.color }}
                >
                  {Icon ? <Icon className="w-3.5 h-3.5" /> : (index + 1)}
                </span>
                <span className="truncate">{stage.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="mt-auto px-5 py-4 border-t border-white/10">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 flex items-center justify-center text-xs text-white font-medium">
            HR
          </div>
          <div>
            <p className="text-xs text-white font-medium">HR Admin</p>
            <p className="text-[10px] text-slate-500">人力资源部</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
