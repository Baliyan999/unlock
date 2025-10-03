import type { VercelRequest, VercelResponse } from '@vercel/node';
import { leadSchema } from '../src/lib/validators';
import { sendToTelegram } from '../src/lib/telegram';
import { sendResendEmail } from '../src/lib/resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ ok: false, error: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const parsed = leadSchema.safeParse(payload);
    if (!parsed.success) {
      res.status(400).json({ ok: false, error: 'Validation failed', issues: parsed.error.issues });
      return;
    }

    const data = parsed.data;

    const text = [
      '📝 Новая заявка (Unlock)',
      `Имя: ${data.name}`,
      `Телефон: ${data.phone}`,
      `Мессенджер: ${data.messenger}`,
      `Уровень: ${data.level}`,
      `Формат: ${data.format}`,
      data.comment ? `Комментарий: ${data.comment}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    const html = `
      <div>
        <h2>Новая заявка (Unlock)</h2>
        <p><b>Имя:</b> ${escapeHtml(data.name)}</p>
        <p><b>Телефон:</b> ${escapeHtml(data.phone)}</p>
        <p><b>Мессенджер:</b> ${escapeHtml(data.messenger)}</p>
        <p><b>Уровень:</b> ${escapeHtml(data.level)}</p>
        <p><b>Формат:</b> ${escapeHtml(data.format)}</p>
        ${data.comment ? `<p><b>Комментарий:</b> ${escapeHtml(data.comment)}</p>` : ''}
      </div>
    `;

    const [tg, email] = await Promise.all([
      sendToTelegram(text),
      sendResendEmail('Новая заявка — Unlock', html),
    ]);

    console.log('Lead received', {
      telegram: tg.ok,
      email: email.ok,
      name: data.name,
      messenger: data.messenger,
      format: data.format,
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Lead error', err);
    res.status(200).json({ ok: true });
  }
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#39;';
      default: return c;
    }
  });
}


