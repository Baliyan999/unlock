export default {
  meta: {
    title: 'Unlock — 乌兹别克斯坦塔什干中文课程',
    description: 'HSK 1–6 备考，口语练习。线上线下皆可。可预约体验课。',
    privacy: '隐私政策 — Unlock',
    privacyDesc: 'Unlock 学校的个人信息处理政策。',
  },
  nav: {
    formats: '课程形式', levels: '课程安排', teachers: '老师', reviews: '评价', pricing: '价格', lead: '报名', telegram: 'Telegram',
  },
  hero: {
    h1: 'Unlock 中文课程 — 从零基础到 HSK',
    sub: 'HSK 1–6 备考，口语练习。塔什干线上线下授课。',
    trial: '预约体验课', writeTg: '在 Telegram 联系', b1: 'HSK 备考', b2: '小班/一对一', b3: '支持 Payme/Click 支付',
  },
  formats: {
    title: '课程形式',
    group: { title: '小组课', items: ['每周 3–4 小时', '时长：3–6 个月', '价格：每月自 000 000 苏姆起', '包含：HSK 课程、口语练习、作业'] },
    individual: { title: '一对一', items: ['每周 2–6 小时', '时长：协商决定', '价格：每月自 000 000 苏姆起', '包含：个性化计划、灵活时间、额外资料'] },
    intensive: { title: '强化课', items: ['每周 6–10 小时', '时长：1–2 个月', '价格：每月自 000 000 苏姆起', '包含：加速课程，侧重口语与 HSK'] },
  },
  levels: {
    title: '课程与级别',
    subtitle: 'HSK 1–6：目标、语法、词汇、成果。',
    download: '下载课程',
    labels: { goals: '目标', grammar: '语法 / 词汇', result: '成果' },
    timeline: [
      { level: 1, goals: '基础表达、自我介绍、数字、日期', grammar: '声调、拼音、基础句式', result: 'A1：基础对话' },
      { level: 2, goals: '日常场景、购物、工作', grammar: '基础时态、情态动词', result: 'A2：自信的日常交流' },
      { level: 3, goals: '词汇拓展、学习/工作主题', grammar: '更复杂结构、连接词', result: 'B1：就主题进行自如表达' },
      { level: 4, goals: '讨论、专业主题', grammar: '高级语法、复杂结构', result: 'B2：流利沟通' },
      { level: 5, goals: '高流利度、学术主题', grammar: '深入掌握语法', result: 'C1：接近母语水平' },
      { level: 6, goals: '专业精通、科学文本', grammar: '最复杂的语法结构', result: 'C2：母语水平' },
    ],
  },
  teachers: { title: '老师', list: [
    { name: '大卫', specialty: 'HSK 1–3，口语练习', photo: 'https://placehold.co/600x600' },
    { name: '鲁赫萨娜', specialty: 'HSK 3–6，学术中文', photo: 'https://placehold.co/600x600' },
    { name: '费鲁扎', specialty: '口语强化课', photo: 'https://placehold.co/600x600' },
  ] },
  reviews: { title: '评价', list: [
    { text: '课程让我很快开口说话并理解基础语法。', author: '马蒂娜' },
    { text: '半年通过 HSK 3。老师非常专业！', author: '祖姆拉德' },
    { text: '时间安排方便，口语练习很多。', author: '伊利亚斯' },
  ] },
  faq: { title: '常见问题', items: [
    { q: '一节课多长时间？', a: '通常 60–90 分钟，视课程形式而定。' },
    { q: '上课时间？', a: '早上、晚上及周末——可安排合适的时间。' },
    { q: '授课形式？', a: '线上线下（塔什干），小组或一对一。' },
    { q: '支付方式？', a: 'Payme/Click，按月或按模块支付。' },
    { q: '退款？', a: '模块开始前可申请；开始后视情况协商。' },
    { q: '教材？', a: '现代教材与资料，支持在线资源。' },
  ] },
  pricing: {
    title: '价格', format: '形式', tariff: '套餐', action: '操作', apply: '报名', payme: 'Payme 支付', click: 'Click 支付', group: '小组课', individual: '一对一', intensive: '强化课', priceFrom: '每月自 000 000 苏姆起',
  },
  contacts: { title: '联系方式', phone: '电话', telegram: 'Telegram', whatsapp: 'WhatsApp', address: '地址', placeholderPhone: '+998 xx xxx xx xx', placeholderAddress: '雅库布·科拉斯街 2/1' },
  form: {
    title: '体验课报名', name: '姓名', phone: '电话', messenger: '联系工具', level: '水平', format: '形式', comment: '备注', submit: '提交', sending: '提交中…', success: '报名已提交，我们将尽快联系您。', successMock: '报名已提交（测试模式）。', fixErrors: '请检查表单内容',
    options: {
      messenger: { telegram: 'Telegram', whatsapp: 'WhatsApp' },
      level: { unknown: '不知道我的水平', beginner: '初学者', hsk1: 'HSK1', hsk2: 'HSK2', hsk3: 'HSK3', hsk4: 'HSK4', hsk5: 'HSK5', hsk6: 'HSK6' },
      format: { group: '小组课', individual: '一对一', intensive: '强化课' },
    },
  },
  footer: { 
    policy: '隐私',
    description: 'UNLOCK — 中文学校。从初级到HSK的课程，口语练习，个人和小组学习。',
    links: {
      privacy: '隐私政策',
      offer: '公开要约',
      refund: '退款条款'
    }
  },
  
  // Test
  test: {
    title: '确定您的中文水平',
    description: '完成10道题目，了解适合您的HSK等级',
    info: {
      title: '测试信息',
      questions: '10道不同难度的题目',
      time: '完成时间：10分钟',
      result: '获得HSK等级建议'
    },
    start: '开始测试',
    question: '题目',
    of: '共',
    minutes: '分钟',
    timeLeft: '剩余时间',
    previous: '← 上一题',
    next: '下一题 →',
    finish: '完成测试',
    result: {
      title: '测试结果',
      score: '您的成绩',
      apply: '报名课程',
      restart: '重新测试'
    }
  },
};


