import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        fontFamily: 'var(--font-sans)',
        background: 'var(--color-bg)',
        color: 'var(--color-text)',
      }}
    >
      <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>🔍</span>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '2rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}
      >
        Page Not Found
      </h1>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1rem',
          maxWidth: '400px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.75rem 2rem',
          background: 'var(--color-primary)',
          color: '#fff',
          borderRadius: 'var(--radius-full)',
          fontWeight: 600,
          textDecoration: 'none',
          fontSize: '0.9375rem',
        }}
      >
        Back to Home
      </Link>
    </main>
  );
}
