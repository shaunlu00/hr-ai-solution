'use client';

import { useState } from 'react';
import {
  Radar, Globe, TrendingUp, Building2, DollarSign, Briefcase,
  ArrowRight, Bot, Sparkles, Activity, Eye, Zap, Search,
  BarChart3, AlertTriangle, CheckCircle2, ExternalLink,
  Cpu, Target, Shield, BookOpen, ArrowUpRight, ArrowDownRight,
  FileText, MapPin, Filter, ChevronDown, Lightbulb, Brain,
  Star, Users, Award,
} from 'lucide-react';
import AiChatPanel from '@/components/ai/AiChatPanel';

/* ================================================================
   Mock 数据
   ================================================================ */

/* --- 行业人才需求分析: 招聘岗位趋势 --- */
const HOT_POSITIONS = [
  { role: 'AI量化研究员', companies: ['中金', '华泰', '招商', '东方'], growth: '+142%', demand: 58, color: '#6366f1' },
  { role: '金融大模型工程师', companies: ['中信', '平安', '蚂蚁', '百度'], growth: '+218%', demand: 45, color: '#8b5cf6' },
  { role: '合规科技经理', companies: ['国泰君安', '广发', '海通'], growth: '+192%', demand: 35, color: '#f59e0b' },
  { role: '数据工程负责人', companies: ['华泰', '国信', '东方财富'], growth: '+89%', demand: 42, color: '#0ea5e9' },
  { role: '风控模型专家', companies: ['高盛', '摩根', '瑞银', '中金'], growth: '+76%', demand: 28, color: '#22c55e' },
  { role: 'ESG分析师', companies: ['中金', '高盛', '摩根', '汇丰'], growth: '+156%', demand: 32, color: '#ec4899' },
];

/* --- 行业人才需求分析: 同业招聘JD监控 --- */
const COMPETITOR_JDS = [
  { company: '中金公司', type: '券商', logo: '🏦', role: 'AI量化研究员', department: '量化投资部', skills: ['Python', 'PyTorch', 'LLM', '因子挖掘', '高频策略'], salary: '80-150万', date: '2026-03-15', region: '大陆', signal: '加速布局AI量化，新增LLM能力要求' },
  { company: '中信证券', type: '券商', logo: '🏛️', role: '金融科技架构师', department: '信息技术部', skills: ['微服务', 'Kubernetes', '分布式系统', 'Java', 'Go'], salary: '100-180万', date: '2026-03-12', region: '大陆', signal: '技术架构全面云原生转型' },
  { company: '华泰证券', type: '券商', logo: '🏢', role: '数据工程负责人', department: '数字化运营中心', skills: ['Spark', 'Flink', '数据湖', 'OLAP', '实时计算'], salary: '90-160万', date: '2026-03-10', region: '大陆', signal: '组建独立数据中台团队' },
  { company: '高盛(亚洲)', type: '外资投行', logo: '🌐', role: 'VP - Machine Learning', department: 'Engineering Division', skills: ['ML Ops', 'Transformer', 'Risk Modeling', 'Python', 'AWS'], salary: '120-220万', date: '2026-03-08', region: '香港', signal: '亚太区ML团队扩编' },
  { company: '摩根士丹利', type: '外资投行', logo: '🌍', role: 'Associate - NLP Engineer', department: 'Technology', skills: ['NLP', 'LLM Fine-tuning', 'RAG', 'Python', 'Azure'], salary: '100-180万', date: '2026-03-05', region: '香港', signal: 'NLP岗位首次出现RAG要求' },
  { company: '国泰君安', type: '券商', logo: '🏦', role: '合规科技经理', department: '合规管理部', skills: ['RegTech', 'NLP', '规则引擎', '反洗钱', '知识图谱'], salary: '60-100万', date: '2026-03-03', region: '大陆', signal: '合规科技岗位新增' },
  { company: '博时基金', type: '公募基金', logo: '📈', role: 'AI投研助理', department: '投资研究部', skills: ['Python', 'NLP', '研报解析', '因子分析'], salary: '50-80万', date: '2026-03-02', region: '大陆', signal: '基金公司加速AI投研布局' },
  { company: '幻方量化', type: '私募基金', logo: '🔮', role: '深度学习研究员', department: '策略研发部', skills: ['PyTorch', 'RL', 'GPU编程', 'C++'], salary: '150-300万', date: '2026-02-28', region: '大陆', signal: '顶级私募薪资天花板再创新高' },
  { company: '字节跳动', type: '互联网科技', logo: '📱', role: '金融风控算法', department: '金融业务线', skills: ['风控模型', 'Graph Neural Network', 'Python', 'Spark'], salary: '80-140万', date: '2026-02-25', region: '大陆', signal: '互联网巨头持续切入金融' },
  { company: 'Citadel', type: '外资投行', logo: '🏰', role: 'Quantitative Researcher', department: 'Global Equities', skills: ['C++', 'Python', 'Statistics', 'ML', 'HFT'], salary: '200-400万', date: '2026-02-20', region: '新加坡', signal: '新加坡办公室扩编' },
];

