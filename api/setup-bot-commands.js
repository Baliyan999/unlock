#!/usr/bin/env node

/**
 * Скрипт для настройки команд Telegram бота через BotFather
 * 
 * Этот скрипт поможет настроить команды бота в BotFather
 * 
 * ИНСТРУКЦИЯ:
 * 1. Откройте Telegram и найдите @BotFather
 * 2. Отправьте команду /mybots
 * 3. Выберите вашего бота
 * 4. Нажмите "Bot Settings" -> "Commands"
 * 5. Нажмите "Edit Commands"
 * 6. Добавьте следующие команды:
 */

const commands = [
  {
    command: 'start',
    description: 'Запуск и главное меню'
  },
  {
    command: 'help', 
    description: 'Что умеет бот'
  },
  {
    command: 'lang',
    description: 'Сменить язык'
  },
  {
    command: 'contact',
    description: 'Получить контакты и локацию'
  }
];

console.log('🤖 Настройка команд Telegram бота UNLOCK\n');
console.log('📋 Команды для добавления в BotFather:\n');

commands.forEach((cmd, index) => {
  console.log(`${index + 1}. /${cmd.command} - ${cmd.description}`);
});

console.log('\n📝 Инструкция по настройке:');
console.log('1. Откройте Telegram и найдите @BotFather');
console.log('2. Отправьте команду /mybots');
console.log('3. Выберите вашего бота');
console.log('4. Нажмите "Bot Settings" -> "Commands"');
console.log('5. Нажмите "Edit Commands"');
console.log('6. Добавьте команды из списка выше');
console.log('7. Нажмите "Save"');

console.log('\n💡 Альтернативный способ (через API):');
console.log('Можно использовать Telegram Bot API для автоматической настройки команд:');
console.log('https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setMyCommands');

console.log('\n✅ После настройки команды будут доступны в меню бота!');
