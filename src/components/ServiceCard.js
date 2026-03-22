'use client';
import styles from './ServiceCard.module.css';
import Badge from './ui/Badge';

const SVG_ICONS = {
  Electronics: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="14" height="11" rx="2" />
      <path d="M8 14v3" /><path d="M5 17h6" />
      <rect x="17" y="9" width="5" height="9" rx="1" />
      <path d="M17 15h5" />
    </svg>
  ),
  Appliances: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="17" rx="2" />
      <path d="M7 4v17" />
      <circle cx="14" cy="12" r="4" />
      <circle cx="14" cy="12" r="1.5" />
    </svg>
  ),
  'Bike / Car': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="17" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
      <path d="M5 17h14" />
      <path d="M12 4l3 6h3l1 4H5l2-4 1-6z" />
      <path d="M15 10l-3 0" />
    </svg>
  ),
  'Home Services': (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
      <path d="M13 7.5a1.5 1.5 0 0 1-3 0" />
    </svg>
  ),
  Tools: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  ),
  Other: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="5" cy="5" r="1.5" fill="currentColor" />
      <circle cx="12" cy="5" r="1.5" fill="currentColor" />
      <circle cx="19" cy="5" r="1.5" fill="currentColor" />
      <circle cx="5" cy="12" r="1.5" fill="currentColor" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" />
      <circle cx="5" cy="19" r="1.5" fill="currentColor" />
      <circle cx="12" cy="19" r="1.5" fill="currentColor" />
      <circle cx="19" cy="19" r="1.5" fill="currentColor" />
    </svg>
  ),
};

const COLORS = {
  Electronics:    { color: '#3B82F6', bg: '#EFF6FF' },
  Appliances:     { color: '#10B981', bg: '#ECFDF5' },
  'Bike / Car':   { color: '#F97316', bg: '#FFF7ED' },
  'Home Services':{ color: '#8B5CF6', bg: '#F5F3FF' },
  Tools:          { color: '#F59E0B', bg: '#FFFBEB' },
  Other:          { color: '#64748B', bg: '#F8FAFC' },
};

const POPULAR = ['Electronics', 'Home Services'];

export default function ServiceCard({ title, description, onClick }) {
  const { color, bg } = COLORS[title] || COLORS.Other;
  const icon = SVG_ICONS[title] || SVG_ICONS.Other;
  const isPopular = POPULAR.includes(title);

  return (
    <div className={styles.card} onClick={onClick} style={{ '--card-color': color }}>
      <div className={styles.cardTop}>
        <div className={styles.iconCircle} style={{ background: bg, color }}>
          {icon}
        </div>
        {isPopular && <Badge variant="popular">Popular</Badge>}
      </div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      <button className={styles.action}>Book Now →</button>
    </div>
  );
}