/* --- 人才规划战略洞察：公司维度 --- */
const COMPANY_STRATEGY_REPORTS = [
  {
    company: '中金公司', logo: '🏦', type: '头部券商',
    annualReportInsight: '2025年报显示科技人才投入增长45%，AI实验室编制翻倍。ESG报告强调"科技驱动"为核心战略。',
    talentStrategy: '全面拥抱AI量化，从海外高校和科技公司大量招聘ML人才，同时建设内部AI培训体系。',
    keyMoves: ['新设AI研究院', '量化团队扩编200%', '与清华联合培养博士'],
    riskLevel: 'high' as const,
  },
  {
    company: '华泰证券', logo: '🏢', type: '头部券商',
    annualReportInsight: '年报披露数字化转型投入超12亿，数据中台已支撑90%业务线。人才队伍建设章节强调"技术+金融"复合人才。',
    talentStrategy: '以数据驱动为核心，大力招聘数据工程和AI人才，推动全业务线数字化。',
    keyMoves: ['数据中台团队扩至200人', '引入多位互联网CTO级人才', '推行技术合伙人制度'],
    riskLevel: 'high' as const,
  },
  {
    company: '中信证券', logo: '🏛️', type: '头部券商',
    annualReportInsight: '年报展示金融科技专利数量行业第一，ESG报告提出2026年科技人才占比达30%目标。',
    talentStrategy: '以金融科技平台化为方向，重点布局基础架构和安全领域人才。',
    keyMoves: ['云原生架构全面转型', '安全合规团队扩编', '开源社区投入加大'],
    riskLevel: 'medium' as const,
  },
  {
    company: '高盛集团', logo: '🌐', type: '外资投行',
    annualReportInsight: 'Annual Report显示Engineering Division已达1.2万人，占全球员工25%。强调AI-first战略。',
    talentStrategy: '全球范围内抢夺AI/ML顶尖人才，亚太区成为新的增长极。',
    keyMoves: ['亚太ML团队翻倍', '与斯坦福合作AI研究', '内部AI工具全员推广'],
    riskLevel: 'high' as const,
  },
];

/* --- 人才规划战略洞察：地域维度 --- */
const REGION_INSIGHTS = [
  { region: '大陆（北上深）', trend: '高速增长', desc: 'AI量化、金融大模型需求爆发，北京和上海是核心战场。深圳侧重数据和合规科技。', hotRoles: ['AI量化', '大模型工程师', '数据架构'], growth: '+120%', color: '#6366f1' },
  { region: '香港', trend: '稳步扩张', desc: '外资行亚太总部集中地，ML/AI岗位持续增加。回流人才窗口期。', hotRoles: ['ML Engineer', 'Risk Quant', 'Data Science'], growth: '+65%', color: '#0ea5e9' },
  { region: '新加坡', trend: '快速崛起', desc: '对冲基金和科技公司加速布局，薪酬竞争力提升。与香港形成双中心格局。', hotRoles: ['Quant Researcher', 'Trading Tech', 'Compliance Tech'], growth: '+85%', color: '#22c55e' },
  { region: '日本', trend: '平稳增长', desc: '日本券商数字化转型起步，AI人才需求开始显现，以系统架构为主。', hotRoles: ['System Architect', 'DX Engineer', 'AI PM'], growth: '+30%', color: '#f59e0b' },
  { region: '美国', trend: '竞争激烈', desc: '华尔街AI军备竞赛白热化，薪酬最高但竞争最激烈。关注回流人才。', hotRoles: ['Quant Dev', 'ML Platform', 'LLM Researcher'], growth: '+45%', color: '#ec4899' },
];

