import type { TypographyProps } from './types';

const baseStyles =
  'font-display text-sm font-normal tracking-headline uppercase text-emphasis';

export function H4({ children, className = '', as: Component = 'h4' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
