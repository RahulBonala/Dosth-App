import Link from 'next/link';
import Button from './Button';
import styles from './Hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.content}>
                <h1 className={`${styles.title} animate-fade-in`}>
                    Your Friend, <br />
                    <span className={styles.highlight}>Your Guide.</span>
                </h1>
                <p className={styles.subtitle}>
                    Dosth is the all-in-one companion for urban living.
                    Expert repairs and community sharing—all in your pocket.
                </p>
                <div className={styles.actions}>
                    <Link href="/repair">
                        <Button size="large">Get Help Now</Button>
                    </Link>
                </div>
            </div>
            <div className={styles.visual}>
                <div className={styles.circle}></div>
                <div className={styles.card}>
                    <span>Dosth App</span>
                </div>
            </div>
        </section>
    );
}
