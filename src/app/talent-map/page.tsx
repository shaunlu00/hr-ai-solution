'use client';

import { useState } from 'react';
import {
  Map, Bot, Sparkles, Activity, Search, Building2, Users,
  TrendingUp, Star, ExternalLink, Filter, Globe, Target,
  Briefcase, Award, ArrowRight, Brain, Zap, Eye, ChevronDown,
  MapPin, BarChart3, UserCheck, AlertTriangle,
} from 'lucide-react';
import AiChatPanel from '@/components/ai/AiChatPanel';

/* ================================================================
   Mock 数据
   ================================================================ */

const DISCOVERED_TALENTS = [
  {
    id: 1,
    name: '张明远',
    avatar: '👨‍💼',
    title: '量化投资总监',
    company: '东方证券',
    department: '量化投资部',
    location: '上海',
    experience: '12年',
    highlights: [
      '主导构建东方证券AI量化交易平台，管理规模超50亿',
      '团队从5人扩展至30人，年化收益率行业Top 5',
      '此前在Two Sigma任职，有海外顶级量化经验',
    ],
    skills: ['AI量化', 'PyTorch', '因子挖掘', '高频策略', '团队管理'],
    aiScore: 96,
    matchReason: '东方证券量化业务近年快速崛起，张明远是核心推动者。与我司AI量化战略高度匹配。',
    signalSource: '竞品JD分析 + LinkedIn + 行业会议演讲',
    urgency: 'high' as const,
  },
  {
    id: 2,
    name: '李思涵',
    avatar: '👩‍💻',
    title: '金融科技架构师',
    company: '兴业证券',
    department: '信息技术部',
    location: '福州/上海',
    experience: '10年',
    highlights: [
      '主导兴业证券交易系统微服务化改造，系统延迟降低60%',
      '兴业虽为中型券商，但交易系统性能行业领先',
      '拥有AWS和Azure双认证架构师资质',
    ],
    skills: ['微服务', 'Kubernetes', 'Go', '分布式系统', '低延迟交易'],
    aiScore: 93,
    matchReason: '兴业证券交易系统性能行业公认领先，李思涵是核心架构师。适合我司技术架构升级需求。',
    signalSource: '技术社区分析 + GitHub开源贡献 + 专利数据',
    urgency: 'high' as const,
  },
  {
    id: 3,
    name: 'David Chen',
    avatar: '🧑‍💼',
    title: 'VP - Risk Analytics',
    company: '瑞银集团(亚太)',
    department: 'Risk Technology',
    location: '香港',
    experience: '15年',
    highlights: [
      '负责瑞银亚太区风险模型AI化转型，覆盖30+业务线',
      'MIT金融工程博士，发表风险量化论文12篇',
      '曾主导开发获业界大奖的实时风控系统',
    ],
    skills: ['Risk Modeling', 'ML Ops', 'Python', 'Transformer', '金融工程'],
    aiScore: 95,
    matchReason: '外资顶级风险量化专家，有完整的AI+风控落地经验，可带动我司风控智能化升级。',
    signalSource: '学术论文追踪 + LinkedIn + 行业峰会',
    urgency: 'medium' as const,
  },
  {
    id: 4,
    name: '王珊珊',
    avatar: '👩‍🔬',
    title: 'NLP技术负责人',
    company: '国信证券',
    department: '金融科技部',
    location: '深圳',
    experience: '8年',
    highlights: [
      '从零搭建国信证券NLP中台，支撑研报智能解析等10+应用',
      '国信虽非头部但NLP应用落地数量行业领先',
      '清华计算机博士，NLP方向，发表ACL/EMNLP论文5篇',
    ],
    skills: ['NLP', 'LLM', 'RAG', 'Knowledge Graph', 'Python'],
    aiScore: 92,
    matchReason: '国信证券NLP落地效果突出，王珊珊是关键人物。LLM+金融领域经验稀缺且高价值。',
    signalSource: '技术博客分析 + 学术论文 + 行业评选',
    urgency: 'high' as const,
  },
  {
    id: 5,
    name: '陈建国',
    avatar: '👨‍💼',
    title: '数据工程总监',
    company: '华林证券',
    department: '数据智能中心',
    location: '深圳',
    experience: '11年',
    highlights: [
      '华林证券虽小但数据平台建设被多家机构参访学习',
      '用极低预算构建了支撑全业务线的实时数据平台',
      '此前任职阿里云，参与多个金融云项目',
    ],
    skills: ['Spark', 'Flink', '数据湖', '实时计算', '数据治理'],
    aiScore: 89,
    matchReason: '小券商做出大成绩的典型，证明其极强的架构能力和资源整合能力。性价比极高的人才。',
    signalSource: '行业调研 + 技术社区 + 供应商推荐',
    urgency: 'medium' as const,
  },
  {
    id: 6,
    name: '赵伟',
    avatar: '👨‍💼',
    title: '合规科技负责人',
    company: '长江证券',
    department: '合规管理部',
    location: '武汉/上海',
    experience: '9年',
    highlights: [
      '主导长江证券智能合规系统建设，监管检查通过率100%',
      '在RegTech领域有独到见解，受邀监管科技论坛演讲',
      '法律+计算机复合背景，既懂业务又懂技术',
    ],
    skills: ['RegTech', 'NLP', '规则引擎', '反洗钱', '合规管理'],
    aiScore: 88,
    matchReason: '合规科技人才稀缺，赵伟兼具法律和技术背景。长江证券合规评级优秀与其密切相关。',
    signalSource: '监管公告分析 + 行业论坛 + 人脉网络',
    urgency: 'medium' as const,
  },
];

