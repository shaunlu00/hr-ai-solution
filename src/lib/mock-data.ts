import { Candidate, Job, InterviewRecord, GradingResult, SalaryResult, BackgroundCheck, OfferRecord, OnboardingTask, ProbationGoal, CourseRecommendation, ApprovalRecord, CandidateJourney, AiAgent, AgentDailyTask, AgentMonthlyStats } from './types';

// ============================================================
// 岗位数据
// ============================================================
export const mockJobs: Job[] = [
  {
    id: 'job-001',
    title: '高级前端工程师',
    department: '技术研发部',
    level: 'P6-P7',
    headcount: 3,
    salary: '30K-50K',
    location: '北京',
    status: 'published',
    requirements: ['5年以上前端开发经验', '精通React/Vue框架', '熟悉TypeScript', '有大型项目架构经验', '本科及以上学历'],
    responsibilities: ['负责核心业务前端架构设计与开发', '推进前端工程化建设', '指导初中级工程师技术成长', '参与技术方案评审与选型'],
    jdContent: '我们正在寻找一位经验丰富的高级前端工程师，加入我们的技术研发团队...',
    createdAt: '2026-03-15',
    publishedAt: '2026-03-16',
    applicantCount: 128,
    budget: '150万/年',
  },
  {
    id: 'job-002',
    title: '算法工程师',
    department: 'AI平台部',
    level: 'P6-P8',
    headcount: 2,
    salary: '40K-70K',
    location: '北京',
    status: 'published',
    requirements: ['3年以上算法开发经验', '熟悉NLP/CV/推荐系统', '掌握Python/PyTorch', '硕士及以上学历', '有顶会论文优先'],
    responsibilities: ['负责AI模型的研发与优化', '推进算法在业务场景的落地', '跟进前沿技术并推动技术创新', '参与数据分析与模型评估'],
    jdContent: '我们正在寻找算法工程师，推动AI技术在业务中的创新应用...',
    createdAt: '2026-03-20',
    publishedAt: '2026-03-21',
    applicantCount: 86,
    budget: '200万/年',
  },
  {
    id: 'job-003',
    title: '产品经理',
    department: '产品设计部',
    level: 'P5-P7',
    headcount: 1,
    salary: '25K-45K',
    location: '上海',
    status: 'published',
    requirements: ['3年以上产品经理经验', '有B端/SaaS产品经验优先', '优秀的数据分析能力', '本科及以上学历'],
    responsibilities: ['负责产品规划与需求分析', '推动产品的迭代与优化', '跨团队协作推进项目落地', '关注行业动态与竞品分析'],
    jdContent: '我们正在寻找一位有洞察力的产品经理...',
    createdAt: '2026-03-25',
    applicantCount: 45,
    budget: '80万/年',
  },
];

