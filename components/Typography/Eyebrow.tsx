import type { TypographyProps } from './types';

const baseStyles = 'font-display text-xs font-normal tracking-label uppercase text-body';

export function Eyebrow({ children, className = '', as: Component = 'span' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
