import { z } from 'zod';

export const TRADE_SEGMENTS = [
  'Custom Cabinets & Casework',
  'Architectural Millwork',
  'Custom Windows & Doors',
  'Furniture',
  'Boatbuilding',
  'Exhibit & Staging Fabrication',
  'Moulding & Trim',
  'CNC Cutting',
  'General Contractor',
  'Architect / Designer',
  'Other',
] as const;

export const quoteFormSchema = z.object({
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
    .min(1, 'Company name is required')
    .max(200, 'Company name is too long'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(254, 'Email is too long'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .max(30, 'Phone number is too long'),
  mn_trade_segment: z.enum(TRADE_SEGMENTS, {
    message: 'Please select your industry',
  }),
  message: z
    .string()
    .min(20, 'Please provide at least 20 characters about your project')
    .max(5000, 'Message is too long'),
  website: z.string().optional(),
});

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
