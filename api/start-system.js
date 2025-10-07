const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск системы UNLOCK...\n');

// Запуск API сервера
console.log('🌐 Запуск API сервера...');
const apiProcess = spawn('node', ['server.js'], { 
  stdio: 'inherit',
  cwd: __dirname
});

// Запуск Telegram бота
console.log('🤖 Запуск Telegram бота...');
const botProcess = spawn('node', ['telegram-bot-fixed.js'], { 
  stdio: 'inherit',
  cwd: __dirname
});

// Обработка ошибок
apiProcess.on('error', (err) => {
  console.error('❌ Ошибка запуска API сервера:', err);
});

botProcess.on('error', (err) => {
  console.error('❌ Ошибка запуска Telegram бота:', err);
});

// Обработка завершения процессов
apiProcess.on('exit', (code) => {
  console.log(`API сервер завершил работу с кодом ${code}`);
});

botProcess.on('exit', (code) => {
  console.log(`Telegram бот завершил работу с кодом ${code}`);
});

// Закрытие дочерних процессов при завершении родительского
process.on('exit', () => {
  apiProcess.kill();
  botProcess.kill();
});

process.on('SIGINT', () => {
  console.log('\n🛑 Получен SIGINT. Завершаем процессы...');
  apiProcess.kill('SIGINT');
  botProcess.kill('SIGINT');
  process.exit();
});

console.log('✅ Система запущена!');
console.log('📡 API сервер: http://localhost:3001');
console.log('🤖 Telegram бот: активен');
console.log('🌐 Сайт: http://localhost:5173');
console.log('\n📋 Доступные endpoints:');
console.log('   GET http://localhost:3001/api/reviews - получить отзывы');
console.log('   GET http://localhost:3001/api/stats - статистика');
console.log('   POST http://localhost:3001/api/promo/validate - валидация промокода');
console.log('   POST http://localhost:3001/api/promo/use - применение промокода');
console.log('\n🛑 Для остановки нажмите Ctrl+C');
