import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import StatusContent from './StatusContent';

export const metadata = {
  title: 'Repair Status',
  description: 'Track your repair order in real-time with live status updates on Dosth.',
};

export default function StatusPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <div style={{ padding: '100px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Syncing order status...
          </div>
        }
      >
        <StatusContent />
      </Suspense>
    </>
  );
}
