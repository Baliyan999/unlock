const { spawn } = require('child_process');
const path = require('path');

console.log('🌐 Запуск сайта...\n');

// Функция для запуска процесса
function startProcess(name, command, args = []) {
  console.log(`📦 Запуск ${name}...`);
  
  const process = spawn(command, args, {
    cwd: path.join(__dirname),
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

// Запускаем сайт
const siteProcess = startProcess('SITE', 'npm', ['run', 'dev']);

console.log('\n✅ Сайт запускается!');
console.log('🌐 URL: http://localhost:5173');
console.log('📡 API: http://localhost:3001');
console.log('\n🛑 Для остановки нажмите Ctrl+C\n');

// Обработка завершения
process.on('SIGINT', () => {
  console.log('\n🛑 Остановка сайта...');
  siteProcess.kill();
  console.log('✅ Сайт остановлен');
  process.exit(0);
});

