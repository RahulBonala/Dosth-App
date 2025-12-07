import styles from './ServiceCard.module.css';

export default function ServiceCard({ title, icon, description, onClick, actionLabel = "Select" }) {
    return (
        <div className={styles.card} onClick={onClick}>
            <div className={styles.iconWrapper}>
                <span className={styles.icon}>{icon}</span>
            </div>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <button className={styles.action}>{actionLabel} →</button>
        </div>
    );
}
