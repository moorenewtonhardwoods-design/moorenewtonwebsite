import type { TypographyProps } from './types';

const baseStyles =
  'font-display text-lg md:text-xl font-semibold tracking-subhead uppercase text-emphasis';

export function H3({ children, className = '', as: Component = 'h3' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
