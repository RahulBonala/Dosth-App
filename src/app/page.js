'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import BottomNav from '../components/layout/BottomNav';
import styles from './page.module.css';

// Animated counter hook
function useCounter(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return count;
}

const services = [
  { emoji: '📱', title: 'Electronics', desc: 'Phones, laptops & gadget repairs', color: '#3B82F6', bg: '#EFF6FF', href: '/repair' },
  { emoji: '🏠', title: 'Appliances', desc: 'AC, washing machine, TV repairs', color: '#10B981', bg: '#ECFDF5', href: '/repair' },
  { emoji: '🛵', title: 'Bike / Car', desc: 'Puncture, breakdown & service', color: '#F97316', bg: '#FFF7ED', href: '/repair' },
  { emoji: '🔧', title: 'Home Services', desc: 'Electrical, plumbing & cleaning', color: '#8B5CF6', bg: '#F5F3FF', href: '/repair' },
  { emoji: '⚙️', title: 'Tools', desc: 'Rent or repair power tools', color: '#F59E0B', bg: '#FFFBEB', href: '/repair' },
  { emoji: '✨', title: 'Donate', desc: 'Share surplus with those in need', color: '#EF4444', bg: '#FEF2F2', href: '/donate' },
];

const steps = [
  { num: '01', icon: '🔍', title: 'Choose a Service', desc: 'Pick from Electronics, Appliances, Home Services and more.' },
  { num: '02', icon: '🛵', title: 'Track in Real Time', desc: 'Watch your technician arrive and work with live status updates.' },
  { num: '03', icon: '✅', title: 'Pay When Done', desc: 'Pay securely via UPI, card or cash — only after satisfaction.' },
];

const testimonials = [
  { initials: 'AS', name: 'Arjun S.', city: 'Bengaluru', rating: 5, quote: 'Got my laptop screen fixed in 3 hours. The technician was super professional and the app kept me updated throughout!' },
  { initials: 'PM', name: 'Priya M.', city: 'Hyderabad', rating: 5, quote: 'Donated 30 meal packets through Dosth to Robin Hood Army. The whole process was so seamless. Truly your friend!' },
  { initials: 'KR', name: 'Karthik R.', city: 'Chennai', rating: 5, quote: 'AC repair booked at 10am, technician arrived by 11:30. Priced fairly and completed within 2 hours. 10/10!' },
];

