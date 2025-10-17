# Настройка Telegram Bot для Mini App

## 1. Создание бота

1. Откройте [@BotFather](https://t.me/BotFather) в Telegram
2. Отправьте команду `/newbot`
3. Введите имя бота (например: "UNLOCK Chinese School")
4. Введите username бота (например: "unlock_chinese_bot")
5. Сохраните полученный токен

## 2. Настройка Mini App

1. Отправьте команду `/newapp` в @BotFather
2. Выберите вашего бота
3. Введите название приложения (например: "UNLOCK Chinese")
4. Введите описание (например: "Курсы китайского языка в Ташкенте")
5. Загрузите иконку приложения (512x512px)
6. Введите URL вашего приложения: `https://your-domain.com`
7. Сохраните полученную ссылку на Mini App

## 3. Настройка переменных окружения

Создайте файл `.env` в корне проекта:

```bash
# Telegram Bot
BOT_TOKEN=YOUR_BOT_TOKEN_HERE

# API Configuration
VITE_API_URL=https://your-domain.com/api
ALLOWED_ORIGINS=https://your-domain.com,https://www.your-domain.com

# Optional: Analytics
VITE_GA_ID=G-XXXXXXXXXX
```

## 4. Команды бота

Настройте команды бота в @BotFather:

```
start - Начать работу с ботом
courses - Посмотреть курсы
test - Пройти тест HSK
calculator - Калькулятор стоимости
form - Оставить заявку
help - Помощь
```

## 5. Тестирование

1. Откройте ссылку на Mini App в Telegram
2. Проверьте работу всех функций:
   - Главная кнопка "Оставить заявку"
   - Предзаполнение формы данными пользователя
   - Отправка заявки
   - Навигация по приложению

## 6. Полезные ссылки

- [Telegram WebApp API](https://core.telegram.org/bots/webapps)
- [BotFather Commands](https://core.telegram.org/bots/features#botfather)
- [Mini App Guidelines](https://core.telegram.org/bots/webapps#mini-apps)

## 7. Troubleshooting

### Проблема: Mini App не открывается
- Проверьте, что URL доступен по HTTPS
- Убедитесь, что домен добавлен в ALLOWED_ORIGINS

### Проблема: Ошибка валидации initData
- Проверьте правильность BOT_TOKEN
- Убедитесь, что токен соответствует боту

### Проблема: Форма не предзаполняется
- Проверьте, что пользователь авторизован в Telegram
- Убедитесь, что данные пользователя доступны в initDataUnsafe
