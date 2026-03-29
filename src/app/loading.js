import Skeleton from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        gap: '1rem',
        background: 'var(--color-bg)',
      }}
    >
      <Skeleton variant="rectangular" width={200} height={32} />
      <Skeleton variant="text" width={300} height={16} />
      <Skeleton variant="text" width={250} height={16} />
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Skeleton variant="rectangular" width={140} height={120} />
        <Skeleton variant="rectangular" width={140} height={120} />
      </div>
    </main>
  );
}
