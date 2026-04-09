'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  Megaphone, FileSearch, CalendarClock, Bot, Users, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, Target, GraduationCap, Sparkles,
  Kanban, BrainCircuit, Handshake, Presentation, Radar,
  ChevronDown, Map, BarChart3, CalendarDays, UserCog, User,
} from 'lucide-react';
import { PIPELINE_STAGES } from '@/lib/constants';

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Radar, Megaphone, FileSearch, CalendarClock, Bot, Users, Award,
  DollarSign, ClipboardCheck, Send, ShieldCheck, Heart,
  UserCheck, Target, GraduationCap,
};

/* ================================================================
   菜单分类定义
   ================================================================ */
interface MenuCategory {
  id: string;
  label: string;
  items: { key: string; label: string; icon: React.ReactNode; href: string }[];
}

const INTERVIEW_MGMT_ITEMS = [
  { key: 'interviewer-assignment', label: '面试官分配', icon: <UserCog className="w-3.5 h-3.5" />, href: '/interviewer-assignment' },
  { key: 'interviewer', label: '面试官端', icon: <Users className="w-3.5 h-3.5" />, href: '/interviewer' },
  { key: 'candidate', label: '候选人端', icon: <User className="w-3.5 h-3.5" />, href: '/candidate' },
  { key: 'interview-calendar', label: '面试日历', icon: <CalendarDays className="w-3.5 h-3.5" />, href: '/interview-calendar' },
];

const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: 'overview',
    label: '整体方案',
    items: [
      { key: 'slides', label: '方案汇报Slides', icon: <Presentation className="w-3.5 h-3.5" />, href: '/slides' },
    ],
  },
  {
    id: 'talent-radar',
    label: '人才战略雷达',
    items: [
      { key: 'talent-insights', label: '人才趋势分析', icon: <Radar className="w-3.5 h-3.5" />, href: '/talent-insights' },
      { key: 'talent-map', label: '人才地图', icon: <Map className="w-3.5 h-3.5" />, href: '/talent-map' },
    ],
  },
];

const OPS_DASHBOARD_CATEGORY: MenuCategory = {
  id: 'ops-dashboard',
  label: '运营看板',
  items: [
    { key: 'pipeline-ops', label: '全流程运营看板', icon: <Kanban className="w-3.5 h-3.5" />, href: '/pipeline-ops' },
    { key: 'ai-agent-ops', label: 'AI智能体运营看板', icon: <BrainCircuit className="w-3.5 h-3.5" />, href: '/ai-agent-ops' },
    { key: 'ai-collaboration', label: 'AI×HR协作图谱', icon: <Handshake className="w-3.5 h-3.5" />, href: '/ai-collaboration' },
  ],
};

