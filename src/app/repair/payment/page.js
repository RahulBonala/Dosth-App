'use client';
import { useState, Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../components/layout/Header';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import styles from './page.module.css';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount') || '1000';
  const redirectUrl = searchParams.get('redirect') || '/repair';

  // States: 'input', 'processing', 'success'
  const [status, setStatus] = useState('input');
  const [paymentMethod, setPaymentMethod] = useState('gpay');

  const handlePay = () => {
    setStatus('processing');
    setTimeout(() => {
      setStatus('success');
    }, 2500);
  };

  const handleDone = () => {
    router.push(redirectUrl);
  };

  if (status === 'processing') {
    return (
      <main className={styles.mainCentered}>
        <div className={styles.shimmerLoader} />
        <h2 className={styles.processingTitle}>Securing Payment...</h2>
        <p className={styles.processingText}>Do not refresh the page or go back.</p>
      </main>
    );
  }

  if (status === 'success') {
    return (
      <main className={styles.mainCentered}>
        <div className={styles.checkContainer}>
          <svg className={styles.checkIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className={styles.successTitle}>Payment Received</h2>
        <p className={styles.successText}>Thank you for choosing Dosth!</p>

        <div className={styles.receipt}>
          <div className={styles.receiptRow}>
            <label>Amount Paid</label>
            <span className={styles.amount}>₹{Number(amount).toLocaleString()}</span>
          </div>
          <hr className={styles.receiptDivider} />
          <div className={styles.receiptRow}>
            <label>Transaction ID</label>
            <span className={styles.mono}>DSTH-PK-892347102X</span>
          </div>
          <div className={styles.receiptRow}>
            <label>Date & Time</label>
            <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })} · {new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className={styles.receiptRow}>
            <label>Status</label>
            <span style={{ color: 'var(--color-success)' }}>Success</span>
          </div>
        </div>

        <div className={styles.receiptActions}>
          <button className={styles.receiptBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>
            Download
          </button>
          <button className={styles.receiptBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
            Share
          </button>
        </div>

        <Button variant="primary" style={{ width: '100%', maxWidth: '400px' }} onClick={handleDone}>
          Continue
        </Button>
      </main>
    );
  }

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.paymentHeader}>
            <button onClick={() => router.back()} className={styles.backBtn}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <h1 className={styles.title}>Secure Checkout</h1>
          </div>

          <div className={styles.amountCard}>
            <p className={styles.amountLabel}>Total to Pay</p>
            <h2 className={styles.amountValue}>₹{Number(amount).toLocaleString()}</h2>
          </div>

          {/* Quick options */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Quick Pay</h3>
            <div className={styles.optionCard} onClick={() => setPaymentMethod('gpay')}>
              <input type="radio" name="paymethod" checked={paymentMethod === 'gpay'} readOnly />
              <div className={styles.optionContent}>
                <div className={styles.iconBox}>📱</div>
                <div className={styles.optionText}>
                  <h4>Google Pay</h4>
                  <p>rahul@okhdfcbank</p>
                </div>
              </div>
            </div>
            <div className={styles.optionCard} onClick={() => setPaymentMethod('card')}>
              <input type="radio" name="paymethod" checked={paymentMethod === 'card'} readOnly />
              <div className={styles.optionContent}>
                <div className={styles.iconBox}>💳</div>
                <div className={styles.optionText}>
                  <h4>Visa Debit Card</h4>
                  <p>ending in 4242</p>
                </div>
              </div>
            </div>
          </div>

          {/* UPI Select */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>More UPI Options</h3>
            <div className={styles.upiGrid}>
              {[
                { id: 'phonepe', label: 'PhonePe', icon: 'P' },
                { id: 'paytm', label: 'Paytm', icon: 'Pm' },
                { id: 'cred', label: 'CRED', icon: 'C' },
              ].map(upi => (
                <div key={upi.id} className={`${styles.upiItem} ${paymentMethod === upi.id ? styles.upiActive : ''}`} onClick={() => setPaymentMethod(upi.id)}>
                  <div className={styles.upiIcon}>{upi.icon}</div>
                  <span className={styles.upiLabel}>{upi.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Add New UPI ID</h3>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
              <Input placeholder="example@upi" />
              <Button variant="secondary" style={{ marginBottom: '1px' }}>Verify</Button>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.secureBadge}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z" /></svg>
            PCI-DSS Secure Payment
          </div>
          <Button variant="primary" style={{ width: '100%' }} onClick={handlePay}>
            Pay ₹{Number(amount).toLocaleString()} Securely
          </Button>
        </div>
      </main>
    </>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className={styles.mainCentered}>Loading Payment...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
