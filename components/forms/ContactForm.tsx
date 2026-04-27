'use client';

import { HubspotForm, FormFieldConfig } from './HubspotForm';
import { contactFormSchema, ContactFormData } from '@/lib/validation/contact';

const contactFields: FormFieldConfig[] = [
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
    placeholder: 'Company name (optional)',
    required: false,
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
    placeholder: '(510) 555-0100 (optional)',
    required: false,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    placeholder: 'How can we help?',
    required: true,
  },
];

export function ContactForm() {
  return (
    <HubspotForm<ContactFormData>
      formName="contact"
      schema={contactFormSchema}
      fields={contactFields}
      submitButtonText="Send Message"
      onSubmitSuccessPath="/contact/thank-you"
    />
  );
}
