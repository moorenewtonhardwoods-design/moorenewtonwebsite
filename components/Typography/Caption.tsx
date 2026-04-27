import type { TypographyProps } from './types';

const baseStyles = 'font-body text-sm font-normal text-body';

export function Caption({ children, className = '', as: Component = 'span' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
