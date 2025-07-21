"use client";

import { ReactNode } from "react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  onClick,
  type = 'button',
  className = ''
}: ButtonProps) {
  const baseClass = styles.button;
  const variantClass = styles[variant];
  const sizeClass = styles[size];
  const widthClass = fullWidth ? styles.fullWidth : '';
  const loadingClass = loading ? styles.loading : '';
  
  const buttonClasses = [
    baseClass,
    variantClass,
    sizeClass,
    widthClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading && (
        <div className={styles.spinner}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
          </svg>
        </div>
      )}
      <span className={loading ? styles.hidden : ''}>
        {children}
      </span>
    </button>
  );
} 