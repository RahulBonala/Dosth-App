import Image from 'next/image';
import styles from './Avatar.module.css';

function getInitials(name) {
  if (!name) return 'U';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return parts[0].slice(0, 2).toUpperCase();
}

const sizeMap = { xs: 24, sm: 32, md: 40, lg: 56, xl: 72 };

export default function Avatar({ name = '', size = 'md', src = null, color = 'indigo' }) {
  const initials = getInitials(name);
  const px = sizeMap[size] || 40;

  if (src) {
    return (
      <div className={`${styles.avatar} ${styles[size]}`}>
        <Image
          src={src}
          alt={name || 'User avatar'}
          width={px}
          height={px}
          className={styles.image}
        />
      </div>
    );
  }

  return (
    <div className={`${styles.avatar} ${styles[size]} ${styles[color]}`} aria-label={name}>
      <span className={styles.initials}>{initials}</span>
    </div>
  );
}
