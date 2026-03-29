import styles from './MapPlaceholder.module.css';

export default function MapPlaceholder({ status, text }) {
  return (
    <div className={styles.mapContainer}>
      <div className={styles.mapBackground}>
        {/* Decorative Map Elements */}
        <div className={styles.water} />
        <div className={styles.park} />
        <div className={styles.roadMain} />
        <div className={styles.roadSec} />

        {/* Pulsing Markers */}
        <div className={`${styles.marker} ${styles.shop}`}>
          <div className={styles.markerPulse} />
          <div className={styles.markerIcon}>🏢</div>
          <span className={styles.label}>Repair Center</span>
        </div>

        <div className={`${styles.marker} ${styles.user}`}>
          <div className={styles.markerPulse} />
          <div className={styles.markerIcon}>🏠</div>
          <span className={styles.label}>Home</span>
        </div>

        {/* Moving Rider */}
        <div className={`${styles.rider} ${styles[status] || ''}`}>
          <div className={styles.riderIcon}>🛵</div>
          <div className={styles.riderTrail} />
        </div>
      </div>

      {text && (
        <div className={styles.statusOverlay}>
          <div className={styles.liveDot} />
          <p>{text}</p>
        </div>
      )}
    </div>
  );
}
