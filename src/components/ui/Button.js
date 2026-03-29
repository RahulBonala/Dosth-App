import styles from './Button.module.css';

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  disabled = false,
  loading = false,
  fullWidth = false,
  ...props
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${styles[size]} ${fullWidth ? styles.fullWidth : ''} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {children}
    </button>
  );
}
