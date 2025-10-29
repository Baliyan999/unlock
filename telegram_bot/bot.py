#!/usr/bin/env python3
"""
Unlock Chinese Language School - Telegram Bot
Бот для учебного центра китайского языка Unlock
"""

import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, Location
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, ContextTypes
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

# Токен бота из переменных окружения
BOT_TOKEN = os.getenv('BOT_TOKEN', '8036984380:AAHso_yhoDwMsANMCvaOGmyIi7teMKktsXY')

# Информация о школе
SCHOOL_INFO = {
    'name': 'Unlock',
    'description': 'Школа китайского языка Unlock - ваш ключ к изучению китайского языка!',
    'address': 'улица Якуба Коласа, 2/1, гостиница Central Palace, 6 этаж',
    'phone': '+998 77 268 68 86',
    'phone_secondary': '+998 33 717 02 28',
    'email': 'unlocklingua@gmail.com',
    'telegram': '@Unlocklingua_bot',
    'instagram': '@unlock.lingua',
    'website': 'https://unlocklingua.com'
}

async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /start"""
    user = update.effective_user
    
    # Приветственное сообщение
    welcome_text = f"""
🎌 <b>Добро пожаловать в Unlock!</b>

Привет, {user.first_name}! 👋

🏫 <b>Unlock</b> - это современная школа китайского языка в Ташкенте, где мы помогаем студентам всех уровней освоить китайский язык эффективно и интересно.

🌟 <b>Что мы предлагаем:</b>
• Индивидуальные и групповые занятия
• Опытные преподаватели-носители языка
• Современные методики обучения
• Подготовка к HSK экзаменам
• Культурные мероприятия и практика

🎁 <b>Специальное предложение для новых студентов:</b>
<b>Первый пробный урок - БЕСПЛАТНО!</b>

Хотите записаться на бесплатный пробный урок? 😊
"""

    # Создаем кнопки
    keyboard = [
        [
            InlineKeyboardButton("📚 Записаться на пробный урок", url="https://unlocklingua.com#lead"),
            InlineKeyboardButton("📞 Контакты и локация", callback_data="contact")
        ],
        [
            InlineKeyboardButton("💬 Telegram канал", url="https://t.me/unlock_lingua")
        ]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_html(
        welcome_text,
        reply_markup=reply_markup
    )

async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /help"""
    help_text = """
🤖 <b>Команды бота Unlock:</b>

/start - Главное меню и информация о школе
/help - Показать это сообщение
/contact - Контактная информация
/courses - Информация о курсах
/trial - Записаться на бесплатный пробный урок

📞 <b>Быстрые контакты:</b>
• Телефон: +998 77 268 68 86
• WhatsApp: +998 33 717 02 28
• Email: unlocklingua@gmail.com

🌐 <b>Мы в соцсетях:</b>
• Instagram: @unlock.lingua
• Telegram: @Unlocklingua_bot
• Сайт: unlocklingua.com
"""
    
    await update.message.reply_html(help_text)

async def contact_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /contact"""
    contact_text = """
📞 <b>Контакты школы Unlock:</b>

📱 <b>Телефоны:</b>
• Основной: +998 77 268 68 86
• WhatsApp: +998 33 717 02 28

📧 <b>Email:</b>
unlocklingua@gmail.com

📍 <b>Наш адрес:</b>
улица Якуба Коласа, 2/1, гостиница Central Palace, 6 этаж

🌐 <b>Социальные сети:</b>
• Telegram: @Unlocklingua_bot
• Instagram: @unlock.lingua
• Сайт: https://unlocklingua.com