// ============================================================
// 候选人数据
// ============================================================
export const mockCandidates: Candidate[] = [
  {
    id: 'c-001', name: '张明远', avatar: '👨‍💻', gender: '男', age: 28,
    phone: '138****1234', email: 'zhang***@email.com',
    education: { degree: '硕士', school: '北京大学', major: '计算机科学与技术', graduationYear: 2022 },
    currentCompany: '字节跳动', currentTitle: '前端开发工程师', yearsOfExperience: 5,
    expectedSalary: '45K', skills: ['React', 'TypeScript', 'Node.js', 'Webpack', 'GraphQL'],
    stage: 'ai-interview', aiScore: 92,
    resumeHighlights: ['北大硕士，计算机科班出身', '字节跳动5年大厂经验', 'React技术栈专精，有开源贡献', '主导过千万级用户产品的前端架构'],
    resumeRisks: ['期望薪资偏高', '跳槽频率需关注（2家公司/5年）'],
    resumeSummary: '候选人具备扎实的计算机基础和丰富的前端开发经验，在字节跳动主导过多个核心项目的前端架构设计，技术深度和广度俱佳。',
    appliedJobId: 'job-001', appliedDate: '2026-03-18', status: 'active',
  },
  {
    id: 'c-002', name: '李思颖', avatar: '👩‍💻', gender: '女', age: 26,
    phone: '139****5678', email: 'li***@email.com',
    education: { degree: '硕士', school: '清华大学', major: '人工智能', graduationYear: 2023 },
    currentCompany: '百度', currentTitle: '算法工程师', yearsOfExperience: 3,
    expectedSalary: '55K', skills: ['Python', 'PyTorch', 'NLP', 'Transformer', 'LLM'],
    stage: 'grading', aiScore: 95,
    resumeHighlights: ['清华AI专业硕士', 'ACL/EMNLP顶会一作论文', '百度NLP团队核心成员', '主导过大模型Fine-tuning项目'],
    resumeRisks: ['工作年限较短（3年）'],
    resumeSummary: '候选人学术背景优异，在NLP领域有深厚积累，参与过多个大模型相关项目，技术能力突出，成长潜力大。',
    appliedJobId: 'job-002', appliedDate: '2026-03-22', status: 'active',
  },
  {
    id: 'c-003', name: '王浩然', avatar: '👨‍🎓', gender: '男', age: 30,
    phone: '137****9012', email: 'wang***@email.com',
    education: { degree: '本科', school: '浙江大学', major: '软件工程', graduationYear: 2018 },
    currentCompany: '阿里巴巴', currentTitle: '高级前端工程师', yearsOfExperience: 8,
    expectedSalary: '50K', skills: ['Vue', 'React', '微前端', 'Electron', 'Performance'],
    stage: 'salary', aiScore: 88,
    resumeHighlights: ['浙大本科，8年前端经验', '阿里P7级别', '微前端架构实践经验', '团队管理经验（8人团队）'],
    resumeRisks: ['非硕士学历', '期望薪资接近上限'],
    resumeSummary: '候选人工程经验丰富，在阿里有多年大型项目实战，具备架构能力和团队管理经验，是高级岗位的理想人选。',
    appliedJobId: 'job-001', appliedDate: '2026-03-19', status: 'active',
  },
  {
    id: 'c-004', name: '陈雨桐', avatar: '👩‍🎓', gender: '女', age: 25,
    phone: '136****3456', email: 'chen***@email.com',
    education: { degree: '硕士', school: '上海交通大学', major: '计算机应用技术', graduationYear: 2024 },
    currentCompany: '腾讯', currentTitle: '前端开发工程师', yearsOfExperience: 2,
    expectedSalary: '35K', skills: ['React', 'Vue', 'TypeScript', 'CSS', 'Figma'],
    stage: 'resume-screening', aiScore: 78,
    resumeHighlights: ['上交硕士', '腾讯实习+正式工作经验', '前端基础扎实', '有设计感，能配合产品设计'],
    resumeRisks: ['工作年限偏短', '缺乏大型项目主导经验'],
    resumeSummary: '候选人学历背景好，基础扎实，但工作经验尚浅，适合P5-P6级别岗位，培养潜力大。',
    appliedJobId: 'job-001', appliedDate: '2026-03-20', status: 'active',
  },
  {
    id: 'c-005', name: '刘子轩', avatar: '👨‍💼', gender: '男', age: 32,
    phone: '135****7890', email: 'liu***@email.com',
    education: { degree: '博士', school: '中国科学院', major: '模式识别与智能系统', graduationYear: 2020 },
    currentCompany: '华为', currentTitle: '高级算法工程师', yearsOfExperience: 6,
    expectedSalary: '65K', skills: ['Python', 'TensorFlow', 'CV', '目标检测', '模型部署'],
    stage: 'offer', aiScore: 91,
    resumeHighlights: ['中科院博士', 'CVPR/ICCV多篇论文', '华为技术专家', '有算法落地产业化经验'],
    resumeRisks: ['期望薪资较高', '可能更偏学术方向'],
    resumeSummary: '候选人学术实力雄厚，在计算机视觉领域有深入研究，同时具备产业化经验，是高端算法岗位的优质候选人。',
    appliedJobId: 'job-002', appliedDate: '2026-03-23', status: 'active',
  },
  {
    id: 'c-006', name: '赵晓萌', avatar: '👩‍💼', gender: '女', age: 29,
    phone: '133****2345', email: 'zhao***@email.com',
    education: { degree: '硕士', school: '复旦大学', major: '管理学', graduationYear: 2021 },
    currentCompany: '美团', currentTitle: '高级产品经理', yearsOfExperience: 5,
    expectedSalary: '40K', skills: ['产品规划', '数据分析', 'SQL', '用户研究', 'Axure'],
    stage: 'second-interview', aiScore: 85,
    resumeHighlights: ['复旦管理学硕士', '美团5年B端产品经验', '主导过DAU百万级产品', '数据驱动思维强'],
    resumeRisks: ['对SaaS领域了解需确认'],
    resumeSummary: '候选人产品思维成熟，有丰富的B端产品经验，数据分析能力强，适合中高级产品经理岗位。',
    appliedJobId: 'job-003', appliedDate: '2026-03-26', status: 'active',
  },
  {
    id: 'c-007', name: '周天宇', avatar: '👨‍🔬', gender: '男', age: 27,
    phone: '131****6789', email: 'zhou***@email.com',
    education: { degree: '硕士', school: '哈尔滨工业大学', major: '自然语言处理', graduationYear: 2023 },
    currentCompany: '小米', currentTitle: '算法工程师', yearsOfExperience: 3,
    expectedSalary: '50K', skills: ['Python', 'PyTorch', 'BERT', 'LLM', 'RAG'],
    stage: 'background-check', aiScore: 87,
    resumeHighlights: ['哈工大NLP硕士', '小米AI团队核心成员', '有RAG系统实战经验', '开源社区活跃贡献者'],
    resumeRisks: ['从小米跳槽原因需了解'],
    resumeSummary: '候选人NLP功底扎实，在大模型应用方面有实战经验，开源贡献体现了良好的技术热情。',
    appliedJobId: 'job-002', appliedDate: '2026-03-24', status: 'active',
  },
  {
    id: 'c-008', name: '孙悦然', avatar: '👩‍🏫', gender: '女', age: 31,
    phone: '132****4567', email: 'sun***@email.com',
    education: { degree: '本科', school: '武汉大学', major: '信息管理与信息系统', graduationYear: 2017 },
    currentCompany: '京东', currentTitle: '产品专家', yearsOfExperience: 9,
    expectedSalary: '45K', skills: ['产品战略', 'B端产品', '用户增长', '商业化', 'AI产品'],
    stage: 'approval', aiScore: 90,
    resumeHighlights: ['9年产品经验', '京东产品专家', '有AI产品从0到1经验', '商业化能力强'],
    resumeRisks: ['本科学历', '年龄偏大'],
    resumeSummary: '候选人产品经验极为丰富，有完整的AI产品从0到1经验，商业化思维成熟，适合资深产品岗位。',
    appliedJobId: 'job-003', appliedDate: '2026-03-27', status: 'active',
  },
];

