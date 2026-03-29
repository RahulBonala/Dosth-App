'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';
import ServiceCard from '@/components/ServiceCard';
import ToastContainer from '@/components/ui/Toast';
import { useToast } from '@/hooks/useToast';
import styles from './page.module.css';

const services = [
  {
    id: 1,
    title: 'Electronics',
    category: 'Electronics',
    desc: 'Phone, laptop, and gadget repairs.',
  },
  {
    id: 2,
    title: 'Appliances',
    category: 'Appliances',
    desc: 'AC, washing machine, and TV repairs.',
  },
  {
    id: 3,
    title: 'Bike / Car',
    category: 'Vehicle',
    desc: 'Puncture, breakdown, and general service.',
  },
  { id: 4, title: 'Home Services', category: 'Home', desc: 'Electrical, plumbing, and cleaning.' },
  { id: 5, title: 'Tools', category: 'Tools', desc: 'Rent or repair power tools and equipment.' },
  { id: 6, title: 'Other', category: 'Other', desc: 'Any other repair or service request.' },
];

const CATEGORIES = ['All', 'Electronics', 'Appliances', 'Vehicle', 'Home', 'Tools', 'Other'];

export default function RepairContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showThankYou = searchParams.get('thankyou');
  const { toasts, showToast, dismissToast } = useToast();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    if (showThankYou) {
      showToast({ type: 'success', message: 'Thanks! Your feedback has been recorded. ✓' });
      router.replace('/repair');
    }
  }, [showThankYou, router, showToast]);

  const filtered = services.filter((s) => {
    const matchesSearch =
      search === '' ||
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.desc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || s.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleBooking = (serviceName) => {
    router.push(`/repair/book?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <>
      <main className={styles.main}>
        {/* Page Header */}
        <section className={styles.pageHeader}>
          <div className={styles.container}>
            <div className={styles.headerText}>
              <h1 className={styles.title}>Repair Hub</h1>
              <p className={styles.subtitle}>Trusted professionals at your doorstep.</p>
            </div>
          </div>
        </section>

        {/* Search + Filter */}
        <section className={styles.searchSection}>
          <div className={styles.container}>
            {/* Search Bar */}
            <div className={styles.searchWrapper}>
              <div className={styles.searchIcon}>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </div>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search repairs, e.g. screen crack, AC gas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search repair services"
              />
              {search && (
                <button
                  className={styles.searchClear}
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category Filter Chips */}
            <div className={styles.chips}>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.chip} ${activeCategory === cat ? styles.chipActive : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className={styles.gridSection}>
          <div className={styles.container}>
            <div className={styles.gridHeader}>
              <span className={styles.gridLabel}>
                {activeCategory === 'All' ? 'All Services' : activeCategory} ({filtered.length})
              </span>
            </div>
            {filtered.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>No services found</h3>
                <p>Try searching for something else or clear the filters.</p>
                <button
                  className={styles.clearBtn}
                  onClick={() => {
                    setSearch('');
                    setActiveCategory('All');
                  }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((service) => (
                  <ServiceCard
                    key={service.id}
                    title={service.title}
                    description={service.desc}
                    onClick={() => handleBooking(service.title)}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </>
  );
}
