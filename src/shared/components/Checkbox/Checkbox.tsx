import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
  error?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const checkboxClassName = [
      styles.checkbox,
      error ? styles['checkbox--error'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <label className={checkboxClassName} htmlFor={id}>
          <input
            ref={ref}
            type="checkbox"
            id={id}
            className={styles.checkbox__input}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
          <span className={styles.checkbox__text}>{label}</span>
        </label>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
