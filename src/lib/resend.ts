export type ResendResult = { ok: boolean };

export async function sendResendEmail(subject: string, html: string): Promise<ResendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEADS_EMAIL_TO;
  if (!apiKey || !to) return { ok: false };

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'Unlock Leads <leads@unlock.example.com>',
      to: [to],
      subject,
      html,
    }),
  });

  return { ok: res.ok };
}


