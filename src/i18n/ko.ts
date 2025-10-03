export default {
  meta: {
    title: 'Unlock — 타슈켄트 중국어 코스',
    description: 'HSK 1–5 대비, 회화 연습. 온라인/오프라인. 체험 수업 제공.',
    privacy: '개인정보 처리방침 — Unlock',
    privacyDesc: 'Unlock 학교의 개인정보 처리 방침.',
  },
  nav: {
    formats: '형태', levels: '프로그램', teachers: '강사', reviews: '후기', pricing: '가격', lead: '신청', telegram: '텔레그램',
  },
  hero: {
    h1: 'Unlock 중국어 코스 — 기초부터 HSK까지',
    sub: 'HSK 1–5 대비. 회화 연습. 타슈켄트 온라인/오프라인.',
    trial: '체험 수업', writeTg: '텔레그램으로 문의', b1: 'HSK 대비', b2: '그룹/개인', b3: 'Payme/Click 결제',
  },
  formats: {
    title: '학습 형태',
    group: { title: '그룹', items: ['주 3–4시간', '기간: 3–6개월', '가격: 월 000 000 솜~', '포함: HSK 커리큘럼, 회화 연습, 과제'] },
    individual: { title: '개인', items: ['주 2–6시간', '기간: 협의', '가격: 월 000 000 솜~', '포함: 개인 맞춤 계획, 유연한 스케줄, 추가 자료'] },
    intensive: { title: '집중', items: ['주 6–10시간', '기간: 1–2개월', '가격: 월 000 000 솜~', '포함: 단기 집중, 회화/HSK 중점'] },
  },
  levels: {
    title: '프로그램과 레벨',
    subtitle: 'HSK 1–6: 목표, 문법, 어휘, 결과.',
    download: '프로그램 다운로드',
    labels: { goals: '목표', grammar: '문법 / 어휘', result: '결과' },
    timeline: [
      { level: 1, goals: '기초 표현, 자기소개, 숫자, 날짜', grammar: '성조, 병음, 기초 문형', result: 'A1: 기초 대화' },
      { level: 2, goals: '일상 상황, 쇼핑, 직장', grammar: '기초 시제, 조동사', result: 'A2: 일상 대화에 자신감' },
      { level: 3, goals: '어휘 확장, 학업/직장 주제', grammar: '더 복잡한 구조, 접속어', result: 'B1: 주제별로 능숙한 표현' },
      { level: 4, goals: '토론, 전문 주제', grammar: '고급 문법, 복합 구조', result: 'B2: 유창한 의사소통' },
      { level: 5, goals: '높은 유창성, 학술 주제', grammar: '문법 심화 숙달', result: 'C1: 원어민에 가까운 수준' },
      { level: 6, goals: '전문적 숙달, 과학 텍스트', grammar: '가장 복잡한 문법 구조', result: 'C2: 원어민 수준' },
    ],
  },
  teachers: { title: '강사', list: [
    { name: '다비드', specialty: 'HSK 1–3, 회화 연습', photo: 'https://placehold.co/600x600' },
    { name: '룩사나', specialty: 'HSK 3–6, 학술 중국어', photo: 'https://placehold.co/600x600' },
    { name: '페루자', specialty: '회화 집중 과정', photo: 'https://placehold.co/600x600' },
  ] },
  reviews: { title: '후기', list: [
    { text: '수업 덕분에 빠르게 말하기 시작했고 기초 문법을 이해했습니다.', author: '마디나' },
    { text: '6개월 만에 HSK 3 합격. 훌륭한 강사진!', author: '줌라드' },
    { text: '편한 일정과 풍부한 실습.', author: '일리야스' },
  ] },
  faq: { title: '자주 묻는 질문', items: [
    { q: '수업 시간은 얼마나 되나요?', a: '보통 60–90분, 과정 형태에 따라 다릅니다.' },
    { q: '시간표는?', a: '아침, 저녁, 주말 — 편한 시간대를 정해드립니다.' },
    { q: '수업 형태는?', a: '온라인/오프라인(타슈켄트), 그룹 및 개인.' },
    { q: '결제는?', a: 'Payme/Click, 월별 또는 모듈별.' },
    { q: '환불은?', a: '모듈 시작 전 신청 가능, 시작 후에는 협의.' },
    { q: '교재는?', a: '최신 교재와 자료, 온라인 리소스 제공.' },
  ] },
  pricing: {
    title: '가격', format: '형태', tariff: '요금', action: '동작', apply: '신청', payme: 'Payme', click: 'Click', group: '그룹', individual: '개인', intensive: '집중', priceFrom: '월 000 000 솜~',
  },
  contacts: { title: '연락처', phone: '전화', telegram: '텔레그램', whatsapp: 'WhatsApp', address: '주소', placeholderPhone: '+998 xx xxx xx xx', placeholderAddress: '타슈켄트, 주소 미정' },
  form: {
    title: '체험 수업 신청', name: '이름', phone: '전화', messenger: '메신저', level: '레벨', format: '형태', comment: '비고', submit: '보내기', sending: '전송 중...', success: '신청이 접수되었습니다. 곧 연락드리겠습니다.', successMock: '신청이 접수되었습니다 (테스트 모드).', fixErrors: '입력값을 확인해주세요',
    options: {
      messenger: { telegram: '텔레그램', whatsapp: 'WhatsApp' },
      level: { beginner: '초급', hsk1: 'HSK1', hsk2: 'HSK2', hsk3: 'HSK3', hsk4: 'HSK4', hsk5: 'HSK5', unknown: '모름' },
      format: { group: '그룹', individual: '개인', intensive: '집중' },
    },
  },
  footer: { policy: '정책' },
};


