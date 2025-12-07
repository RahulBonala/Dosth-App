import styles from './Button.module.css';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
    return (
        <button
            className={`${styles.button} ${styles[variant]} ${styles.hoverLift} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
