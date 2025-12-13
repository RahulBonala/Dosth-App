import styles from './MapPlaceholder.module.css';

export default function MapPlaceholder({ status, text }) {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapBackground}>
                <div className={styles.water}></div>
                <div className={styles.park}></div>

                <div className={styles.roadMain}></div>
                <div className={styles.roadSec}></div>

                <div className={`${styles.marker} ${styles.shop}`}>🏢 <span className={styles.label}>Repair Center</span></div>
                <div className={`${styles.marker} ${styles.user}`}>🏠 <span className={styles.label}>Home</span></div>

                <div className={`${styles.rider} ${styles[status] || ''}`}>
                    🛵
                </div>
            </div>
            <div className={styles.statusOverlay}>
                <p>{text || "Tracking Rider..."}</p>
            </div>
        </div>
    );
}
