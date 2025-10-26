import { forwardRef, InputHTMLAttributes, ChangeEvent } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import styles from './DocumentInput.module.scss';

export interface DocumentInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  error?: string;
  documentType: 'DNI' | 'RUC';
  onDocumentTypeChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  documentTypeRegister: UseFormRegisterReturn;
}

export const DocumentInput = forwardRef<HTMLInputElement, DocumentInputProps>(
  ({ label, error, documentType, onDocumentTypeChange, documentTypeRegister, className, ...props }, ref) => {
    const wrapperClassName = [
      styles.wrapper,
      error ? styles['wrapper--error'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div className={styles.container}>
        <div className={wrapperClassName}>
          <select
            {...documentTypeRegister}
            value={documentType}
            onChange={onDocumentTypeChange}
            className={styles.wrapper__select}
            aria-invalid={error ? 'true' : 'false'}
          >
            <option value="DNI">DNI</option>
            <option value="RUC">RUC</option>
          </select>
          <div className={styles.wrapper__input}>
            <label htmlFor={props.id} className={styles.wrapper__label}>
              {label}
            </label>
            <input
              ref={ref}
              className={styles.wrapper__field}
              aria-invalid={error ? 'true' : 'false'}
              {...props}
            />
          </div>
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
);

DocumentInput.displayName = 'DocumentInput';
