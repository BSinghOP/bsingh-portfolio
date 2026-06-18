'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { personal } from '@/lib/content';
import { useSmoothAnchor } from '@/lib/useSmoothAnchor';

const SECTIONS = [
  { id: 'about', label: 'about' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'achievements', label: 'wins' },
  { id: 'contact', label: 'contact' },
];

function useActiveSection() {
  const [active, setActive] = useState('');

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (els.length === 0) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      // Active = last section whose top has passed the line 40% down the viewport;
      // at page bottom, force the last section so short tails still highlight.
      const line = window.scrollY + window.innerHeight * 0.4;
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      let current = '';
      if (atBottom) {
        current = els[els.length - 1].id;
      } else {
        for (const el of els) {
          if (el.getBoundingClientRect().top + window.scrollY <= line) current = el.id;
        }
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return active;
}

export function Nav() {
  const onAnchorClick = useSmoothAnchor();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);

  // Close the mobile menu if the viewport grows back to desktop.
  useEffect(() => {
    if (!open) return;
    const mq = window.matchMedia('(min-width: 701px)');
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener('change', close);
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      mq.removeEventListener('change', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onAnchorClick(e);
    setOpen(false);
  };

  return (
    <header className="site-nav-wrap">
      <nav className="mono site-nav">
        <a
          href="#"
          onClick={handleLink}
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
          {SECTIONS.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={handleLink}
              className={active === s.id ? 'active' : undefined}
            >
              {s.label}
            </a>
          ))}
        </div>
        <div className="nav-right">
          <ThemeToggle />
          <button
            type="button"
            className="nav-burger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              className="nav-mobile"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: 'easeOut' }}
            >
              {SECTIONS.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={handleLink}
                  className={active === s.id ? 'active' : undefined}
                >
                  {s.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <style jsx>{`
          .nav-links {
            display: flex;
            gap: 1.6rem;
          }
          .nav-links a {
            position: relative;
            color: var(--fg-muted);
            text-decoration: none;
            transition: color 0.15s;
          }
          .nav-links a::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: -6px;
            height: 2px;
            border-radius: 2px;
            background: var(--accent);
            opacity: 0;
            transform: scaleX(0.4);
            transition: opacity 0.25s ease, transform 0.25s ease;
          }
          .nav-links a:hover {
            color: var(--fg);
          }
          .nav-links a.active {
            color: var(--fg);
          }
          .nav-links a.active::after {
            opacity: 1;
            transform: scaleX(1);
          }
          .nav-right {
            display: flex;
            align-items: center;
            gap: 0.6rem;
          }
          .nav-burger {
            display: none;
            align-items: center;
            justify-content: center;
            width: 38px;
            height: 38px;
            border-radius: 9px;
            border: 1px solid var(--line-strong);
            background: var(--chip-glass);
            color: var(--fg);
            cursor: pointer;
            padding: 0;
          }
          @media (max-width: 700px) {
            .nav-links {
              display: none;
            }
            .nav-burger {
              display: flex;
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
