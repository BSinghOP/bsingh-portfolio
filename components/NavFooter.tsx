'use client';

import { ThemeToggle } from './ThemeToggle';
import { personal } from '@/lib/content';

export function Nav() {
  return (
    <nav
      className="mono"
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '1.6rem 2rem',
        fontSize: 13,
      }}
    >
      <a
        href="#"
        style={{
          fontWeight: 600,
          color: 'var(--fg)',
          textDecoration: 'none',
          letterSpacing: '-0.01em',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>[</span>
        {personal.shortName}
        <span style={{ color: 'var(--accent)' }}>]</span>
      </a>
      <div className="nav-links">
        <a href="#about">about</a>
        <a href="#projects">projects</a>
        <a href="#skills">skills</a>
        <a href="#achievements">wins</a>
        <a href="#contact">contact</a>
      </div>
      <ThemeToggle />

      <style jsx>{`
        .nav-links {
          display: flex;
          gap: 1.6rem;
        }
        .nav-links a {
          color: var(--fg-muted);
          text-decoration: none;
          transition: color 0.15s;
        }
        .nav-links a:hover {
          color: var(--fg);
        }
        @media (max-width: 700px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="mono"
      style={{
        maxWidth: 1000,
        margin: '3rem auto 0',
        padding: '2rem',
        borderTop: '1px solid var(--line)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 11.5,
        color: 'var(--fg-dim)',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      <span>© {new Date().getFullYear()} {personal.name}</span>
      <span>built with next.js · deployed on a vps that has seen things</span>
    </footer>
  );
}
