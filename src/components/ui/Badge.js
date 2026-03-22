import styles from './Badge.module.css';

export default function Badge({ children, variant = 'default', size = 'sm', className = '' }) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${styles[size]} ${className}`}>
      {children}
    </span>
  );
}