const COMPANY_INSIGHTS = [
  {
    company: '东方证券',
    logo: '🏦',
    region: '上海',
    strength: '量化投资',
    detail: 'AI量化交易平台建设行业领先，量化团队近2年扩编200%，核心骨干值得关注',
    talentCount: 3,
    color: '#6366f1',
  },
  {
    company: '兴业证券',
    logo: '🏛️',
    region: '福州/上海',
    strength: '交易系统',
    detail: '交易系统性能行业顶尖，微服务架构改造成功案例，技术团队实力强劲',
    talentCount: 2,
    color: '#0ea5e9',
  },
  {
    company: '国信证券',
    logo: '🏢',
    region: '深圳',
    strength: 'NLP应用',
    detail: 'NLP技术落地数量和深度行业领先，研报智能解析等应用广受好评',
    talentCount: 2,
    color: '#8b5cf6',
  },
  {
    company: '华林证券',
    logo: '📊',
    region: '深圳',
    strength: '数据平台',
    detail: '虽规模不大但数据平台建设成效显著，以小博大的典型案例',
    talentCount: 1,
    color: '#f59e0b',
  },
  {
    company: '长江证券',
    logo: '🌊',
    region: '武汉',
    strength: '合规科技',
    detail: '智能合规系统建设走在行业前列，合规科技人才储备充足',
    talentCount: 1,
    color: '#22c55e',
  },
  {
    company: '瑞银集团',
    logo: '🌐',
    region: '香港',
    strength: '风险量化',
    detail: '亚太区风险技术团队实力雄厚，AI化转型经验丰富',
    talentCount: 2,
    color: '#ec4899',
  },
];

const AI_SEARCH_LOG = [
  { time: '09:30', action: '扫描LinkedIn金融科技领域更新', result: '发现3个潜在目标', status: 'done' },
  { time: '09:15', action: '分析国信证券技术博客新文章', result: '确认NLP团队核心成员', status: 'done' },
  { time: '09:00', action: '抓取行业会议演讲人信息', result: '新增2个高价值线索', status: 'done' },
  { time: '08:45', action: '交叉验证专利数据库和论文库', result: '更新5位候选人技能画像', status: 'done' },
  { time: '08:30', action: '监控目标公司组织架构变动', result: '东方证券量化部调整', status: 'alert' },
  { time: '08:00', action: '启动每日全网人才搜索任务', result: '开始处理', status: 'done' },
];

/* ================================================================
   主页面
   ================================================================ */