/* --- 人才规划战略洞察：业务条线维度 --- */
const BUSINESS_LINE_INSIGHTS = [
  { line: '自营交易', icon: '📊', direction: 'AI量化全面渗透', trend: '量化策略AI化率从30%提升至70%，需要大量ML/DL人才', priority: 'high' as const, talents: ['AI量化研究员', '策略开发工程师', '高频交易系统架构师'] },
  { line: '机构业务', icon: '🏢', direction: '智能化服务升级', trend: '机构客户服务向智能化转型，需求集中在数据分析和智能推荐', priority: 'medium' as const, talents: ['数据分析师', '智能推荐工程师', '机构销售数字化PM'] },
  { line: '财富管理', icon: '💰', direction: '智能投顾发力', trend: '智能投顾和数字化运营成为核心方向，AI客服和个性化推荐需求增长', priority: 'high' as const, talents: ['智能投顾算法', 'AI客服工程师', '用户增长数据PM'] },
  { line: '投研', icon: '🔍', direction: '大模型赋能研究', trend: 'LLM在研报生成、数据分析、投资决策中的应用加速，NLP人才需求激增', priority: 'high' as const, talents: ['NLP工程师', 'LLM应用开发', '知识图谱专家'] },
  { line: '投行', icon: '🏦', direction: '流程自动化', trend: '尽调、估值等环节AI辅助工具应用增多，但人才需求增速相对平稳', priority: 'low' as const, talents: ['文档智能工程师', '估值模型开发', 'RPA开发'] },
  { line: '资管', icon: '📈', direction: 'AI赋能组合管理', trend: '智能风控和AI辅助投资决策需求上升，量化资管成新赛道', priority: 'medium' as const, talents: ['量化组合管理', '风控模型专家', 'AI策略研究员'] },
  { line: '期货/衍生品', icon: '📉', direction: '衍生品定价AI化', trend: '复杂衍生品定价和风险管理对AI依赖度提升，高端人才稀缺', priority: 'medium' as const, talents: ['衍生品量化', '定价模型开发', '风险引擎架构师'] },
  { line: '合规/风控', icon: '🛡️', direction: '监管科技新赛道', trend: 'RegTech成为增速最快领域，兼具法律和技术背景的人才极度稀缺', priority: 'high' as const, talents: ['合规科技经理', '反洗钱算法', '监管报送工程师'] },
];

