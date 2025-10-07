export default {
  meta: {
    title: 'Unlock — Chinese courses in Tashkent',
    description: 'HSK 1–6 preparation. Speaking practice. Online and offline. Trial lesson.',
    privacy: 'Privacy Policy — Unlock',
    privacyDesc: 'Personal data processing policy of Unlock school.',
  },
  nav: {
    formats: 'Formats',
    levels: 'Program',
    teachers: 'Teachers',
    reviews: 'Reviews',
    lead: 'Apply',
    telegram: 'Telegram',
  },
  hero: {
    h1: 'Unlock Chinese courses — from zero to HSK',
    sub: 'HSK 1–6 prep. Speaking practice. Online and offline, Tashkent.',
    trial: 'Trial lesson',
    writeTg: 'Message in Telegram',
    b1: 'HSK preparation',
    b2: 'Groups and individual',
    b3: 'Flexible payment',
  },
  formats: {
    title: 'Learning formats',
    group: { title: 'Group', items: ['8–12 lessons per month', 'Lesson duration 80 minutes', 'Price: from 500 000 UZS/month', 'Includes: HSK program, speaking practice, homework'] },
    individual: { title: 'Individual', items: ['12 lessons per month', 'Lesson duration 60 minutes', 'Price: from 2 200 000 UZS/month'] },
    intensive: { title: 'Intensive', items: ['Discussed strictly with the teacher'] },
  },
  levels: {
    title: 'Program and levels',
    subtitle: 'HSK 1–6: goals, grammar, vocabulary, outcome.',
    download: 'Download program',
    labels: { goals: 'Goals', grammar: 'Grammar / vocabulary', result: 'Outcome' },
    timeline: [
      { level: 1, goals: 'Basic phrases, introductions, numbers, dates', grammar: 'Tones, pinyin, simple constructions', result: 'A1: basic dialogues' },
      { level: 2, goals: 'Daily situations, shopping, work', grammar: 'Simple tenses, modal verbs', result: 'A2: confident daily dialogues' },
      { level: 3, goals: 'Vocabulary expansion, study/work topics', grammar: 'More complex structures, connectors', result: 'B1: confident topic-based speaking' },
      { level: 4, goals: 'Discussions, professional topics', grammar: 'Advanced grammar, complex structures', result: 'B2: fluent communication' },
      { level: 5, goals: 'High fluency, academic topics', grammar: 'Deep grammar mastery', result: 'C1: near-native proficiency' },
      { level: 6, goals: 'Professional mastery, scientific texts', grammar: 'Most complex grammatical structures', result: 'C2: native-level proficiency' },
    ],
  },
  teachers: { title: 'Teachers', list: [
    { name: 'David', specialty: 'HSK 1–3, speaking practice', photo: 'https://placehold.co/600x600' },
    { name: 'Rukhsana', specialty: 'HSK 3–6, academic Chinese', photo: 'https://placehold.co/600x600' },
    { name: 'Feruza', specialty: 'Speaking intensive', photo: 'https://placehold.co/600x600' },
  ] },
  reviews: { 
    title: 'Reviews', 
    subtitle: 'What our students say about UNLOCK Chinese language courses',
    leaveReview: 'Leave a review',
    list: [] 
  },
  faq: { title: 'FAQ', items: [
    { q: 'How long is a lesson?', a: 'Usually 60–80 minutes depending on the format.' },
    { q: 'Schedule?', a: 'Morning, evening and weekends — we will pick convenient slots.' },
    { q: 'Format?', a: 'Online and offline (Tashkent), groups and individual.' },
    { q: 'Payment?', a: 'Flexible payment options, monthly or per module.' },
    { q: 'Refunds?', a: 'Before a month or module starts — on request; later — by agreement.' },
    { q: 'Textbooks?', a: 'Modern textbooks and materials, access to online resources.' },
  ] },
  pricing: {
    title: 'Pricing',
    format: 'Format',
    tariff: 'Rate',
    action: 'Action',
    apply: 'Apply',
    group: 'Group', individual: 'Individual', intensive: 'Intensive',
    priceFrom: 'from 500 000 UZS/month',
  },
  contacts: {
    title: 'Contacts', phone: 'Phone', telegram: 'Telegram', whatsapp: 'WhatsApp', address: 'Address',
    placeholderPhone: '+998 xx xxx xx xx', placeholderAddress: 'Yakub Kolas Street, 2/1, Central Palace Hotel, 6th floor',
  },
  form: {
    title: 'Trial lesson application',
    name: 'Name',
    phone: 'Phone',
    messenger: 'Messenger',
    level: 'Level',
    format: 'Format',
    comment: 'Comment',
    commentPlaceholder: 'Tell us about your Chinese language learning goals...',
    submit: 'Send',
    sending: 'Sending...',
    success: 'Application sent. We will contact you.',
    successMock: 'Application sent (test mode).',
    fixErrors: 'Please check the form fields',
    options: {
      messenger: { telegram: 'Telegram', whatsapp: 'WhatsApp' },
      level: { unknown: "Don't know my level", beginner: 'Beginner', hsk1: 'HSK1', hsk2: 'HSK2', hsk3: 'HSK3', hsk4: 'HSK4', hsk5: 'HSK5', hsk6: 'HSK6' },
      format: { group: 'Group', individual: 'Individual', intensive: 'Intensive' },
    },
  },

  // Calculator
  calculator: {
    title: 'Cost Calculator',
    subtitle: 'Calculate the cost of Chinese language learning',
    selectOptions: 'Select learning parameters',
    level: 'HSK Level',
    selectLevel: 'Select level',
    format: 'Learning format',
    selectFormat: 'Select format',
    formats: {
      group: 'Group classes',
      individual: 'Individual classes',
      intensive: 'Intensive course'
    },
    formatDescriptions: {
      group: 'Up to 15 people in a group',
      individual: 'Personal classes',
      intensive: 'Accelerated learning'
    },
    levelNames: {
      '1': 'Beginner',
      '2': 'Basic',
      '3': 'Intermediate',
      '4': 'Advanced',
      '5': 'High',
      '6': 'Expert'
    },
    lessonsPerMonth: 'Lessons per month',
    selectLessons: 'Select number of lessons',
    lessons: 'lessons',
    perMonth: 'per month',
    lessonsHint: '8-12 lessons for group classes',
    result: 'Calculation result',
    totalPerMonth: 'Monthly cost',
    totalCourse: 'Total course cost',
    duration: 'Duration',
    months: 'months',
    apply: 'Apply',
    individualInfo: 'Individual classes: 12 lessons per month, 60 minutes each',
    intensiveInfo: 'Intensive course: Number of lessons discussed strictly with the teacher',
    intensiveNotice: 'Number of lessons regulated by teacher',
    intensiveFormat: 'Intensive format',
    teacherRegulated: 'Regulated by teacher',
    promoCode: 'Promo code',
    promoCodePlaceholder: 'Enter promo code',
    baseCost: 'Base cost',
    discount: 'Discount',
    finalCost: 'Final cost',
    calculation: 'Cost calculation',
    selectAllOptions: 'Select all parameters for calculation',
    monthlyCost: 'Monthly cost',
    totalCost: 'Total cost',
    breakdown: 'Breakdown',
    basePrice: 'Base price',
    formatMultiplier: 'Format multiplier',
    bookTrial: 'Book a trial lesson',
    backToHome: 'Back to home'
  },
  footer: { 
    description: 'UNLOCK — Chinese language school. Courses from beginner level to HSK, conversational practice, individual and in groups.',
    navigation: {
      title: 'Navigation',
      formats: 'Formats',
      levels: 'Program',
      teachers: 'Teachers',
      reviews: 'Reviews',
      blog: 'Blog',
      test: 'Test'
    },
    contacts: {
      title: 'Contacts',
      address: 'Tashkent, Mirabad district, Yakub Kolas street, 2/1, Central Palace hotel, 6th floor'
    },
    links: {
      title: 'Documents',
      privacy: 'Privacy Policy',
      offer: 'Public Offer'
    },
    social: {
      telegram: 'Telegram',
      instagram: 'Instagram',
      whatsapp: 'WhatsApp',
      calculator: 'Cost Calculator'
    },
    rights: 'All rights reserved',
    scrollToTop: 'To top'
  },
  
  // Test
  test: {
    title: 'Determine your Chinese level',
    description: 'Take a 10-question test and find out which HSK level suits you',
    info: {
      title: 'Test information',
      questions: '10 questions of different difficulty',
      time: 'Time to complete: 10 minutes',
      result: 'Get HSK level recommendation'
    },
    start: 'Start test',
    question: 'Question',
    of: 'of',
    minutes: 'min',
    timeLeft: 'Time left',
    previous: '← Back',
    next: 'Next →',
    finish: 'Finish test',
    result: {
      title: 'Test result',
      score: 'Your result',
      apply: 'Apply for course',
      restart: 'Take test again'
    }
  },
};


