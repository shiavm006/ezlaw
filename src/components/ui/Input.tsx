"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import styles from "./Input.module.css";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'outlined' | 'filled';
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  required?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helperText,
  size = 'md',
  variant = 'outlined',
  startIcon,
  endIcon,
  fullWidth = false,
  required = false,
  className = '',
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
    props.onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    props.onChange?.(e);
  };

  const baseClass = styles.input;
  const sizeClass = styles[size];
  const variantClass = styles[variant];
  const widthClass = fullWidth ? styles.fullWidth : '';
  const errorClass = error ? styles.error : '';
  const focusedClass = isFocused ? styles.focused : '';
  const hasValueClass = hasValue ? styles.hasValue : '';
  const hasStartIcon = startIcon ? styles.hasStartIcon : '';
  const hasEndIcon = endIcon ? styles.hasEndIcon : '';

  const inputClasses = [
    baseClass,
    sizeClass,
    variantClass,
    widthClass,
    errorClass,
    focusedClass,
    hasValueClass,
    hasStartIcon,
    hasEndIcon,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.container}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      
      <div className={styles.inputWrapper}>
        {startIcon && (
          <div className={styles.startIcon}>
            {startIcon}
          </div>
        )}
        
        <input
          ref={ref}
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
        
        {endIcon && (
          <div className={styles.endIcon}>
            {endIcon}
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <div className={`${styles.helperText} ${error ? styles.error : ''}`}>
          {error || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 