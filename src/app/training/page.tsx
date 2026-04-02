'use client';

import AiScoreBar from '@/components/ai/AiScoreBar';
import AiSuggestionCard from '@/components/ai/AiSuggestionCard';
import { GraduationCap, BookOpen, Clock, Award, Star } from 'lucide-react';

export default function TrainingPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      <AiSuggestionCard
        type="suggestion"
        title="AI课程推荐"
        content="基于张明远的岗位画像和能力评估，AI推荐了 8 门个性化课程。其中「微前端架构实践」和「React性能优化」匹配度最高（95%），建议优先学习。"
        actions={[{ label: '查看学习路径' }]}
      />

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 space-y-4">
          {/* 推荐课程 */}
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="px-5 py-4 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-accent" /> AI推荐课程
              </h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: '微前端架构实践', category: '技术', duration: '8小时', match: 95, status: '学习中', progress: 40 },
                { name: 'React性能优化深度指南', category: '技术', duration: '6小时', match: 95, status: '未开始', progress: 0 },
                { name: 'TypeScript高级编程', category: '技术', duration: '10小时', match: 90, status: '学习中', progress: 65 },
                { name: '敏捷开发实践', category: '流程', duration: '4小时', match: 85, status: '已完成', progress: 100 },
                { name: '技术文档写作', category: '软技能', duration: '3小时', match: 80, status: '未开始', progress: 0 },
                { name: '跨团队协作方法论', category: '软技能', duration: '2小时', match: 78, status: '未开始', progress: 0 },
              ].map((course, i) => (
                <div key={i} className="p-4 hover:bg-slate-50/50 transition">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      course.category === '技术' ? 'bg-accent/10' :
                      course.category === '流程' ? 'bg-green-50' : 'bg-amber-50'
                    }`}>
                      <GraduationCap className={`w-5 h-5 ${
                        course.category === '技术' ? 'text-accent' :
                        course.category === '流程' ? 'text-green-500' : 'text-amber-500'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">{course.name}</span>
                        <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] text-muted">{course.category}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-muted">
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" /> {course.duration}</span>
                        <span className="flex items-center gap-0.5"><Star className="w-3 h-3 text-accent" /> 匹配度 {course.match}%</span>
                      </div>
                    </div>
                    <div className="w-24 shrink-0">
                      <AiScoreBar score={course.progress} showLabel={false} />
                      <p className="text-[10px] text-center mt-0.5 text-muted">
                        {course.status === '已完成' ? '✅ 已完成' : course.status === '学习中' ? `${course.progress}%` : '未开始'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 学习统计 */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3">学习统计</h3>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-accent/5 text-center">
                <p className="text-2xl font-bold text-accent">24</p>
                <p className="text-[10px] text-muted">累计学习小时</p>
              </div>
              <div className="p-3 rounded-lg bg-green-50 text-center">
                <p className="text-2xl font-bold text-green-600">3</p>
                <p className="text-[10px] text-muted">已完成课程</p>
              </div>
              <div className="p-3 rounded-lg bg-amber-50 text-center">
                <p className="text-2xl font-bold text-amber-600">2</p>
                <p className="text-[10px] text-muted">进行中</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-border p-5">
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1">
              <Award className="w-4 h-4 text-accent" /> 学习成就
            </h3>
            <div className="space-y-2">
              {[
                { badge: '🏅', name: '快速学习者', desc: '首周完成3门课程' },
                { badge: '⭐', name: '技术达人', desc: '技术类课程满分通过' },
                { badge: '🔥', name: '连续学习', desc: '连续7天学习打卡' },
              ].map((a, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50">
                  <span className="text-lg">{a.badge}</span>
                  <div>
                    <p className="text-xs font-medium text-foreground">{a.name}</p>
                    <p className="text-[10px] text-muted">{a.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