export default function TalentMapPage() {
  const [activeTab, setActiveTab] = useState<'talents' | 'companies' | 'log'>('talents');
  const [searchQuery, setSearchQuery] = useState('');
  const [skillFilter, setSkillFilter] = useState<string>('all');

  const allSkills = Array.from(new Set(DISCOVERED_TALENTS.flatMap(t => t.skills))).sort();

  const filteredTalents = DISCOVERED_TALENTS.filter(t => {
    const matchSearch = !searchQuery ||
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchSkill = skillFilter === 'all' || t.skills.includes(skillFilter);
    return matchSearch && matchSkill;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 页面标题 */}
      {/* <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Map className="w-5 h-5 text-violet-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">人才地图</h1>
              <p className="text-sm text-muted">猎头AI智能体 · 挖掘同行业公司顶尖人才 · 构建精准目标人才库</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-100">
            <Activity className="w-3.5 h-3.5" />
            猎头AI智能体运行中
          </span>
          <span className="text-xs text-muted">最后扫描: 2026-04-03 09:30</span>
        </div>
      </div> */}

      {/* 核心指标 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { icon: <Eye className="w-5 h-5" />, label: '监控公司', value: '48家', sub: '覆盖券商/基金/外资行', color: '#6366f1' },
          { icon: <Users className="w-5 h-5" />, label: '待挖掘人才', value: '156人', sub: '本月新增 32人', color: '#0ea5e9' },
          { icon: <Star className="w-5 h-5" />, label: '高匹配度(≥90)', value: '23人', sub: '值得重点关注', color: '#f59e0b' },
          { icon: <Target className="w-5 h-5" />, label: '信息源覆盖', value: '12类', sub: 'LinkedIn/专利/论文/社区...', color: '#22c55e' },
        ].map((card, i) => (
          <div key={i} className="rounded-xl border border-border p-4 bg-white">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: card.color + '12', color: card.color }}>
                {card.icon}
              </div>
              <div>
                <p className="text-xs text-muted">{card.label}</p>
                <p className="text-xl font-bold text-foreground">{card.value}</p>
                <p className="text-[11px] text-muted">{card.sub}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI工作原理说明 */}
      <div className="bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-100 p-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center shrink-0">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-1.5">猎头AI智能体工作机制</h3>
            <p className="text-sm text-muted leading-relaxed mb-3">
              结合「人才趋势分析」的行业洞察结论，猎头AI智能体自动执行以下工作流：
            </p>
            <div className="grid grid-cols-4 gap-3">
              {[
                { icon: <Globe className="w-4 h-4" />, title: '全网信息采集', desc: 'LinkedIn、技术社区、论文库、专利库、行业论坛等多源数据' },
                { icon: <BarChart3 className="w-4 h-4" />, title: '公司绩效分析', desc: '分析同行业各部门业务表现，找到"小公司大成绩"的亮点团队' },
                { icon: <Brain className="w-4 h-4" />, title: '人才画像匹配', desc: '交叉验证多维信息，构建完整人才画像并与需求智能匹配' },
                { icon: <Zap className="w-4 h-4" />, title: '持续追踪更新', desc: '实时监控目标人才动态，组织变动时第一时间预警' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col gap-1.5 p-3 rounded-lg bg-white/60">
                  <div className="text-violet-600">{step.icon}</div>
                  <p className="text-sm font-medium text-foreground">{step.title}</p>
                  <p className="text-[12px] text-muted leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tab切换 */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {[
          { key: 'talents' as const, label: '挖掘人才', icon: <Users className="w-3.5 h-3.5" /> },
          { key: 'companies' as const, label: '公司洞察', icon: <Building2 className="w-3.5 h-3.5" /> },
          { key: 'log' as const, label: 'AI工作日志', icon: <Bot className="w-3.5 h-3.5" /> },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === tab.key
                ? 'bg-white text-foreground shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* 人才列表 */}
      {activeTab === 'talents' && (
        <div className="space-y-4">
          {/* 搜索和筛选 */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="搜索姓名、公司、技能..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-white text-sm focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition"
              />
            </div>
            <div className="relative">
              <Filter className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <select
                value={skillFilter}
                onChange={e => setSkillFilter(e.target.value)}
                className="h-9 pl-8 pr-8 rounded-lg border border-border bg-white text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-400 transition"
              >
                <option value="all">全部技能</option>
                {allSkills.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-xs text-muted">共 {filteredTalents.length} 位人才</span>
          </div>

          {/* 人才卡片 */}
          {filteredTalents.map(talent => (
            <div key={talent.id} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                {/* 头像 & 基本信息 */}
                <div className="shrink-0 text-center">
                  <div className="text-4xl mb-1">{talent.avatar}</div>
                  <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    talent.aiScore >= 95 ? 'bg-green-50 text-green-600' :
                    talent.aiScore >= 90 ? 'bg-blue-50 text-blue-600' :
                    'bg-amber-50 text-amber-600'
                  }`}>
                    <Sparkles className="w-3 h-3" />
                    {talent.aiScore}分
                  </div>
                </div>

                {/* 详细信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-base font-bold text-foreground">{talent.name}</h3>
                    {talent.urgency === 'high' && (
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-50 text-red-500 border border-red-100">
                        重点关注
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted mb-2">
                    {talent.title} · {talent.company} {talent.department} · {talent.location} · {talent.experience}经验
                  </p>

                  {/* 亮点 */}
                  <div className="space-y-1 mb-3">
                    {talent.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-1.5">
                        <Star className="w-3 h-3 text-amber-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-foreground leading-relaxed">{h}</p>
                      </div>
                    ))}
                  </div>

                  {/* 技能标签 */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {talent.skills.map(skill => (
                      <span key={skill} className="px-2 py-0.5 rounded-full bg-slate-100 text-[11px] text-foreground font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* AI匹配理由 */}
                  <div className="bg-violet-50 rounded-lg p-3 border border-violet-100">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Bot className="w-3.5 h-3.5 text-violet-600" />
                      <span className="text-[11px] font-medium text-violet-700">AI匹配分析</span>
                    </div>
                    <p className="text-xs text-violet-800 leading-relaxed">{talent.matchReason}</p>
                    <p className="text-[10px] text-violet-500 mt-1">信息来源: {talent.signalSource}</p>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="shrink-0 flex flex-col gap-2">
                  <button className="px-3 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-medium hover:bg-violet-700 transition flex items-center gap-1">
                    <UserCheck className="w-3.5 h-3.5" />
                    加入候选池
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-slate-50 transition flex items-center gap-1">
                    <ExternalLink className="w-3.5 h-3.5" />
                    查看详情
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 公司洞察 */}
      {activeTab === 'companies' && (
        <div className="grid grid-cols-2 gap-4">
          {COMPANY_INSIGHTS.map((company, i) => (
            <div key={i} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="text-3xl">{company.logo}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-bold text-foreground">{company.company}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                      style={{ backgroundColor: company.color + '15', color: company.color }}>
                      {company.strength}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs text-muted flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {company.region}
                    </span>
                    <span className="text-xs text-muted flex items-center gap-1">
                      <Users className="w-3 h-3" /> 已挖掘 {company.talentCount} 人
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{company.detail}</p>
                </div>
                <button className="shrink-0 px-3 py-1.5 rounded-lg border border-border text-xs font-medium text-foreground hover:bg-slate-50 transition flex items-center gap-1">
                  <ArrowRight className="w-3.5 h-3.5" />
                  查看人才
                </button>
              </div>
            </div>
          ))}

          {/* 洞察总结 */}
          <div className="col-span-2 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-2">AI洞察总结</h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    {
                      title: '不容忽视的中小券商',
                      desc: '华林证券、国信证券等中型机构在特定领域（数据平台、NLP）有突出表现，其核心骨干往往被市场低估，是高性价比的挖猎目标。',
                    },
                    {
                      title: '外资行人才回流窗口',
                      desc: '瑞银、摩根等外资行亚太业务调整频繁，部分高端人才有回流意愿，当前是接触的好时机。',
                    },
                    {
                      title: '合规科技人才稀缺',
                      desc: '监管科技成为行业新赛道，但兼具合规业务理解和技术能力的复合人才极为稀缺，建议提前储备。',
                    },
                  ].map((insight, i) => (
                    <div key={i} className="bg-white/70 rounded-lg p-3">
                      <p className="text-xs font-medium text-foreground mb-1">{insight.title}</p>
                      <p className="text-[11px] text-muted leading-relaxed">{insight.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI工作日志 */}
      {activeTab === 'log' && (
        <div className="bg-white rounded-xl border border-border p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-violet-600" />
            <h3 className="text-sm font-semibold text-foreground">今日AI猎头工作日志</h3>
            <span className="text-xs text-muted">2026-04-03</span>
          </div>
          <div className="space-y-3">
            {AI_SEARCH_LOG.map((log, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50/50">
                <span className="text-xs text-muted font-mono w-12 shrink-0 pt-0.5">{log.time}</span>
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  log.status === 'alert' ? 'bg-amber-400' : 'bg-green-400'
                }`} />
                <div>
                  <p className="text-sm text-foreground">{log.action}</p>
                  <p className="text-xs text-muted mt-0.5">{log.result}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border">
            <div className="flex items-center gap-2 text-xs text-muted">
              <Activity className="w-3.5 h-3.5 text-green-500" />
              AI智能体持续运行中 · 每30分钟执行一次全网扫描 · 发现高价值线索实时推送
            </div>
          </div>
        </div>
      )}

      {/* AI对话面板 */}
      <AiChatPanel
        title="猎头AI智能体"
        placeholder="例如：帮我找一下在风控AI领域有经验的候选人..."
      />
    </div>
  );
}
