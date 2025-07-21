"use client";

import { ReactNode } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
}

export default function Card({
  children,
  variant = 'elevated',
  padding = 'md',
  className = '',
  onClick,
  interactive = false
}: CardProps) {
  const baseClass = styles.card;
  const variantClass = styles[variant];
  const paddingClass = styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`];
  const interactiveClass = interactive ? styles.interactive : '';
  const clickableClass = onClick ? styles.clickable : '';

  const cardClasses = [
    baseClass,
    variantClass,
    paddingClass,
    interactiveClass,
    clickableClass,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} onClick={onClick}>
      {children}
    </div>
  );
} 