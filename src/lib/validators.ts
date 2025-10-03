import { z } from 'zod';

export const leadSchema = z.object({
  name: z.string().min(2, 'Укажите имя'),
  phone: z
    .string()
    .min(7, 'Укажите телефон')
    .refine((v) => /^\+998\s?\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/.test(v), 'Формат: +998 xx xxx xx xx'),
  messenger: z.enum(['telegram', 'whatsapp']),
  level: z.enum(['beginner', 'hsk1', 'hsk2', 'hsk3', 'hsk4', 'hsk5', 'unknown']),
  format: z.enum(['group', 'individual', 'intensive']),
  comment: z.string().max(1000).optional().default(''),
});

export type LeadInput = z.infer<typeof leadSchema>;