export default function HomePage() {
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const repairs = useCounter(12400, 2000, statsVisible);
  const donations = useCounter(4200, 2200, statsVisible);
  const technicians = useCounter(850, 1800, statsVisible);
  const rating = useCounter(48, 1500, statsVisible);

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* === HERO === */}
        <section className={styles.hero}>
          <div className={styles.heroContainer}>
            <div className={styles.heroLeft}>
              <div className={styles.eyebrow}>
                <span className={styles.eyebrowDot}></span>
                Trusted by 50,000+ Urban Indians 🇮🇳
              </div>
              <h1 className={styles.heroTitle}>
                Your City&apos;s Most Trusted <span className={styles.heroAccent}>Repair &amp; Care</span> Network
              </h1>
              <p className={styles.heroSubtitle}>
                Dosth connects you with verified technicians, community donors, and real-time tracking — all in one app.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/repair" className={styles.ctaPrimary}>
                  Get Help Now →
                </Link>
                <a href="#how-it-works" className={styles.ctaGhost}>
                  See How It Works
                </a>
              </div>
              <div className={styles.trustBadges}>
                <span className={styles.trustBadge}>⚡ 10k+ Repairs</span>
                <span className={styles.trustDot}>·</span>
                <span className={styles.trustBadge}>★ 4.8 Rating</span>
                <span className={styles.trustDot}>·</span>
                <span className={styles.trustBadge}>🕐 30 min Response</span>
              </div>
            </div>
            <div className={styles.heroRight}>
              <div className={styles.heroCards}>
                <div className={`${styles.floatCard} ${styles.card1}`}>
                  <div className={styles.cardHeader}>
                    <span className={styles.cardDot}></span>
                    <span className={styles.cardStatus}>Repair in Progress</span>
                  </div>
                  <p className={styles.cardService}>Electronics — Screen Repair</p>
                  <div className={styles.cardProgress}>
                    <div className={styles.cardProgressBar}>
                      <div className={styles.cardProgressFill} style={{ width: '65%' }}></div>
                    </div>
                    <span className={styles.cardProgressLabel}>65%</span>
                  </div>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardTech}>🛵 Raju Kumar</span>
                    <span className={styles.cardRating}>4.8 ★</span>
                  </div>
                </div>
                <div className={`${styles.floatCard} ${styles.card2}`}>
                  <div className={styles.cardHeader}>
                    <span className={`${styles.cardDot} ${styles.cardDotGreen}`}></span>
                    <span className={styles.cardStatus}>Payment Received ✓</span>
                  </div>
                  <p className={styles.cardAmountLabel}>Amount Paid</p>
                  <p className={styles.cardAmount}>₹800</p>
                  <p className={styles.cardSubtext}>via Google Pay · Secured</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.heroBg}></div>
        </section>

        {/* === SERVICES OVERVIEW === */}
        <section className={styles.servicesSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Everything Your City Needs</h2>
              <p className={styles.sectionSub}>From repairs to donations — Dosth has you covered</p>
            </div>
            <div className={styles.servicesGrid}>
              {services.map((s, i) => (
                <Link href={s.href} key={i} className={styles.serviceTile} style={{ '--tile-color': s.color, '--tile-bg': s.bg }}>
                  <div className={styles.tileIcon} style={{ background: s.bg }}>
                    <span style={{ fontSize: '1.75rem' }}>{s.emoji}</span>
                  </div>
                  <h3 className={styles.tileTitle}>{s.title}</h3>
                  <p className={styles.tileDesc}>{s.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* === HOW IT WORKS === */}
        <section className={styles.howSection} id="how-it-works">
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Book in 3 Simple Steps</h2>
              <p className={styles.sectionSub}>Get expert help at your doorstep, hassle-free</p>
            </div>
            <div className={styles.stepsGrid}>
              {steps.map((step, i) => (
                <div key={i} className={styles.stepCard}>
                  <div className={styles.stepNum}>{step.num}</div>
                  <div className={styles.stepIcon}>{step.icon}</div>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                  {i < steps.length - 1 && <div className={styles.stepConnector}></div>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === LIVE STATS === */}
        <section className={styles.statsSection} ref={statsRef} id="stats">
          <div className={styles.statsContainer}>
            {[
              { value: repairs, suffix: '+', label: 'Repairs Completed' },
              { value: donations, suffix: '+', label: 'Donations Made' },
              { value: technicians, suffix: '+', label: 'Verified Technicians' },
              { value: (rating / 10).toFixed(1), suffix: '/5', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i} className={styles.statItem}>
                <div className={styles.statValue}>
                  {stat.value.toLocaleString()}{stat.suffix}
                </div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* === TESTIMONIALS === */}
        <section className={styles.testimonialsSection}>
          <div className={styles.sectionContainer}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>What Our Users Say</h2>
              <p className={styles.sectionSub}>Real stories from real Dost users across India</p>
            </div>
            <div className={styles.testimonialsGrid}>
              {testimonials.map((t, i) => (
                <div key={i} className={styles.testimonialCard}>
                  <div className={styles.testimonialStars}>
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className={styles.testimonialQuote}>&ldquo;{t.quote}&rdquo;</p>
                  <div className={styles.testimonialAuthor}>
                    <div className={styles.testimonialAvatar}>{t.initials}</div>
                    <div>
                      <p className={styles.testimonialName}>{t.name}</p>
                      <p className={styles.testimonialCity}>{t.city}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === CTA BANNER === */}
        <section className={styles.ctaBanner}>
          <div className={styles.ctaBannerInner}>
            <h2 className={styles.ctaBannerTitle}>Ready to experience Dosth?</h2>
            <p className={styles.ctaBannerSub}>Join 50,000+ happy users today. Your friend is waiting.</p>
            <div className={styles.ctaBannerButtons}>
              <Link href="/repair" className={styles.ctaBannerPrimary}>Start a Repair →</Link>
              <Link href="/donate" className={styles.ctaBannerSecondary}>Donate Surplus</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </>
  );
}
