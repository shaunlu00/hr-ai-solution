'use client';

import AiScoreBar from '@/components/ai/AiScoreBar';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import AiPredictionGauge from '@/components/ai/AiPredictionGauge';
import { Target, TrendingUp, Calendar, MessageSquare } from 'lucide-react';

export default function ProbationPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="success"
        title="AI试用期评估"
        content="张明远试用期已进行 45天/90天。AI综合评估表现优秀（92分），代码贡献活跃，团队融入良好。预计顺利转正概率 95%。"
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-5 py-4 border-b border-border">
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
              <Target className="w-4 h-4 text-accent" /> 试用期目标与进展
            </h3>
          </div>
          <div className="p-5 space-y-4">
            {[
              { goal: '独立完成2个前端需求开发', progress: 100, detail: '已完成「用户中心重构」和「数据看板优化」两个需求', status: '已完成' },
              { goal: '通过代码规范考核', progress: 100, detail: 'Code Review通过率98%，代码质量评分A', status: '已完成' },
              { goal: '完成1次技术分享', progress: 60, detail: '主题「微前端实践」已准备，排期在第8周', status: '进行中' },
              { goal: '参与On-call值班', progress: 30, detail: '已完成1次值班，计划共3次', status: '进行中' },
            ].map((g, i) => (
              <div key={i} className="p-4 rounded-lg bg-slate-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{g.goal}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
                    g.status === '已完成' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                  }`}>{g.status}</span>
                </div>
                <AiScoreBar score={g.progress} showLabel={false} />
                <p className="text-[11px] text-muted mt-2">{g.detail}</p>
              </div>
            ))}
          </div>

          {/* 月度评估 */}
          <div className="px-5 pb-5">
            <h4 className="text-xs font-semibold text-foreground mb-3 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-accent" /> 月度评估
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {[
                { month: '第1个月', score: 88, feedback: '上手速度快，代码质量好。建议多参与业务讨论。' },
                { month: '第2个月（当前）', score: 92, feedback: '进步明显，已能独立负责模块。团队协作积极。' },
              ].map((m, i) => (
                <div key={i} className="p-3 rounded-lg border border-border">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium">{m.month}</span>
                    <span className="text-sm font-bold text-accent">{m.score}分</span>
                  </div>
                  <p className="text-[10px] text-muted">{m.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <AiPredictionGauge value={95} label="转正概率" />
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">能力雷达</h3>
            <div className="space-y-2">
              <AiScoreBar score={95} label="技术能力" />
              <AiScoreBar score={88} label="学习能力" />
              <AiScoreBar score={85} label="沟通协作" />
              <AiScoreBar score={80} label="业务理解" />
              <AiScoreBar score={90} label="工作态度" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-xs font-semibold text-foreground mb-2 flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-accent" /> 导师反馈
            </h3>
            <p className="text-[11px] text-muted leading-relaxed">
              "明远的技术基础扎实，对新框架和新技术的学习能力很强。第二个月开始已经能独立设计方案并推动落地。
              建议接下来多参与跨团队协作项目，提升业务全局视角。"
            </p>
            <p className="text-[10px] text-muted/60 mt-1">— 刘晨（Buddy）· 03-15</p>
          </div>
        </div>
      </div>
    </div>
  );
}
