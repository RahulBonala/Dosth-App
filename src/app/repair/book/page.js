import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import BookingContent from './BookingContent';

export const metadata = {
  title: 'Book a Repair',
  description:
    'Schedule a repair service with a verified technician. Choose your provider, set urgency, and book instantly.',
};

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
