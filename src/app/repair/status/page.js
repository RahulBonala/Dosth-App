"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import RatingModal from '../../../components/RatingModal';
import MapPlaceholder from '../../../components/MapPlaceholder';
import styles from './page.module.css';

const STEPS = {
    PICKUP_SCHEDULED: 'pickup_scheduled',
    RIDER_TO_CENTER: 'rider_to_center',
    DIAGNOSIS: 'diagnosis',
    ESTIMATION_APPROVAL: 'estimation_approval',
    REPAIR_IN_PROGRESS: 'repair_in_progress',
    READY_FOR_DELIVERY: 'ready_for_delivery',
    DELIVERY_TO_USER: 'delivery_to_user',
    COMPLETED: 'completed'
};

const DriverInfo = ({ name, phone }) => (
    <div className={styles.driverCard}>
        <div className={styles.driverDetails}>
            <div className={styles.driverAvatar}>🛵</div>
            <div>
                <p className={styles.driverName}>{name}</p>
                <p className={styles.driverPhone}>{phone}</p>
            </div>
        </div>
        <a href={`tel:${phone}`} className={styles.callBtn} title="Call Driver">
            📞
        </a>
    </div>
);

const TrafficMap = ({ status, text, minimized, onToggle }) => (
    <div className={`${styles.mapWrapper} ${minimized ? styles.minimized : ''}`}>
        <div className={styles.mapHeader}>
            <span>Live Tracking</span>
            <button onClick={onToggle} className={styles.toggleBtn}>
                {minimized ? 'Maximize' : 'Minimize'}
            </button>
        </div>
        {!minimized && (
            <div className={styles.mapContent}>
                <MapPlaceholder status={status} text={text} />
            </div>
        )}
    </div>
);

function StatusContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceName = searchParams.get('service') || 'Repair';
    const currentStepParam = searchParams.get('step') || STEPS.PICKUP_SCHEDULED;
    const paymentStatus = searchParams.get('payment');

    const [currentStep, setCurrentStep] = useState(currentStepParam);
    const [timer, setTimer] = useState(0);
    const [deliveryTimer, setDeliveryTimer] = useState(60);
    const [showRating, setShowRating] = useState(false);
    const [mapMinimized, setMapMinimized] = useState(false);

    // Financial State (Simulated)
    const totalRepairCost = 1000;
    const advancePercentage = 0.8;
    const advanceAmount = totalRepairCost * advancePercentage; // 800
    const remainingRepairCost = totalRepairCost - advanceAmount; // 200
    const deliveryDistanceKm = 5;
    const deliveryRatePerKm = 20;
    const deliveryFee = deliveryDistanceKm * deliveryRatePerKm; // 100
    const finalBalance = remainingRepairCost + deliveryFee; // 300

    // Sync URL state
    useEffect(() => {
        if (paymentStatus === 'success') {
            if (currentStepParam === STEPS.REPAIR_IN_PROGRESS) {
                // Return from Advance Payment
                setCurrentStep(STEPS.REPAIR_IN_PROGRESS);
            } else if (currentStepParam === STEPS.COMPLETED) {
                // Return from Final Payment
                setCurrentStep(STEPS.COMPLETED);
                setTimeout(() => setShowRating(true), 500);
            }
        } else {
            setCurrentStep(currentStepParam);
        }
    }, [currentStepParam, paymentStatus]);

    // Timer Logic
    useEffect(() => {
        let interval;
        if (currentStep === STEPS.DIAGNOSIS) {
            interval = setInterval(() => {
                setTimer(prev => Math.min(prev + 1, 100));
            }, 50);
        } else if (currentStep === STEPS.REPAIR_IN_PROGRESS) {
            interval = setInterval(() => {
                setTimer(prev => Math.min(prev + 0.5, 100));
            }, 50);
        } else if (currentStep === STEPS.READY_FOR_DELIVERY) {
            setDeliveryTimer(60);
            interval = setInterval(() => {
                setDeliveryTimer(prev => Math.max(prev - 1, 0));
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [currentStep]);

    // Handle Step Transitions based on Timer
    useEffect(() => {
        if (currentStep === STEPS.DIAGNOSIS && timer >= 100) {
            handleStepChange(STEPS.ESTIMATION_APPROVAL);
        } else if (currentStep === STEPS.REPAIR_IN_PROGRESS && timer >= 100) {
            handleStepChange(STEPS.READY_FOR_DELIVERY);
        } else if (currentStep === STEPS.READY_FOR_DELIVERY && deliveryTimer <= 0) {
            handleStepChange(STEPS.DELIVERY_TO_USER);
        }
    }, [timer, deliveryTimer, currentStep]);

    const handleStepChange = (step) => {
        setTimer(0);
        setCurrentStep(step);
        router.push(`/repair/status?service=${encodeURIComponent(serviceName)}&step=${step}`);
    };

    const handlePayment = (amount, nextStep) => {
        const targetUrl = `/repair/status?service=${encodeURIComponent(serviceName)}&step=${nextStep}&payment=success`;
        router.push(`/repair/payment?amount=${amount}&redirect=${encodeURIComponent(targetUrl)}`);
    };

    const handleFinalPayment = () => {
        handlePayment(finalBalance, STEPS.COMPLETED);
    };

    const handleRatingSubmit = () => {
        setShowRating(false);
        router.push('/repair?thankyou=true');
    };

    const isCompleted = (stepIndex) => {
        const stepOrder = Object.values(STEPS);
        const currentIndex = stepOrder.indexOf(currentStep);
        return stepIndex < currentIndex;
    };

    const isActive = (stepKey) => currentStep === stepKey;

    return (
        <main className={styles.main}>
            <div className={styles.timelineContainer}>

                {/* 1. Pickup Scheduled */}
                <div className={styles.timelineItem}>
                    <div className={isCompleted(0) ? styles.iconCompleted : styles.iconActive}>
                        {isCompleted(0) ? '✓' : '1'}
                    </div>
                    <div className={styles.content}>
                        <h3>Pickup Scheduled</h3>
                        {(isActive(STEPS.PICKUP_SCHEDULED) || isActive(STEPS.RIDER_TO_CENTER)) && (
                            <>
                                <p className={styles.statusDescription}>Rider is on the way to your location.</p>
                                <DriverInfo name="Raju Kumar" phone="+91 98765 43210" />
                                <TrafficMap
                                    status="rider_coming"
                                    text="Rider is 5 mins away"
                                    minimized={mapMinimized}
                                    onToggle={() => setMapMinimized(!mapMinimized)}
                                />
                                {isActive(STEPS.PICKUP_SCHEDULED) && (
                                    <button className={styles.actionBtn} onClick={() => handleStepChange(STEPS.RIDER_TO_CENTER)}>
                                        Start Trip (Demo: Picked Up)
                                    </button>
                                )}
                            </>
                        )}
                        {isCompleted(0) && <span className={styles.statusLabel}>Completed</span>}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 2. Item Picked Up */}
                <div className={styles.timelineItem}>
                    <div className={isCompleted(1) ? styles.iconCompleted : (isActive(STEPS.RIDER_TO_CENTER) ? styles.iconActive : styles.iconPending)}>
                        {isCompleted(1) ? '✓' : '2'}
                    </div>
                    <div className={styles.content}>
                        <h3>Item Picked Up</h3>
                        {isActive(STEPS.RIDER_TO_CENTER) && (
                            <>
                                <p className={styles.statusDescription}>Rider heading to Service Center.</p>
                                <button className={styles.actionBtn} onClick={() => handleStepChange(STEPS.DIAGNOSIS)}>
                                    Arrived at Center (Demo)
                                </button>
                            </>
                        )}
                        {isCompleted(1) && <span className={styles.statusLabel}>Completed</span>}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 3. Diagnosis & Estimation (Split Payment) */}
                <div className={styles.timelineItem}>
                    <div className={isCompleted(3) ? styles.iconCompleted : (isActive(STEPS.DIAGNOSIS) || isActive(STEPS.ESTIMATION_APPROVAL) ? styles.iconActive : styles.iconPending)}>
                        {isCompleted(3) ? '✓' : '🛠️'}
                    </div>
                    <div className={styles.content}>
                        <h3>Diagnosis & Cost</h3>
                        {isActive(STEPS.DIAGNOSIS) && (
                            <div className={styles.actionBox}>
                                <p>Diagnosing issue... (~5-10 mins)</p>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${timer}%` }}></div>
                                </div>
                            </div>
                        )}
                        {isActive(STEPS.ESTIMATION_APPROVAL) && (
                            <div className={styles.estimateCard}>
                                <div className={styles.estimateHeader}>
                                    <span>Review Estimate</span>
                                </div>
                                <div className={styles.amount}>₹{totalRepairCost}</div>
                                <p>Total Estimated Cost</p>
                                <div className={styles.splitPayInfo}>
                                    <p>Pay <strong>80%</strong> advance now: <strong>₹{advanceAmount}</strong></p>
                                    <small>Remaining ₹{remainingRepairCost} + delivery fee payable at delivery.</small>
                                </div>
                                <div className={styles.cardActions}>
                                    <button className={styles.approveBtn} onClick={() => handlePayment(advanceAmount, STEPS.REPAIR_IN_PROGRESS)}>
                                        Pay ₹{advanceAmount} & Start
                                    </button>
                                    <button className={styles.declineBtn} onClick={() => alert('Declined')}>Decline</button>
                                </div>
                            </div>
                        )}
                        {isCompleted(3) && <span className={styles.statusLabel}>Completed</span>}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 4. Repair in Progress */}
                <div className={styles.timelineItem}>
                    <div className={isCompleted(4) ? styles.iconCompleted : (isActive(STEPS.REPAIR_IN_PROGRESS) ? styles.iconActive : styles.iconPending)}>
                        {isCompleted(4) ? '✓' : '⚙️'}
                    </div>
                    <div className={styles.content}>
                        <h3>Repair in Progress</h3>
                        {isActive(STEPS.REPAIR_IN_PROGRESS) && (
                            <div className={styles.actionBox}>
                                <p>Technician is working on your device.</p>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} style={{ width: `${timer}%` }}></div>
                                </div>
                                <small>Est. time: 2 hours</small>
                            </div>
                        )}
                        {isCompleted(4) && <span className={styles.statusLabel}>Completed</span>}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 5. Ready for Delivery */}
                <div className={styles.timelineItem}>
                    <div className={isCompleted(5) ? styles.iconCompleted : (isActive(STEPS.READY_FOR_DELIVERY) ? styles.iconActive : styles.iconPending)}>
                        {isCompleted(5) ? '✓' : '📦'}
                    </div>
                    <div className={styles.content}>
                        <h3>Ready for Delivery</h3>
                        {isActive(STEPS.READY_FOR_DELIVERY) && (
                            <div className={styles.deliveryChoice}>
                                <p>Your item is ready!</p>
                                <div className={styles.timerWarning}>Auto-selecting delivery in {deliveryTimer}s</div>
                                <div className={styles.cardActions}>
                                    <button className={styles.approveBtn} onClick={() => handleStepChange(STEPS.DELIVERY_TO_USER)}>
                                        Deliver to Me
                                    </button>
                                    <button className={styles.declineBtn} onClick={() => alert('Self Pickup Selected')}>
                                        I'll Pickup Myself
                                    </button>
                                </div>
                            </div>
                        )}
                        {isCompleted(5) && <span className={styles.statusLabel}>Completed</span>}
                    </div>
                    <div className={styles.line}></div>
                </div>

                {/* 6. Out for Delivery & Final Payment */}
                <div className={styles.timelineItem}>
                    <div className={isCompleted(6) ? styles.iconCompleted : (isActive(STEPS.DELIVERY_TO_USER) ? styles.iconActive : styles.iconPending)}>
                        {isCompleted(6) ? '✓' : '🚚'}
                    </div>
                    <div className={styles.content}>
                        <h3>Out for Delivery</h3>
                        {isActive(STEPS.DELIVERY_TO_USER) && (
                            <>
                                <p className={styles.statusDescription}>Rider is on the way to you.</p>
                                <DriverInfo name="Raju Kumar" phone="+91 98765 43210" />
                                <TrafficMap
                                    status="delivery"
                                    text="Arriving in 10 mins"
                                    minimized={mapMinimized}
                                    onToggle={() => setMapMinimized(!mapMinimized)}
                                />

                                <div className={styles.finalBill}>
                                    <h4>Final Bill Summary</h4>
                                    <div className={styles.billRow}><span>Total Repair</span><span>₹{totalRepairCost}</span></div>
                                    <div className={styles.billRow}><span>Advance Paid</span><span className={styles.minusText}>-₹{advanceAmount}</span></div>
                                    <div className={styles.billRow}><span>Delivery ({deliveryDistanceKm}km)</span><span>+₹{deliveryFee}</span></div>
                                    <div className={styles.divider}></div>
                                    <div className={styles.billTotal}><span>To Pay</span><span>₹{finalBalance}</span></div>
                                </div>

                                <button className={styles.approveBtn} onClick={handleFinalPayment} style={{ marginTop: '1rem', width: '100%' }}>
                                    Pay ₹{finalBalance} & Collect Item
                                </button>
                            </>
                        )}
                        {isCompleted(6) && <span className={styles.statusLabel}>Completed</span>}
                    </div>
                </div>

            </div>

            {showRating && (
                <RatingModal
                    onClose={handleRatingSubmit}
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
