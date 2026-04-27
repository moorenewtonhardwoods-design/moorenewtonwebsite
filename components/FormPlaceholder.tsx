'use client';

interface FormPlaceholderProps {
  formName: string;
  className?: string;
}

export function FormPlaceholder({ formName, className = '' }: FormPlaceholderProps) {
  return (
    <div
      className={`bg-surface border-2 border-dashed border-muted rounded-lg p-8 text-center ${className}`}
    >
      <p className="text-body text-lg mb-2">Form: {formName}</p>
      <p className="text-muted text-sm">Form will be wired in the next phase.</p>
    </div>
  );
}
