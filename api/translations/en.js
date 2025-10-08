module.exports = {
  // Main menu
  'welcome.admin': `👋 Hello, {name}!\n\nWelcome to UNLOCK bot! 🎓\n\nYou are logged in as administrator! 👨‍💼\n\nAvailable functions:\n📝 Leave a course review\nℹ️ Get information about programs\n🌍 Change interface language\n📞 Get contacts and address\n👨‍💼 Admin panel (review management)\n\nChoose an action:`,
  'welcome.user': `👋 Hello, {name}!\n\nWelcome to UNLOCK bot! 🎓\n\nHere you can:\n📝 Leave a course review\nℹ️ Get information about programs\n🌍 Change interface language\n📞 Get contacts and address\n\nChoose an action:`,

  // Buttons
  'buttons.leaveReview': '📝 Leave Review',
  'buttons.courseInfo': 'ℹ️ Course Information',
  'buttons.changeLanguage': '🌍 Change Language',
  'buttons.getContacts': '📞 Contacts',
  'buttons.adminPanel': '👨‍💼 Admin Panel',
  'buttons.backToMain': '🏠 Main Menu',
  'buttons.back': '🔙 Back',
  'buttons.openInMaps': '📍 Open in Maps',
  'buttons.showLocation': '📍 Show Location',
  'buttons.whatsapp': '💬 WhatsApp',
  'buttons.website': '🌐 Website',
  'buttons.instagram': '📷 Instagram',

  // Commands
  'commands.help': `🤖 What UNLOCK bot can do:\n\n📝 **Leave Review** - share your learning experience\nℹ️ **Course Information** - learn about programs and formats\n🌍 **Change Language** - choose your preferred interface language\n📞 **Contacts** - get contact information and address\n\n👨‍💼 **For Administrators:**\n• Review management and moderation\n• Create and manage promo codes\n• Statistics and analytics\n\n💡 **Available Commands:**\n/start - launch and main menu\n/help - what the bot can do\n/lang - change language\n/contact - get contacts and location\n\n🎓 Welcome to UNLOCK!`,
  
  'commands.language': `🌍 Choose your interface language:\n\nChoose your interface language:\n\nИнтерфейс тилини танланг:\n\n选择您的界面语言：\n\n인터페이스 언어를 선택하세요:`,
  
  'commands.contact': `📞 **UNLOCK Contacts**\n\n🏢 **Address:**\nTashkent, Mirabad district\nYakub Kolas street, 2/1\nCentral Palace hotel, 6th floor\n\n📱 **Phones:**\n• +998 77 268 68 86\n• +998 33 717 02 28 (WhatsApp)\n\n📧 **Email:**\nunlocklingua@gmail.com\n\n🌐 **Social Media:**\n• Website: https://unlocklingua.uz\n• Instagram: @unlock.lingua\n• Telegram: @Unlock_lingua_bot\n\n🕒 **Working Hours:**\nMon-Fri: 9:00 - 18:00\nSat: 9:00 - 15:00\nSun: closed\n\n📍 **How to get there:**\nMetro: "Mirabad" station\nBus: "Central Palace" stop`,

  // Reviews
  'reviews.waitingForText': '📝 Please write your review about UNLOCK Chinese language courses:\n\nTell us about your learning experience, what you liked, what results you achieved.',
  'reviews.reviewReceived': '✅ Thank you for your review! It will be reviewed by an administrator and published on the website.',
  'reviews.reviewError': '❌ An error occurred while saving the review. Please try again.',

  // Course information
  'courseInfo': `🎓 UNLOCK Course Information:\n\n📚 Learning Programs:\n• HSK 1-6 (all levels)\n• Conversational Chinese\n• Business Chinese\n\n👨‍🏫 Learning Formats:\n• Group classes (up to 12 people)\n• Individual lessons`,

  // Admin panel
  'admin.panel': `👨‍💼 Administrator Panel\n\nWelcome to the admin panel! Here you can:\n\n📋 All about reviews - review management and moderation\n🎫 Promo codes - create and manage promo codes\n\nChoose a section:`,
  'admin.noAccess': 'You do not have administrator rights',
  'admin.reviewsAdmin': '📋 Review Management',
  'admin.promocodesAdmin': '🎫 Promo Code Management',

  // Languages
  'languages.ru': '🇷🇺 Русский',
  'languages.en': '🇺🇸 English',
  'languages.uz': '🇺🇿 O\'zbek',
  'languages.zh': '🇨🇳 中文',
  'languages.ko': '🇰🇷 한국어',

  // Messages
  'messages.languageChanged': '✅ Interface language changed to {language}',
  'messages.writeYourReview': 'Write your review',
  'messages.courseInformation': 'Course Information',
  'messages.chooseLanguage': 'Choose Language',
  'messages.contacts': 'Contacts',
  'messages.adminPanel': 'Admin Panel',
  'messages.mainMenu': 'Main Menu',
  'messages.mainMenuText': `👋 Welcome to UNLOCK bot! 🎓\n\nHere you can:\n📝 Leave a course review\nℹ️ Get information about programs\n🌍 Change interface language\n📞 Get contacts and address\n\nChoose an action:`,
  'messages.reviewSent': '✅ Review sent for moderation!\n\nThank you for your review! We will review it soon.',
  'messages.ratingPrompt': '✅ Thank you for your review! Now send a rating from 1 to 5 (just the number):\n\n1 - very bad\n2 - bad\n3 - normal\n4 - good\n5 - excellent\n\nWrite a number from 1 to 5:',
  'messages.studentStatusPrompt': '✅ Rating {rating}/5 accepted!\n\nNow clarify: are you a UNLOCK student?\n\nWrite:\n• "yes" - if you are a UNLOCK student\n• "no" - if you are not a student',
  'messages.invalidRating': '❌ Please enter only a number from 1 to 5:\n\n1 - very bad\n2 - bad\n3 - normal\n4 - good\n5 - excellent',
  'messages.invalidStudentStatus': '❌ Please write "yes" or "no":\n\n• "yes" - if you are a UNLOCK student\n• "no" - if you are not a student',
  'messages.reviewTooShort': 'Please write a more detailed review (minimum 10 characters).',
  'messages.locationSent': '📍 Location sent!',
  'messages.backToMain': 'Back to main menu'
};