export default function Sidebar() {
  const pathname = usePathname();

  // 根据当前路径自动展开对应分类
  const getInitialOpenState = () => {
    const open: Record<string, boolean> = { overview: true, 'talent-radar': true, 'ops-dashboard': true, pipeline: true, 'interview-mgmt': true };
    return open;
  };

  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>(getInitialOpenState);

  const toggleCategory = (id: string) => {
    setOpenCategories(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-sidebar-bg text-sidebar-text flex flex-col z-50 overflow-hidden">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-white/10 shrink-0">
        <Link href="/slides" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white leading-tight">HR X AI</h1>
          </div>
        </Link>
      </div>

      {/* Scrollable menu area */}
      <div className="flex-1 overflow-y-auto overscroll-contain py-3 sidebar-scroll">
        {/* 整体方案 & 人才战略雷达 */}
        {MENU_CATEGORIES.map(cat => (
          <div key={cat.id} className="px-3 mb-1">
            <button
              onClick={() => toggleCategory(cat.id)}
              className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-slate-300 tracking-wide hover:text-white transition"
            >
              <span>{cat.label}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openCategories[cat.id] ? '' : '-rotate-90'}`} />
            </button>
            {openCategories[cat.id] && (
              <nav className="space-y-0.5 mt-0.5">
                {cat.items.map(item => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all group ${
                        isActive
                          ? 'bg-sidebar-active text-white font-medium'
                          : 'hover:bg-white/8 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-white/20 text-white' : 'bg-white/8 group-hover:bg-white/15'
                      }`}>
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            )}
          </div>
        ))}

        {/* 招聘全流程 (14 stages) */}
        <div className="px-3 mb-1">
          <button
            onClick={() => toggleCategory('pipeline')}
            className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-slate-300 tracking-wide hover:text-white transition"
          >
            <span>招聘全流程</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openCategories['pipeline'] ? '' : '-rotate-90'}`} />
          </button>
          {openCategories['pipeline'] && (
            <nav className="space-y-0.5 mt-0.5">
              {PIPELINE_STAGES.map((stage, index) => {
                const Icon = iconMap[stage.icon];
                const href = `/${stage.key}`;
                const isActive = pathname === href;

                return (
                  <div key={stage.key}>
                    <Link
                      href={href}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all group ${
                        isActive
                          ? 'bg-sidebar-active text-white font-medium'
                          : 'hover:bg-white/8 text-slate-300 hover:text-white'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 ${
                          isActive ? 'bg-white/20' : 'bg-white/8 group-hover:bg-white/15'
                        }`}
                        style={{ color: isActive ? '#fff' : stage.color }}
                      >
                        {Icon ? <Icon className="w-3.5 h-3.5" /> : (index + 1)}
                      </span>
                      <span className="truncate">{stage.label}</span>
                    </Link>

                    {/* 面试管理子菜单，紧跟简历筛选 */}
                    {stage.key === 'resume-screening' && (
                      <div className="ml-3 mt-0.5">
                        <button
                          onClick={() => toggleCategory('interview-mgmt')}
                          className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-slate-400 tracking-wide hover:text-white transition"
                        >
                          <span>面试管理</span>
                          <ChevronDown className={`w-3 h-3 transition-transform ${openCategories['interview-mgmt'] ? '' : '-rotate-90'}`} />
                        </button>
                        {openCategories['interview-mgmt'] && (
                          <nav className="space-y-0.5">
                            {INTERVIEW_MGMT_ITEMS.map(item => {
                              const itemActive = pathname === item.href;
                              return (
                                <Link
                                  key={item.key}
                                  href={item.href}
                                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all group ${
                                    itemActive
                                      ? 'bg-sidebar-active text-white font-medium'
                                      : 'hover:bg-white/8 text-slate-300 hover:text-white'
                                  }`}
                                >
                                  <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                                    itemActive ? 'bg-white/20 text-white' : 'bg-white/8 group-hover:bg-white/15'
                                  }`}>
                                    {item.icon}
                                  </span>
                                  <span className="truncate">{item.label}</span>
                                </Link>
                              );
                            })}
                          </nav>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </div>

        {/* 运营看板 */}
        <div className="px-3 mb-1">
          <button
            onClick={() => toggleCategory(OPS_DASHBOARD_CATEGORY.id)}
            className="w-full flex items-center justify-between px-3 py-2 text-[11px] font-semibold text-slate-300 tracking-wide hover:text-white transition"
          >
            <span>{OPS_DASHBOARD_CATEGORY.label}</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${openCategories[OPS_DASHBOARD_CATEGORY.id] ? '' : '-rotate-90'}`} />
          </button>
          {openCategories[OPS_DASHBOARD_CATEGORY.id] && (
            <nav className="space-y-0.5 mt-0.5">
              {OPS_DASHBOARD_CATEGORY.items.map(item => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-all group ${
                      isActive
                        ? 'bg-sidebar-active text-white font-medium'
                        : 'hover:bg-white/8 text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : 'bg-white/8 group-hover:bg-white/15'
                    }`}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="shrink-0 px-5 py-4 border-t border-white/10">
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
