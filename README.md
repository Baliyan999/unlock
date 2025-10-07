# Unlock — курсы китайского языка

Одностраничный сайт школы китайского языка Unlock. SPA с мультиязычностью (RU/EN/UZ/ZH/KO) и serverless-функцией для обработки заявок.

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
# Установите pnpm (рекомендуется)
npm install -g pnpm

# Или используйте npm/yarn
npm install
# или
yarn install
```

### 2. Запуск в режиме разработки
```bash
pnpm dev
# или
npm run dev
# или
yarn dev
```

Откройте [http://localhost:5173](http://localhost:5173) в браузере.

### 3. Сборка для продакшена
```bash
pnpm build
# или
npm run build
# или
yarn build
```

## 🌍 Мультиязычность

Сайт поддерживает 5 языков:
- 🇷🇺 Русский (по умолчанию)
- 🇺🇸 English
- 🇺🇿 O'zbekcha
- 🇨🇳 中文
- 🇰🇷 한국어

Переключение языков через красивую панель с флагами в шапке сайта.

## 🔧 Технологии

- **Vue 3** + Composition API
- **TypeScript** для типизации
- **Vite** для быстрой разработки
- **Tailwind CSS** для стилизации
- **Vue Router** для навигации
- **Vue I18n** для мультиязычности
- **Pinia** для состояния (если нужно)
- **Zod** для валидации форм

## 📁 Структура проекта

```
├── public/                 # Статические файлы
│   ├── logo1.JPG         # Логотип
│   ├── favicon.svg       # Иконка сайта
│   ├── robots.txt        # SEO
│   └── sitemap.xml       # Карта сайта
├── src/
│   ├── components/       # Vue компоненты
│   │   ├── Ui/          # UI примитивы
│   │   ├── Hero.vue     # Главная секция
│   │   ├── Formats.vue  # Форматы обучения
│   │   ├── Levels.vue   # Программа и уровни
│   │   ├── Teachers.vue # Преподаватели
│   │   ├── Reviews.vue  # Отзывы
│   │   ├── Faq.vue      # FAQ
│   │   ├── Pricing.vue  # Цены
│   │   ├── LeadForm.vue # Форма заявки
│   │   ├── Contacts.vue # Контакты
│   │   ├── Header.vue   # Шапка с навигацией
│   │   └── Footer.vue   # Подвал
│   ├── i18n/            # Переводы
│   │   ├── ru.ts        # Русский
│   │   ├── en.ts        # Английский
│   │   ├── uz.ts        # Узбекский
│   │   ├── zh.ts        # Китайский
│   │   └── ko.ts        # Корейский
│   ├── lib/             # Утилиты
│   │   ├── validators.ts # Zod схемы
│   │   ├── telegram.ts  # Telegram API
│   │   └── resend.ts    # Email API
│   ├── router/          # Роутинг
│   ├── views/           # Страницы
│   ├── App.vue          # Главный компонент
│   └── main.ts          # Точка входа
├── api/                 # Serverless функции
│   └── lead.ts          # Обработка заявок
└── package.json         # Зависимости
```

## 🔐 Переменные окружения

Создайте файл `.env` в корне проекта:

```env
# Serverless Functions
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
RESEND_API_KEY=your_resend_key
LEADS_EMAIL_TO=your_email@example.com

# Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Contact Information
VITE_PHONE=+998 xx xxx xx xx
VITE_EMAIL=info@unlock.uz

# Social Media & Communication
VITE_TELEGRAM_URL=https://t.me/test_my_assistant_123_bot
VITE_WHATSAPP_URL=https://wa.me/998901234567
VITE_INSTAGRAM_URL=https://instagram.com/unlock_school

# Payment Systems
```

### Получение ключей:

**Telegram Bot:**
1. Напишите [@BotFather](https://t.me/botfather)
2. Создайте бота командой `/newbot`
3. Получите токен и добавьте в `.env`
4. Узнайте Chat ID: напишите боту, затем перейдите на `https://api.telegram.org/bot<TOKEN>/getUpdates`
5. **Для множественных получателей:** добавьте Chat ID через запятую в `VITE_TELEGRAM_CHAT_IDS`

**Resend Email:**
1. Зарегистрируйтесь на [resend.com](https://resend.com)
2. Создайте API ключ
3. Добавьте в `.env`

**Контактная информация:**
- `VITE_PHONE` — телефон школы (отображается в футере)
- `VITE_EMAIL` — email школы (отображается в футере)

**Социальные сети:**
- `VITE_TELEGRAM_URL` — ссылка на Telegram канал/группу
- `VITE_WHATSAPP_URL` — ссылка на WhatsApp (номер в формате 998901234567)
- `VITE_INSTAGRAM_URL` — ссылка на Instagram профиль


## 🚀 Деплой на Vercel

### Автоматический деплой:
1. Загрузите код в GitHub/GitLab
2. Подключите репозиторий к [Vercel](https://vercel.com)
3. Добавьте переменные окружения в настройках проекта
4. Vercel автоматически соберет и задеплоит сайт

### Ручной деплой:
```bash
# Установите Vercel CLI
npm install -g vercel

# Логин в Vercel
vercel login

# Деплой
vercel --prod
```

## 🧪 Тестирование serverless-функции локально

```bash
# Установите Vercel CLI
npm install -g vercel

# Запустите локальный сервер с функциями
vercel dev

# Откройте http://localhost:3000
```

## 📱 Адаптивность

Сайт полностью адаптивен:
- 📱 Мобильные устройства (320px+)
- 📱 Планшеты (768px+)
- 💻 Десктопы (1024px+)
- 🖥️ Большие экраны (1200px+)

## ♿ Доступность

- ✅ ARIA-атрибуты для скрин-ридеров
- ✅ Клавиатурная навигация
- ✅ Фокус-индикаторы
- ✅ Семантическая разметка
- ✅ Контрастные цвета

## 🔍 SEO

- ✅ Мета-теги для всех языков
- ✅ Open Graph и Twitter Cards
- ✅ JSON-LD разметка
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Структурированные данные

## 🛠️ Команды разработки

```bash
# Разработка
pnpm dev

# Сборка
pnpm build

# Предпросмотр сборки
pnpm preview

# Линтинг
pnpm lint

# Форматирование кода
pnpm format

# Локальный тест с функциями
pnpm vercel:dev
```

## 🐛 Решение проблем

**Ошибка с логотипом:**
- Убедитесь, что файл `public/logo1.JPG` существует
- Проверьте, что используется `?url` в пути

**Форма не отправляется:**
- Проверьте переменные окружения
- Убедитесь, что serverless-функция доступна

**Переводы не работают:**
- Очистите localStorage: `localStorage.clear()`
- Перезагрузите страницу

## 📞 Поддержка

При возникновении проблем:
1. Проверьте консоль браузера на ошибки
2. Убедитесь, что все зависимости установлены
3. Проверьте переменные окружения
4. Очистите кеш браузера

---

**Unlock Language Studio** — ваш путь к изучению китайского языка! 🎌
