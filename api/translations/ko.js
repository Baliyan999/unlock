module.exports = {
  // 메인 메뉴
  'welcome.admin': `👋 안녕하세요, {name}님!\n\nUNLOCK 봇에 오신 것을 환영합니다! 🎓\n\n관리자로 로그인하셨습니다! 👨‍💼\n\n사용 가능한 기능:\n📝 과정 리뷰 작성\nℹ️ 프로그램 정보 받기\n🌍 인터페이스 언어 변경\n📞 연락처 및 주소 받기\n👨‍💼 관리자 패널 (리뷰 관리)\n\n작업을 선택하세요:`,
  'welcome.user': `👋 안녕하세요, {name}님!\n\nUNLOCK 봇에 오신 것을 환영합니다! 🎓\n\n여기서 할 수 있는 것:\n📝 과정 리뷰 작성\nℹ️ 프로그램 정보 받기\n🌍 인터페이스 언어 변경\n📞 연락처 및 주소 받기\n\n작업을 선택하세요:`,

  // 버튼
  'buttons.leaveReview': '📝 리뷰 작성',
  'buttons.courseInfo': 'ℹ️ 과정 정보',
  'buttons.changeLanguage': '🌍 언어 변경',
  'buttons.getContacts': '📞 연락처',
  'buttons.adminPanel': '👨‍💼 관리자 패널',
  'buttons.backToMain': '🏠 메인 메뉴',
  'buttons.back': '🔙 뒤로',
  'buttons.openInMaps': '📍 지도에서 열기',
  'buttons.showLocation': '📍 위치 보기',
  'buttons.whatsapp': '💬 WhatsApp',
  'buttons.website': '🌐 웹사이트',
  'buttons.instagram': '📷 Instagram',

  // 명령어
  'commands.help': `🤖 UNLOCK 봇이 할 수 있는 것:\n\n📝 **리뷰 작성** - 학습 경험을 공유하세요\nℹ️ **과정 정보** - 프로그램과 형식에 대해 알아보세요\n🌍 **언어 변경** - 편리한 인터페이스 언어를 선택하세요\n📞 **연락처** - 연락처 정보와 주소를 받으세요\n\n👨‍💼 **관리자용:**\n• 리뷰 관리 및 검토\n• 프로모 코드 생성 및 관리\n• 통계 및 분석\n\n💡 **사용 가능한 명령어:**\n/start - 시작 및 메인 메뉴\n/help - 봇이 할 수 있는 것\n/lang - 언어 변경\n/contact - 연락처 및 위치 받기\n\n🎓 UNLOCK에 오신 것을 환영합니다!`,
  
  'commands.language': `🌍 인터페이스 언어를 선택하세요:\n\nChoose your interface language:\n\nИнтерфейс тилини танланг:\n\n选择您的界面语言：\n\n인터페이스 언어를 선택하세요:`,
  
  'commands.contact': `📞 **UNLOCK 연락처**\n\n🏢 **주소:**\n타슈켄트시, 미라바드 구\n야쿠브 콜라스 거리, 2/1\n센트럴 팰리스 호텔, 6층\n\n📱 **전화:**\n• +998 77 268 68 86\n• +998 33 717 02 28 (WhatsApp)\n\n📧 **이메일:**\nunlocklingua@gmail.com\n\n🌐 **소셜 미디어:**\n• 웹사이트: https://unlocklingua.uz\n• Instagram: @unlock.lingua\n• Telegram: @Unlock_lingua_bot\n\n🕒 **운영 시간:**\n월-금: 9:00 - 18:00\n토: 9:00 - 15:00\n일: 휴무\n\n📍 **찾아오는 방법:**\n지하철: "미라바드" 역\n버스: "센트럴 팰리스" 정류장`,

  // 리뷰
  'reviews.waitingForText': '📝 UNLOCK 중국어 과정에 대한 리뷰를 작성해 주세요:\n\n학습 경험, 좋았던 점, 얻은 결과에 대해 말씀해 주세요.',
  'reviews.reviewReceived': '✅ 리뷰를 작성해 주셔서 감사합니다! 관리자가 검토하여 웹사이트에 게시할 예정입니다.',
  'reviews.reviewError': '❌ 리뷰 저장 중 오류가 발생했습니다. 다시 시도해 주세요.',

  // 과정 정보
  'courseInfo': `🎓 UNLOCK 과정 정보:\n\n📚 학습 프로그램:\n• HSK 1-6 (모든 레벨)\n• 회화 중국어\n• 비즈니스 중국어\n\n👨‍🏫 학습 형식:\n• 그룹 수업 (최대 12명)\n• 개별 수업`,

  // 관리자 패널
  'admin.panel': `👨‍💼 관리자 패널\n\n관리자 패널에 오신 것을 환영합니다! 여기서 할 수 있는 것:\n\n📋 리뷰 관리 - 리뷰 관리 및 검토\n🎫 프로모 코드 - 프로모 코드 생성 및 관리\n\n섹션을 선택하세요:`,
  'admin.noAccess': '관리자 권한이 없습니다',
  'admin.reviewsAdmin': '📋 리뷰 관리',
  'admin.promocodesAdmin': '🎫 프로모 코드 관리',

  // 언어
  'languages.ru': '🇷🇺 Русский',
  'languages.en': '🇺🇸 English',
  'languages.uz': '🇺🇿 O\'zbek',
  'languages.zh': '🇨🇳 中文',
  'languages.ko': '🇰🇷 한국어',

  // 메시지
  'messages.languageChanged': '✅ 인터페이스 언어가 {language}로 변경되었습니다',
  'messages.writeYourReview': '리뷰를 작성하세요',
  'messages.courseInformation': '과정 정보',
  'messages.chooseLanguage': '언어 선택',
  'messages.contacts': '연락처',
  'messages.adminPanel': '관리자 패널',
  'messages.mainMenu': '메인 메뉴',
  'messages.mainMenuText': `👋 UNLOCK 봇에 오신 것을 환영합니다! 🎓\n\n여기서 할 수 있는 것:\n📝 과정 리뷰 작성\nℹ️ 프로그램 정보 받기\n🌍 인터페이스 언어 변경\n📞 연락처 및 주소 받기\n\n작업을 선택하세요:`,
  'messages.reviewSent': '✅ 리뷰가 검토를 위해 전송되었습니다!\n\n리뷰를 작성해 주셔서 감사합니다! 곧 검토하겠습니다.',
  'messages.ratingPrompt': '✅ 리뷰를 작성해 주셔서 감사합니다! 이제 1부터 5까지의 평점을 보내주세요 (숫자만):\n\n1 - 매우 나쁨\n2 - 나쁨\n3 - 보통\n4 - 좋음\n5 - 훌륭함\n\n1부터 5까지의 숫자를 입력하세요:',
  'messages.studentStatusPrompt': '✅ 평점 {rating}/5가 수락되었습니다!\n\n이제 확인해 주세요: UNLOCK 학생이신가요?\n\n입력하세요:\n• "예" - UNLOCK 학생이라면\n• "아니오" - 학생이 아니라면',
  'messages.invalidRating': '❌ 1부터 5까지의 숫자만 입력해 주세요:\n\n1 - 매우 나쁨\n2 - 나쁨\n3 - 보통\n4 - 좋음\n5 - 훌륭함',
  'messages.invalidStudentStatus': '❌ "예" 또는 "아니오"를 입력해 주세요:\n\n• "예" - UNLOCK 학생이라면\n• "아니오" - 학생이 아니라면',
  'messages.reviewTooShort': '더 자세한 리뷰를 작성해 주세요 (최소 10자).',
  'messages.locationSent': '📍 위치가 전송되었습니다!',
  'messages.backToMain': '메인 메뉴로 돌아가기'
};