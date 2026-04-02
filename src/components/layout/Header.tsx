'use client';

import { usePathname } from 'next/navigation';
import { Bell, Search } from 'lucide-react';
import { PIPELINE_STAGES } from '@/lib/constants';

export default function Header() {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/') return { title: '招聘总览', desc: '实时掌握招聘全流程状态' };
    if (pathname === '/pipeline-ops') return { title: '招聘全流程运营看板', desc: '人机协作全景矩阵 · 每个环节的推进方式一目了然' };
    if (pathname === '/ai-agent-ops') return { title: 'AI智能体运营看板', desc: '智能体工作状态、准确率、效能与成本全览' };
    if (pathname === '/ai-collaboration') return { title: 'AI×HR 协作图谱', desc: '全流程14个环节人机协作模式 · 提质增效全景图' };
    if (pathname === '/slides') return { title: 'AI人才引进方案 · 汇报演示', desc: '13页方案Slides · 支持全屏演示和键盘导航' };
    const stage = PIPELINE_STAGES.find(s => `/${s.key}` === pathname);
    if (stage) return { title: stage.label, desc: stage.description };
    return { title: 'AI人才引进', desc: '智能招聘管理平台' };
  };

  const { title, desc } = getPageTitle();

  return (
    <header className="h-14 border-b border-border bg-white flex items-center justify-between px-6 shrink-0">
      <div>
        <h2 className="text-base font-semibold text-foreground">{title}</h2>
        <p className="text-xs text-muted">{desc}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="搜索候选人、岗位..."
            className="h-8 w-56 pl-9 pr-3 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition"
          />
        </div>
        <button className="relative w-8 h-8 rounded-lg bg-background border border-border flex items-center justify-center hover:bg-accent-light transition">
          <Bell className="w-4 h-4 text-muted" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-danger text-white text-[10px] rounded-full flex items-center justify-center">3</span>
        </button>
      </div>
    </header>
  );
}
