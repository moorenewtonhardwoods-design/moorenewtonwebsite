import type { TypographyProps } from './types';

const baseStyles = 'font-body text-base font-normal leading-relaxed text-body';

export function Body({ children, className = '', as: Component = 'p' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
