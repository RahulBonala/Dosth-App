'use client';

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          background: '#FAFAFA',
          color: '#111827',
        }}
      >
        <span style={{ fontSize: '4rem', marginBottom: '1rem' }}>💥</span>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Critical Error
        </h2>
        <p
          style={{
            color: '#6B7280',
            fontSize: '1rem',
            maxWidth: '400px',
            marginBottom: '2rem',
            lineHeight: 1.6,
          }}
        >
          A critical error occurred. Please refresh the page or try again later.
        </p>
        <button
          onClick={reset}
          style={{
            padding: '0.75rem 2rem',
            background: '#4F46E5',
            color: '#fff',
            border: 'none',
            borderRadius: '9999px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.9375rem',
          }}
        >
          Try Again
        </button>
      </body>
    </html>
  );
}
