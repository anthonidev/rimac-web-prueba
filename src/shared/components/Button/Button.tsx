import { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  isLoading?: boolean;
}

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  isLoading = false,
  className,
  disabled,
  ...props
}: ButtonProps) => {
  const buttonClassName = [
    styles.button,
    styles[`button--${variant}`],
    fullWidth ? styles['button--full-width'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={buttonClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? 'Procesando...' : children}
    </button>
  );
};
