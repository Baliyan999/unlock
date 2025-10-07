const http = require('http');

console.log('🧪 Тестируем подключение к API...');

// Тест 1: Проверяем API напрямую
async function testDirectAPI() {
  try {
    const response = await fetch('http://localhost:3001/api/reviews');
    const data = await response.json();
    console.log('✅ Прямое подключение к API:', data);
    return data;
  } catch (error) {
    console.error('❌ Ошибка прямого подключения:', error);
    return null;
  }
}

// Тест 2: Проверяем CORS
async function testCORS() {
  try {
    const response = await fetch('http://localhost:3001/api/reviews', {
      method: 'GET',
      headers: {
        'Origin': 'http://localhost:5173'
      }
    });
    
    console.log('📡 CORS Headers:', {
      'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
      'Content-Type': response.headers.get('Content-Type')
    });
    
    const data = await response.json();
    console.log('✅ CORS тест успешен:', data);
    return data;
  } catch (error) {
    console.error('❌ Ошибка CORS теста:', error);
    return null;
  }
}

// Тест 3: Проверяем доступность с фронтенда
async function testFromFrontend() {
  try {
    // Имитируем запрос с фронтенда
    const response = await fetch('http://localhost:3001/api/reviews', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Origin': 'http://localhost:5173'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Запрос с фронтенда успешен:', data);
      return data;
    } else {
      console.error('❌ HTTP ошибка:', response.status, response.statusText);
      return null;
    }
  } catch (error) {
    console.error('❌ Ошибка запроса с фронтенда:', error);
    return null;
  }
}

async function runTests() {
  console.log('\n🔍 Тест 1: Прямое подключение к API');
  await testDirectAPI();
  
  console.log('\n🔍 Тест 2: CORS проверка');
  await testCORS();
  
  console.log('\n🔍 Тест 3: Запрос с фронтенда');
  await testFromFrontend();
  
  console.log('\n📊 Резюме:');
  console.log('- API сервер должен быть запущен на порту 3001');
  console.log('- Сайт должен быть запущен на порту 5173');
  console.log('- Проверьте консоль браузера на наличие ошибок CORS');
}

runTests();

