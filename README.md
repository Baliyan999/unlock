# Unlock — курсы китайского языка

Одностраничный сайт школы китайского языка Unlock. SPA с мультиязычностью (RU/EN/UZ/ZH/KO) и Python Telegram Bot System для управления отзывами, блогом и промокодами.

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

### 3. Запуск Telegram Bot System
```bash
# Перейдите в директорию Python-бота
cd telegram_bot

# Установите зависимости
pip install -r requirements.txt

# Настройте переменные окружения
cp env.example .env
# Отредактируйте .env с вашими настройками

# Инициализируйте базу данных
python scripts/init_db.py
python scripts/create_admin.py add YOUR_CHAT_ID your_username

# Запустите систему
python start.py
```

### 4. Запуск сайта в продакшн режиме
```bash
# Только сборка сайта
npm run build

# Предпросмотр сборки
npm run preview
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
│   ├── images/           # Изображения
│   ├── favicon.svg       # Иконка сайта
│   ├── robots.txt        # SEO
│   └── sitemap.xml       # Карта сайта
├── src/                   # Vue.js приложение
│   ├── components/       # Vue компоненты
│   ├── i18n/            # Переводы (5 языков)
│   ├── lib/             # Утилиты
│   ├── router/          # Роутинг
│   ├── views/           # Страницы
│   └── main.ts          # Точка входа
├── telegram_bot/          # 🆕 Python Telegram Bot System
│   ├── bots/            # Пользовательский + Админ боты
│   ├── api/             # FastAPI для интеграции с сайтом
│   ├── services/        # Бизнес-логика
│   ├── database/        # SQLAlchemy модели
│   └── scripts/         # Утилиты управления
├── START_PYTHON_BOT.md   # 🆕 Инструкции по запуску бота
└── package.json         # Зависимости сайта
```

## 🔐 Переменные окружения

### Для сайта (`.env` в корне проекта):
```env
# Analytics
VITE_GA_ID=G-XXXXXXXXXX

# Contact Information
VITE_PHONE=+998 xx xxx xx xx
VITE_EMAIL=info@unlock.uz

# Social Media & Communication
VITE_TELEGRAM_URL=https://t.me/your_bot
VITE_WHATSAPP_URL=https://wa.me/998901234567
VITE_INSTAGRAM_URL=https://instagram.com/unlock_school
```

### Для Telegram Bot System (`.env` в `telegram_bot/`):
```env
# Telegram Bot Tokens
USER_BOT_TOKEN=your_user_bot_token
ADMIN_BOT_TOKEN=your_admin_bot_token

# Telegram Chat IDs (через запятую)
ADMIN_CHAT_IDS=123456789,987654321
NOTIFICATION_CHAT_IDS=123456789

# Database
DATABASE_URL=sqlite:///./data/bot.db

# API Configuration
API_HOST=0.0.0.0
API_PORT=8000

# Security
SECRET_KEY=your_very_secure_secret_key
```

### Получение ключей:

**Telegram Bots:**
1. Напишите [@BotFather](https://t.me/botfather)
2. Создайте **два** бота командой `/newbot`:
   - Пользовательский бот (для отзывов и статей)
   - Административный бот (для модерации)
3. Получите токены и добавьте в `telegram_bot/.env`
4. Узнайте Chat ID: напишите боту, затем перейдите на `https://api.telegram.org/bot<TOKEN>/getUpdates`

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

## 🧪 Тестирование системы

### Тестирование сайта:
```bash
# Запуск в режиме разработки
npm run dev

# Откройте http://localhost:5173
```

### Тестирование Telegram Bot System:
```bash
cd telegram_bot
python start.py

# Проверьте работу ботов в Telegram
# Проверьте API: http://localhost:8000/api/health
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

### Сайт:
```bash
# Разработка
npm run dev

# Сборка
npm run build

# Предпросмотр сборки
npm run preview

# Линтинг
npm run lint

# Форматирование кода
npm run format
```

### Telegram Bot System:
```bash
cd telegram_bot

# Запуск системы
python start.py

# Инициализация БД
python scripts/init_db.py

# Управление админами
python scripts/create_admin.py add CHAT_ID username
```

## 🐛 Решение проблем

**Сайт не запускается:**
- Убедитесь, что все зависимости установлены: `npm install`
- Проверьте переменные окружения в `.env`

**Telegram Bot не работает:**
- Проверьте токены ботов в `telegram_bot/.env`
- Убедитесь, что Chat ID администраторов правильные
- Проверьте логи в консоли

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
