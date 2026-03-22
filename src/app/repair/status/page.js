'use client';
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Header from '../../../components/layout/Header';
import BottomNav from '../../../components/layout/BottomNav';
import RatingModal from '../../../components/RatingModal';
import MapPlaceholder from '../../../components/MapPlaceholder';
import Button from '../../../components/ui/Button';
import Badge from '../../../components/ui/Badge';
import Avatar from '../../../components/ui/Avatar';
import ToastContainer from '../../../components/ui/Toast';
import { useToast } from '../../../hooks/useToast';
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

const STEP_ORDER = Object.values(STEPS);

const DriverInfo = ({ name, phone }) => (
  <div className={styles.driverCard}>
    <div className={styles.driverInfo}>
      <Avatar name={name} size="sm" color="indigo" />
      <div>
        <p className={styles.driverName}>{name}</p>
        <p className={styles.driverPhone}>{phone}</p>
      </div>
    </div>
    <a href={`tel:${phone}`} className={styles.callBtn} title={`Call ${name}`}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  </div>
);

const TrackingMap = ({ status, text, minimized, onToggle }) => (
  <div className={styles.mapBox}>
    <div className={styles.mapHeader}>
      <span className={styles.liveBadge}>
        <span className={styles.liveDot} />
        Live Tracking
      </span>
      <button onClick={onToggle} className={styles.mapToggle}>
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
  
  const { toasts, showToast, dismissToast } = useToast();

  const [currentStep, setCurrentStep] = useState(currentStepParam);
  const [timer, setTimer] = useState(0);
  const [deliveryTimer, setDeliveryTimer] = useState(60);
  const [showRating, setShowRating] = useState(false);
  const [mapMinimized, setMapMinimized] = useState(false);

  // Simulated Pricing
  const totalRepairCost = 1000;
  const advancePercentage = 0.8;
  const advanceAmount = totalRepairCost * advancePercentage; 
  const remainingRepairCost = totalRepairCost - advanceAmount; 
  const deliveryDistanceKm = 5;
  const deliveryFee = deliveryDistanceKm * 20; 
  const finalBalance = remainingRepairCost + deliveryFee; 

  // Sync with URL & Handle Payment Success
  useEffect(() => {
    if (paymentStatus === 'success') {
      if (currentStepParam === STEPS.ESTIMATION_APPROVAL || currentStepParam === STEPS.REPAIR_IN_PROGRESS) {
        showToast({ type: 'success', message: 'Payment of ₹' + advanceAmount + ' received! Repair started.' });
        setCurrentStep(STEPS.REPAIR_IN_PROGRESS);
      } else if (currentStepParam === STEPS.DELIVERY_TO_USER || currentStepParam === STEPS.COMPLETED) {
        showToast({ type: 'success', message: 'Final payment received! Thank you.' });
        setCurrentStep(STEPS.COMPLETED);
        setTimeout(() => setShowRating(true), 1000);
      }
    } else {
      setCurrentStep(currentStepParam);
    }
  }, [currentStepParam, paymentStatus, showToast, advanceAmount]);

  // Step Timers
  useEffect(() => {
    let interval;
    if (currentStep === STEPS.DIAGNOSIS) {
      interval = setInterval(() => setTimer(prev => Math.min(prev + 1, 100)), 50);
    } else if (currentStep === STEPS.REPAIR_IN_PROGRESS) {
      interval = setInterval(() => setTimer(prev => Math.min(prev + 0.5, 100)), 50);
    } else if (currentStep === STEPS.READY_FOR_DELIVERY) {
      setDeliveryTimer(60);
      interval = setInterval(() => setDeliveryTimer(prev => Math.max(prev - 1, 0)), 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep]);

  // Transition triggers
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

  const handlePaymentRedirect = (amount, nextStep) => {
    const targetUrl = `/repair/status?service=${encodeURIComponent(serviceName)}&step=${nextStep}&payment=success`;
    router.push(`/repair/payment?amount=${amount}&redirect=${encodeURIComponent(targetUrl)}`);
  };

  const handleRatingSubmit = () => {
    setShowRating(false);
    router.push('/repair?thankyou=true');
  };

  const getStepStatus = (stepKey) => {
    const currentIndex = STEP_ORDER.indexOf(currentStep);
    const stepIndex = STEP_ORDER.indexOf(stepKey);
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'active';
    return 'pending';
  };

  const timelineSteps = [
    { key: STEPS.PICKUP_SCHEDULED, title: 'Pickup Scheduled', icon: '1' },
    { key: STEPS.RIDER_TO_CENTER, title: 'Rider to Center', icon: '2' },
    { key: STEPS.DIAGNOSIS, title: 'Diagnosis', icon: '🛠️' },
    { key: STEPS.ESTIMATION_APPROVAL, title: 'Cost Approval', icon: '📝' },
    { key: STEPS.REPAIR_IN_PROGRESS, title: 'Repairing', icon: '⚙️' },
    { key: STEPS.READY_FOR_DELIVERY, title: 'Ready for Delivery', icon: '📦' },
    { key: STEPS.DELIVERY_TO_USER, title: 'Out for Delivery', icon: '🚚' },
    { key: STEPS.COMPLETED, title: 'Completed', icon: '✓' },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1 className={styles.title}>{serviceName} Status</h1>
          <p className={styles.subtitle}>Order ID: DSTH-78429 — Tracking live</p>
        </header>

        <div className={styles.timeline}>
          {timelineSteps.map((step, idx) => {
            const status = getStepStatus(step.key);
            const isLast = idx === timelineSteps.length - 1;
            const isCurrent = status === 'active';
            const isDone = status === 'completed';

            return (
              <div key={step.key} className={styles.timelineItem}>
                <div className={styles.timelineLeft}>
                  <div className={`${styles.marker} ${isCurrent ? styles.markerActive : ''} ${isDone ? styles.markerCompleted : ''}`}>
                    {isDone ? '✓' : step.icon}
                  </div>
                  {!isLast && (
                    <div className={`${styles.timelineConnector} ${isDone ? styles.timelineConnectorActive : ''}`} />
                  )}
                </div>

                <div className={styles.timelineContent}>
                  <h3 className={`${styles.stepTitle} ${isCurrent ? styles.stepTitleActive : ''} ${isDone ? styles.stepTitleCompleted : ''}`}>
                    {step.title}
                  </h3>
                  
                  {isCurrent && (
                    <div className={styles.statusCard}>
                      {/* 1. Pickup / Rider Incoming */}
                      {(step.key === STEPS.PICKUP_SCHEDULED || step.key === STEPS.RIDER_TO_CENTER) && (
                        <>
                          <p className={styles.statusDescription}>
                            {step.key === STEPS.PICKUP_SCHEDULED ? 'Rider is arriving at your location.' : 'Rider is heading to our service center.'}
                          </p>
                          <DriverInfo name="Raju Kumar" phone="+91 98765 43210" />
                          <TrackingMap
                            status={step.key === STEPS.PICKUP_SCHEDULED ? 'rider_coming' : 'rider_to_center'}
                            text={step.key === STEPS.PICKUP_SCHEDULED ? 'Arriving in 5 mins' : 'Arriving at center in 12 mins'}
                            minimized={mapMinimized}
                            onToggle={() => setMapMinimized(!mapMinimized)}
                          />
                          {step.key === STEPS.PICKUP_SCHEDULED && (
                            <Button variant="primary" className={styles.nextBtn} onClick={() => handleStepChange(STEPS.RIDER_TO_CENTER)} style={{ marginTop: '1rem', width: '100%' }}>
                              Rider Picked Up (Demo)
                            </Button>
                          )}
                          {step.key === STEPS.RIDER_TO_CENTER && (
                            <Button variant="primary" className={styles.nextBtn} onClick={() => handleStepChange(STEPS.DIAGNOSIS)} style={{ marginTop: '1rem', width: '100%' }}>
                              Arrived at Center (Demo)
                            </Button>
                          )}
                        </>
                      )}

                      {/* 2. Diagnosis */}
                      {step.key === STEPS.DIAGNOSIS && (
                        <div className={styles.progressBox}>
                          <p className={styles.statusDescription}>Our experts are diagnosing the issues. Please wait...</p>
                          <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${timer}%` }} />
                          </div>
                          <div className={styles.progressMeta}>
                            <span>Analyzing...</span>
                            <span>{timer}%</span>
                          </div>
                        </div>
                      )}

                      {/* 3. Approval */}
                      {step.key === STEPS.ESTIMATION_APPROVAL && (
                        <div className={styles.estimateCard}>
                          <p className={styles.estimatePrice}>₹{totalRepairCost}</p>
                          <p className={styles.estimateDescription}>Total Estimated Cost (Parts + Labor)</p>
                          
                          <div className={styles.billSummary}>
                            <div className={styles.billRow}>
                              <span>Advance (80%)</span>
                              <span>₹{advanceAmount}</span>
                            </div>
                            <div className={styles.billRow}>
                              <span>Balance (at delivery)</span>
                              <span>₹{remainingRepairCost}</span>
                            </div>
                          </div>
                          
                          <div className={styles.actionRow}>
                            <Button variant="primary" onClick={() => handlePaymentRedirect(advanceAmount, STEPS.REPAIR_IN_PROGRESS)} style={{ flex: 2 }}>
                              Pay ₹{advanceAmount}
                            </Button>
                            <Button variant="ghost" onClick={() => showToast({ type: 'error', message: 'Order cancelled. Item will be returned.' })} style={{ flex: 1, border: '1px solid var(--color-border)' }}>
                              Decline
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* 4. Repairing */}
                      {step.key === STEPS.REPAIR_IN_PROGRESS && (
                        <div className={styles.progressBox}>
                          <p className={styles.statusDescription}>Technician is currently working on your device.</p>
                          <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${timer}%` }} />
                          </div>
                          <div className={styles.progressMeta}>
                            <span>Fixing issues...</span>
                            <span>2 hours remain</span>
                          </div>
                        </div>
                      )}

                      {/* 5. Ready */}
                      {step.key === STEPS.READY_FOR_DELIVERY && (
                        <div className={styles.deliveryChoice}>
                          <p className={styles.statusDescription}>Repair successful! How would you like to receive your item?</p>
                          <Badge variant="warning" style={{ marginBottom: '1rem' }}>
                            Auto-delivery in {deliveryTimer}s
                          </Badge>
                          <div className={styles.actionRow}>
                            <Button variant="primary" onClick={() => handleStepChange(STEPS.DELIVERY_TO_USER)} style={{ flex: 1 }}>
                              Deliver to Me
                            </Button>
                            <Button variant="ghost" onClick={() => showToast({ type: 'info', message: 'Self-pickup chosen. Center open till 8pm.' })} style={{ flex: 1, border: '1px solid var(--color-border)' }}>
                              Self Pickup
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* 6. Out for delivery */}
                      {step.key === STEPS.DELIVERY_TO_USER && (
                        <>
                          <p className={styles.statusDescription}>Rider is on the way with your repaired item.</p>
                          <DriverInfo name="Raju Kumar" phone="+91 98765 43210" />
                          <TrackingMap
                            status="delivery"
                            text="Arriving in 8 mins"
                            minimized={mapMinimized}
                            onToggle={() => setMapMinimized(!mapMinimized)}
                          />

                          <div className={styles.receipt}>
                            <div className={styles.receiptHeader}>
                              <p className={styles.receiptTitle}>Final Bill</p>
                            </div>
                            <div className={styles.billRow}>
                              <span>Repair Cost</span>
                              <span>₹{totalRepairCost}</span>
                            </div>
                            <div className={styles.billRow}>
                              <span>Advance Paid</span>
                              <span style={{ color: 'var(--color-error)' }}>-₹{advanceAmount}</span>
                            </div>
                            <div className={styles.billRow}>
                              <span>Delivery Fee</span>
                              <span>+₹{deliveryFee}</span>
                            </div>
                            <div className={`${styles.billRow} ${styles.totalRow}`}>
                              <span>Remaining to Pay</span>
                              <span className={styles.receiptTotal}>₹{finalBalance}</span>
                            </div>
                            
                            <Button variant="primary" onClick={() => handlePaymentRedirect(finalBalance, STEPS.COMPLETED)} style={{ marginTop: '1.5rem', width: '100%' }}>
                              Pay ₹{finalBalance} & Collect
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  {isDone && <Badge variant="success" size="sm">Completed</Badge>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {showRating && (
        <RatingModal
          onClose={handleRatingSubmit}
          onSubmit={handleRatingSubmit}
        />
      )}
      
      <BottomNav />
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </main>
  );
}

export default function StatusPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ padding: '100px', textAlign: 'center', color: 'var(--color-text-muted)' }}>Syncing order status...</div>}>
        <StatusContent />
      </Suspense>
    </>
  );
}
