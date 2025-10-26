import { forwardRef, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    const fieldClassName = [
      styles.input,
      error ? styles['input--error'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.wrapper}>
        <div className={fieldClassName}>
          <label htmlFor={props.id} className={styles.input__label}>
            {label}
          </label>
          <input
            ref={ref}
            className={styles.input__field}
            aria-invalid={error ? 'true' : 'false'}
            {...props}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