// ============================================================
// 面试记录
// ============================================================
export const mockInterviews: InterviewRecord[] = [
  {
    id: 'iv-001', candidateId: 'c-001', jobId: 'job-001', round: 1, type: 'ai',
    scheduledAt: '2026-03-25 14:00', duration: 45, status: 'completed',
    questions: [
      { id: 'q1', question: '请介绍你在字节跳动主导的前端架构设计经验', answer: '我主导了抖音创作者平台的前端架构升级，采用微前端方案将单体应用拆分为6个子应用...', score: 90, category: '项目经验' },
      { id: 'q2', question: '你是如何进行前端性能优化的？', answer: '我从首屏加载、运行时性能、构建优化三个维度进行优化...', followUp: '具体到首屏加载，你用了哪些量化指标来衡量优化效果？', score: 88, category: '专业能力' },
      { id: 'q3', question: '描述一次你解决团队协作冲突的经历', answer: '在一次技术选型讨论中，团队对Vue和React产生了分歧...', score: 82, category: '团队协作' },
    ],
    overallScore: 87, evaluation: '候选人技术能力扎实，项目经验丰富，沟通表达清晰。在架构设计和性能优化方面有深入理解，团队协作意识良好。建议推进至二轮面试。',
    recommendation: 'strong-yes',
    emotionAnalysis: { confidence: 88, enthusiasm: 85, nervousness: 20, honesty: 92, summary: '候选人表现自信，对技术话题热情高涨，回答真实可信。' },
  },
  {
    id: 'iv-002', candidateId: 'c-002', jobId: 'job-002', round: 1, type: 'ai',
    scheduledAt: '2026-03-26 10:00', duration: 50, status: 'completed',
    questions: [
      { id: 'q1', question: '请介绍你在NLP领域的研究方向和成果', answer: '我的研究方向是预训练语言模型的高效微调，在ACL 2024发表了关于LoRA变体的工作...', score: 95, category: '专业能力' },
      { id: 'q2', question: '你如何看待当前大模型的发展趋势？', answer: '我认为大模型正在经历从"大而全"到"小而精"的转变...', score: 92, category: '学习能力' },
      { id: 'q3', question: '描述一个你将算法落地到实际产品中的案例', answer: '我在百度负责将一个文本分类模型部署到线上服务...', score: 88, category: '项目经验' },
    ],
    overallScore: 92, evaluation: '候选人学术能力和工程能力兼具，对NLP前沿技术有深刻理解，具备将研究成果落地的能力。强烈推荐。',
    recommendation: 'strong-yes',
    emotionAnalysis: { confidence: 90, enthusiasm: 92, nervousness: 15, honesty: 95, summary: '候选人对AI技术充满热情，表达逻辑清晰，展现了很强的学术素养和工程思维。' },
  },
];

// ============================================================
// 定级数据
// ============================================================
export const mockGradingResults: GradingResult[] = [
  {
    candidateId: 'c-002', aiSuggestedLevel: 'VP2', aiConfidence: 88, status: 'pending',
    factors: [
      { name: '学历背景', weight: 20, score: 95, detail: '清华硕士，AI专业，有顶会论文' },
      { name: '工作经验', weight: 30, score: 82, detail: '3年算法经验，百度核心团队' },
      { name: '技术能力', weight: 30, score: 92, detail: 'NLP领域专精，大模型经验丰富' },
      { name: '项目成果', weight: 20, score: 88, detail: '主导过模型优化项目，效果提升显著' },
    ],
    historicalComparison: [
      { name: '候选人A', level: 'VP1', education: '清华硕士', experience: 4, similarity: 92 },
      { name: '候选人B', level: 'VP2', education: '北大硕士', experience: 3, similarity: 85 },
      { name: '候选人C', level: 'VP3', education: '中科院博士', experience: 2, similarity: 78 },
    ],
  },
];

