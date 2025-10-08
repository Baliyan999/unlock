module.exports = {
  // 主菜单
  'welcome.admin': `👋 你好，{name}！\n\n欢迎来到UNLOCK机器人！🎓\n\n您已以管理员身份登录！👨‍💼\n\n可用功能：\n📝 留下课程评价\nℹ️ 获取课程信息\n🌍 更改界面语言\n📞 获取联系方式和地址\n👨‍💼 管理面板（评价管理）\n\n请选择操作：`,
  'welcome.user': `👋 你好，{name}！\n\n欢迎来到UNLOCK机器人！🎓\n\n在这里您可以：\n📝 留下课程评价\nℹ️ 获取课程信息\n🌍 更改界面语言\n📞 获取联系方式和地址\n\n请选择操作：`,

  // 按钮
  'buttons.leaveReview': '📝 留下评价',
  'buttons.courseInfo': 'ℹ️ 课程信息',
  'buttons.changeLanguage': '🌍 更改语言',
  'buttons.getContacts': '📞 联系方式',
  'buttons.adminPanel': '👨‍💼 管理面板',
  'buttons.backToMain': '🏠 主菜单',
  'buttons.back': '🔙 返回',
  'buttons.openInMaps': '📍 在地图中打开',
  'buttons.showLocation': '📍 显示位置',
  'buttons.whatsapp': '💬 WhatsApp',
  'buttons.website': '🌐 网站',
  'buttons.instagram': '📷 Instagram',

  // 命令
  'commands.help': `🤖 UNLOCK机器人功能：\n\n📝 **留下评价** - 分享您的学习经验\nℹ️ **课程信息** - 了解课程和格式\n🌍 **更改语言** - 选择您喜欢的界面语言\n📞 **联系方式** - 获取联系信息和地址\n\n👨‍💼 **管理员功能：**\n• 评价管理和审核\n• 创建和管理优惠码\n• 统计和分析\n\n💡 **可用命令：**\n/start - 启动和主菜单\n/help - 机器人功能\n/lang - 更改语言\n/contact - 获取联系方式和位置\n\n🎓 欢迎来到UNLOCK！`,
  
  'commands.language': `🌍 选择界面语言：\n\nChoose your interface language:\n\nИнтерфейс тилини танланг:\n\n选择您的界面语言：\n\n인터페이스 언어를 선택하세요:`,
  
  'commands.contact': `📞 **UNLOCK联系方式**\n\n🏢 **地址：**\n塔什干市，米拉巴德区\n雅库布·科拉斯街，2/1\n中央宫殿酒店，6楼\n\n📱 **电话：**\n• +998 77 268 68 86\n• +998 33 717 02 28 (WhatsApp)\n\n📧 **邮箱：**\nunlocklingua@gmail.com\n\n🌐 **社交媒体：**\n• 网站：https://unlocklingua.uz\n• Instagram：@unlock.lingua\n• Telegram：@Unlock_lingua_bot\n\n🕒 **工作时间：**\n周一至周五：9:00 - 18:00\n周六：9:00 - 15:00\n周日：休息\n\n📍 **如何到达：**\n地铁：米拉巴德站\n公交：中央宫殿站`,

  // 评价
  'reviews.waitingForText': '📝 请写下您对UNLOCK中文课程的评论：\n\n请分享您的学习经验，您喜欢什么，取得了什么成果。',
  'reviews.reviewReceived': '✅ 感谢您的评价！管理员将审核并在网站上发布。',
  'reviews.reviewError': '❌ 保存评价时发生错误。请重试。',

  // 课程信息
  'courseInfo': `🎓 UNLOCK课程信息：\n\n📚 学习课程：\n• HSK 1-6（所有级别）\n• 口语中文\n• 商务中文\n\n👨‍🏫 学习形式：\n• 小组课程（最多12人）\n• 一对一课程`,

  // 管理面板
  'admin.panel': `👨‍💼 管理员面板\n\n欢迎来到管理面板！在这里您可以：\n\n📋 评价管理 - 评价管理和审核\n🎫 优惠码 - 创建和管理优惠码\n\n请选择部分：`,
  'admin.noAccess': '您没有管理员权限',
  'admin.reviewsAdmin': '📋 评价管理',
  'admin.promocodesAdmin': '🎫 优惠码管理',

  // 语言
  'languages.ru': '🇷🇺 Русский',
  'languages.en': '🇺🇸 English',
  'languages.uz': '🇺🇿 O\'zbek',
  'languages.zh': '🇨🇳 中文',
  'languages.ko': '🇰🇷 한국어',

  // 消息
  'messages.languageChanged': '✅ 界面语言已更改为{language}',
  'messages.writeYourReview': '写下您的评价',
  'messages.courseInformation': '课程信息',
  'messages.chooseLanguage': '选择语言',
  'messages.contacts': '联系方式',
  'messages.adminPanel': '管理面板',
  'messages.mainMenu': '主菜单',
  'messages.mainMenuText': `👋 欢迎来到UNLOCK机器人！🎓\n\n在这里您可以：\n📝 留下课程评价\nℹ️ 获取课程信息\n🌍 更改界面语言\n📞 获取联系方式和地址\n\n请选择操作：`,
  'messages.reviewSent': '✅ 评价已发送审核！\n\n感谢您的评价！我们会尽快审核。',
  'messages.ratingPrompt': '✅ 感谢您的评价！现在请发送1到5的评分（只需数字）：\n\n1 - 很差\n2 - 差\n3 - 一般\n4 - 好\n5 - 优秀\n\n请输入1到5的数字：',
  'messages.studentStatusPrompt': '✅ 评分{rating}/5已接受！\n\n现在请确认：您是UNLOCK的学生吗？\n\n请输入：\n• "是" - 如果您是UNLOCK学生\n• "否" - 如果您不是学生',
  'messages.invalidRating': '❌ 请输入1到5的数字：\n\n1 - 很差\n2 - 差\n3 - 一般\n4 - 好\n5 - 优秀',
  'messages.invalidStudentStatus': '❌ 请输入"是"或"否"：\n\n• "是" - 如果您是UNLOCK学生\n• "否" - 如果您不是学生',
  'messages.reviewTooShort': '请写更详细的评价（至少10个字符）。',
  'messages.locationSent': '📍 位置已发送！',
  'messages.backToMain': '返回主菜单'
};