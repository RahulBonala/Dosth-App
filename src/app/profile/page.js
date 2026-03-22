'use client';
import { useState } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import BottomNav from '../../components/layout/BottomNav';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import ToastContainer from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import styles from './page.module.css';

const stats = [
  { label: 'Repairs', value: '12', icon: '🛠️' },
  { label: 'Donations', value: '5', icon: '❤️' },
  { label: 'Tokens', value: '450', icon: '🪙' },
];

const menuItems = [
  { label: 'Payment Methods', sub: 'Saved cards & UPI IDs', icon: '💳' },
  { label: 'Addresses', sub: 'Manage your saved locations', icon: '📍' },
  { label: 'Dosth Plus', sub: 'Premium support & priority status', icon: '⭐', badge: 'New' },
  { label: 'Help & Support', sub: 'FAQs & chat with us', icon: '🎧' },
  { label: 'Privacy & Security', sub: 'Account settings & data', icon: '🛡️' },
];

export default function ProfilePage() {
  const { toasts, showToast, dismissToast } = useToast();

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Hero Profile Info */}
          <section className={styles.profileHero}>
            <div className={styles.heroContent}>
              <Avatar name="Rahul Kumar" size="xl" color="indigo" />
              <div className={styles.userInfo}>
                <h1 className={styles.userName}>Rahul Kumar</h1>
                <p className={styles.userPhone}>+91 98765 43210 · Member since Jul 2024</p>
                <div className={styles.userBadges}>
                  <Badge variant="accent">Gold Member</Badge>
                  <Badge variant="success">Verified</Badge>
                </div>
              </div>
              <Button variant="secondary" size="small" className={styles.editBtn}>Edit Profile</Button>
            </div>

            {/* Stats */}
            <div className={styles.statsBar}>
              {stats.map(s => (
                <div key={s.label} className={styles.statItem}>
                  <span className={styles.statIcon}>{s.icon}</span>
                  <div className={styles.statInfo}>
                    <span className={styles.statValue}>{s.value}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Menu Sections */}
          <div className={styles.menuList}>
            <h2 className={styles.sectionTitle}>Account Settings</h2>
            {menuItems.map(item => (
              <button key={item.label} className={styles.menuItem} onClick={() => showToast({type: 'info', message: `${item.label} coming soon!`})}>
                <div className={styles.menuIcon}>{item.icon}</div>
                <div className={styles.menuText}>
                  <h4>{item.label} {item.badge && <Badge variant="popular" size="sm" style={{marginLeft: '4px'}}>{item.badge}</Badge>}</h4>
                  <p>{item.sub}</p>
                </div>
                <svg className={styles.menuArrow} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
              </button>
            ))}
          </div>

          <button className={styles.logoutBtn}>Log Out</button>
        </div>
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
