import type { TypographyProps } from './types';

const baseStyles = 'font-body text-lg md:text-xl font-normal leading-relaxed text-body';

export function Lead({ children, className = '', as: Component = 'p' }: TypographyProps) {
  return <Component className={`${baseStyles} ${className}`}>{children}</Component>;
}
