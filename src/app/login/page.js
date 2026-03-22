'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import ToastContainer from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import styles from './page.module.css';

export default function LoginPage() {
  const router = useRouter();
  const { toasts, showToast, dismissToast } = useToast();
  
  const [authType, setAuthType] = useState('phone'); // 'phone' | 'email'
  const [step, setStep] = useState('input'); // 'input' | 'otp'
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (authType === 'phone' && step === 'input') {
      // Simulate OTP sending
      setTimeout(() => {
        setStep('otp');
        setLoading(false);
        showToast({ type: 'success', message: 'OTP sent to +91 ' + formData.phone });
      }, 1000);
      return;
    }

    // Simulate final login
    setTimeout(() => {
      setLoading(false);
      showToast({ type: 'success', message: 'Welcome back, Friend! ✓' });
      router.push('/repair');
    }, 1200);
  };

  return (
    <main className={styles.main}>
      {/* Brand Header */}
      <div className={styles.headerSection}>
        <div className={styles.logoWrapper}>
          <Image src="/logo.png" alt="Dosth" width={120} height={40} priority />
        </div>
        <h1 className={styles.title}>Welcome to Dosth</h1>
        <p className={styles.subtitle}>Your Friend, Your Guide.</p>
      </div>

      <div className={styles.container}>
        <div className={styles.card}>
          {/* Auth Switcher */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tab} ${authType === 'phone' ? styles.tabActive : ''}`}
              onClick={() => { setAuthType('phone'); setStep('input'); }}
            >
              Phone (OTP)
            </button>
            <button 
              className={`${styles.tab} ${authType === 'email' ? styles.tabActive : ''}`}
              onClick={() => { setAuthType('email'); setStep('input'); }}
            >
              Email Login
            </button>
          </div>

          <form onSubmit={handleAuthSubmit} className={styles.form}>
            {authType === 'phone' ? (
              <>
                {step === 'input' ? (
                  <Input 
                    name="phone"
                    label="Mobile Number"
                    placeholder="Enter 10-digit number"
                    icon={<span style={{fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-text-muted)'}}>+91</span>}
                    value={formData.phone}
                    onChange={handleInputChange}
                    pattern="[0-9]{10}"
                    required
                  />
                ) : (
                  <div className={styles.otpWrapper}>
                    <Input 
                      name="otp"
                      label="One-Time Password"
                      placeholder="Enter 6-digit OTP"
                      icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                      value={formData.otp}
                      onChange={handleInputChange}
                      required
                    />
                    <div className={styles.resendRow}>
                      <span>Didn't receive it?</span>
                      <button type="button" className={styles.resendBtn} onClick={() => showToast({type: 'info', message: 'OTP resent!'})}>Resend OTP</button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <Input 
                  name="email"
                  type="email"
                  label="Email Address"
                  placeholder="name@example.com"
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <Input 
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <button type="button" className={styles.forgotBtn} onClick={() => showToast({type: 'info', message: 'Reset link sent to your email.'})}>
                  Forgot Password?
                </button>
              </>
            )}

            <Button 
              type="submit" 
              variant="primary" 
              className={styles.loginBtn}
              loading={loading}
              fullWidth
            >
              {authType === 'phone' ? (step === 'input' ? 'Get OTP →' : 'Verify & Continue') : 'Login'}
            </Button>
          </form>

          <div className={styles.divider}>
            <span>Or continue with</span>
          </div>

          <div className={styles.socialGrid}>
            <button className={styles.socialBtn} onClick={() => showToast({type: 'info', message: 'Google login simulation'})}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335"/></svg>
              Google
            </button>
            <button className={styles.socialBtn} onClick={() => showToast({type: 'info', message: 'Apple login simulation'})}>
              <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05 1.78-3.1 1.76-1.06-.02-1.4-.64-2.63-.64-1.21 0-1.6.62-2.6.64-1.04.02-2.03-.73-3.08-1.74-2.14-2.06-3.76-5.83-3.76-8.91 0-4.88 3.07-7.46 6-7.46 1.07 0 2.01.4 2.65.4.63 0 1.72-.46 2.94-.46 1.28 0 2.8.53 3.82 1.95-2.58 1.54-2.16 5.17.47 6.44-1.07 2.4-2.73 6.04-3.71 7.02zM12.03 5c-.02-2.31 1.9-4.22 4.15-4.5.15 2.54-2.05 4.67-4.15 4.5z"/></svg>
              Apple
            </button>
          </div>

          <p className={styles.footerText}>
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}
