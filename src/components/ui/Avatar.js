import styles from './Avatar.module.css';

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

export default function Avatar({ name = '', size = 'md', src = null, color = 'indigo' }) {
  const initials = getInitials(name);
  
  if (src) {
    return (
      <div className={`${styles.avatar} ${styles[size]}`}>
        <img src={src} alt={name} />
      </div>
    );
  }
  
  return (
    <div className={`${styles.avatar} ${styles[size]} ${styles[color]}`} aria-label={name}>
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
