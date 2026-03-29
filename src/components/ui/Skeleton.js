import styles from './Skeleton.module.css';

export default function Skeleton({ width, height, variant = 'text', className = '' }) {
  const style = {
    width: width ? (typeof width === 'number' ? `${width}px` : width) : '100%',
    height: height ? (typeof height === 'number' ? `${height}px` : height) : '1rem',
  };

  return <div className={`${styles.skeleton} ${styles[variant]} ${className}`} style={style} />;
}