// ============================================================
// 定薪数据
// ============================================================
export const mockSalaryResults: SalaryResult[] = [
  {
    candidateId: 'c-003', level: 'VP2', salaryMin: 42000, salaryMax: 52000, aiRecommended: 47000,
    marketP25: 38000, marketP50: 45000, marketP75: 55000, internalAvg: 44000,
    factors: [
      { name: '工作经验', impact: 'positive', detail: '8年前端经验，行业资深', adjustment: 5 },
      { name: '学历', impact: 'negative', detail: '本科学历，非硕博', adjustment: -3 },
      { name: '大厂背景', impact: 'positive', detail: '阿里P7，平台认可度高', adjustment: 4 },
      { name: '管理经验', impact: 'positive', detail: '带过8人团队', adjustment: 3 },
    ],
  },
];

// ============================================================
// 背调数据
// ============================================================
export const mockBackgroundChecks: BackgroundCheck[] = [
  {
    id: 'bg-001', candidateId: 'c-007', status: 'completed', overallResult: 'pass', completedAt: '2026-03-30',
    items: [
      { category: '学历验真', status: 'verified', detail: '哈尔滨工业大学计算机科学与技术硕士，2023年毕业，信息一致', source: '学信网' },
      { category: '学位验真', status: 'verified', detail: '工学硕士学位，信息一致', source: '学位网' },
      { category: '工作履历', status: 'verified', detail: '小米科技有限公司，算法工程师，2023年7月至今，信息一致', source: '社保记录' },
      { category: '股票账户', status: 'verified', detail: '未发现上市公司关联股票持仓', source: '证券系统' },
      { category: '征信记录', status: 'verified', detail: '信用记录良好，无异常', source: '央行征信' },
      { category: '竞业限制', status: 'verified', detail: '未签署竞业限制协议', source: '候选人声明' },
    ],
  },
];

// ============================================================
// Offer数据
// ============================================================
export const mockOffers: OfferRecord[] = [
  {
    id: 'of-001', candidateId: 'c-005', salary: 62000, level: 'P8', startDate: '2026-05-06',
    status: 'sent', sentAt: '2026-03-29', joinProbability: 78,
    offerContent: '尊敬的刘子轩先生：\n\n感谢您参加我们的面试。经过综合评估，我们非常高兴地向您发出录用邀请...',
  },
];

// ============================================================
// 审批数据
// ============================================================
export const mockApprovals: ApprovalRecord[] = [
  {
    id: 'ap-001', candidateIds: ['c-008'], status: 'pending', submittedAt: '2026-03-30',
    approverName: '李总监',
    aiSummary: '候选人孙悦然，应聘产品经理岗位。9年产品经验，京东产品专家。AI面试综合评分90分，定级P7，建议薪资42K。综合评价：候选人产品经验丰富，有AI产品从0到1完整经验，商业化思维成熟。建议录用。',
  },
];

// ============================================================
// 入职待办
// ============================================================
export const mockOnboardingTasks: OnboardingTask[] = [
  { id: 'ot-001', candidateId: 'c-005', title: '提交身份证复印件', category: '资料提交', status: 'completed', dueDate: '2026-04-20', description: '请提交身份证正反面扫描件' },
  { id: 'ot-002', candidateId: 'c-005', title: '补充紧急联系人信息', category: '信息补充', status: 'completed', dueDate: '2026-04-20', description: '请填写紧急联系人姓名、关系、电话' },
  { id: 'ot-003', candidateId: 'c-005', title: '申领办公设备', category: '设备准备', status: 'in-progress', dueDate: '2026-04-25', description: 'IT部门将为您准备MacBook Pro和显示器' },
  { id: 'ot-004', candidateId: 'c-005', title: '完成入职培训课程', category: '培训安排', status: 'pending', dueDate: '2026-05-10', description: '请在入职首周完成公司文化、规章制度等培训课程' },
  { id: 'ot-005', candidateId: 'c-005', title: '与团队成员见面', category: '团队介绍', status: 'pending', dueDate: '2026-05-08', description: '您的导师将安排与团队成员的一对一认识' },
];

// ============================================================
// 培养目标
// ============================================================
export const mockProbationGoals: ProbationGoal[] = [
  { id: 'pg-001', candidateId: 'c-005', title: '熟悉公司技术架构', description: '了解公司AI平台整体架构、数据流、模型管理体系', milestone: '能独立讲述公司AI平台架构图', progress: 0, dueDate: '2026-05-20' },
  { id: 'pg-002', candidateId: 'c-005', title: '完成首个算法优化任务', description: '在导师指导下完成一个模型优化任务，提升模型指标', milestone: '模型指标提升≥5%', progress: 0, dueDate: '2026-06-15' },
  { id: 'pg-003', candidateId: 'c-005', title: '融入团队协作', description: '参与团队周会、Code Review、技术分享', milestone: '完成1次技术分享', progress: 0, dueDate: '2026-06-30' },
];

