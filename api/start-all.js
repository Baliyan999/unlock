const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск полной системы отзывов...\n');

// Функция для запуска процесса
function startProcess(name, script, args = []) {
  console.log(`📦 Запуск ${name}...`);
  
  const process = spawn('node', [script, ...args], {
    cwd: __dirname,
    stdio: 'pipe'
  });

  process.stdout.on('data', (data) => {
    const output = data.toString().trim();
    if (output) {
      console.log(`[${name}] ${output}`);
    }
  });

  process.stderr.on('data', (data) => {
    const error = data.toString().trim();
    if (error && !error.includes('DeprecationWarning')) {
      console.error(`[${name} ERROR] ${error}`);
    }
  });

  process.on('close', (code) => {
    if (code !== 0) {
      console.error(`❌ ${name} завершился с кодом ${code}`);
    }
  });

  return process;
}

// Запускаем API сервер
console.log('🌐 Запуск API сервера...');
const apiServer = startProcess('API', 'server.js');

// Ждем немного, чтобы API сервер запустился
setTimeout(() => {
  console.log('🤖 Запуск Telegram бота...');
  const telegramBot = startProcess('BOT', 'telegram-bot.js');
  
  console.log('\n✅ Система запущена!');
  console.log('📡 API сервер: http://localhost:3001');
  console.log('🤖 Telegram бот: активен');
  console.log('🌐 Сайт: http://localhost:5173');
  console.log('\n📋 Доступные endpoints:');
  console.log('   GET http://localhost:3001/api/reviews - получить отзывы');
  console.log('   GET http://localhost:3001/api/stats - статистика');
  console.log('\n🛑 Для остановки нажмите Ctrl+C\n');

  // Обработка завершения
  process.on('SIGINT', () => {
    console.log('\n🛑 Остановка системы...');
    apiServer.kill();
    telegramBot.kill();
    console.log('✅ Система остановлена');
    process.exit(0);
  });

}, 2000);

// Проверяем, что процессы не упали
setInterval(() => {
  if (apiServer.killed) {
    console.error('❌ API сервер упал, перезапускаем...');
    const newApiServer = startProcess('API', 'server.js');
    Object.assign(apiServer, newApiServer);
  }
}, 5000);

