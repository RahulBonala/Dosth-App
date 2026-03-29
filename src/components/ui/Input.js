'use client';
import { useId } from 'react';
import styles from './Input.module.css';

export default function Input({ label, error, icon, className = '', id, ...props }) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className={`${styles.inputGroup} ${className}`}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {icon && <span className={styles.icon}>{icon}</span>}
        <input
          id={inputId}
          className={`${styles.input} ${error ? styles.inputError : ''} ${
            icon ? styles.hasIcon : ''
          }`}
          {...props}
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
}
