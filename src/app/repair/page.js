import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import RepairContent from './RepairContent';

export const metadata = {
  title: 'Repair Hub',
  description:
    'Browse and book trusted repair services for electronics, appliances, vehicles, and home maintenance.',
};

export default function RepairPage() {
  return (
    <>
      <Header />
      <Suspense
        fallback={
          <main style={{ padding: '40px', textAlign: 'center', color: 'var(--color-text-muted)' }}>
            Loading Repair Hub...
          </main>
        }
      >
        <RepairContent />
      </Suspense>
    </>
  );
}
