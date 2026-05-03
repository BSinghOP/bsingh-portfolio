'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, FileDown, ArrowUpRight } from 'lucide-react';
import { hero, personal } from '@/lib/content';

function TypedLine({ text, delay = 0 }: { text: string; delay?: number }) {
  const [shown, setShown] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const t = setTimeout(() => {
      const iv = setInterval(() => {
        setShown(text.slice(0, i + 1));
        i++;
        if (i >= text.length) {
          clearInterval(iv);
          setDone(true);
        }
      }, 22);
    }, delay);
    return () => clearTimeout(t);
  }, [text, delay]);

  return (
    <span>
      {shown}
      {!done && <span className="cursor">_</span>}
    </span>
  );
}

export function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 880,
        margin: '0 auto',
        padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2rem) clamp(3rem, 7vw, 5rem)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          background: 'var(--bg-2)',
          border: '1px solid var(--line)',
          borderRadius: 10,
          width: '100%',
          maxWidth: 460,
          marginBottom: '2.4rem',
          overflow: 'hidden',
        }}
        className="mono"
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '9px 14px',
            borderBottom: '1px solid var(--line)',
            background: 'rgba(0,0,0,0.15)',
            fontSize: 13,
          }}
        >
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
          <span style={{ marginLeft: 10, color: 'var(--fg-dim)', fontSize: 11 }}>
            ~/bsingh — zsh
          </span>
        </div>
        <div style={{ padding: '14px 16px', minHeight: 92, fontSize: 13 }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'var(--fg)' }}>
            <span style={{ color: 'var(--green)' }}>$</span>
            <TypedLine text="whoami" delay={400} />
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{ color: 'var(--accent-2)', padding: '4px 0 4px 18px' }}
          >
            {personal.name}
          </motion.div>
          <div
            style={{
              display: 'flex',
              gap: 8,
              alignItems: 'center',
              color: 'var(--fg)',
              marginTop: 8,
            }}
          >
            <span style={{ color: 'var(--green)' }}>$</span>
            <TypedLine text="cat about.txt" delay={1700} />
          </div>
        </div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="mono"
        style={{
          fontWeight: 600,
          fontSize: 'clamp(2.4rem, 6.5vw, 4.6rem)',
          lineHeight: 1.05,
          letterSpacing: '-0.035em',
          color: 'var(--fg)',
          marginBottom: '1.6rem',
          margin: '0 0 1.6rem',
        }}
      >
        {hero.title.map((line, i) => (
          <span key={i}>
            {i === hero.accentLine ? (
              <span
                style={{ color: 'var(--accent)', fontWeight: 500 }}
              >
                {line}
              </span>
            ) : (
              line
            )}
            {i < hero.title.length - 1 && <br />}
          </span>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.0 }}
        style={{
          fontSize: '1.05rem',
          lineHeight: 1.65,
          color: 'var(--fg-muted)',
          maxWidth: 560,
          marginBottom: '2rem',
        }}
      >
        {hero.subtitle}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.3 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.9rem',
          flexWrap: 'wrap',
        }}
      >
        <a href="#projects" className="btn btn-primary">
          see projects <ArrowUpRight size={15} />
        </a>
        <a href={personal.resume} className="btn" download>
          <FileDown size={14} /> resume
        </a>
        <div style={{ display: 'flex', gap: 14, marginLeft: 8 }}>
          <a
            href={personal.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="social-icon"
          >
            <Github size={17} />
          </a>
          <a
            href={`mailto:${personal.email}`}
            aria-label="Email"
            className="social-icon"
          >
            <Mail size={17} />
          </a>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="social-icon"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </motion.div>

      <style jsx>{`
        :global(.btn) {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 10px 16px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 500;
          font-family: var(--font-jetbrains), monospace;
          text-decoration: none;
          border: 1px solid var(--line-strong);
          background: transparent;
          color: var(--fg);
          transition: all 0.2s;
          cursor: pointer;
        }
        :global(.btn:hover) {
          background: var(--card-hover);
          transform: translateY(-1px);
        }
        :global(.btn-primary) {
          background: var(--accent);
          color: white;
          border-color: var(--accent);
        }
        :global(.btn-primary:hover) {
          background: var(--accent-2);
          border-color: var(--accent-2);
        }
        :global(.social-icon) {
          color: var(--fg-muted);
          display: inline-flex;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.15s;
        }
        :global(.social-icon:hover) {
          color: var(--fg);
          background: var(--card-hover);
        }
      `}</style>
    </section>
  );
}
