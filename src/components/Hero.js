import Link from 'next/link';
import Image from 'next/image';
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
                <div className={styles.logoWrapper}>
                    <Image
                        src="/logo.png"
                        alt="Dosth App Logo"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}
