'use client';

import { HubspotForm, FormFieldConfig } from './HubspotForm';
import { quoteFormSchema, TRADE_SEGMENTS, QuoteFormData } from '@/lib/validation/quote';

const quoteFields: FormFieldConfig[] = [
  {
    name: 'firstname',
    label: 'First Name',
    type: 'text',
    placeholder: 'First name',
    required: true,
  },
  {
    name: 'lastname',
    label: 'Last Name',
    type: 'text',
    placeholder: 'Last name',
    required: true,
  },
  {
    name: 'company',
    label: 'Company',
    type: 'text',
    placeholder: 'Company name',
    required: true,
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'you@company.com',
    required: true,
  },
  {
    name: 'phone',
    label: 'Phone',
    type: 'tel',
    placeholder: '(510) 555-0100',
    required: true,
  },
  {
    name: 'mn_trade_segment',
    label: 'Industry',
    type: 'select',
    placeholder: 'Select your industry',
    required: true,
    options: TRADE_SEGMENTS,
  },
  {
    name: 'message',
    label: 'Project Details',
    type: 'textarea',
    placeholder:
      'Tell us about your project. Species, thicknesses, quantities, delivery location, timeline, or paste a cutlist. The more detail you share, the faster and more accurate the quote.',
    required: true,
    minLength: 20,
  },
];

export function QuoteForm() {
  return (
    <HubspotForm<QuoteFormData>
      formName="quote"
      schema={quoteFormSchema}
      fields={quoteFields}
      submitButtonText="Request Quote"
      onSubmitSuccessPath="/quote/thank-you"
    />
  );
}
