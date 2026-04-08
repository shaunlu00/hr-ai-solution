import PptxGenJS from 'pptxgenjs';

/* ================================================================
   颜色 & 工具
   ================================================================ */

const COLORS = {
  accent: '6366f1',
  accentDark: '4f46e5',
  purple: '8b5cf6',
  pink: 'd946ef',
  rose: 'ec4899',
  red: 'f43f5e',
  orange: 'f97316',
  amber: 'f59e0b',
  yellow: 'eab308',
  lime: '84cc16',
  green: '22c55e',
  teal: '14b8a6',
  cyan: '06b6d4',
  blue: '3b82f6',
  indigo: '6366f1',
  white: 'FFFFFF',
  bg: 'F8FAFC',
  border: 'E2E8F0',
  text: '1E293B',
  muted: '64748B',
  success: '22c55e',
};

function addGradientBg(slide: PptxGenJS.Slide, from: string, _to: string) {
  slide.background = { fill: from };
}

function hex(c: string) {
  return c.startsWith('#') ? c.slice(1) : c;
}

/* ================================================================
   Slide 1: 封面
   ================================================================ */
function slideCover(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.accent };

  // 标题
  slide.addText('AI 人才引进全流程解决方案', {
    x: 0.8, y: 1.2, w: 8.4, h: 1.2,
    fontSize: 36, bold: true, color: COLORS.white,
    fontFace: 'Microsoft YaHei',
    align: 'center',
  });

  // 副标题
  slide.addText('AI + HR 协同 · 15阶段全覆盖 · 智能体驱动', {
    x: 0.8, y: 2.5, w: 8.4, h: 0.6,
    fontSize: 16, color: 'C7D2FE',
    fontFace: 'Microsoft YaHei',
    align: 'center',
  });

  // 指标卡
  const metrics = [
    { num: '15', label: '流程阶段' },
    { num: '13', label: 'AI智能体' },
    { num: '高', label: 'AI融入度' },
  ];
  metrics.forEach((m, i) => {
    const x = 1.8 + i * 2.4;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 3.5, w: 2, h: 1.2,
      fill: { color: '4F46E5' },
      rectRadius: 0.15,
    });
    slide.addText(m.num, {
      x, y: 3.5, w: 2, h: 0.7,
      fontSize: 28, bold: true, color: COLORS.white,
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'bottom',
    });
    slide.addText(m.label, {
      x, y: 4.2, w: 2, h: 0.5,
      fontSize: 12, color: 'C7D2FE',
      fontFace: 'Microsoft YaHei', align: 'center', valign: 'top',
    });
  });

  slide.addText('2026 · Powered by AI', {
    x: 0.8, y: 5.0, w: 8.4, h: 0.4,
    fontSize: 11, color: '818CF8', fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 2: 现状与挑战
   ================================================================ */
function slideChallenges(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('⚡ 现状与挑战', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('当前招聘流程面临的核心痛点', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  const challenges = [
    { title: '招聘周期过长', tag: '周期长', desc: '传统招聘周期冗长，流程繁琐拖沓，优秀候选人在等待中大量流失', color: 'ef4444' },
    { title: 'HR工作负荷大', tag: '工作量大', desc: '大量重复性事务占据HR绝大部分精力，难以聚焦核心人才判断', color: 'f59e0b' },
    { title: '筛选精准度不足', tag: '遗漏多', desc: '人工筛选简历遗漏率高，优质候选人容易被错过，覆盖面有限', color: 'f97316' },
    { title: '决策缺少数据支撑', tag: '凭经验', desc: '定级定薪依赖个人经验和主观判断，缺乏市场数据和内部对标依据', color: '8b5cf6' },
    { title: '评价标准不一致', tag: '偏差大', desc: '不同面试官评分标准差异大，评估结果因人而异，公平性难以保障', color: 'ec4899' },
    { title: '候选人体验差', tag: '体验差', desc: '响应速度慢、流程不透明，严重影响雇主品牌和Offer接受意愿', color: '64748b' },
  ];

  challenges.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.6 + col * 3.1;
    const y = 1.5 + row * 2.2;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.9, h: 2.0,
      fill: { color: COLORS.white },
      line: { color: COLORS.border, width: 1 },
      rectRadius: 0.12,
    });

    slide.addText(c.title, {
      x: x + 0.15, y: y + 0.15, w: 2.6, h: 0.35,
      fontSize: 13, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
    });
    slide.addText(c.desc, {
      x: x + 0.15, y: y + 0.55, w: 2.6, h: 0.8,
      fontSize: 10, color: COLORS.muted, fontFace: 'Microsoft YaHei',
      lineSpacingMultiple: 1.3,
    });
    // tag
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.15, y: y + 1.5, w: 1.0, h: 0.35,
      fill: { color: c.color + '1A' },
      rectRadius: 0.15,
    });
    slide.addText(c.tag, {
      x: x + 0.15, y: y + 1.5, w: 1.0, h: 0.35,
      fontSize: 10, bold: true, color: c.color, fontFace: 'Microsoft YaHei', align: 'center',
    });
  });

  // 底部提示
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.2, y: 5.1, w: 7.6, h: 0.4,
    fill: { color: 'FEF2F2' }, rectRadius: 0.15,
  });
  slide.addText('💡 核心问题：大量重复性工作消耗HR精力，缺乏数据驱动的科学决策手段', {
    x: 1.2, y: 5.1, w: 7.6, h: 0.4,
    fontSize: 10, color: 'EF4444', fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 3: 方案概述
   ================================================================ */
function slideSolutionOverview(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🎯 方案概述', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('AI与HR深度协作，打造高效、精准、温暖的招聘体验', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  // 左: AI智能体
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.6, y: 1.5, w: 4.2, h: 3.8,
    fill: { color: 'EEF2FF' },
    line: { color: 'C7D2FE', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('🤖 AI 智能体集群', {
    x: 0.9, y: 1.65, w: 3.6, h: 0.4,
    fontSize: 14, bold: true, color: '4338CA', fontFace: 'Microsoft YaHei',
  });
  slide.addText('13个专属AI智能体，覆盖招聘全流程每一个关键环节', {
    x: 0.9, y: 2.1, w: 3.6, h: 0.35,
    fontSize: 10, color: '6366F1', fontFace: 'Microsoft YaHei',
  });
  const aiFunctions = ['数据密集型任务自动处理', '7×24小时无限并发', '结构化评估消除偏见', '实时数据分析与预测'];
  aiFunctions.forEach((t, i) => {
    slide.addText(`✓  ${t}`, {
      x: 0.9, y: 2.6 + i * 0.4, w: 3.6, h: 0.35,
      fontSize: 11, color: '4338CA', fontFace: 'Microsoft YaHei',
    });
  });

  // 右: HR核心价值
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.2, y: 1.5, w: 4.2, h: 3.8,
    fill: { color: 'ECFDF5' },
    line: { color: 'A7F3D0', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('👤 HR 核心价值', {
    x: 5.5, y: 1.65, w: 3.6, h: 0.4,
    fontSize: 14, bold: true, color: '065F46', fontFace: 'Microsoft YaHei',
  });
  slide.addText('HR从事务中解放，回归人才判断和战略决策的核心价值', {
    x: 5.5, y: 2.1, w: 3.6, h: 0.35,
    fontSize: 10, color: '059669', fontFace: 'Microsoft YaHei',
  });
  const hrFunctions = ['专注高价值决策判断', '候选人关系维护', '团队文化匹配评估', '招聘策略优化'];
  hrFunctions.forEach((t, i) => {
    slide.addText(`✓  ${t}`, {
      x: 5.5, y: 2.6 + i * 0.4, w: 3.6, h: 0.35,
      fontSize: 11, color: '065F46', fontFace: 'Microsoft YaHei',
    });
  });
}

/* ================================================================
   Slide 4: 人才战略雷达
   ================================================================ */
function slideTalentInsights(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🛰️ 人才战略雷达', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('AI智能体采集分析竞争对手JD，洞察行业人才战略转移', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  // 左：定位说明
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.5, w: 4.5, h: 2.0,
    fill: { color: 'F0F9FF' },
    line: { color: '7DD3FC', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('🛰️ 招聘全流程的「第零步」', {
    x: 0.7, y: 1.6, w: 4.0, h: 0.4,
    fontSize: 13, bold: true, color: '0369A1', fontFace: 'Microsoft YaHei',
  });
  slide.addText('JD的变化本质上是战略重心转移的预警信号。AI智能体7×24实时采集各大投行和金融公司的招聘JD，分析和预测行业人才战略转移方向。', {
    x: 0.7, y: 2.05, w: 4.0, h: 0.9,
    fontSize: 10, color: '0C4A6E', fontFace: 'Microsoft YaHei',
    lineSpacingMultiple: 1.4,
  });
  slide.addText('系统定位：不仅仅是招聘工具，更是券商战略决策的「雷达」与「导航仪」', {
    x: 0.7, y: 3.0, w: 4.0, h: 0.35,
    fontSize: 9, bold: true, color: '0EA5E9', fontFace: 'Microsoft YaHei',
  });

  // 右：四大核心价值
  const values = [
    { title: '业务战略情报洞察', desc: '分析竞争对手新增岗位，提前洞察战略转型', color: '6366f1' },
    { title: '数字化转型风向标', desc: '追踪技术栈演进，判断行业技术趋势走向', color: '0ea5e9' },
    { title: '并购与扩张前置预警', desc: '批量招聘信号预示业务扩张或并购整合', color: 'f59e0b' },
    { title: '薪酬定价与成本优化', desc: '实时薪酬数据建立行业基准线', color: '22c55e' },
  ];

  values.forEach((v, i) => {
    const y = 1.5 + i * 0.85;
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.3, y, w: 4.3, h: 0.75,
      fill: { color: COLORS.white },
      line: { color: COLORS.border, width: 1 },
      rectRadius: 0.1,
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.45, y: y + 0.12, w: 0.5, h: 0.5,
      fill: { color: v.color + '18' },
      rectRadius: 0.08,
    });
    slide.addText(v.title, {
      x: 6.1, y, w: 3.3, h: 0.35,
      fontSize: 11, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
    });
    slide.addText(v.desc, {
      x: 6.1, y: y + 0.35, w: 3.3, h: 0.35,
      fontSize: 9, color: COLORS.muted, fontFace: 'Microsoft YaHei',
    });
  });

  // 底部 AI能力
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.7, w: 9.1, h: 0.65,
    fill: { color: '0EA5E9' },
    rectRadius: 0.12,
  });
  slide.addText('🤖 AI智能体能力：7×24全网监控 · 多语言JD解析 · 趋势预测分析 · 战略信号预警', {
    x: 0.5, y: 4.7, w: 9.1, h: 0.65,
    fontSize: 11, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 5: 15阶段流程
   ================================================================ */
function slidePipeline(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🔄 15阶段全流程', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('从人才洞察到新员工培训，AI全程参与每个环节', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  const stages = [
    { label: '人才雷达', color: '0ea5e9', mode: 'AI主导' },
    { label: '岗位发布', color: '6366f1', mode: 'AI主导' },
    { label: '简历筛选', color: '8b5cf6', mode: 'AI主导' },
    { label: '自动约面', color: 'a855f7', mode: 'AI主导' },
    { label: 'AI面试', color: 'd946ef', mode: 'AI主导' },
    { label: '二轮面试', color: 'ec4899', mode: '人工主导' },
    { label: '候选人定级', color: 'f43f5e', mode: 'AI辅助' },
    { label: '候选人定薪', color: 'f97316', mode: 'AI辅助' },
    { label: '入职审批', color: 'eab308', mode: 'AI辅助' },
    { label: 'Offer发放', color: '84cc16', mode: 'AI辅助' },
    { label: '候选人背调', color: '22c55e', mode: 'AI主导' },
    { label: '保温池', color: '14b8a6', mode: 'AI主导' },
    { label: '入职引导', color: '06b6d4', mode: 'AI主导' },
    { label: '试用期培养', color: '3b82f6', mode: 'AI辅助' },
    { label: '新员工培训', color: '6366f1', mode: 'AI主导' },
  ];

  // 上排 8个
  stages.slice(0, 8).forEach((s, i) => {
    const x = 0.15 + i * 1.23;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.6, w: 1.1, h: 1.0,
      fill: { color: s.color + '15' },
      line: { color: s.color + '40', width: 1.5 },
      rectRadius: 0.1,
    });
    slide.addText(s.label, {
      x, y: 2.0, w: 1.1, h: 0.3,
      fontSize: 8, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(s.mode, {
      x, y: 2.7, w: 1.1, h: 0.25,
      fontSize: 7, color: s.color, fontFace: 'Microsoft YaHei', align: 'center',
    });
    if (i < 7) {
      slide.addText('→', {
        x: x + 1.0, y: 1.85, w: 0.3, h: 0.3,
        fontSize: 12, color: COLORS.border, fontFace: 'Microsoft YaHei', align: 'center',
      });
    }
  });

  // 下排 7个
  stages.slice(8, 15).forEach((s, i) => {
    const x = 0.15 + i * 1.23;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 3.4, w: 1.1, h: 1.0,
      fill: { color: s.color + '15' },
      line: { color: s.color + '40', width: 1.5 },
      rectRadius: 0.1,
    });
    slide.addText(s.label, {
      x, y: 3.8, w: 1.1, h: 0.3,
      fontSize: 8, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(s.mode, {
      x, y: 4.5, w: 1.1, h: 0.25,
      fontSize: 7, color: s.color, fontFace: 'Microsoft YaHei', align: 'center',
    });
    if (i < 6) {
      slide.addText('→', {
        x: x + 1.0, y: 3.65, w: 0.3, h: 0.3,
        fontSize: 12, color: COLORS.border, fontFace: 'Microsoft YaHei', align: 'center',
      });
    }
  });

  // 图例
  const legend = [
    { mode: 'AI主导', color: '6366f1', count: 9 },
    { mode: 'AI辅助', color: 'f59e0b', count: 5 },
    { mode: '人工主导', color: '0ea5e9', count: 1 },
  ];
  legend.forEach((item, i) => {
    const x = 2.5 + i * 2.2;
    slide.addShape(pptx.ShapeType.rect, {
      x, y: 4.9, w: 0.2, h: 0.2,
      fill: { color: item.color },
    });
    slide.addText(`${item.mode} (${item.count}个环节)`, {
      x: x + 0.3, y: 4.85, w: 1.8, h: 0.3,
      fontSize: 9, color: COLORS.muted, fontFace: 'Microsoft YaHei',
    });
  });
}

/* ================================================================
   Slide 5: 协作模式
   ================================================================ */
function slideCollaboration(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🤝 人机协作模式', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('三种协作模式，让AI和HR各尽其能', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  const modes = [
    {
      title: 'AI主导 · 人工复核',
      sub: '9个环节 · 自动化程度最高',
      color: '6366f1',
      items: ['人才战略雷达', '岗位发布', '简历筛选', '自动约面', 'AI面试', '候选人背调', '保温池', '入职引导', '新员工培训'],
    },
    {
      title: 'AI辅助 · 人工决策',
      sub: '5个环节 · 数据驱动决策',
      color: 'f59e0b',
      items: ['候选人定级', '候选人定薪', '入职审批', 'Offer发放', '试用期培养'],
    },
    {
      title: '人工主导 · AI赋能',
      sub: '1个环节 · 深度人际交互',
      color: '0ea5e9',
      items: ['二轮面试'],
    },
  ];

  modes.forEach((m, i) => {
    const x = 0.5 + i * 3.2;
    const w = 2.9;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.5, w, h: 3.8,
      fill: { color: m.color + '08' },
      line: { color: m.color + '30', width: 1.5 },
      rectRadius: 0.12,
    });

    slide.addText(m.title, {
      x: x + 0.15, y: 1.65, w: w - 0.3, h: 0.4,
      fontSize: 13, bold: true, color: m.color, fontFace: 'Microsoft YaHei',
    });
    slide.addText(m.sub, {
      x: x + 0.15, y: 2.05, w: w - 0.3, h: 0.3,
      fontSize: 9, color: m.color, fontFace: 'Microsoft YaHei',
    });

    m.items.forEach((item, j) => {
      slide.addText(`✓  ${item}`, {
        x: x + 0.2, y: 2.5 + j * 0.35, w: w - 0.4, h: 0.3,
        fontSize: 10, color: COLORS.text, fontFace: 'Microsoft YaHei',
      });
    });
  });
}

