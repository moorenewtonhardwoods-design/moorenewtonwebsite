import { z } from 'zod';

export const contactFormSchema = z.object({
  firstname: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name is too long'),
  lastname: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name is too long'),
  company: z
    .string()
    .max(200, 'Company name is too long')
    .optional()
    .default(''),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
  phone: z
    .string()
    .max(30, 'Phone number is too long')
    .optional()
    .default(''),
  message: z
    .string()
    .min(1, 'Message is required')
    .max(5000, 'Message is too long'),
  website: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