// ============================================================
// 课程推荐
// ============================================================
export const mockCourses: CourseRecommendation[] = [
  { id: 'cr-001', title: '公司AI平台使用指南', category: '内部培训', duration: '4小时', difficulty: '入门', matchScore: 98, reason: '新员工必修课程，了解公司AI平台核心功能', platform: '内部学习平台', coverImage: '🏢' },
  { id: 'cr-002', title: '大模型微调实战', category: '专业技能', duration: '16小时', difficulty: '高级', matchScore: 95, reason: '与岗位直接相关，提升大模型应用能力', platform: '内部学习平台', coverImage: '🤖' },
  { id: 'cr-003', title: '模型部署与优化', category: '专业技能', duration: '12小时', difficulty: '进阶', matchScore: 90, reason: '候选人CV方向背景，补充部署优化知识', platform: '内部学习平台', coverImage: '🚀' },
  { id: 'cr-004', title: '团队协作与沟通', category: '通用素质', duration: '2小时', difficulty: '入门', matchScore: 75, reason: '帮助快速融入新团队', platform: '内部学习平台', coverImage: '🤝' },
  { id: 'cr-005', title: '数据安全与合规', category: '合规培训', duration: '1小时', difficulty: '入门', matchScore: 100, reason: '全员必修合规课程', platform: '内部学习平台', coverImage: '🔒' },
];

// ============================================================
// 看板统计
// ============================================================
export const pipelineStats = {
  'talent-insights': { count: 0, label: '战略洞察' },
  'job-posting': { count: 3, label: '在招岗位' },
  'resume-screening': { count: 42, label: '待筛选' },
  'interview-scheduling': { count: 8, label: '待约面' },
  'ai-interview': { count: 5, label: 'AI面试中' },
  'second-interview': { count: 3, label: '二轮面试' },
  'grading': { count: 2, label: '待定级' },
  'salary': { count: 2, label: '待定薪' },
  'approval': { count: 1, label: '待审批' },
  'offer': { count: 1, label: '待发Offer' },
  'background-check': { count: 1, label: '背调中' },
  'candidate-pool': { count: 15, label: '保温中' },
  'onboarding': { count: 2, label: '入职中' },
  'probation': { count: 3, label: '试用期' },
  'training': { count: 5, label: '培训中' },
};

