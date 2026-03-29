'use client';
import Link from 'next/link';

export default function Error({ error, reset }) {
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
      <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>⚠️</span>
      <h2
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '0.5rem',
        }}
      >
        Something went wrong
      </h2>
      <p
        style={{
          color: 'var(--color-text-secondary)',
          fontSize: '1rem',
          maxWidth: '400px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        An unexpected error occurred. Please try again or return to the home page.
      </p>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 2rem',
            background: 'var(--color-primary)',
            color: '#fff',
            border: 'none',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9375rem',
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: '0.75rem 2rem',
            background: 'transparent',
            color: 'var(--color-primary)',
            border: '2px solid var(--color-primary)',
            borderRadius: 'var(--radius-full)',
            fontWeight: 600,
            textDecoration: 'none',
            fontSize: '0.9375rem',
          }}
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
