export type TelegramResult = { ok: boolean; sent: number; failed: number };

export async function sendToTelegramDev(text: string): Promise<TelegramResult> {
  const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = import.meta.env.VITE_TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_IDS;
  
  if (!token || !chatIds) {
    console.warn('Telegram credentials not found');
    return { ok: false, sent: 0, failed: 0 };
  }
  
  // Парсим список Chat ID (через запятую)
  const chatIdList = chatIds.split(',').map(id => id.trim()).filter(Boolean);
  
  if (chatIdList.length === 0) {
    console.warn('No chat IDs provided');
    return { ok: false, sent: 0, failed: 0 };
  }
  
  let sent = 0;
  let failed = 0;
  
  // Отправляем сообщение всем указанным чатам
  for (const chatId of chatIdList) {
    try {
      const url = `https://api.telegram.org/bot${token}/sendMessage`;
      
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          chat_id: chatId, 
          text, 
          parse_mode: 'HTML' 
        }),
      });
      
      const result = await res.json();
      
      if (res.ok && result.ok) {
        sent++;
        console.log(`✅ Sent to chat ${chatId}`);
      } else {
        failed++;
        console.error(`❌ Failed to send to chat ${chatId}:`, result);
      }
    } catch (error) {
      failed++;
      console.error(`❌ Error sending to chat ${chatId}:`, error);
    }
  }
  
  return { 
    ok: sent > 0, 
    sent, 
    failed 
  };
}
