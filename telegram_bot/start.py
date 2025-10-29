#!/usr/bin/env python3
"""
Скрипт запуска Telegram бота Unlock
"""

import os
import sys
import logging
from pathlib import Path

# Добавляем текущую директорию в путь Python
current_dir = Path(__file__).parent
sys.path.insert(0, str(current_dir))

# Импортируем основной модуль бота
from bot import main

def setup_logging():
    """Настройка логирования"""
    log_level = os.getenv('LOG_LEVEL', 'INFO').upper()
    
    logging.basicConfig(
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        level=getattr(logging, log_level, logging.INFO),
        handlers=[
            logging.StreamHandler(sys.stdout),
            logging.FileHandler('bot.log', encoding='utf-8')
        ]
    )

def check_environment():
    """Проверка переменных окружения"""
    bot_token = os.getenv('BOT_TOKEN')
    
    if not bot_token:
        print("❌ Ошибка: BOT_TOKEN не найден в переменных окружения!")
        print("📝 Создайте файл .env с токеном бота:")
        print("   BOT_TOKEN=your_bot_token_here")
        return False
    
    if not bot_token.startswith(('1', '2', '3', '4', '5', '6', '7', '8', '9')):
        print("❌ Ошибка: Неверный формат BOT_TOKEN!")
        print("📝 Токен должен начинаться с цифры")
        return False
    
    print(f"✅ BOT_TOKEN найден: {bot_token[:10]}...")
    return True

def main_startup():
    """Основная функция запуска"""
    print("🚀 Запуск Telegram бота Unlock...")
    print("=" * 50)
    
    # Проверяем переменные окружения
    if not check_environment():
        sys.exit(1)
    
    # Настраиваем логирование
    setup_logging()
    
    print("✅ Все проверки пройдены успешно!")
    print("🤖 Запускаем бота...")
    print("=" * 50)
    
    try:
        # Запускаем бота
        main()
    except KeyboardInterrupt:
        print("\n🛑 Бот остановлен пользователем")
    except Exception as e:
        print(f"❌ Ошибка при запуске бота: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main_startup()

