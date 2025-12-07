"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import RatingModal from '../../../components/RatingModal';
import styles from './page.module.css';

const STEPS = {
    RIDER_COMING: 'rider_coming',
    DIAGNOSING: 'diagnosing',
    APPROVAL: 'approval',
    REPAIRING: 'repairing',
    COMPLETED: 'completed',
    DELIVERY: 'delivery'
};

function StatusContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceName = searchParams.get('service') || 'Repair';
    const currentStepParam = searchParams.get('step') || STEPS.RIDER_COMING;

    const [currentStep, setCurrentStep] = useState(currentStepParam);
    const [timer, setTimer] = useState(0);
    const [showRating, setShowRating] = useState(false);

    useEffect(() => {
        setCurrentStep(currentStepParam);
    }, [currentStepParam]);

    useEffect(() => {
        if (currentStep === STEPS.REPAIRING) {
            const interval = setInterval(() => {
                setTimer((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
            return () => clearInterval(interval);
        }
    }, [currentStep]);

    const handleStepChange = (step) => {
        setCurrentStep(step);
        router.push(`/repair/status?service=${encodeURIComponent(serviceName)}&step=${step}`);
    };

    const handlePayment = (amount, nextStep) => {
        router.push(`/repair/payment?amount=${amount}&redirect=/repair/status?service=${encodeURIComponent(serviceName)}%26step=${nextStep}`);
    };

    const handleDeliveryPay = () => {
        setShowRating(true);
    };

    const handleRatingSubmit = () => {
        setShowRating(false);
        router.push('/repair?thankyou=true');
    };

    const getStatusState = (stepId) => {
        const stepOrder = [STEPS.RIDER_COMING, STEPS.DIAGNOSING, STEPS.APPROVAL, STEPS.REPAIRING, STEPS.COMPLETED, STEPS.DELIVERY];
        const currentIndex = stepOrder.indexOf(currentStep);
        const stepIndex = stepOrder.indexOf(stepId);

        if (stepIndex < currentIndex) return 'completed';
        if (stepIndex === currentIndex) return 'active';
        return 'pending';
    };

    return (
        <main className={styles.main}>
            {/* Timeline Container */}
            <div className={styles.timelineContainer}>

                {/* 1. Pickup Scheduled */}
                <div className={styles.timelineItem}>
                    <div className={styles.iconCompleted}>✓</div>
                    <div className={styles.content}>
                        <h3>Pickup Scheduled</h3>
                        <span className={styles.statusLabel}>Completed</span>
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 2. Item Picked Up */}
                <div className={styles.timelineItem}>
                    <div className={getStatusState(STEPS.DIAGNOSING) === 'completed' || getStatusState(STEPS.DIAGNOSING) === 'active' ? styles.iconCompleted : styles.iconPending}>
                        {getStatusState(STEPS.DIAGNOSING) === 'completed' ? '✓' : '2'}
                    </div>
                    <div className={styles.content}>
                        <h3>Item Picked Up</h3>
                        {currentStep === STEPS.RIDER_COMING ? (
                            <div className={styles.actionBox}>
                                <p>Rider is on the way.</p>
                                <button className={styles.actionBtn} onClick={() => handleStepChange(STEPS.DIAGNOSING)}>Confirm Pickup</button>
                            </div>
                        ) : (
                            <span className={styles.statusLabel}>Completed</span>
                        )}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 3. Cost Estimate */}
                <div className={styles.timelineItem}>
                    <div className={`${styles.icon} ${currentStep === STEPS.APPROVAL ? styles.iconActive : (getStatusState(STEPS.APPROVAL) === 'completed' ? styles.iconCompleted : styles.iconPending)}`}>
                        {getStatusState(STEPS.APPROVAL) === 'completed' ? '✓' : '🛠️'}
                    </div>
                    <div className={styles.content}>
                        <h3>Cost Estimate</h3>
                        {currentStep === STEPS.APPROVAL && (
                            <div className={styles.estimateCard}>
                                <div className={styles.estimateHeader}>
                                    <span>Estimated Cost</span>
                                    <span className={styles.eta}>2-3 days</span>
                                </div>
                                <div className={styles.amount}>₹850</div>
                                <p>Screen replacement + protective glass</p>
                                <div className={styles.cardActions}>
                                    <button className={styles.approveBtn} onClick={() => handlePayment(850, STEPS.REPAIRING)}>Approve</button>
                                    <button className={styles.declineBtn} onClick={() => alert('Declined')}>Decline</button>
                                </div>
                            </div>
                        )}
                        {currentStep === STEPS.DIAGNOSING && (
                            <div className={styles.actionBox}>
                                <p> diagnosing...</p>
                                <button className={styles.actionBtn} onClick={() => handleStepChange(STEPS.APPROVAL)}>Simulate Diagnosis</button>
                            </div>
                        )}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 4. Repair in Progress */}
                <div className={styles.timelineItem}>
                    <div className={`${styles.icon} ${currentStep === STEPS.REPAIRING ? styles.iconActive : (getStatusState(STEPS.REPAIRING) === 'completed' ? styles.iconCompleted : styles.iconPending)}`}>
                        {getStatusState(STEPS.REPAIRING) === 'completed' ? '✓' : '⚙️'}
                    </div>
                    <div className={styles.content}>
                        <h3>Repair in Progress</h3>
                        {currentStep === STEPS.REPAIRING && (
                            <div className={styles.progressBar}>
                                <div className={styles.progressFill} style={{ width: `${timer}%` }}></div>
                                {timer === 100 && <button className={styles.actionBtn} onClick={() => handleStepChange(STEPS.COMPLETED)}>Finish Repair</button>}
                            </div>
                        )}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 5. Ready for Delivery */}
                <div className={styles.timelineItem}>
                    <div className={`${styles.icon} ${currentStep === STEPS.COMPLETED || currentStep === STEPS.DELIVERY ? styles.iconActive : styles.iconPending}`}>
                        🚚
                    </div>
                    <div className={styles.content}>
                        <h3>Ready for Delivery</h3>
                        {currentStep === STEPS.COMPLETED && (
                            <div className={styles.actionBox}>
                                <button className={styles.actionBtn} onClick={() => handleStepChange(STEPS.DELIVERY)}>Out for Delivery</button>
                            </div>
                        )}
                        {currentStep === STEPS.DELIVERY && (
                            <div className={styles.actionBox}>
                                <p>Rider is arriving soon.</p>
                                <button className={styles.approveBtn} onClick={handleDeliveryPay}>Complete Delivery</button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {showRating && (
                <RatingModal
                    onClose={() => setShowRating(false)}
                    onSubmit={handleRatingSubmit}
                />
            )}
        </main>
    );
}

export default function StatusPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div className={styles.main}>Loading...</div>}>
                <StatusContent />
            </Suspense>
        </>
    );
}
