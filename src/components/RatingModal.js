"use client";
import styles from './RatingModal.module.css';
import { useState } from 'react';

export default function RatingModal({ onClose, onSubmit }) {
    const [serviceRating, setServiceRating] = useState(0);
    const [deliveryRating, setDeliveryRating] = useState(0);

    const handleSubmit = () => {
        if (serviceRating > 0 && deliveryRating > 0) {
            onSubmit({ serviceRating, deliveryRating });
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>×</button>
                <h2>Rate Your Experience</h2>

                <div className={styles.section}>
                    <h3>Service Quality</h3>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= serviceRating ? styles.activeStar : styles.star}
                                onClick={() => setServiceRating(star)}
                            >★</span>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Delivery Time</h3>
                    <div className={styles.stars}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={star <= deliveryRating ? styles.activeStar : styles.star}
                                onClick={() => setDeliveryRating(star)}
                            >★</span>
                        ))}
                    </div>
                </div>

                <button
                    className={styles.submitBtn}
                    onClick={handleSubmit}
                    disabled={serviceRating === 0 || deliveryRating === 0}
                >
                    Submit Reviews
                </button>
            </div>
        </div>
    );
}
