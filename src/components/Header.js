import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logoLink}>
                    <Image
                        src="/logo.png"
                        alt="Dosth Logo"
                        width={120}
                        height={40}
                        className={styles.logoImage}
                        priority
                    />
                </Link>
                <nav className={styles.nav}>
                    <Link href="/repair" className={styles.navLink}>Repair</Link>
                    <Link href="/donate" className={styles.navLink}>Donate</Link>
                </nav>
                <button className={styles.menuBtn}>Menu</button>
            </div>
        </header>
    );
}
