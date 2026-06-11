'use client';

import { ThemeToggle } from './ThemeToggle';
import { personal } from '@/lib/content';
import { useSmoothAnchor } from '@/lib/useSmoothAnchor';

export function Nav() {
  const onAnchorClick = useSmoothAnchor();

  return (
    <header className="site-nav-wrap">
      <nav className="mono site-nav">
        <a
          href="#"
          onClick={onAnchorClick}
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
          <a href="#about" onClick={onAnchorClick}>about</a>
          <a href="#projects" onClick={onAnchorClick}>projects</a>
          <a href="#skills" onClick={onAnchorClick}>skills</a>
          <a href="#achievements" onClick={onAnchorClick}>wins</a>
          <a href="#contact" onClick={onAnchorClick}>contact</a>
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
    </header>
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
