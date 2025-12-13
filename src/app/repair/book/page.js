"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Header from '../../../components/Header';
import styles from './page.module.css';

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const serviceName = searchParams.get('service') || 'Repair';

    // State for manual vs automatic shop selection
    const [manualShop, setManualShop] = useState(false);

    const [formData, setFormData] = useState({
        fromAddress: '',
        toAddress: '',
        description: '',
        date: new Date().toISOString().slice(0, 16)
    });

    // Simulated recommended shop
    const [recommendedShop, setRecommendedShop] = useState('');

    useEffect(() => {
        // Simulate finding a nearby shop based on service
        const shops = {
            'Electrical': 'Sparky Fixers, Main Market',
            'Plumbing': 'Joe\'s Plumbing, Downtown',
            'Carpentry': 'WoodWorks, Sector 4',
            'Appliances': 'TechCare Center, Mall Road',
            'Painting': 'ColorPro Services',
            'Cleaning': 'CleanHome Squad'
        };
        const shop = shops[serviceName] || 'Nearest Service Center';
        setRecommendedShop(shop);

        // Default to recommended shop in form data
        setFormData(prev => ({ ...prev, toAddress: shop }));
    }, [serviceName]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            // For demo, we'll just simulate a successful fetch with a realistic looking address
            // In a real app, we'd use the coordinates to reverse geocode
            setFormData(prev => ({
                ...prev,
                fromAddress: "Getting location..."
            }));

            setTimeout(() => {
                setFormData(prev => ({
                    ...prev,
                    fromAddress: "H.No 12-34, GPS Location, Hyderabad"
                }));
            }, 1000);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const toggleShopSelection = () => {
        setManualShop(!manualShop);
        if (!manualShop) {
            // If switching to manual, clear the auto-filled address so they can type
            setFormData(prev => ({ ...prev, toAddress: '' }));
        } else {
            // If switching back to auto, restore recommended
            setFormData(prev => ({ ...prev, toAddress: recommendedShop }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to status page with query params to persist state for demo
        router.push(`/repair/status?service=${encodeURIComponent(serviceName)}&step=pickup_scheduled`);
    };

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <h1 className={styles.title}>Book {serviceName} Service</h1>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label>From (Your Location)</label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="text"
                                name="fromAddress"
                                value={formData.fromAddress}
                                onChange={handleChange}
                                placeholder="Enter your address"
                                required
                            />
                            <button type="button" className={styles.locationBtn} onClick={handleCurrentLocation} title="Use Current Location">
                                📍
                            </button>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label>To (Service Provider)</label>

                        {!manualShop ? (
                            <div className={styles.autoSelection}>
                                <div className={styles.recommendationBox}>
                                    <span className={styles.star}>★</span>
                                    We will match the best rated partner nearby (Recommended)
                                </div>
                                <button type="button" className={styles.linkBtn} onClick={toggleShopSelection}>
                                    I want to choose a specific shop manually
                                </button>
                            </div>
                        ) : (
                            <div className={styles.manualSelection}>
                                <input
                                    type="text"
                                    name="toAddress"
                                    value={formData.toAddress}
                                    onChange={handleChange}
                                    placeholder="Enter shop name or address"
                                    required={manualShop}
                                />
                                <button type="button" className={styles.linkBtn} onClick={toggleShopSelection}>
                                    Back to recommended partner
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label>Description of Issue</label>
                        <textarea
                            name="description"
                            rows="4"
                            placeholder="Describe the problem..."
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>



                    <button type="submit" className={styles.submitBtn}>
                        Confirm Booking
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
            <Suspense fallback={<div className={styles.main}>Loading...</div>}>
                <BookingContent />
            </Suspense>
        </>
    );
}
