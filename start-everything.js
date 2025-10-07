const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Запуск полной системы UNLOCK...\n');

// Функция для запуска процесса
function startProcess(name, command, args = [], cwd = __dirname) {
  console.log(`📦 Запуск ${name}...`);
  
  const process = spawn(command, args, {
    cwd: cwd,
    stdio: 'pipe',
    shell: true
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

// Запускаем все процессы
console.log('🌐 Запуск API сервера...');
const apiServer = startProcess('API', 'node', ['server.js'], path.join(__dirname, 'api'));

setTimeout(() => {
  console.log('🤖 Запуск Telegram бота...');
  const telegramBot = startProcess('BOT', 'node', ['telegram-bot.js'], path.join(__dirname, 'api'));
  
  setTimeout(() => {
    console.log('🌐 Запуск сайта...');
    const siteProcess = startProcess('SITE', 'npm', ['run', 'dev']);
    
    console.log('\n✅ ВСЯ СИСТЕМА ЗАПУЩЕНА!');
    console.log('📡 API сервер: http://localhost:3001');
    console.log('🤖 Telegram бот: активен');
    console.log('🌐 Сайт: http://localhost:5173');
    console.log('\n🛑 Для остановки нажмите Ctrl+C\n');

    // Обработка завершения
    process.on('SIGINT', () => {
      console.log('\n🛑 Остановка всей системы...');
      apiServer.kill();
      telegramBot.kill();
      siteProcess.kill();
      console.log('✅ Система остановлена');
      process.exit(0);
    });
  }, 3000);
}, 2000);

