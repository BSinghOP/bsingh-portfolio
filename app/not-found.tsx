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
        gap: '1rem',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <p
        className="mono"
        style={{
          fontSize: 'clamp(4rem, 12vw, 7rem)',
          fontWeight: 700,
          letterSpacing: '-0.04em',
          margin: 0,
          color: 'var(--fg)',
          lineHeight: 1,
        }}
      >
        404
      </p>
      <p className="mono" style={{ color: 'var(--fg-muted)', margin: 0, fontSize: '0.95rem' }}>
        this page drifted off into space.
      </p>
      <Link
        href="/"
        className="mono"
        style={{
          marginTop: '0.5rem',
          padding: '8px 16px',
          borderRadius: 8,
          border: '1px solid var(--line-strong)',
          color: 'var(--accent)',
          textDecoration: 'none',
          fontSize: '0.85rem',
          background: 'var(--accent-soft)',
        }}
      >
        ← back home
      </Link>
    </main>
  );
}