/* --- AI研判和战略建议 --- */
const AI_STRATEGIC_RECOMMENDATIONS = [
  {
    category: '紧急行动',
    color: '#ef4444',
    items: [
      { title: '加速AI量化人才招聘', detail: '中金、华泰已全面布局，我司在AI量化领域人才储备不足。建议立即启动3-5名AI量化研究员招聘，优先从东方证券、幻方量化等机构定向挖猎。', impact: '高', timeline: '立即' },
      { title: '抢占金融大模型赛道', detail: 'LLM/RAG技能需求6个月增长218%，这是不可逆趋势。建议组建5人金融大模型团队，从百度、字节等互联网公司招聘。', impact: '高', timeline: '1个月内' },
    ],
  },
  {
    category: '战略布局',
    color: '#f59e0b',
    items: [
      { title: '建立合规科技人才储备', detail: '监管科技需求增长192%，但市场供给严重不足。建议提前储备3-4名RegTech人才，可从国泰君安、长江证券等机构关注。', impact: '高', timeline: '3个月内' },
      { title: '把握外资人才回流窗口', detail: '瑞银、摩根亚太区频繁调整，部分VP级人才有回流意愿。建议主动接触香港、新加坡办公室中高端人才。', impact: '中', timeline: '持续关注' },
      { title: '构建校企合作管道', detail: '清华、北大、上交AI相关专业毕业生供不应求。建议与2-3所高校建立联合培养/实习项目，锁定未来人才。', impact: '中', timeline: '6个月内' },
    ],
  },
  {
    category: '成本优化',
    color: '#22c55e',
    items: [
      { title: '调整关键岗位薪酬带宽', detail: 'AI量化研究员市场价80-150万，我司当前预算可能偏低。建议对标市场P75水平调整薪酬策略。', impact: '高', timeline: '下季度预算' },
      { title: '关注中小券商隐藏人才', detail: '华林证券、国信证券等中小机构在特定领域人才性价比极高，建议拓展猎头搜索范围。', impact: '中', timeline: '持续关注' },
    ],
  },
];

const TREND_DATA = [
  { month: '10月', ai: 45, fintech: 32, compliance: 12 },
  { month: '11月', ai: 52, fintech: 35, compliance: 15 },
  { month: '12月', ai: 58, fintech: 40, compliance: 18 },
  { month: '1月', ai: 65, fintech: 42, compliance: 22 },
  { month: '2月', ai: 72, fintech: 48, compliance: 28 },
  { month: '3月', ai: 85, fintech: 55, compliance: 35 },
];

/* ================================================================
   主页面
   ================================================================ */