/* ================================================================
   Slide 6: 筛选 & 面试
   ================================================================ */
function slideDeepDive1(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🔍 深度解析：筛选 & 面试', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('AI驱动的简历筛选与智能面试系统', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  // 简历筛选
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.5, w: 4.5, h: 3.5,
    fill: { color: '8b5cf615' },
    line: { color: '8b5cf640', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('📄 AI简历筛选', {
    x: 0.7, y: 1.6, w: 4, h: 0.4,
    fontSize: 14, bold: true, color: '7C3AED', fontFace: 'Microsoft YaHei',
  });
  slide.addText('智能评估系统 · AI主导', {
    x: 0.7, y: 2.0, w: 4, h: 0.3,
    fontSize: 9, color: '8B5CF6', fontFace: 'Microsoft YaHei',
  });
  const resumeFeatures = ['NLP解析关键信息', '多维度评分', '加分项/风险点识别', '生成AI摘要'];
  resumeFeatures.forEach((t, i) => {
    slide.addText(`⚡  ${t}`, {
      x: 0.8, y: 2.5 + i * 0.35, w: 3.5, h: 0.3,
      fontSize: 10, color: '7C3AED', fontFace: 'Microsoft YaHei',
    });
  });
  // 效率指标
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 4.1, w: 1.9, h: 0.5,
    fill: { color: 'FEF3C7' }, rectRadius: 0.1,
  });
  slide.addText('效率 ↑', {
    x: 0.8, y: 4.1, w: 1.9, h: 0.5,
    fontSize: 12, bold: true, color: 'B45309', fontFace: 'Microsoft YaHei', align: 'center',
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 2.9, y: 4.1, w: 1.9, h: 0.5,
    fill: { color: 'DCFCE7' }, rectRadius: 0.1,
  });
  slide.addText('漏筛率 ↓', {
    x: 2.9, y: 4.1, w: 1.9, h: 0.5,
    fontSize: 12, bold: true, color: '166534', fontFace: 'Microsoft YaHei', align: 'center',
  });

  // AI面试
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.3, y: 1.5, w: 4.5, h: 3.5,
    fill: { color: 'ec489915' },
    line: { color: 'ec489940', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('🤖 AI面试官', {
    x: 5.5, y: 1.6, w: 4, h: 0.4,
    fontSize: 14, bold: true, color: 'DB2777', fontFace: 'Microsoft YaHei',
  });
  slide.addText('智能面试系统 · AI主导', {
    x: 5.5, y: 2.0, w: 4, h: 0.3,
    fontSize: 9, color: 'EC4899', fontFace: 'Microsoft YaHei',
  });
  const interviewFeatures = ['结构化出题追问', '实时能力评估', '情绪识别分析', '面试报告生成'];
  interviewFeatures.forEach((t, i) => {
    slide.addText(`⚡  ${t}`, {
      x: 5.6, y: 2.5 + i * 0.35, w: 3.5, h: 0.3,
      fontSize: 10, color: 'DB2777', fontFace: 'Microsoft YaHei',
    });
  });
  // 面试指标
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.6, y: 4.1, w: 1.9, h: 0.5,
    fill: { color: 'FEF3C7' }, rectRadius: 0.1,
  });
  slide.addText('面试产能 ↑', {
    x: 5.6, y: 4.1, w: 1.9, h: 0.5,
    fontSize: 12, bold: true, color: 'B45309', fontFace: 'Microsoft YaHei', align: 'center',
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 7.7, y: 4.1, w: 1.9, h: 0.5,
    fill: { color: 'DCFCE7' }, rectRadius: 0.1,
  });
  slide.addText('评价一致性 ↑', {
    x: 7.7, y: 4.1, w: 1.9, h: 0.5,
    fontSize: 12, bold: true, color: '166534', fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 7: 定级 & 定薪
   ================================================================ */
function slideDeepDive2(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('📊 深度解析：定级 & 定薪', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('数据驱动的智能定级定薪系统', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  // 定级
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.5, w: 4.5, h: 3.8,
    fill: { color: 'f43f5e10' },
    line: { color: 'f43f5e30', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('🎯 智能定级', {
    x: 0.7, y: 1.65, w: 4, h: 0.4,
    fontSize: 14, bold: true, color: 'E11D48', fontFace: 'Microsoft YaHei',
  });
  slide.addText('AI辅助 · HR决策', {
    x: 0.7, y: 2.0, w: 4, h: 0.3,
    fontSize: 9, color: 'F43F5E', fontFace: 'Microsoft YaHei',
  });

  const gradeDims = [
    { name: '技术深度', w: '25%', s: 92 },
    { name: '工程实践', w: '20%', s: 85 },
    { name: '系统设计', w: '20%', s: 78 },
    { name: '团队影响', w: '15%', s: 72 },
    { name: '项目成果', w: '20%', s: 88 },
  ];
  gradeDims.forEach((d, i) => {
    slide.addText(`${d.name} (${d.w})`, {
      x: 0.8, y: 2.4 + i * 0.35, w: 1.5, h: 0.3,
      fontSize: 9, color: COLORS.muted, fontFace: 'Microsoft YaHei',
    });
    // Bar background
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 2.3, y: 2.45 + i * 0.35, w: 1.8, h: 0.15,
      fill: { color: 'FEE2E2' }, rectRadius: 0.05,
    });
    // Bar fill
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 2.3, y: 2.45 + i * 0.35, w: 1.8 * d.s / 100, h: 0.15,
      fill: { color: 'F87171' }, rectRadius: 0.05,
    });
    slide.addText(`${d.s}`, {
      x: 4.2, y: 2.4 + i * 0.35, w: 0.4, h: 0.3,
      fontSize: 9, bold: true, color: 'E11D48', fontFace: 'Microsoft YaHei', align: 'right',
    });
  });

  // AI建议
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: 4.3, w: 2, h: 0.8,
    fill: { color: COLORS.white }, line: { color: 'FCA5A5', width: 1 }, rectRadius: 0.1,
  });
  slide.addText('AI建议级别: P7\n置信度 88%', {
    x: 0.8, y: 4.3, w: 2, h: 0.8,
    fontSize: 11, color: 'E11D48', fontFace: 'Microsoft YaHei', align: 'center', bold: true,
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 3.0, y: 4.3, w: 1.8, h: 0.5,
    fill: { color: 'FEF3C7' }, rectRadius: 0.1,
  });
  slide.addText('定级准确度 ↑', {
    x: 3.0, y: 4.3, w: 1.8, h: 0.5,
    fontSize: 11, bold: true, color: 'B45309', fontFace: 'Microsoft YaHei', align: 'center',
  });

  // 定薪
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.3, y: 1.5, w: 4.5, h: 3.8,
    fill: { color: 'f9731610' },
    line: { color: 'f9731630', width: 1 },
    rectRadius: 0.12,
  });
  slide.addText('💰 薪酬测算', {
    x: 5.5, y: 1.65, w: 4, h: 0.4,
    fontSize: 14, bold: true, color: 'EA580C', fontFace: 'Microsoft YaHei',
  });
  slide.addText('AI辅助 · HR确认', {
    x: 5.5, y: 2.0, w: 4, h: 0.3,
    fontSize: 9, color: 'F97316', fontFace: 'Microsoft YaHei',
  });

  // 薪资分位柱形图
  const bars = [
    { label: 'P25', val: 38, h: 48 },
    { label: 'P50', val: 45, h: 57 },
    { label: 'AI推荐', val: 47, h: 60, highlight: true },
    { label: 'P75', val: 55, h: 70 },
  ];
  bars.forEach((b, i) => {
    const bx = 5.8 + i * 0.85;
    const barH = b.h / 100 * 1.2;
    slide.addShape(pptx.ShapeType.rect, {
      x: bx, y: 2.4 + (1.2 - barH), w: 0.6, h: barH,
      fill: { color: b.highlight ? 'F97316' : 'FDBA74' },
    });
    slide.addText(`${b.val}K`, {
      x: bx, y: 2.2, w: 0.6, h: 0.25,
      fontSize: 8, bold: true, color: b.highlight ? 'EA580C' : COLORS.muted,
      fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(b.label, {
      x: bx, y: 3.65, w: 0.6, h: 0.25,
      fontSize: 7, color: COLORS.muted, fontFace: 'Microsoft YaHei', align: 'center',
    });
  });

  // 调薪因素
  const factors = [
    { name: '8年经验', impact: '+5%', pos: true },
    { name: '本科学历', impact: '-3%', pos: false },
    { name: '大厂背景', impact: '+4%', pos: true },
    { name: '管理经验', impact: '+3%', pos: true },
  ];
  slide.addText('调薪因素', {
    x: 5.7, y: 4.0, w: 3, h: 0.3,
    fontSize: 10, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  factors.forEach((f, i) => {
    slide.addText(f.name, {
      x: 5.7, y: 4.35 + i * 0.25, w: 1.5, h: 0.25,
      fontSize: 9, color: COLORS.muted, fontFace: 'Microsoft YaHei',
    });
    slide.addText(f.impact, {
      x: 7.5, y: 4.35 + i * 0.25, w: 0.6, h: 0.25,
      fontSize: 9, bold: true, color: f.pos ? '16A34A' : 'EF4444', fontFace: 'Microsoft YaHei', align: 'right',
    });
  });
}

/* ================================================================
   Slide 8: Offer到入职
   ================================================================ */
function slideDeepDive3(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('📋 深度解析：Offer到入职', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('从Offer发放到新员工融入的全链路自动化', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  const stages = [
    { title: 'Offer发放', color: '84cc16', mode: 'AI辅助',
      features: ['个性化Offer生成', '入职概率预测', '竞争Offer分析', '吸引策略推荐'],
      m1: { label: '生成效率', dir: '↑' }, m2: { label: '接受率', dir: '↑' } },
    { title: '候选人背调', color: '22c55e', mode: 'AI主导',
      features: ['多维度自动核查', '学历/工作验证', '实时进度追踪', '风险预警'],
      m1: { label: '背调周期', dir: '↓' }, m2: { label: '覆盖率', dir: '↑' } },
    { title: '入职引导', color: '06b6d4', mode: 'AI主导',
      features: ['自动创建账号', '设备工位申请', '入职文件包生成', '培训智能排期'],
      m1: { label: '准备耗时', dir: '↓' }, m2: { label: '入职满意度', dir: '↑' } },
    { title: '培训成长', color: '6366f1', mode: 'AI主导',
      features: ['能力画像分析', '个性化学习路径', '学习效果评估', '学习伙伴匹配'],
      m1: { label: '课程匹配度', dir: '↑' }, m2: { label: '上手速度', dir: '↑' } },
  ];

  stages.forEach((s, i) => {
    const x = 0.3 + i * 2.45;
    const w = 2.25;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.5, w, h: 3.7,
      fill: { color: s.color + '10' },
      line: { color: s.color + '30', width: 1 },
      rectRadius: 0.12,
    });

    slide.addText(s.title, {
      x: x + 0.1, y: 1.6, w: w - 0.2, h: 0.35,
      fontSize: 12, bold: true, color: s.color, fontFace: 'Microsoft YaHei',
    });
    slide.addText(s.mode, {
      x: x + 0.1, y: 1.92, w: w - 0.2, h: 0.25,
      fontSize: 8, color: COLORS.muted, fontFace: 'Microsoft YaHei',
    });

    s.features.forEach((f, j) => {
      slide.addText(`✓  ${f}`, {
        x: x + 0.1, y: 2.3 + j * 0.3, w: w - 0.2, h: 0.28,
        fontSize: 9, color: COLORS.text, fontFace: 'Microsoft YaHei',
      });
    });

    // Metric indicators with arrows
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.05, y: 3.6, w: (w - 0.2) / 2, h: 0.4,
      fill: { color: COLORS.white }, line: { color: s.color + '30', width: 0.5 }, rectRadius: 0.08,
    });
    slide.addText(`${s.m1.label} ${s.m1.dir}`, {
      x: x + 0.05, y: 3.6, w: (w - 0.2) / 2, h: 0.4,
      fontSize: 8, bold: true, color: '16A34A', fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.05 + (w - 0.2) / 2 + 0.1, y: 3.6, w: (w - 0.2) / 2, h: 0.4,
      fill: { color: COLORS.white }, line: { color: s.color + '30', width: 0.5 }, rectRadius: 0.08,
    });
    slide.addText(`${s.m2.label} ${s.m2.dir}`, {
      x: x + 0.05 + (w - 0.2) / 2 + 0.1, y: 3.6, w: (w - 0.2) / 2, h: 0.4,
      fontSize: 8, bold: true, color: '16A34A', fontFace: 'Microsoft YaHei', align: 'center',
    });
  });
}

/* ================================================================
   Slide 9: AI智能体矩阵
   ================================================================ */
function slideAiAgents(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🤖 AI智能体矩阵', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('13个专属AI智能体，各司其职驱动招聘全流程', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  const agents = [
    { name: '人才雷达', acc: '87.3%', tasks: 45, color: '0ea5e9' },
    { name: 'JD生成', acc: '75.0%', tasks: 12, color: '6366f1' },
    { name: '简历筛选', acc: '86.7%', tasks: 286, color: '8b5cf6' },
    { name: '约面调度', acc: '90.6%', tasks: 64, color: 'a855f7' },
    { name: 'AI面试', acc: '92.1%', tasks: 38, color: 'd946ef' },
    { name: '定级评估', acc: '77.3%', tasks: 22, color: 'f43f5e' },
    { name: '薪酬测算', acc: '83.3%', tasks: 18, color: 'f97316' },
    { name: '审批汇总', acc: '93.3%', tasks: 15, color: 'eab308' },
    { name: 'Offer生成', acc: '90.0%', tasks: 10, color: '84cc16' },
    { name: '背调核查', acc: '100%', tasks: 8, color: '22c55e' },
    { name: '候选人保温', acc: '98.3%', tasks: 120, color: '14b8a6' },
    { name: '入职引导', acc: '96.0%', tasks: 25, color: '06b6d4' },
    { name: '培训推荐', acc: '93.3%', tasks: 30, color: '6366f1' },
  ];

  agents.forEach((a, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.5 + col * 2.4;
    const y = 1.5 + row * 0.95;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 2.2, h: 0.8,
      fill: { color: COLORS.white },
      line: { color: COLORS.border, width: 1 },
      rectRadius: 0.1,
    });
    slide.addText(`${a.name} Agent`, {
      x: x + 0.15, y: y + 0.05, w: 1.9, h: 0.25,
      fontSize: 9, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
    });
    slide.addText(`准确率 ${a.acc}  ·  月任务 ${a.tasks}`, {
      x: x + 0.15, y: y + 0.35, w: 1.9, h: 0.25,
      fontSize: 8, color: a.color, fontFace: 'Microsoft YaHei',
    });
  });

  // 汇总
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.5, y: 5.0, w: 7, h: 0.45,
    fill: { color: 'EEF2FF' }, rectRadius: 0.15,
  });
  slide.addText('13个智能体 · 月度总任务 693 · 平均准确率 88.8% · Token成本 ¥300/月', {
    x: 1.5, y: 5.0, w: 7, h: 0.45,
    fontSize: 10, bold: true, color: COLORS.accent, fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 10: 运营数据
   ================================================================ */
function slideOperationsData(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('📊 运营数据概览', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('实时招聘数据全景，数据驱动运营优化', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  // Pipeline 数据
  const pipeline = [
    { name: '发布', val: 3 }, { name: '筛选', val: 42 }, { name: '约面', val: 8 },
    { name: 'AI面', val: 5 }, { name: '复面', val: 3 }, { name: '定级', val: 2 },
    { name: '定薪', val: 2 }, { name: '审批', val: 1 }, { name: 'Offer', val: 1 },
    { name: '背调', val: 1 }, { name: '保温', val: 15 }, { name: '入职', val: 2 },
    { name: '试用', val: 3 }, { name: '培训', val: 5 },
  ];
  const maxVal = Math.max(...pipeline.map(p => p.val));

  pipeline.forEach((p, i) => {
    const barW = Math.max((p.val / maxVal) * 4, 0.3);
    slide.addText(p.name, {
      x: 0.5, y: 1.4 + i * 0.28, w: 0.6, h: 0.25,
      fontSize: 7, color: COLORS.muted, fontFace: 'Microsoft YaHei', align: 'right',
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 1.2, y: 1.43 + i * 0.28, w: barW, h: 0.18,
      fill: { color: '6366f1' }, rectRadius: 0.05,
    });
    slide.addText(`${p.val}`, {
      x: 1.3 + barW, y: 1.4 + i * 0.28, w: 0.5, h: 0.25,
      fontSize: 7, bold: true, color: COLORS.accent, fontFace: 'Microsoft YaHei',
    });
  });

  // 右侧KPI
  const kpis = [
    { label: '候选人总数', value: '93', sub: '↑12 本周新增' },
    { label: '在招岗位', value: '3', sub: '3个部门' },
    { label: '平均周期', value: '18天', sub: '↓较传统40%' },
    { label: 'Offer接受率', value: '85%', sub: '↑22%' },
  ];
  kpis.forEach((k, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = 6.2 + col * 1.9;
    const y = 1.5 + row * 1.4;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y, w: 1.7, h: 1.2,
      fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.1,
    });
    slide.addText(k.label, {
      x, y: y + 0.1, w: 1.7, h: 0.25,
      fontSize: 8, color: COLORS.muted, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(k.value, {
      x, y: y + 0.35, w: 1.7, h: 0.45,
      fontSize: 22, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(k.sub, {
      x, y: y + 0.8, w: 1.7, h: 0.25,
      fontSize: 8, color: COLORS.success, fontFace: 'Microsoft YaHei', align: 'center',
    });
  });

  // AI处理效率卡
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.2, y: 4.3, w: 3.6, h: 0.9,
    fill: { color: COLORS.accent },
    rectRadius: 0.1,
  });
  slide.addText('AI处理效率  94.2%', {
    x: 6.2, y: 4.35, w: 3.6, h: 0.5,
    fontSize: 18, bold: true, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
  });
  slide.addText('较上月 +2.3%', {
    x: 6.2, y: 4.85, w: 3.6, h: 0.3,
    fontSize: 9, color: 'C7D2FE', fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 11: 投资回报
   ================================================================ */
function slideROI(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('💰 投资回报分析', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('低成本、高回报的AI赋能方案', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  // 成本分析
  const costs = [
    { name: 'AI面试Agent', cost: '¥105.30', color: 'd946ef' },
    { name: '简历筛选Agent', cost: '¥98.13', color: '8b5cf6' },
    { name: '候选人保温Agent', cost: '¥21.60', color: '14b8a6' },
    { name: '约面调度Agent', cost: '¥17.76', color: 'a855f7' },
    { name: '其他8个Agent', cost: '¥57.64', color: '64748b' },
  ];
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 1.4, w: 4.5, h: 2.5,
    fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.12,
  });
  slide.addText('3月AI智能体运营成本', {
    x: 0.7, y: 1.5, w: 4, h: 0.35,
    fontSize: 11, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  costs.forEach((c, i) => {
    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8, y: 2.0 + i * 0.3, w: 0.15, h: 0.15,
      fill: { color: c.color },
    });
    slide.addText(c.name, {
      x: 1.05, y: 1.94 + i * 0.3, w: 2, h: 0.25,
      fontSize: 9, color: COLORS.text, fontFace: 'Microsoft YaHei',
    });
    slide.addText(c.cost, {
      x: 3.5, y: 1.94 + i * 0.3, w: 1.2, h: 0.25,
      fontSize: 9, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei', align: 'right',
    });
  });
  // 总计
  slide.addText('月度总计  ¥300.43', {
    x: 0.8, y: 3.55, w: 3.8, h: 0.3,
    fontSize: 12, bold: true, color: COLORS.accent, fontFace: 'Microsoft YaHei',
  });

  // VS对比
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.5, y: 4.1, w: 4.5, h: 1.2,
    fill: { color: 'ECFDF5' }, line: { color: 'A7F3D0', width: 1 }, rectRadius: 0.12,
  });
  slide.addText('AI方案 ¥300/月   VS   等效人力 ¥75,000/月', {
    x: 0.5, y: 4.2, w: 4.5, h: 0.45,
    fontSize: 11, bold: true, color: '065F46', fontFace: 'Microsoft YaHei', align: 'center',
  });
  slide.addText('成本仅为传统方式的 0.4%', {
    x: 0.5, y: 4.65, w: 4.5, h: 0.35,
    fontSize: 11, bold: true, color: '16A34A', fontFace: 'Microsoft YaHei', align: 'center',
  });

  // 效益指标
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.3, y: 1.4, w: 4.5, h: 2.5,
    fill: { color: COLORS.white }, line: { color: COLORS.border, width: 1 }, rectRadius: 0.12,
  });
  slide.addText('关键效益指标', {
    x: 5.5, y: 1.5, w: 4, h: 0.35,
    fontSize: 11, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });

  const benefits = [
    { label: '节约工时', value: '597小时/月', color: '6366f1', pct: 95 },
    { label: '招聘周期缩短', value: '40%', color: '22c55e', pct: 40 },
    { label: 'HR效能提升', value: '3.5倍', color: 'f59e0b', pct: 75 },
    { label: '候选人满意度', value: '提升40%', color: '8b5cf6', pct: 40 },
  ];
  benefits.forEach((b, i) => {
    slide.addText(b.label, {
      x: 5.6, y: 1.95 + i * 0.5, w: 2, h: 0.25,
      fontSize: 9, color: COLORS.text, fontFace: 'Microsoft YaHei',
    });
    slide.addText(b.value, {
      x: 8, y: 1.95 + i * 0.5, w: 1.5, h: 0.25,
      fontSize: 9, bold: true, color: b.color, fontFace: 'Microsoft YaHei', align: 'right',
    });
    // Bar
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.6, y: 2.2 + i * 0.5, w: 3.9, h: 0.12,
      fill: { color: 'F1F5F9' }, rectRadius: 0.04,
    });
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 5.6, y: 2.2 + i * 0.5, w: 3.9 * b.pct / 100, h: 0.12,
      fill: { color: b.color }, rectRadius: 0.04,
    });
  });

  // ROI卡
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 5.3, y: 4.2, w: 4.5, h: 1.1,
    fill: { color: COLORS.accent },
    rectRadius: 0.12,
  });
  slide.addText('投资回报率  250x', {
    x: 5.3, y: 4.3, w: 4.5, h: 0.6,
    fontSize: 26, bold: true, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
  });
  slide.addText('AI投入产出比', {
    x: 5.3, y: 4.9, w: 4.5, h: 0.3,
    fontSize: 10, color: 'C7D2FE', fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   Slide 12: 实施路线图
   ================================================================ */
function slideRoadmap(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.bg };

  slide.addText('🗺️ 实施路线图', {
    x: 0.6, y: 0.3, w: 8.8, h: 0.6,
    fontSize: 24, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
  });
  slide.addText('分阶段推进，渐进式落地，稳步实现全面AI化', {
    x: 0.6, y: 0.85, w: 8.8, h: 0.4,
    fontSize: 13, color: COLORS.muted, fontFace: 'Microsoft YaHei',
  });

  const phases = [
    { phase: '第一阶段', time: '第1-2月', title: '基础建设', color: '6366f1',
      items: ['部署AI简历筛选引擎', '上线AI面试系统', '接入自动约面调度', '建立数据基线'] },
    { phase: '第二阶段', time: '第3-4月', title: '深度整合', color: '8b5cf6',
      items: ['上线智能定级定薪', '部署审批智能摘要', '启动Offer生成引擎', '接入背调自动化'] },
    { phase: '第三阶段', time: '第5-6月', title: '全面覆盖', color: 'd946ef',
      items: ['上线入职引导AI管家', '部署培训推荐引擎', '启动保温池智能运营', '上线全流程运营看板'] },
    { phase: '第四阶段', time: '第7月+', title: '持续优化', color: 'ec4899',
      items: ['智能体准确率持续提升', '新场景扩展（校招/内推）', '跨系统数据打通', '建设AI招聘知识库'] },
  ];

  phases.forEach((p, i) => {
    const x = 0.3 + i * 2.45;
    const w = 2.25;

    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.5, w, h: 3.5,
      fill: { color: p.color + '08' },
      line: { color: p.color + '40', width: 2 },
      rectRadius: 0.12,
    });

    // 序号圆
    slide.addShape(pptx.ShapeType.roundRect, {
      x: x + 0.1, y: 1.65, w: 0.45, h: 0.45,
      fill: { color: p.color }, rectRadius: 0.1,
    });
    slide.addText(`${i + 1}`, {
      x: x + 0.1, y: 1.65, w: 0.45, h: 0.45,
      fontSize: 14, bold: true, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(p.phase, {
      x: x + 0.65, y: 1.6, w: 1.3, h: 0.25,
      fontSize: 9, bold: true, color: p.color, fontFace: 'Microsoft YaHei',
    });
    slide.addText(p.time, {
      x: x + 0.65, y: 1.85, w: 1.3, h: 0.25,
      fontSize: 8, color: COLORS.muted, fontFace: 'Microsoft YaHei',
    });

    slide.addText(p.title, {
      x: x + 0.15, y: 2.25, w: w - 0.3, h: 0.35,
      fontSize: 13, bold: true, color: COLORS.text, fontFace: 'Microsoft YaHei',
    });

    p.items.forEach((item, j) => {
      slide.addText(`✓  ${item}`, {
        x: x + 0.15, y: 2.7 + j * 0.35, w: w - 0.3, h: 0.3,
        fontSize: 9, color: COLORS.text, fontFace: 'Microsoft YaHei',
      });
    });

    slide.addText(`🎯 ${p.items.length > 0 ? ['实现招聘前端自动化', '实现决策环节AI赋能', '实现全流程AI覆盖', '持续迭代优化效果'][i] : ''}`, {
      x: x + 0.1, y: 4.5, w: w - 0.2, h: 0.3,
      fontSize: 8, bold: true, color: p.color, fontFace: 'Microsoft YaHei',
    });
  });
}

/* ================================================================
   Slide 13: 总结
   ================================================================ */
function slideSummary(pptx: PptxGenJS) {
  const slide = pptx.addSlide();
  slide.background = { fill: COLORS.accent };

  slide.addText('总结与展望', {
    x: 0.8, y: 0.8, w: 8.4, h: 0.8,
    fontSize: 30, bold: true, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
  });

  // 核心成果
  const results = [
    { num: '13', label: 'AI智能体', sub: '覆盖全流程' },
    { num: '40%', label: '周期缩短', sub: '30天→18天' },
    { num: '597h', label: '月节约工时', sub: '约75工作日' },
    { num: '250x', label: '投资回报率', sub: '成本仅¥300/月' },
  ];
  results.forEach((r, i) => {
    const x = 0.8 + i * 2.2;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 1.9, w: 2, h: 1.4,
      fill: { color: '4F46E5' }, rectRadius: 0.12,
    });
    slide.addText(r.num, {
      x, y: 1.95, w: 2, h: 0.6,
      fontSize: 26, bold: true, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(r.label, {
      x, y: 2.55, w: 2, h: 0.35,
      fontSize: 11, color: 'E0E7FF', fontFace: 'Microsoft YaHei', align: 'center',
    });
    slide.addText(r.sub, {
      x, y: 2.85, w: 2, h: 0.3,
      fontSize: 9, color: '818CF8', fontFace: 'Microsoft YaHei', align: 'center',
    });
  });

  // 核心理念
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 1.5, y: 3.6, w: 7, h: 0.85,
    fill: { color: '4F46E5' }, rectRadius: 0.15,
  });
  slide.addText('AI不是替代HR，而是成为HR最强大的智能助手', {
    x: 1.5, y: 3.6, w: 7, h: 0.5,
    fontSize: 15, bold: true, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
  });
  slide.addText('AI承担重复性、数据密集型工作 → HR回归人才判断、关系维护和战略决策', {
    x: 1.5, y: 4.05, w: 7, h: 0.35,
    fontSize: 10, color: 'C7D2FE', fontFace: 'Microsoft YaHei', align: 'center',
  });

  // 三要点
  const points = [
    '🤖 AI提效：事务性工作自动化',
    '👤 人工提质：聚焦高价值决策',
    '🤝 协同增效：1+1 > 2的最佳范式',
  ];
  points.forEach((p, i) => {
    const x = 0.8 + i * 3;
    slide.addShape(pptx.ShapeType.roundRect, {
      x, y: 4.7, w: 2.8, h: 0.45,
      fill: { color: '4F46E5' }, rectRadius: 0.12,
    });
    slide.addText(p, {
      x, y: 4.7, w: 2.8, h: 0.45,
      fontSize: 10, color: COLORS.white, fontFace: 'Microsoft YaHei', align: 'center',
    });
  });

  slide.addText('感谢聆听 · 期待交流', {
    x: 0.8, y: 5.3, w: 8.4, h: 0.4,
    fontSize: 12, color: '818CF8', fontFace: 'Microsoft YaHei', align: 'center',
  });
}

/* ================================================================
   导出入口
   ================================================================ */
export async function exportSlidesToPPTX() {
  const pptx = new PptxGenJS();

  pptx.author = 'AI人才引进方案';
  pptx.title = 'AI人才引进全流程解决方案';
  pptx.subject = 'AI+HR协同 · 15阶段全覆盖 · 智能体驱动';
  pptx.layout = 'LAYOUT_WIDE'; // 16:9

  slideCover(pptx);
  slideChallenges(pptx);
  slideSolutionOverview(pptx);
  slideTalentInsights(pptx);
  slidePipeline(pptx);
  slideCollaboration(pptx);
  slideDeepDive1(pptx);
  slideDeepDive2(pptx);
  slideDeepDive3(pptx);
  slideAiAgents(pptx);
  slideOperationsData(pptx);
  slideROI(pptx);
  slideRoadmap(pptx);
  slideSummary(pptx);

  await pptx.writeFile({ fileName: 'AI人才引进方案.pptx' });
}
