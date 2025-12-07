"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function LoginPage() {
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        // For demo, redirect to repair hub
        router.push('/repair');
    };

    return (
        <main className={styles.main}>
            {/* Blue Header Section */}
            <div className={styles.headerSection}>
                <div className={styles.iconWrapper}>
                    {/* Car Icon Placeholder */}
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                        <circle cx="7" cy="17" r="2" />
                        <circle cx="17" cy="17" r="2" />
                        <path d="M5 17h12" />
                    </svg>
                </div>
                <h1>Welcome to Dosth</h1>
                <p>Your Friend, Your Guide</p>
            </div>

            {/* White Card Overlay */}
            <div className={styles.cardContainer}>
                <div className={styles.card}>
                    <h2>Login</h2>

                    <form onSubmit={handleLogin} className={styles.form}>
                        <div className={styles.inputGroup}>
                            <label>Mobile Number / Email</label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>✉️</span>
                                <input type="text" placeholder="Enter your email or phone" required />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label>Password</label>
                            <div className={styles.inputWrapper}>
                                <span className={styles.inputIcon}>🔒</span>
                                <input type="password" placeholder="Enter your password" required />
                            </div>
                        </div>

                        <button type="submit" className={styles.loginBtn}>Login</button>
                    </form>

                    <p className={styles.signupText}>
                        Don't have an account? <Link href="/signup">Sign Up</Link>
                    </p>

                    <div className={styles.divider}>
                        <span>Or continue with</span>
                    </div>

                    <div className={styles.socialButtons}>
                        <button className={styles.socialBtn}>Google</button>
                        <button className={styles.socialBtn}>Apple</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