// ============================================================
// 全流程运营看板 - 候选人旅程矩阵
// ============================================================
export const mockCandidateJourneys: CandidateJourney[] = [
  {
    candidateId: 'c-001', candidateName: '张明远', avatar: '👨‍💻', appliedJob: '高级前端工程师',
    currentStage: 'ai-interview',
    completedStages: [
      { stage: 'job-posting', method: 'ai-auto', completedAt: '03-15', aiAgentName: 'JD生成Agent' },
      { stage: 'resume-screening', method: 'ai-human-confirm', completedAt: '03-18', aiAgentName: '简历筛选Agent', note: 'HR确认通过' },
      { stage: 'interview-scheduling', method: 'ai-auto', completedAt: '03-20', aiAgentName: '约面Agent' },
    ],
  },
  {
    candidateId: 'c-002', candidateName: '李思颖', avatar: '👩‍💻', appliedJob: '算法工程师',
    currentStage: 'grading',
    completedStages: [
      { stage: 'job-posting', method: 'ai-auto', completedAt: '03-20', aiAgentName: 'JD生成Agent' },
      { stage: 'resume-screening', method: 'ai-auto', completedAt: '03-22', aiAgentName: '简历筛选Agent' },
      { stage: 'interview-scheduling', method: 'ai-auto', completedAt: '03-23', aiAgentName: '约面Agent' },
      { stage: 'ai-interview', method: 'ai-auto', completedAt: '03-26', aiAgentName: 'AI面试Agent' },
      { stage: 'second-interview', method: 'human-manual', completedAt: '03-28', note: '技术总监面试' },
    ],
  },
  {
    candidateId: 'c-003', candidateName: '王浩然', avatar: '👨‍🎓', appliedJob: '高级前端工程师',
    currentStage: 'salary',
    completedStages: [
      { stage: 'job-posting', method: 'ai-auto', completedAt: '03-15', aiAgentName: 'JD生成Agent' },
      { stage: 'resume-screening', method: 'ai-human-correction', completedAt: '03-19', aiAgentName: '简历筛选Agent', note: 'HR调整评分从72→85' },
      { stage: 'interview-scheduling', method: 'ai-auto', completedAt: '03-21', aiAgentName: '约面Agent' },
      { stage: 'ai-interview', method: 'ai-auto', completedAt: '03-24', aiAgentName: 'AI面试Agent' },
      { stage: 'second-interview', method: 'human-manual', completedAt: '03-26', note: 'CTO面试' },
      { stage: 'grading', method: 'ai-human-confirm', completedAt: '03-27', aiAgentName: '定级Agent', note: 'HRBP确认P7' },
    ],
  },
  {
    candidateId: 'c-004', candidateName: '陈雨桐', avatar: '👩‍🎓', appliedJob: '高级前端工程师',
    currentStage: 'resume-screening',
    completedStages: [
      { stage: 'job-posting', method: 'ai-auto', completedAt: '03-15', aiAgentName: 'JD生成Agent' },
    ],
  },
  {
    candidateId: 'c-005', candidateName: '刘子轩', avatar: '👨‍💼', appliedJob: '算法工程师',
    currentStage: 'offer',
    completedStages: [
      { stage: 'job-posting', method: 'ai-auto', completedAt: '03-20', aiAgentName: 'JD生成Agent' },
      { stage: 'resume-screening', method: 'ai-auto', completedAt: '03-23', aiAgentName: '简历筛选Agent' },
      { stage: 'interview-scheduling', method: 'ai-auto', completedAt: '03-24', aiAgentName: '约面Agent' },
      { stage: 'ai-interview', method: 'ai-auto', completedAt: '03-25', aiAgentName: 'AI面试Agent' },
      { stage: 'second-interview', method: 'human-manual', completedAt: '03-26', note: '技术VP面试' },
      { stage: 'grading', method: 'ai-human-confirm', completedAt: '03-27', aiAgentName: '定级Agent', note: 'HRBP确认P8' },
      { stage: 'salary', method: 'ai-human-correction', completedAt: '03-28', aiAgentName: '定薪Agent', note: 'HR将薪资从58K调整为62K' },
      { stage: 'approval', method: 'ai-human-confirm', completedAt: '03-28', aiAgentName: '审批Agent', note: '李总监审批通过' },
    ],
  },
  {
    candidateId: 'c-006', candidateName: '赵晓萌', avatar: '👩‍💼', appliedJob: '产品经理',
    currentStage: 'second-interview',
    completedStages: [
      { stage: 'job-posting', method: 'ai-human-correction', completedAt: '03-25', aiAgentName: 'JD生成Agent', note: 'HR修改了JD中的任职要求' },
      { stage: 'resume-screening', method: 'ai-auto', completedAt: '03-26', aiAgentName: '简历筛选Agent' },
      { stage: 'interview-scheduling', method: 'ai-human-confirm', completedAt: '03-27', aiAgentName: '约面Agent', note: 'HR确认面试时间' },
      { stage: 'ai-interview', method: 'ai-auto', completedAt: '03-29', aiAgentName: 'AI面试Agent' },
    ],
  },
  {
    candidateId: 'c-007', candidateName: '周天宇', avatar: '👨‍🔬', appliedJob: '算法工程师',
    currentStage: 'background-check',
    completedStages: [
      { stage: 'job-posting', method: 'ai-auto', completedAt: '03-20', aiAgentName: 'JD生成Agent' },
      { stage: 'resume-screening', method: 'ai-auto', completedAt: '03-24', aiAgentName: '简历筛选Agent' },
      { stage: 'interview-scheduling', method: 'ai-auto', completedAt: '03-25', aiAgentName: '约面Agent' },
      { stage: 'ai-interview', method: 'ai-auto', completedAt: '03-27', aiAgentName: 'AI面试Agent' },
      { stage: 'second-interview', method: 'human-manual', completedAt: '03-28', note: '算法主管面试' },
      { stage: 'grading', method: 'ai-auto', completedAt: '03-29', aiAgentName: '定级Agent' },
      { stage: 'salary', method: 'ai-human-confirm', completedAt: '03-29', aiAgentName: '定薪Agent', note: 'HR确认薪资方案' },
      { stage: 'approval', method: 'ai-human-confirm', completedAt: '03-30', aiAgentName: '审批Agent', note: '部门总监审批通过' },
      { stage: 'offer', method: 'ai-auto', completedAt: '03-30', aiAgentName: 'Offer Agent' },
    ],
  },
  {
    candidateId: 'c-008', candidateName: '孙悦然', avatar: '👩‍🏫', appliedJob: '产品经理',
    currentStage: 'approval',
    completedStages: [
      { stage: 'job-posting', method: 'ai-human-correction', completedAt: '03-25', aiAgentName: 'JD生成Agent', note: 'HR修改了产品经理JD' },
      { stage: 'resume-screening', method: 'ai-human-confirm', completedAt: '03-27', aiAgentName: '简历筛选Agent', note: 'HR确认推荐通过' },
      { stage: 'interview-scheduling', method: 'ai-auto', completedAt: '03-27', aiAgentName: '约面Agent' },
      { stage: 'ai-interview', method: 'ai-auto', completedAt: '03-28', aiAgentName: 'AI面试Agent' },
      { stage: 'second-interview', method: 'human-manual', completedAt: '03-29', note: '产品VP面试' },
      { stage: 'grading', method: 'ai-human-correction', completedAt: '03-30', aiAgentName: '定级Agent', note: 'HRBP从P6调整为P7' },
      { stage: 'salary', method: 'ai-human-confirm', completedAt: '03-30', aiAgentName: '定薪Agent', note: 'HR确认42K方案' },
    ],
  },
];