export default function TalentInsightsPage() {
  const [activeTab, setActiveTab] = useState<'monitor' | 'strategy' | 'trends' | 'ai-advice'>('monitor');
  const [companyTypeFilter, setCompanyTypeFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');

  const filteredJDs = COMPETITOR_JDS.filter(jd => {
    const matchType = companyTypeFilter === 'all' || jd.type === companyTypeFilter;
    const matchRegion = regionFilter === 'all' || jd.region === regionFilter;
    return matchType && matchRegion;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 页面标题 */}
      {/* <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center">
              <Radar className="w-5 h-5 text-sky-600" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">人才趋势分析</h1>
              <p className="text-sm text-muted">AI智能体采集分析竞争对手JD、年报、ESG报告 · 洞察行业人才战略</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-600 text-xs font-medium border border-green-100">
            <Activity className="w-3.5 h-3.5" />
            AI智能体运行中
          </span>
          <span className="text-xs text-muted">最后更新: 2026-04-03 09:30</span>
        </div>
      </div> */}

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { icon: <Eye className="w-5 h-5" />, label: '监控机构', value: '48家', sub: '券商/基金/银行/科技', color: '#6366f1' },
          { icon: <Search className="w-5 h-5" />, label: '本月采集JD', value: '1,247条', sub: '环比 ↑ 18.5%', color: '#0ea5e9' },
          { icon: <FileText className="w-5 h-5" />, label: '分析年报/ESG', value: '36份', sub: '提取人才战略信息', color: '#8b5cf6' },
          { icon: <Zap className="w-5 h-5" />, label: '战略信号', value: '23个', sub: '高价值洞察 ↑', color: '#f59e0b' },
          { icon: <TrendingUp className="w-5 h-5" />, label: '预测准确率', value: '87.3%', sub: '持续优化', color: '#22c55e' },
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

      {/* Tab 切换 */}
      <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1 w-fit">
        {([
          { key: 'monitor' as const, label: '行业人才需求分析', icon: <Globe className="w-3.5 h-3.5" /> },
          { key: 'strategy' as const, label: '人才规划战略洞察', icon: <Target className="w-3.5 h-3.5" /> },
          { key: 'trends' as const, label: '需求趋势图表', icon: <TrendingUp className="w-3.5 h-3.5" /> },
          { key: 'ai-advice' as const, label: 'AI研判与战略建议', icon: <Brain className="w-3.5 h-3.5" /> },
        ]).map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-md text-sm font-medium transition ${
              activeTab === tab.key
                ? 'bg-white text-accent shadow-sm'
                : 'text-muted hover:text-foreground'
            }`}>
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* ========== 行业人才需求分析 ========== */}
      {activeTab === 'monitor' && (
        <div className="space-y-6">
          {/* 招聘岗位趋势分析 */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-500" />
                招聘岗位趋势分析
              </h3>
              <span className="text-xs text-muted">近3个月需求激增岗位</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {HOT_POSITIONS.map((pos, i) => (
                <div key={i} className="rounded-lg border border-border p-4 hover:shadow-sm transition">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-foreground">{pos.role}</h4>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: pos.color + '15', color: pos.color }}>
                      {pos.growth}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 mb-2">
                    <BarChart3 className="w-3 h-3 text-muted" />
                    <span className="text-xs text-muted">在招 {pos.demand} 个岗位</span>
                  </div>
                  {/* 进度条 */}
                  <div className="w-full bg-slate-100 rounded-full h-1.5 mb-2">
                    <div className="h-1.5 rounded-full" style={{ width: `${Math.min((pos.demand / 60) * 100, 100)}%`, backgroundColor: pos.color }} />
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pos.companies.map((c, j) => (
                      <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-600">{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 同业招聘岗位监控 */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Search className="w-4 h-4 text-sky-500" />
                同业招聘岗位监控
              </h3>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <select value={companyTypeFilter} onChange={e => setCompanyTypeFilter(e.target.value)}
                    className="h-8 pl-3 pr-7 rounded-lg border border-border bg-white text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="all">全部类型</option>
                    <option value="券商">券商</option>
                    <option value="外资投行">外资投行</option>
                    <option value="公募基金">公募基金</option>
                    <option value="私募基金">私募基金</option>
                    <option value="互联网科技">互联网科技</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-muted absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="relative">
                  <select value={regionFilter} onChange={e => setRegionFilter(e.target.value)}
                    className="h-8 pl-3 pr-7 rounded-lg border border-border bg-white text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-accent/20">
                    <option value="all">全部地域</option>
                    <option value="大陆">大陆</option>
                    <option value="香港">香港</option>
                    <option value="新加坡">新加坡</option>
                    <option value="日本">日本</option>
                    <option value="美国">美国</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-muted absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <span className="text-xs text-muted">{filteredJDs.length} 条</span>
              </div>
            </div>
            <div className="space-y-3">
              {filteredJDs.map((jd, i) => (
                <div key={i} className="rounded-lg border border-border p-4 hover:shadow-sm transition group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{jd.logo}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{jd.role}</p>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-sky-50 text-sky-600 border border-sky-100">{jd.company}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{jd.type}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">{jd.region}</span>
                        </div>
                        <p className="text-xs text-muted mt-0.5">{jd.department} · {jd.salary}</p>
                      </div>
                    </div>
                    <span className="text-xs text-muted">{jd.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {jd.skills.map((skill, j) => (
                      <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-slate-50 text-slate-600 border border-slate-100">{skill}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 pt-2 border-t border-border/50">
                    <Bot className="w-3.5 h-3.5 text-accent shrink-0" />
                    <p className="text-xs text-accent font-medium flex items-center gap-1">
                      AI洞察：{jd.signal}
                      <ArrowUpRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== 人才规划战略洞察 ========== */}
      {activeTab === 'strategy' && (
        <div className="space-y-6">
          {/* 公司维度 */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-semibold text-foreground">公司维度 · 同业人才战略分析报告</h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 font-medium">基于年报/ESG报告/JD分析</span>
            </div>
            <div className="space-y-4">
              {COMPANY_STRATEGY_REPORTS.map((report, i) => (
                <div key={i} className="rounded-lg border border-border p-4 hover:shadow-sm transition">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{report.logo}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm font-bold text-foreground">{report.company}</h4>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">{report.type}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          report.riskLevel === 'high' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'
                        }`}>
                          {report.riskLevel === 'high' ? '高竞争威胁' : '中等威胁'}
                        </span>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-3 mb-2 border border-blue-100">
                        <div className="flex items-center gap-1.5 mb-1">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span className="text-[10px] font-medium text-blue-700">年报/ESG报告洞察</span>
                        </div>
                        <p className="text-xs text-blue-800 leading-relaxed">{report.annualReportInsight}</p>
                      </div>
                      <p className="text-xs text-muted leading-relaxed mb-2">
                        <strong className="text-foreground">人才战略：</strong>{report.talentStrategy}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {report.keyMoves.map((move, j) => (
                          <span key={j} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600">
                            <CheckCircle2 className="w-3 h-3" /> {move}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 地域维度 */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-semibold text-foreground">地域维度 · 人才需求方向与趋势</h3>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {REGION_INSIGHTS.map((r, i) => (
                <div key={i} className="rounded-lg border border-border p-4 hover:shadow-sm transition">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-bold text-foreground">{r.region}</h4>
                    <span className="text-[10px] font-bold" style={{ color: r.color }}>{r.growth}</span>
                  </div>
                  <span className="inline-block text-[10px] px-2 py-0.5 rounded-full mb-2 font-medium" style={{ backgroundColor: r.color + '15', color: r.color }}>
                    {r.trend}
                  </span>
                  <p className="text-[11px] text-muted leading-relaxed mb-2">{r.desc}</p>
                  <div className="space-y-1">
                    {r.hotRoles.map((role, j) => (
                      <div key={j} className="text-[10px] text-foreground bg-slate-50 rounded px-2 py-0.5">{role}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 业务条线维度 */}
          <div className="rounded-xl border border-border bg-white p-5">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-semibold text-foreground">业务条线维度 · 人才布局方向与趋势</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {BUSINESS_LINE_INSIGHTS.map((bl, i) => (
                <div key={i} className="rounded-lg border border-border p-4 hover:shadow-sm transition">
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{bl.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-sm font-bold text-foreground">{bl.line}</h4>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                          bl.priority === 'high' ? 'bg-red-50 text-red-500' :
                          bl.priority === 'medium' ? 'bg-amber-50 text-amber-500' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {bl.priority === 'high' ? '高优先级' : bl.priority === 'medium' ? '中优先级' : '关注中'}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-indigo-600 mb-1">{bl.direction}</p>
                      <p className="text-[11px] text-muted leading-relaxed mb-2">{bl.trend}</p>
                      <div className="flex flex-wrap gap-1">
                        {bl.talents.map((t, j) => (
                          <span key={j} className="text-[10px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-600">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========== 需求趋势图表 ========== */}
      {activeTab === 'trends' && (
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 rounded-xl border border-border bg-white p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-sky-500" />
              行业人才需求趋势（近6个月）
            </h3>
            <div className="space-y-4">
              {[
                { label: 'AI/ML 岗位', color: '#6366f1', data: TREND_DATA.map(d => d.ai) },
                { label: '金融科技 岗位', color: '#0ea5e9', data: TREND_DATA.map(d => d.fintech) },
                { label: '合规科技 岗位', color: '#f59e0b', data: TREND_DATA.map(d => d.compliance) },
              ].map((series, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium" style={{ color: series.color }}>{series.label}</span>
                    <span className="text-xs text-muted">{series.data[series.data.length - 1]}个岗位</span>
                  </div>
                  <div className="flex items-end gap-1 h-10">
                    {series.data.map((val, j) => {
                      const max = Math.max(...series.data);
                      return (
                        <div key={j} className="flex-1 flex flex-col items-center">
                          <div className="w-full rounded-t"
                            style={{ height: `${(val / max) * 40}px`, backgroundColor: series.color + '30' }}>
                            <div className="w-full h-full rounded-t" style={{ backgroundColor: series.color, opacity: 0.7 + (j / series.data.length) * 0.3 }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex gap-1 mt-1">
                    {TREND_DATA.map((d, j) => (
                      <span key={j} className="flex-1 text-center text-[9px] text-muted">{d.month}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-indigo-50 border border-indigo-100 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-semibold text-indigo-700">AI趋势研判</span>
              </div>
              <ul className="space-y-1.5 text-sm text-indigo-600">
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-indigo-500 shrink-0" />
                  AI/ML岗位需求持续强劲增长，6个月增幅达89%，LLM相关技能成标配
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-indigo-500 shrink-0" />
                  金融科技岗位稳步增长72%，云原生和数据工程为核心方向
                </li>
                <li className="flex items-start gap-2">
                  <ArrowUpRight className="w-3.5 h-3.5 mt-0.5 text-indigo-500 shrink-0" />
                  合规科技为增速最快赛道（192%），建议提前储备相关人才
                </li>
              </ul>
            </div>
          </div>

          {/* 右侧面板 */}
          <div className="space-y-4">
            <div className="rounded-xl bg-gradient-to-br from-sky-50 to-indigo-50 border border-sky-100 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Radar className="w-4 h-4 text-sky-600" />
                <h3 className="text-sm font-semibold text-sky-700">系统定位</h3>
              </div>
              <p className="text-xs text-sky-600 leading-relaxed mb-3">
                这套系统不仅仅是招聘工具，更是券商战略决策的<strong>「雷达」</strong>与<strong>「导航仪」</strong>。
              </p>
              <div className="space-y-2">
                {[
                  '招聘前置 → 战略情报前置',
                  '人才画像 → 行业竞争格局画像',
                  '薪酬管理 → 市场定价基准管理',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-sky-700 bg-white/80 rounded-lg px-3 py-2">
                    <ArrowRight className="w-3 h-3 text-sky-400 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <AiChatPanel
              title="人才雷达AI助手"
              placeholder="询问行业人才趋势、竞品动态..."
            />
          </div>
        </div>
      )}

      {/* ========== AI研判与战略建议 ========== */}
      {activeTab === 'ai-advice' && (
        <div className="space-y-6">
          {/* AI总体研判 */}
          <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shrink-0">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-2">AI综合研判</h3>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  基于对48家机构的JD监控、36份年报/ESG报告的深度分析，以及行业人才流动趋势的综合研判，AI智能体识别出以下关键战略信号和行动建议。
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: '紧急行动项', value: '2项', color: '#ef4444', icon: <AlertTriangle className="w-4 h-4" /> },
                    { label: '战略布局项', value: '3项', color: '#f59e0b', icon: <Target className="w-4 h-4" /> },
                    { label: '成本优化项', value: '2项', color: '#22c55e', icon: <DollarSign className="w-4 h-4" /> },
                  ].map((m, i) => (
                    <div key={i} className="bg-white/70 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: m.color + '12', color: m.color }}>
                        {m.icon}
                      </div>
                      <div>
                        <p className="text-[11px] text-muted">{m.label}</p>
                        <p className="text-lg font-bold text-foreground">{m.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 分类建议 */}
          {AI_STRATEGIC_RECOMMENDATIONS.map((cat, i) => (
            <div key={i} className="rounded-xl border border-border bg-white p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-6 rounded-full" style={{ backgroundColor: cat.color }} />
                <h3 className="text-sm font-bold text-foreground">{cat.category}</h3>
              </div>
              <div className="space-y-3">
                {cat.items.map((item, j) => (
                  <div key={j} className="rounded-lg border border-border p-4 hover:shadow-sm transition">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-semibold text-foreground">{item.title}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: cat.color + '15', color: cat.color }}>
                          影响: {item.impact}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-500">
                          {item.timeline}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-muted leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}

          {/* AI Chat */}
          <AiChatPanel
            title="战略顾问AI"
            placeholder="询问战略建议详情，或让AI分析特定领域..."
          />
        </div>
      )}
    </div>
  );
}
