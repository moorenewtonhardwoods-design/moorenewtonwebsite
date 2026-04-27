import type { TypographyProps } from './types';

const baseStyles =
  'font-display text-2xl md:text-3xl font-normal tracking-wide uppercase text-emphasis';

export function H2({ children, className = '', as: Component = 'h2' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
