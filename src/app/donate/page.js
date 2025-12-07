"use client";
import Header from '../../components/Header';
import Button from '../../components/Button';
import styles from './page.module.css';

export default function DonatePage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.container}>
                    <section className={styles.hero}>
                        <h1 className="animate-fade-in">Share the Surplus</h1>
                        <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                            Connect with local NGOs and shelters to bridge the gap.
                        </p>
                    </section>

                    <div className={`${styles.card} animate-fade-in`} style={{ animationDelay: '0.2s' }}>
                        <h2>Details</h2>

                        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                            <div className={styles.inputGroup}>
                                <label>What are you donating?</label>
                                <input type="text" placeholder="e.g. 50 Packets of Rice" className={styles.input} />
                            </div>

                            <div className={styles.row}>
                                <div className={styles.inputGroup}>
                                    <label>Quantity</label>
                                    <input type="text" placeholder="Approx kg/servings" className={styles.input} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>Pickup Time</label>
                                    <input type="time" className={styles.input} />
                                </div>
                            </div>

                            <Button size="large" className={styles.submitBtn}>
                                Find Donation Partner
                            </Button>
                        </form>
                    </div>

                    <div className={styles.stats}>
                        {/* Fake stats */}
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>1200+</span>
                            <span className={styles.statLabel}>Meals Shared</span>
                        </div>
                        <div className={styles.statItem}>
                            <span className={styles.statValue}>50+</span>
                            <span className={styles.statLabel}>Partners</span>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
