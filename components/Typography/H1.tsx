import type { TypographyProps } from './types';

const baseStyles =
  'font-display text-4xl md:text-6xl font-normal tracking-headline uppercase text-emphasis';

export function H1({ children, className = '', as: Component = 'h1' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
