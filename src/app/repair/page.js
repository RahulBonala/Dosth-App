"use client";
import Header from '../../components/Header';
import ServiceCard from '../../components/ServiceCard';
import styles from './page.module.css';

const services = [
    { id: 1, title: 'Electrical', icon: '⚡', desc: 'Wiring, fixtures, and emergency repairs.' },
    { id: 2, title: 'Plumbing', icon: '💧', desc: 'Leaks, clogs, and pipe installations.' },
    { id: 3, title: 'Carpentry', icon: '🪚', desc: 'Furniture repair and custom woodwork.' },
    { id: 4, title: 'Appliances', icon: '📺', desc: 'AC, Washing Machine, and TV repairs.' },
    { id: 5, title: 'Painting', icon: '🎨', desc: 'Interior and exterior home painting.' },
    { id: 6, title: 'Cleaning', icon: '🧹', desc: 'Deep cleaning and pest control.' },
];

export default function RepairPage() {
    return (
        <>
            <Header />
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
                            />
                        ))}
                    </div>
                </div>
            </main>
        </>
    );
}
