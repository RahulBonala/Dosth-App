'use client';
import { useState } from 'react';
import Button from '../components/ui/Button';
import styles from './RatingModal.module.css';

export default function RatingModal({ onClose, onSubmit }) {
  const [serviceRating, setServiceRating] = useState(0);
  const [deliveryRating, setDeliveryRating] = useState(0);
  const [hoverService, setHoverService] = useState(0);
  const [hoverDelivery, setHoverDelivery] = useState(0);

  const handleSubmit = () => {
    if (serviceRating > 0 && deliveryRating > 0) {
      onSubmit({ serviceRating, deliveryRating });
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </button>
        
        <div className={styles.header}>
          <div className={styles.iconCircle}>⭐</div>
          <h2 className={styles.title}>Rate Your Experience</h2>
          <p className={styles.subtitle}>Your feedback helps us make Dosth better for everyone.</p>
        </div>

        <div className={styles.ratingSection}>
          <h3 className={styles.sectionTitle}>Service Quality</h3>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${(hoverService || serviceRating) >= star ? styles.starActive : ''}`}
                onClick={() => setServiceRating(star)}
                onMouseEnter={() => setHoverService(star)}
                onMouseLeave={() => setHoverService(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={styles.ratingSection}>
          <h3 className={styles.sectionTitle}>Delivery & Punctuality</h3>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`${styles.star} ${(hoverDelivery || deliveryRating) >= star ? styles.starActive : ''}`}
                onClick={() => setDeliveryRating(star)}
                onMouseEnter={() => setHoverDelivery(star)}
                onMouseLeave={() => setHoverDelivery(0)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <Button 
            variant="primary" 
            size="large" 
            fullWidth 
            onClick={handleSubmit}
            disabled={serviceRating === 0 || deliveryRating === 0}
          >
            Submit Review
          </Button>
          <Button 
            variant="ghost" 
            size="medium" 
            fullWidth 
            onClick={onClose}
            style={{marginTop: '8px'}}
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
}