// ============================================================
// AI智能体运营看板 - 智能体列表
// ============================================================
export const mockAiAgents: AiAgent[] = [
  { id: 'agent-01', name: 'JD生成Agent', icon: 'Megaphone', stage: 'job-posting', description: '自动解析岗位需求，生成结构化JD', status: 'online' },
  { id: 'agent-02', name: '简历筛选Agent', icon: 'FileSearch', stage: 'resume-screening', description: '智能解析简历，多维度评分与匹配', status: 'busy' },
  { id: 'agent-03', name: '约面调度Agent', icon: 'CalendarClock', stage: 'interview-scheduling', description: '自动协调候选人与面试官时间', status: 'online' },
  { id: 'agent-04', name: 'AI面试Agent', icon: 'Bot', stage: 'ai-interview', description: '模拟真实面试场景，智能追问与评估', status: 'busy' },
  { id: 'agent-05', name: '定级评估Agent', icon: 'Award', stage: 'grading', description: '基于历史数据与能力模型进行智能定级', status: 'online' },
  { id: 'agent-06', name: '薪酬测算Agent', icon: 'DollarSign', stage: 'salary', description: '结合市场数据与内部公平性测算薪资', status: 'idle' },
  { id: 'agent-07', name: '审批汇总Agent', icon: 'ClipboardCheck', stage: 'approval', description: '自动汇总候选人信息并提交审批流', status: 'online' },
  { id: 'agent-08', name: 'Offer生成Agent', icon: 'Send', stage: 'offer', description: '生成个性化Offer并预测入职概率', status: 'idle' },
  { id: 'agent-09', name: '背调核查Agent', icon: 'ShieldCheck', stage: 'background-check', description: '自动发起并跟踪多维度背景调查', status: 'online' },
  { id: 'agent-10', name: '候选人保温Agent', icon: 'Heart', stage: 'candidate-pool', description: '定期发送关怀消息维系候选人意向', status: 'online' },
  { id: 'agent-11', name: '入职引导Agent', icon: 'UserCheck', stage: 'onboarding', description: '自动推送入职待办并跟踪进度', status: 'idle' },
  { id: 'agent-12', name: '培训推荐Agent', icon: 'GraduationCap', stage: 'training', description: '基于岗位与能力画像推荐培训课程', status: 'idle' },
];

// ============================================================
// AI智能体运营看板 - 当日任务记录
// ============================================================
export const mockAgentDailyTasks: AgentDailyTask[] = [
  { id: 'dt-001', agentId: 'agent-02', taskType: '简历评分', candidateName: '陈雨桐', startedAt: '09:02', completedAt: '09:03', result: 'correct', tokensUsed: 2340 },
  { id: 'dt-002', agentId: 'agent-02', taskType: '简历评分', candidateName: '林佳慧', startedAt: '09:15', completedAt: '09:16', result: 'correct', tokensUsed: 2180 },
  { id: 'dt-003', agentId: 'agent-02', taskType: '简历评分', candidateName: '吴思远', startedAt: '09:30', completedAt: '09:31', result: 'corrected', correctionNote: 'HR将评分从65调整至78，认为项目经验被低估', tokensUsed: 2560 },
  { id: 'dt-004', agentId: 'agent-03', taskType: '面试安排', candidateName: '张明远', startedAt: '09:45', completedAt: '09:46', result: 'correct', tokensUsed: 1850 },
  { id: 'dt-005', agentId: 'agent-04', taskType: 'AI面试', candidateName: '赵晓萌', startedAt: '10:00', completedAt: '10:42', result: 'correct', tokensUsed: 18500 },
  { id: 'dt-006', agentId: 'agent-02', taskType: '简历评分', candidateName: '何志强', startedAt: '10:10', completedAt: '10:11', result: 'rejected', correctionNote: 'HR判定候选人不符合岗位要求，AI评分偏高', tokensUsed: 2100 },
  { id: 'dt-007', agentId: 'agent-05', taskType: '候选人定级', candidateName: '孙悦然', startedAt: '10:30', completedAt: '10:31', result: 'corrected', correctionNote: 'HRBP将定级从P6调整为P7', tokensUsed: 3200 },
  { id: 'dt-008', agentId: 'agent-06', taskType: '薪酬测算', candidateName: '孙悦然', startedAt: '10:35', completedAt: '10:36', result: 'correct', tokensUsed: 2800 },
  { id: 'dt-009', agentId: 'agent-07', taskType: '审批材料汇总', candidateName: '孙悦然', startedAt: '10:40', completedAt: '10:42', result: 'correct', tokensUsed: 4500 },
  { id: 'dt-010', agentId: 'agent-09', taskType: '背调发起', candidateName: '周天宇', startedAt: '11:00', completedAt: '11:02', result: 'correct', tokensUsed: 3100 },
  { id: 'dt-011', agentId: 'agent-10', taskType: '候选人保温', candidateName: '马建国', startedAt: '11:30', completedAt: '11:31', result: 'correct', tokensUsed: 1200 },
  { id: 'dt-012', agentId: 'agent-04', taskType: 'AI面试', candidateName: '陈雨桐', startedAt: '14:00', completedAt: '14:38', result: 'correct', tokensUsed: 16800 },
  { id: 'dt-013', agentId: 'agent-02', taskType: '简历评分', candidateName: '黄磊', startedAt: '14:20', completedAt: '14:21', result: 'correct', tokensUsed: 2050 },
  { id: 'dt-014', agentId: 'agent-08', taskType: 'Offer生成', candidateName: '刘子轩', startedAt: '14:30', completedAt: '14:32', result: 'correct', tokensUsed: 5200 },
  { id: 'dt-015', agentId: 'agent-03', taskType: '面试安排', candidateName: '陈雨桐', startedAt: '15:00', completedAt: '15:01', result: 'corrected', correctionNote: 'HR要求改为线下面试，非视频面试', tokensUsed: 1900 },
  { id: 'dt-016', agentId: 'agent-11', taskType: '入职待办推送', candidateName: '刘子轩', startedAt: '15:30', completedAt: '15:31', result: 'correct', tokensUsed: 1500 },
  { id: 'dt-017', agentId: 'agent-02', taskType: '简历评分', candidateName: '钱小芳', startedAt: '16:00', completedAt: '16:01', result: 'correct', tokensUsed: 2280 },
  { id: 'dt-018', agentId: 'agent-10', taskType: '候选人保温', candidateName: '孟德良', startedAt: '16:30', completedAt: '16:31', result: 'correct', tokensUsed: 1150 },
];

