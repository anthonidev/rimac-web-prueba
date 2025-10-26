import { forwardRef, SelectHTMLAttributes } from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  error?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ options, error, className, ...props }, ref) => {
    const selectClassName = [
      styles.select,
      error ? styles['select--error'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <select
          ref={ref}
          className={selectClassName}
          aria-invalid={error ? 'true' : 'false'}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
