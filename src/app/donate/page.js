'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BottomNav from '@/components/layout/BottomNav';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';
import Avatar from '@/components/ui/Avatar';
import Input from '@/components/ui/Input';
import ToastContainer from '../../components/ui/Toast';
import { useToast } from '../../hooks/useToast';
import styles from './page.module.css';

const CATEGORIES = [
  { id: 'food', label: 'Food', icon: '🍲' },
  { id: 'clothes', label: 'Clothes', icon: '👕' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'toys', label: 'Toys', icon: '🧸' },
  { id: 'other', label: 'Other', icon: '✨' },
];

const NGOS = [
  { id: 1, name: 'Robin Hood Army', focus: 'Food & Meals', icon: '🏹' },
  { id: 2, name: 'Goonj', focus: 'Clothes & Essentials', icon: '📦' },
  { id: 3, name: 'Akshaya Patra', focus: 'Children Education', icon: '🎓' },
  { id: 4, name: 'HelpAge India', focus: 'Elderly Support', icon: '👵' },
];

const RECENT_ACTIVITY = [
  { id: 1, user: 'Arjun S.', item: '30 Meal Boxes', time: '5m' },
  { id: 2, user: 'Priya K.', item: '5 Bags of Clothes', time: '12m' },
  { id: 3, user: 'Rahul B.', item: '10 Textbooks', time: '25m' },
];

export default function DonatePage() {
  const { toasts, showToast, dismissToast } = useToast();
  const [activeCategory, setActiveCategory] = useState('food');
  const [loading, setLoading] = useState(false);

  const handleDonate = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast({ type: 'success', message: 'Hero! Your donation request is sent. ✓' });
    }, 1500);
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero */}
          <section className={styles.hero}>
            <h1 className={styles.heroTitle}>Bridge the Gap</h1>
            <p className={styles.heroSubtitle}>
              Your surplus can be someone else&apos;s survival. Connect with verified NGOs and share the joy of giving.
            </p>

            {/* Chips */}
            <div className={styles.chips}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`${styles.chip} ${activeCategory === cat.id ? styles.chipActive : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </section>

          <div className={styles.grid}>
            {/* Form */}
            <section className={styles.donateCard}>
              <h2 className={styles.cardTitle}>Donation Details</h2>
              <form onSubmit={handleDonate} className={styles.form}>
                <Input 
                  label={`What ${activeCategory} are you donating?`}
                  placeholder="e.g. 20 packets of rice, 5 woollen sweaters"
                  required
                />
                <div className={styles.formRow}>
                  <Input label="Approx Quantity" placeholder="kg/units" required />
                  <Input label="Pickup Time" type="time" required />
                </div>
                <Input label="Pickup Location" placeholder="Home or Office address" required />
                
                <Button variant="primary" size="large" fullWidth loading={loading}>
                  Find Donation Partner
                </Button>
              </form>
            </section>

            {/* NGOs */}
            <section>
              <h2 className={styles.cardTitle}>Our NGO Partners</h2>
              <div className={styles.ngoList}>
                {NGOS.map(ngo => (
                  <div key={ngo.id} className={styles.ngoCard}>
                    <div className={styles.ngoLogo}>{ngo.icon}</div>
                    <div className={styles.ngoInfo}>
                      <p className={styles.ngoName}>{ngo.name}</p>
                      <p className={styles.ngoFocus}>{ngo.focus}</p>
                    </div>
                    <Badge variant="verified">Verified</Badge>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className={styles.statsContainer}>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>12k+</span>
                  <span className={styles.statLabel}>Meals Shared</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statValue}>500+</span>
                  <span className={styles.statLabel}>Monthly Donors</span>
                </div>
              </div>
            </section>
          </div>

          {/* Activity Feed */}
          <section className={styles.activitySection}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Recent Acts of Kindness</h2>
              <Badge variant="primary">Live Feed</Badge>
            </div>
            <div className={styles.activityFeed}>
              {RECENT_ACTIVITY.map(act => (
                <div key={act.id} className={styles.activityCard} style={{ animationDelay: `${act.id * 0.15}s` }}>
                  <Avatar name={act.user} size="sm" color="amber" />
                  <div className={styles.activityInfo}>
                    <span className={styles.activityBold}>{act.user}</span> donated <span className={styles.activityBold}>{act.item}</span>
                    <br />
                    <span style={{ fontSize: '0.7rem', opacity: 0.7 }}>{act.time} ago</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
