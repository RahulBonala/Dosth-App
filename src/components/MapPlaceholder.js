import styles from './MapPlaceholder.module.css';

export default function MapPlaceholder({ status, text }) {
    return (
        <div className={styles.mapContainer}>
            <div className={styles.mapBackground}>
                {/* Simplified visual representation of a map */}
                <div className={styles.road}></div>
                <div className={styles.roadVertical}></div>

                <div className={`${styles.marker} ${styles.shop}`}>🏢 <span className={styles.label}>Shop</span></div>
                <div className={`${styles.marker} ${styles.user}`}>🏠 <span className={styles.label}>You</span></div>

                <div className={`${styles.rider} ${status === 'rider_coming' ? styles.riderMoving : styles.riderArrived}`}>
                    🛵
                </div>
            </div>
            <div className={styles.statusOverlay}>
                <p>{text || "Tracking Rider..."}</p>
            </div>
        </div>
    );
}