Приходите к нам на бесплатный пробный урок! 😊
"""
    
    keyboard = [
        [
            InlineKeyboardButton("📚 Записаться на пробный урок", url="https://unlocklingua.com#lead"),
            InlineKeyboardButton("🏠 Вернуться на главную", callback_data="back_to_main")
        ]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    # Отправляем текстовое сообщение
    await update.message.reply_html(
        contact_text,
        reply_markup=reply_markup
    )
    
    # Отправляем геолокацию с новыми координатами
    location = Location(latitude=41.304534, longitude=69.267585)
    await update.message.reply_location(
        location=location,
        caption="📍 Расположение школы Unlock"
    )

async def courses_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /courses"""
    courses_text = """
📚 <b>Наши курсы китайского языка:</b>

🎯 <b>Уровни обучения:</b>
• Начальный (HSK 1-2)
• Средний (HSK 3-4) 
• Продвинутый (HSK 5-6)

👥 <b>Форматы занятий:</b>
• Индивидуальные уроки
• Групповые занятия (до 8 человек)
• Онлайн обучение
• Интенсивные курсы

📖 <b>Что изучаем:</b>
• Грамматика и лексика
• Разговорная практика
• Аудирование
• Чтение и письмо
• Подготовка к HSK
• Китайская культура

🎁 <b>Специальные предложения:</b>
• Первый пробный урок - БЕСПЛАТНО
• Скидки для студентов
• Семейные скидки
• Корпоративное обучение

⏰ <b>График занятий:</b>
Гибкий график, подстраиваемся под ваше расписание!
"""
    
    keyboard = [
        [
            InlineKeyboardButton("📚 Записаться на пробный урок", url="https://unlocklingua.com#lead"),
            InlineKeyboardButton("🏠 Вернуться на главную", callback_data="back_to_main")
        ]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_html(
        courses_text,
        reply_markup=reply_markup
    )

async def trial_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик команды /trial"""
    trial_text = """
🎁 <b>Бесплатный пробный урок!</b>

Хотите попробовать изучение китайского языка? Запишитесь на бесплатный пробный урок в школе Unlock!

🎯 <b>Что вас ждет:</b>
• Знакомство с преподавателем
• Определение вашего уровня
• Пробный урок (45 минут)
• Консультация по программе обучения
• Ответы на все ваши вопросы

📅 <b>Как записаться:</b>
1. Выберите удобное время
2. Свяжитесь с нами по телефону или WhatsApp
3. Приходите на пробный урок

📞 <b>Контакты для записи:</b>
• Телефон: +998 77 268 68 86
• WhatsApp: +998 33 717 02 28
• Email: unlocklingua@gmail.com

📍 <b>Адрес:</b>
{SCHOOL_INFO['address']}

Не упустите возможность начать изучение китайского языка! 🚀
"""
    
    keyboard = [
        [
            InlineKeyboardButton("📚 Записаться на пробный урок", url="https://unlocklingua.com#lead"),
            InlineKeyboardButton("🏠 Вернуться на главную", callback_data="back_to_main")
        ]
    ]
    
    reply_markup = InlineKeyboardMarkup(keyboard)
    
    await update.message.reply_html(
        trial_text,
        reply_markup=reply_markup
    )

async def button_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Обработчик нажатий на кнопки"""
    query = update.callback_query
    await query.answer()
    
    if query.data == "trial_lesson":
        await trial_command(update, context)
    elif query.data == "courses_info":
        await courses_command(update, context)
    elif query.data == "contact":
        # Для callback query нужно использовать query.message вместо update.message
        contact_text = """
📞 <b>Контакты школы Unlock:</b>

📱 <b>Телефоны:</b>
• Основной: +998 77 268 68 86
• WhatsApp: +998 33 717 02 28

📧 <b>Email:</b>
unlocklingua@gmail.com

📍 <b>Наш адрес:</b>
улица Якуба Коласа, 2/1, гостиница Central Palace, 6 этаж

🌐 <b>Социальные сети:</b>
• Telegram: @Unlocklingua_bot
• Instagram: @unlock.lingua
• Сайт: https://unlocklingua.com

Приходите к нам на бесплатный пробный урок! 😊
"""
        
        keyboard = [
            [
                InlineKeyboardButton("📚 Записаться на пробный урок", url="https://unlocklingua.com#lead"),
                InlineKeyboardButton("🏠 Вернуться на главную", callback_data="back_to_main")
            ]
        ]
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        # Отправляем текстовое сообщение
        await query.message.reply_html(
            contact_text,
            reply_markup=reply_markup
        )
        
        # Отправляем геолокацию с новыми координатами
        location = Location(latitude=41.304534, longitude=69.267585)
        await query.message.reply_location(
            location=location,
            caption="📍 Расположение школы Unlock"
        )
    elif query.data == "back_to_main":
        # Возвращаемся к главному меню
        user = query.from_user
        welcome_text = f"""
🎌 <b>Добро пожаловать в Unlock!</b>

Привет, {user.first_name}! 👋

🏫 <b>Unlock</b> - это современная школа китайского языка в Ташкенте, где мы помогаем студентам всех уровней освоить китайский язык эффективно и интересно.

🌟 <b>Что мы предлагаем:</b>
• Индивидуальные и групповые занятия
• Опытные преподаватели-носители языка
• Современные методики обучения
• Подготовка к HSK экзаменам
• Культурные мероприятия и практика

🎁 <b>Специальное предложение для новых студентов:</b>
<b>Первый пробный урок - БЕСПЛАТНО!</b>

Хотите записаться на бесплатный пробный урок? 😊
"""

        # Создаем кнопки главного меню
        keyboard = [
            [
                InlineKeyboardButton("📚 Записаться на пробный урок", url="https://unlocklingua.com#lead"),
                InlineKeyboardButton("📞 Контакты и локация", callback_data="contact")
            ],
            [
                InlineKeyboardButton("💬 Telegram канал", url="https://t.me/unlock_lingua")
            ]
        ]
        
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await query.message.reply_html(
            welcome_text,
            reply_markup=reply_markup
        )

def main() -> None:
    """Основная функция запуска бота"""
    # Создаем приложение
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Добавляем обработчики команд
    application.add_handler(CommandHandler("start", start_command))
    application.add_handler(CommandHandler("help", help_command))
    application.add_handler(CommandHandler("contact", contact_command))
    application.add_handler(CommandHandler("courses", courses_command))
    application.add_handler(CommandHandler("trial", trial_command))
    
    # Добавляем обработчик кнопок
    application.add_handler(CallbackQueryHandler(button_callback))
    
    # Запускаем бота
    logger.info("🚀 Запуск бота Unlock...")
    application.run_polling()

if __name__ == '__main__':
    main()
