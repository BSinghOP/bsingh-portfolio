'use client';

import { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = (localStorage.getItem('theme') as 'dark' | 'light' | null) ?? 'dark';
    setTheme(stored);
    document.documentElement.dataset.theme = stored;
    setMounted(true);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        background: 'transparent',
        border: '1px solid var(--line)',
        color: 'var(--fg-muted)',
        padding: '6px 8px',
        borderRadius: 6,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        transition: 'all 0.15s',
      }}
      className="hover:!text-[var(--fg)] hover:!border-[var(--line-strong)]"
    >
      {mounted && (theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />)}
      {!mounted && <Sun size={15} />}
    </button>
  );
}
