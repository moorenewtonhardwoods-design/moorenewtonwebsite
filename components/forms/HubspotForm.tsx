'use client';

import { useId, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, FieldValues, Path, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

export interface FormFieldConfig {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  required?: boolean;
  options?: readonly string[];
  minLength?: number;
}

interface HubspotFormProps<T extends FieldValues> {
  formName: string;
  schema: z.ZodSchema<T>;
  fields: FormFieldConfig[];
  submitButtonText: string;
  onSubmitSuccessPath: string;
}

interface FormError {
  field: string;
  message: string;
}

export function HubspotForm<T extends FieldValues>({
  formName,
  schema,
  fields,
  submitButtonText,
  onSubmitSuccessPath,
}: HubspotFormProps<T>) {
  const router = useRouter();
  const formId = useId();
  const successRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<T>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(schema as any),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<T> = async (data) => {
    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch(`/api/forms/${formName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.ok) {
        router.push(onSubmitSuccessPath);
        return;
      }

      if (result.errors && Array.isArray(result.errors)) {
        let hasFieldError = false;
        result.errors.forEach((err: FormError) => {
          if (err.field && err.field !== 'form' && fields.some((f) => f.name === err.field)) {
            setError(err.field as Path<T>, { message: err.message });
            hasFieldError = true;
          }
        });

        if (!hasFieldError) {
          const formLevelError = result.errors.find((e: FormError) => e.field === 'form');
          setFormError(formLevelError?.message ?? 'Please check the form and try again.');
        }
      } else if (result.error === 'rate_limit') {
        setFormError('Too many requests. Please wait a few minutes and try again.');
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Unable to submit. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-6">
      {formError && (
        <div
          role="alert"
          aria-live="polite"
          className="p-4 bg-red-50 border border-red-200 rounded text-red-800 text-sm"
        >
          {formError}
        </div>
      )}

      {fields.map((field) => {
        const fieldId = `${formId}-${field.name}`;
        const errorId = `${fieldId}-error`;
        const fieldError = errors[field.name as keyof T];
        const hasError = !!fieldError;
        const errorMessage = hasError ? String((fieldError as { message?: string })?.message ?? '') : '';

        const baseInputClasses =
          'w-full px-4 py-3 border rounded bg-white text-body placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors';
        const errorClasses = hasError ? 'border-red-500' : 'border-muted/30';

        return (
          <div key={field.name}>
            <label htmlFor={fieldId} className="block text-sm font-medium text-body mb-2">
              {field.label}
              {field.required && (
                <span className="text-red-600 ml-1" aria-hidden="true">
                  *
                </span>
              )}
            </label>

            {field.type === 'textarea' ? (
              <textarea
                {...register(field.name as Path<T>)}
                id={fieldId}
                placeholder={field.placeholder}
                aria-required={field.required}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                rows={5}
                className={`${baseInputClasses} ${errorClasses} resize-y min-h-[120px]`}
              />
            ) : field.type === 'select' ? (
              <select
                {...register(field.name as Path<T>)}
                id={fieldId}
                aria-required={field.required}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                className={`${baseInputClasses} ${errorClasses}`}
                defaultValue=""
              >
                <option value="" disabled>
                  {field.placeholder ?? 'Select...'}
                </option>
                {field.options?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                {...register(field.name as Path<T>)}
                type={field.type}
                id={fieldId}
                placeholder={field.placeholder}
                aria-required={field.required}
                aria-invalid={hasError}
                aria-describedby={hasError ? errorId : undefined}
                className={`${baseInputClasses} ${errorClasses}`}
              />
            )}

            {hasError && errorMessage && (
              <p id={errorId} role="alert" aria-live="polite" className="mt-1 text-sm text-red-600">
                {errorMessage}
              </p>
            )}
          </div>
        );
      })}

      {/* Honeypot field */}
      <div aria-hidden="true" className="hidden">
        <label htmlFor={`${formId}-website`}>Website</label>
        <input
          {...register('website' as Path<T>)}
          type="text"
          id={`${formId}-website`}
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto font-display text-xs tracking-label uppercase px-8 py-4 bg-accent text-white hover:bg-emphasis disabled:bg-muted disabled:cursor-not-allowed transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Submitting...</span>
            </span>
          ) : (
            submitButtonText
          )}
        </button>
      </div>

      <div ref={successRef} tabIndex={-1} aria-live="polite" className="sr-only" />
    </form>
  );
}
