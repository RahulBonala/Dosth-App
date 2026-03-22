'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import styles from './page.module.css';

const PROVIDERS = [
  { initials: 'TK', name: 'TechKart Service Center', rating: 4.7, dist: '2.3 km', time: '15 mins' },
  { initials: 'RQ', name: 'Rapid Repair Co.', rating: 4.5, dist: '3.1 km', time: '20 mins' },
  { initials: 'SE', name: 'SpeedFix Experts', rating: 4.3, dist: '4.8 km', time: '30 mins' },
];

function BookingContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const serviceName = searchParams.get('service') || 'Repair';

  const [manualShop, setManualShop] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(0);
  const [urgency, setUrgency] = useState('normal');
  const [formData, setFormData] = useState({
    fromAddress: '',
    description: '',
    date: new Date().toISOString().slice(0, 10),
    time: '10:00',
  });

  const [recommendedShop, setRecommendedShop] = useState('');

  useEffect(() => {
    const shops = {
      'Electrical': 'Sparky Fixers, Main Market',
      'Plumbing': "Joe's Plumbing, Downtown",
      'Carpentry': 'WoodWorks, Sector 4',
      'Appliances': 'TechCare Center, Mall Road',
      'Painting': 'ColorPro Services',
      'Cleaning': 'CleanHome Squad',
    };
    setRecommendedShop(shops[serviceName] || 'Nearest Service Center');
  }, [serviceName]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCurrentLocation = () => {
    setFormData(prev => ({ ...prev, fromAddress: 'Getting location...' }));
    setTimeout(() => {
      setFormData(prev => ({ ...prev, fromAddress: 'H.No 12-34, GPS Location, Hyderabad' }));
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/repair/status?service=${encodeURIComponent(serviceName)}&step=pickup_scheduled`);
  };

  const urgencySurcharge = urgency === 'urgent' ? 50 : urgency === 'emergency' ? 150 : 0;

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <Link href="/repair" className={styles.backBtn}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6" /></svg>
            Back
          </Link>
          <h1 className={styles.title}>Book {serviceName} Service</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Section A: Location */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNum}>A</span> Your Location
            </h2>
            <div className={styles.inputWrapper}>
              <span className={styles.inputIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
              </span>
              <input
                type="text"
                name="fromAddress"
                className={styles.input}
                value={formData.fromAddress}
                onChange={handleChange}
                placeholder="Enter your address"
                required
              />
              <button type="button" className={styles.locationBtn} onClick={handleCurrentLocation} title="Use Current Location">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></svg>
              </button>
            </div>
          </div>

          {/* Section B: Provider */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNum}>B</span> Service Provider
            </h2>
            <div className={styles.providerTabs}>
              <button type="button" className={`${styles.providerTab} ${!manualShop ? styles.providerTabActive : ''}`} onClick={() => setManualShop(false)}>Best Match</button>
              <button type="button" className={`${styles.providerTab} ${manualShop ? styles.providerTabActive : ''}`} onClick={() => setManualShop(true)}>Choose Manually</button>
            </div>

            {!manualShop ? (
              <div className={styles.providerCard}>
                <div className={styles.providerAvatar}>{PROVIDERS[0].initials}</div>
                <div className={styles.providerInfo}>
                  <p className={styles.providerName}>{PROVIDERS[0].name}</p>
                  <div className={styles.providerMeta}>
                    <span className={styles.providerRating}>★ {PROVIDERS[0].rating}</span>
                    <span className={styles.providerSep}>·</span>
                    <span>{PROVIDERS[0].dist}</span>
                    <span className={styles.providerSep}>·</span>
                    <span>~{PROVIDERS[0].time}</span>
                  </div>
                </div>
                <div className={styles.providerBadge}>Selected</div>
              </div>
            ) : (
              <div className={styles.providerList}>
                {PROVIDERS.map((p, idx) => (
                  <div
                    key={idx}
                    className={`${styles.providerCard} ${selectedProvider === idx ? styles.providerCardSelected : ''}`}
                    onClick={() => setSelectedProvider(idx)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.providerAvatar}>{p.initials}</div>
                    <div className={styles.providerInfo}>
                      <p className={styles.providerName}>{p.name}</p>
                      <div className={styles.providerMeta}>
                        <span className={styles.providerRating}>★ {p.rating}</span>
                        <span className={styles.providerSep}>·</span>
                        <span>{p.dist}</span>
                        <span className={styles.providerSep}>·</span>
                        <span>~{p.time}</span>
                      </div>
                    </div>
                    <div className={`${styles.providerRadio} ${selectedProvider === idx ? styles.providerRadioActive : ''}`}></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section C: Problem Details */}
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNum}>C</span> Problem Details
            </h2>

            <textarea
              name="description"
              className={styles.textarea}
              rows={4}
              placeholder="Describe the issue, e.g. 'Screen cracked after drop, touchscreen not responding...'"
              value={formData.description}
              onChange={handleChange}
              required
            />

            {/* Date/Time */}
            <div className={styles.dateTimeRow}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Date</label>
                <input type="date" name="date" className={styles.input} value={formData.date} onChange={handleChange} required />
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>Time</label>
                <input type="time" name="time" className={styles.input} value={formData.time} onChange={handleChange} required />
              </div>
            </div>

            {/* Image upload placeholder */}
            <div className={styles.uploadArea}>
              <span style={{ fontSize: '1.5rem' }}>📷</span>
              <p>Add Photos (optional)</p>
              <span className={styles.uploadSub}>Tap to upload or drag & drop</span>
            </div>

            {/* Urgency */}
            <div className={styles.urgencyGroup}>
              <label className={styles.label}>Urgency</label>
              <div className={styles.urgencyOptions}>
                {[
                  { value: 'normal', label: 'Normal', desc: 'Standard response time', surcharge: null },
                  { value: 'urgent', label: 'Urgent', desc: 'Within 2 hours', surcharge: '+₹50' },
                  { value: 'emergency', label: 'Emergency', desc: 'Within 30 minutes', surcharge: '+₹150' },
                ].map(opt => (
                  <label
                    key={opt.value}
                    className={`${styles.urgencyOption} ${urgency === opt.value ? styles.urgencyOptionActive : ''}`}
                  >
                    <input type="radio" name="urgency" value={opt.value} checked={urgency === opt.value} onChange={() => setUrgency(opt.value)} className={styles.urgencyRadio} />
                    <div>
                      <span className={styles.urgencyLabel}>{opt.label}</span>
                      <span className={styles.urgencyDesc}> — {opt.desc}</span>
                      {opt.surcharge && <span className={styles.urgencySurcharge}> {opt.surcharge}</span>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Estimate Banner */}
          <div className={styles.estimateBanner}>
            <span className={styles.estimateIcon}>💡</span>
            <div>
              <span className={styles.estimateText}>Estimated: ₹{400 + urgencySurcharge} – ₹{800 + urgencySurcharge}</span>
              <span className={styles.estimateSub}> · Final price confirmed after diagnosis</span>
            </div>
          </div>

          <button type="submit" className={styles.submitBtn}>
            Confirm Booking →
          </button>
        </form>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center' }}>Loading...</div>}>
        <BookingContent />
      </Suspense>
      <BottomNav />
    </>
  );
}
