import { Suspense } from 'react';
import PaymentContent from './PaymentContent';

export const metadata = {
  title: 'Payment',
  description: 'Complete your secure payment for repair services on Dosth.',
};

export default function PaymentPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
          }}
        >
          Loading Payment...
        </div>
      }
    >
      <PaymentContent />
    </Suspense>
  );
}