// ============================================================
// AI智能体运营看板 - 月度统计
// ============================================================
export const mockAgentMonthlyStats: AgentMonthlyStats[] = [
  { agentId: 'agent-01', month: '2026-03', totalTasks: 12, correctTasks: 9, correctedTasks: 3, rejectedTasks: 0, accuracy: 75.0, timeSavedHours: 18, tokensUsed: 45600, estimatedCost: 6.84 },
  { agentId: 'agent-02', month: '2026-03', totalTasks: 286, correctTasks: 248, correctedTasks: 26, rejectedTasks: 12, accuracy: 86.7, timeSavedHours: 143, tokensUsed: 654200, estimatedCost: 98.13 },
  { agentId: 'agent-03', month: '2026-03', totalTasks: 64, correctTasks: 58, correctedTasks: 6, rejectedTasks: 0, accuracy: 90.6, timeSavedHours: 32, tokensUsed: 118400, estimatedCost: 17.76 },
  { agentId: 'agent-04', month: '2026-03', totalTasks: 38, correctTasks: 35, correctedTasks: 2, rejectedTasks: 1, accuracy: 92.1, timeSavedHours: 190, tokensUsed: 702000, estimatedCost: 105.30 },
  { agentId: 'agent-05', month: '2026-03', totalTasks: 22, correctTasks: 17, correctedTasks: 5, rejectedTasks: 0, accuracy: 77.3, timeSavedHours: 22, tokensUsed: 70400, estimatedCost: 10.56 },
  { agentId: 'agent-06', month: '2026-03', totalTasks: 18, correctTasks: 15, correctedTasks: 3, rejectedTasks: 0, accuracy: 83.3, timeSavedHours: 27, tokensUsed: 50400, estimatedCost: 7.56 },
  { agentId: 'agent-07', month: '2026-03', totalTasks: 15, correctTasks: 14, correctedTasks: 1, rejectedTasks: 0, accuracy: 93.3, timeSavedHours: 22.5, tokensUsed: 67500, estimatedCost: 10.13 },
  { agentId: 'agent-08', month: '2026-03', totalTasks: 10, correctTasks: 9, correctedTasks: 1, rejectedTasks: 0, accuracy: 90.0, timeSavedHours: 15, tokensUsed: 52000, estimatedCost: 7.80 },
  { agentId: 'agent-09', month: '2026-03', totalTasks: 8, correctTasks: 8, correctedTasks: 0, rejectedTasks: 0, accuracy: 100.0, timeSavedHours: 40, tokensUsed: 24800, estimatedCost: 3.72 },
  { agentId: 'agent-10', month: '2026-03', totalTasks: 120, correctTasks: 118, correctedTasks: 2, rejectedTasks: 0, accuracy: 98.3, timeSavedHours: 60, tokensUsed: 144000, estimatedCost: 21.60 },
  { agentId: 'agent-11', month: '2026-03', totalTasks: 25, correctTasks: 24, correctedTasks: 1, rejectedTasks: 0, accuracy: 96.0, timeSavedHours: 12.5, tokensUsed: 37500, estimatedCost: 5.63 },
  { agentId: 'agent-12', month: '2026-03', totalTasks: 30, correctTasks: 28, correctedTasks: 2, rejectedTasks: 0, accuracy: 93.3, timeSavedHours: 15, tokensUsed: 36000, estimatedCost: 5.40 },
];
