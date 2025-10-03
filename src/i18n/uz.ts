export default {
  meta: {
    title: "Unlock — Xitoy tili kurslari Toshkentda",
    description: "HSK 1–5 tayyorgarlik. Suhbat amaliyoti. Onlayn va oflayn. Sinov darsi.",
    privacy: "Maxfiylik siyosati — Unlock",
    privacyDesc: "Unlock maktabining shaxsiy ma'lumotlarni qayta ishlash siyosati.",
  },
  nav: {
    formats: 'Formatlar', levels: 'Dastur', teachers: 'O‘qituvchilar', reviews: 'Sharhlar', pricing: 'Narxlar', lead: 'Ariza', telegram: 'Telegram',
  },
  hero: {
    h1: "Unlock xitoy tili kurslari — noldan HSK gacha",
    sub: "HSK 1–5 tayyorgarlik. Suhbat amaliyoti. Toshkentda onlayn va oflayn.",
    trial: 'Sinov darsi', writeTg: 'Telegramda yozish', b1: 'HSK tayyorgarlik', b2: 'Guruh va individual', b3: 'Payme/Click to‘lovi',
  },
  formats: {
    title: 'O‘qish formatlari',
    group: { title: 'Guruh', items: ['Haftasiga 3–4 soat', 'Davomiyligi: 3–6 oy', "Narx: oyiga 000 000 so‘mdan", 'Kiritilgan: HSK dasturi, suhbat amaliyoti, uy vazifalari'] },
    individual: { title: 'Individual', items: ['Haftasiga 2–6 soat', 'Davomiyligi: kelishuv asosida', "Narx: oyiga 000 000 so‘mdan", 'Kiritilgan: shaxsiy reja, moslashuvchan jadval, qo‘shimcha materiallar'] },
    intensive: { title: 'Intensiv', items: ['Haftasiga 6–10 soat', 'Davomiyligi: 1–2 oy', "Narx: oyiga 000 000 so‘mdan", 'Kiritilgan: tezlashtirilgan kurs, suhbat va HSKga urg‘u'] },
  },
  levels: {
    title: 'Dastur va darajalar',
    subtitle: 'HSK 1–6: maqsadlar, grammatika, leksika, natija.',
    download: 'Dastur ni yuklab olish',
    labels: { goals: 'Maqsadlar', grammar: 'Grammatika / leksika', result: 'Natija' },
    timeline: [
      { level: 1, goals: 'Asosiy iboralar, tanishuv, sonlar, sana', grammar: 'Tovushlar (ohanglar), pinyin, sodda tuzilmalar', result: 'A1: oddiy dialoglar' },
      { level: 2, goals: 'Kundalik vaziyatlar, xarid, ish', grammar: 'Sodda zamonlar, modal fe’llar', result: 'A2: ishonchli kundalik muloqot' },
      { level: 3, goals: 'Lug‘at kengayishi, o‘qish/ish mavzulari', grammar: 'Murakkabroq tuzilmalar, bog‘lovchilar', result: 'B1: mavzular bo‘yicha erkin suhbat' },
      { level: 4, goals: 'Munozaralar, professional mavzular', grammar: 'Ilg‘or grammatika, murakkab tuzilmalar', result: 'B2: erkin muloqot' },
      { level: 5, goals: 'Yuqori ravonlik, akademik mavzular', grammar: 'Grammatikani chuqur egallash', result: 'C1: deyarli erkin daraja' },
      { level: 6, goals: 'Professional mahorat, ilmiy matnlar', grammar: 'Eng murakkab grammatik tuzilmalar', result: 'C2: ona tili darajasida erkinlik' },
    ],
  },
  teachers: { title: 'O\'qituvchilar', list: [
    { name: 'David', specialty: 'HSK 1–3, suhbat amaliyoti', photo: 'https://placehold.co/600x600' },
    { name: 'Ruxsana', specialty: 'HSK 3–6, akademik xitoy tili', photo: 'https://placehold.co/600x600' },
    { name: 'Feruza', specialty: 'Suhbat intensivi', photo: 'https://placehold.co/600x600' },
  ] },
  reviews: { title: 'Sharhlar', list: [
    { text: 'Darslar tezda gapirishni va asosiy grammatikani tushunishni yordam berdi.', author: 'Madina' },
    { text: 'HSK 3 ni olti oyda topshirdim. Ajoyib ustozlar!', author: 'Zumrad' },
    { text: 'Qulay jadval va ko‘p amaliyot.', author: 'Ilyos' },
  ] },
  faq: { title: 'Savol-javob', items: [
    { q: 'Dars qancha davom etadi?', a: 'Odatda 60–90 daqiqa, formatga qarab.' },
    { q: 'Jadval?', a: 'Ertalab, kechqurun va dam olish kunlari — mos slotlarni tanlaymiz.' },
    { q: 'Format?', a: 'Onlayn va oflayn (Toshkent), guruh va individual.' },
    { q: 'To‘lov?', a: 'Payme/Click, oyma-oy yoki modul uchun.' },
    { q: 'Qaytarish?', a: 'Modul boshlanishidan oldin — ariza bilan, keyin — kelishuv asosida.' },
    { q: 'Darsliklar?', a: 'Zamonaviy darsliklar, materiallar va onlayn resurslar.' },
  ] },
  pricing: {
    title: 'Narxlar', format: 'Format', tariff: 'Tarif', action: 'Harakat', apply: 'Ro‘yxatdan o‘tish', payme: 'Payme', click: 'Click',
    group: 'Guruh', individual: 'Individual', intensive: 'Intensiv', priceFrom: "oyiga 000 000 so‘mdan",
  },
  contacts: { title: 'Kontaktlar', phone: 'Telefon', telegram: 'Telegram', whatsapp: 'WhatsApp', address: 'Manzil', placeholderPhone: '+998 xx xxx xx xx', placeholderAddress: 'Toshkent, plaseholder' },
  form: {
    title: 'Sinov darsiga ariza', name: 'Ism', phone: 'Telefon', messenger: 'Messenger', level: 'Daraja', format: 'Format', comment: 'Izoh', submit: 'Yuborish', sending: 'Yuborilmoqda...', success: 'Ariza yuborildi. Siz bilan bog‘lanamiz.', successMock: 'Ariza yuborildi (test rejimi).', fixErrors: 'Iltimos, formani tekshiring',
    options: {
      messenger: { telegram: 'Telegram', whatsapp: 'WhatsApp' },
      level: { beginner: 'Boshlang‘ich', hsk1: 'HSK1', hsk2: 'HSK2', hsk3: 'HSK3', hsk4: 'HSK4', hsk5: 'HSK5', unknown: 'Bilmayman' },
      format: { group: 'Guruh', individual: 'Individual', intensive: 'Intensiv' },
    },
  },
  footer: { policy: 'Siyosat' },
};


