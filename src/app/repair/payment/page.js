"use client";
import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import styles from './page.module.css';

function PaymentContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const amount = searchParams.get('amount') || '1000';
    const redirectUrl = searchParams.get('redirect') || '/repair';

    // States: 'input', 'processing', 'success'
    const [status, setStatus] = useState('input');

    const handlePay = () => {
        setStatus('processing');
        setTimeout(() => {
            setStatus('success');
        }, 2000); // 2 seconds processing simulation
    };

    const handleDone = () => {
        router.push(redirectUrl);
    };

    if (status === 'processing') {
        return (
            <main className={styles.mainCentered}>
                <div className={styles.loader}></div>
                <h2 className={styles.processingTitle}>Processing Payment...</h2>
                <p className={styles.processingText}>Please wait, do not press the back button or close the app</p>
                <div className={styles.dots}>...</div>
            </main>
        );
    }

    if (status === 'success') {
        return (
            <main className={styles.mainCentered}>
                <div className={styles.successIconWrapper}>
                    <div className={styles.successIcon}>✓</div>
                </div>
                <h2 className={styles.successTitle}>Payment Successful!</h2>
                <p className={styles.successText}>Your transaction has been completed successfully</p>

                <div className={styles.receiptCard}>
                    <div className={styles.receiptRow}>
                        <span>Amount Paid</span>
                        <span className={styles.receiptAmount}>₹{Number(amount).toLocaleString()}</span>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.receiptRow}>
                        <span>Paid to</span>
                        <span>Dosth</span>
                    </div>
                    <div className={styles.receiptRow}>
                        <span>Transaction ID</span>
                        <span className={styles.mono}>DOSTH7RHQ9LF160660</span>
                    </div>
                    <div className={styles.receiptRow}>
                        <span>Date & Time</span>
                        <span>{new Date().toLocaleString()}</span>
                    </div>
                </div>

                <div className={styles.actionButtons}>
                    <button className={styles.outlineBtn}>📥 Download</button>
                    <button className={styles.outlineBtn}>🔗 Share</button>
                </div>

                <button className={styles.doneBtn} onClick={handleDone}>Done</button>
            </main>
        );
    }

    return (
        <main className={styles.main}>
            <div className={styles.paymentHeader}>
                <button onClick={() => router.back()} className={styles.backBtn}>←</button>
                <h1>Complete Your Payment</h1>
            </div>

            <div className={styles.blueCard}>
                <p>Amount to Pay</p>
                <h2>₹{Number(amount).toLocaleString()}</h2>
            </div>

            {/* Quick Pay */}
            <div className={styles.section}>
                <h3>Quick Pay</h3>
                <label className={styles.optionCard}>
                    <input type="radio" name="payment" />
                    <div className={styles.optionContent}>
                        <div className={styles.iconBox}>📱</div>
                        <div>
                            <h4>Google Pay</h4>
                            <p>user@okhdfcbank</p>
                        </div>
                    </div>
                </label>
                <label className={styles.optionCard}>
                    <input type="radio" name="payment" />
                    <div className={styles.optionContent}>
                        <div className={styles.iconBox}>💳</div>
                        <div>
                            <h4>Saved Visa Card</h4>
                            <p>ending in 1234</p>
                        </div>
                    </div>
                </label>
            </div>

            {/* UPI */}
            <div className={styles.section}>
                <h3>Pay with UPI</h3>
                <div className={styles.upiGrid}>
                    <div className={styles.upiItem}>
                        <div className={styles.iconBoxSm}>G</div>
                        <span>Google Pay</span>
                    </div>
                    <div className={styles.upiItem}>
                        <div className={styles.iconBoxSm}>Pe</div>
                        <span>PhonePe</span>
                    </div>
                    <div className={styles.upiItem}>
                        <div className={styles.iconBoxSm}>Pm</div>
                        <span>Paytm</span>
                    </div>
                </div>
            </div>

            {/* Add UPI */}
            <div className={styles.section}>
                <h3>Add New UPI ID</h3>
                <div className={styles.inputRow}>
                    <input type="text" placeholder="example@upi" className={styles.input} />
                    <button className={styles.addBtn}>Add</button>
                </div>
            </div>

            <div className={styles.footer}>
                <button className={styles.paySecureBtn} onClick={handlePay}>Pay Securely</button>
                <p className={styles.secureText}>Please select a payment method</p>
            </div>
        </main>
    );
}

export default function PaymentPage() {
    return (
        <>
            <Suspense fallback={<div>Loading Payment...</div>}>
                <PaymentContent />
            </Suspense>
        </>
    );
}
