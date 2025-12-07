"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import Header from '../../components/Header';
import ServiceCard from '../../components/ServiceCard';
import styles from './page.module.css';

const services = [
    { id: 1, title: 'Electronics', icon: '📱', desc: 'Phone, Laptop, and gadget repairs.' },
    { id: 2, title: 'Appliances', icon: '📺', desc: 'AC, Washing Machine, and TV repairs.' },
    { id: 3, title: 'Bike / Car', icon: '🛵', desc: 'Puncture, breakdown, and general service.' },
    { id: 4, title: 'Home Services', icon: '🏠', desc: 'Electrical, Plumbing, and Cleaning.' },
    { id: 5, title: 'Tools', icon: '🔧', desc: 'Rent or repair power tools and equipment.' },
    { id: 6, title: 'Other', icon: '•••', desc: 'Any other repair or service request.' },
];


function RepairContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const showThankYou = searchParams.get('thankyou');

    useEffect(() => {
        if (showThankYou) {
            alert("Thanks! Your feedback has been recorded.");
            // Clean up URL
            router.replace('/repair');
        }
    }, [showThankYou, router]);

    const handleBooking = (serviceName) => {
        router.push(`/repair/book?service=${encodeURIComponent(serviceName)}`);
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <header className={styles.pageHeader}>
                    <h1 className="animate-fade-in">Repair Hub</h1>
                    <p className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        Trusted professionals at your doorstep.
                    </p>
                </header>

                <div className={styles.grid}>
                    {services.map((service, index) => (
                        <ServiceCard
                            key={service.id}
                            title={service.title}
                            icon={service.icon}
                            description={service.desc}
                            actionLabel="Book Now"
                            onClick={() => handleBooking(service.title)}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default function RepairPage() {
    return (
        <>
            <Header />
            <Suspense fallback={<div>Loading...</div>}>
                <RepairContent />
            </Suspense>
        </>
    );
}
