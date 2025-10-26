'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './Button.module.scss';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  fullWidth?: boolean;
  isLoading?: boolean;
}

const LoadingSpinner = () => (
  <motion.div
    className={styles.button__spinner}
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="8"
        cy="8"
        r="6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="28 10"
      />
    </svg>
  </motion.div>
);

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
      {isLoading ? (
        <span className={styles.button__loading}>
          <LoadingSpinner />
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
