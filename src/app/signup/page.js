'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import ToastContainer from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import styles from '../login/page.module.css'; // Reuse Login styles

export default function SignupPage() {
  const router = useRouter();
  const { toasts, showToast, dismissToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ type: 'success', message: 'Account created successfully! ✓' });
      router.push('/repair');
    }, 1500);
  };

  return (
    <main className={styles.main}>
      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image src="/logo.png" alt="Dosth" width={110} height={36} priority />
        </div>
        <h1 className={styles.title}>Join the Community</h1>
        <p className={styles.subtitle}>Start your journey with Dosth today.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          <h2 style={{fontFamily: 'var(--font-heading)', fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center'}}>Sign Up</h2>
          
          <form onSubmit={handleSignup} className={styles.form}>
            <Input 
              name="name"
              label="Full Name"
              placeholder="e.g. Rahul Kumar"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>}
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <Input 
              name="phone"
              label="Mobile Number"
              placeholder="10-digit number"
              icon={<span style={{fontSize: '0.8rem', fontWeight: 700, opacity: 0.6}}>+91</span>}
              value={formData.phone}
              onChange={handleInputChange}
              pattern="[0-9]{10}"
              required
            />
            <Input 
              name="email"
              type="email"
              label="Email Address (Optional)"
              placeholder="name@example.com"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
              value={formData.email}
              onChange={handleInputChange}
            />
            <Input 
              name="password"
              type="password"
              label="Password"
              placeholder="Create a strong password"
              icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
              value={formData.password}
              onChange={handleInputChange}
              required
            />

            <Button 
              type="submit" 
              variant="primary" 
              loading={loading}
              fullWidth
              style={{marginTop: 'var(--space-2)'}}
            >
              Create Account →
            </Button>
          </form>

          <div className={styles.divider}>
            <span>Or sign up with</span>
          </div>

          <div className={styles.socialGrid}>
            <button className={styles.socialBtn}>Google</button>
            <button className={styles.socialBtn}>Apple</button>
          </div>

          <p className={styles.footerText}>
            Already have an account? <Link href="/login">Login</Link>
          </p>
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
